import { Cart, Transaction, Customer, POSSession } from './types';

const DB_NAME = 'POSOfflineDB';
const DB_VERSION = 1;

interface OfflineTransaction {
  id: string;
  cart: Cart;
  transaction: Transaction;
  customer?: Customer;
  timestamp: Date;
  synced: boolean;
}

class OfflineStorage {
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Create object stores
        if (!db.objectStoreNames.contains('transactions')) {
          const transactionStore = db.createObjectStore('transactions', { keyPath: 'id' });
          transactionStore.createIndex('synced', 'synced', { unique: false });
          transactionStore.createIndex('timestamp', 'timestamp', { unique: false });
        }

        if (!db.objectStoreNames.contains('carts')) {
          db.createObjectStore('carts', { keyPath: 'id' });
        }

        if (!db.objectStoreNames.contains('customers')) {
          const customerStore = db.createObjectStore('customers', { keyPath: 'id' });
          customerStore.createIndex('phone', 'phone', { unique: false });
          customerStore.createIndex('email', 'email', { unique: false });
        }

        if (!db.objectStoreNames.contains('sessions')) {
          db.createObjectStore('sessions', { keyPath: 'id' });
        }

        if (!db.objectStoreNames.contains('menu_cache')) {
          db.createObjectStore('menu_cache', { keyPath: 'id' });
        }
      };
    });
  }

  async saveTransaction(transaction: OfflineTransaction): Promise<void> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction(['transactions'], 'readwrite');
      const store = tx.objectStore('transactions');
      const request = store.add(transaction);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async getUnsyncedTransactions(): Promise<OfflineTransaction[]> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction(['transactions'], 'readonly');
      const store = tx.objectStore('transactions');
      const index = store.index('synced');
      const request = index.getAll(false);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async markTransactionSynced(id: string): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction(['transactions'], 'readwrite');
      const store = tx.objectStore('transactions');
      const getRequest = store.get(id);

      getRequest.onsuccess = () => {
        const transaction = getRequest.result;
        if (transaction) {
          transaction.synced = true;
          const putRequest = store.put(transaction);
          putRequest.onsuccess = () => resolve();
          putRequest.onerror = () => reject(putRequest.error);
        } else {
          reject(new Error('Transaction not found'));
        }
      };

      getRequest.onerror = () => reject(getRequest.error);
    });
  }

  async saveCart(cart: Cart): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction(['carts'], 'readwrite');
      const store = tx.objectStore('carts');
      const request = store.put(cart);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async getCart(id: string): Promise<Cart | null> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction(['carts'], 'readonly');
      const store = tx.objectStore('carts');
      const request = store.get(id);

      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  }

  async saveCustomer(customer: Customer): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction(['customers'], 'readwrite');
      const store = tx.objectStore('customers');
      const request = store.put(customer);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async searchCustomersOffline(query: string): Promise<Customer[]> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction(['customers'], 'readonly');
      const store = tx.objectStore('customers');
      const request = store.getAll();

      request.onsuccess = () => {
        const customers = request.result;
        const filtered = customers.filter(customer => {
          const searchTerm = query.toLowerCase();
          return (
            customer.firstName.toLowerCase().includes(searchTerm) ||
            customer.lastName.toLowerCase().includes(searchTerm) ||
            customer.phone.includes(searchTerm) ||
            (customer.email && customer.email.toLowerCase().includes(searchTerm))
          );
        });
        resolve(filtered);
      };

      request.onerror = () => reject(request.error);
    });
  }

  async cacheMenuData(menuData: any): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction(['menu_cache'], 'readwrite');
      const store = tx.objectStore('menu_cache');
      const request = store.put({
        id: 'current_menu',
        data: menuData,
        timestamp: new Date()
      });

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async getCachedMenuData(): Promise<any | null> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction(['menu_cache'], 'readonly');
      const store = tx.objectStore('menu_cache');
      const request = store.get('current_menu');

      request.onsuccess = () => {
        const cached = request.result;
        if (cached) {
          // Check if cache is less than 24 hours old
          const cacheAge = Date.now() - new Date(cached.timestamp).getTime();
          if (cacheAge < 24 * 60 * 60 * 1000) {
            resolve(cached.data);
          } else {
            resolve(null);
          }
        } else {
          resolve(null);
        }
      };

      request.onerror = () => reject(request.error);
    });
  }

  async clearOldData(): Promise<void> {
    if (!this.db) await this.init();

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction(['transactions'], 'readwrite');
      const store = tx.objectStore('transactions');
      const index = store.index('timestamp');
      const range = IDBKeyRange.upperBound(thirtyDaysAgo);
      const request = index.openCursor(range);

      request.onsuccess = () => {
        const cursor = request.result;
        if (cursor) {
          if (cursor.value.synced) {
            cursor.delete();
          }
          cursor.continue();
        } else {
          resolve();
        }
      };

      request.onerror = () => reject(request.error);
    });
  }
}

export const offlineStorage = new OfflineStorage();

// Sync manager for automatic syncing when online
export class SyncManager {
  private syncInterval: NodeJS.Timeout | null = null;

  start(): void {
    // Initial sync
    this.sync();

    // Set up periodic sync every 30 seconds
    this.syncInterval = setInterval(() => {
      if (navigator.onLine) {
        this.sync();
      }
    }, 30000);

    // Sync when coming back online
    window.addEventListener('online', () => {
      this.sync();
    });
  }

  stop(): void {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
    }
  }

  async sync(): Promise<void> {
    if (!navigator.onLine) return;

    try {
      const unsyncedTransactions = await offlineStorage.getUnsyncedTransactions();
      
      for (const transaction of unsyncedTransactions) {
        try {
          // In a real app, this would send the transaction to the server
          await this.sendTransactionToServer(transaction);
          await offlineStorage.markTransactionSynced(transaction.id);
        } catch (error) {
          console.error('Failed to sync transaction:', transaction.id, error);
        }
      }

      // Clean up old data
      await offlineStorage.clearOldData();
    } catch (error) {
      console.error('Sync failed:', error);
    }
  }

  private async sendTransactionToServer(transaction: OfflineTransaction): Promise<void> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, this would be:
    // await fetch('/api/pos/transactions', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(transaction)
    // });
  }
}

export const syncManager = new SyncManager();