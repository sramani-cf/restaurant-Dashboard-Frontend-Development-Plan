'use client';

import { useState, useEffect } from 'react';
import { Customer } from '@/lib/pos/types';
import { searchCustomers } from '@/lib/pos/data';
import { 
  X, 
  Search, 
  User, 
  Phone, 
  Mail, 
  Award,
  ShoppingBag,
  Plus,
  Loader2
} from 'lucide-react';

interface CustomerLookupProps {
  onClose: () => void;
  onSelectCustomer: (customer: Customer) => void;
}

export function CustomerLookup({ onClose, onSelectCustomer }: CustomerLookupProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [showNewCustomer, setShowNewCustomer] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: ''
  });

  useEffect(() => {
    if (searchQuery.length >= 2) {
      handleSearch();
    } else {
      setCustomers([]);
    }
  }, [searchQuery]);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const results = await searchCustomers(searchQuery);
      setCustomers(results);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCustomer = () => {
    if (!newCustomer.firstName || !newCustomer.phone) {
      alert('Please enter at least first name and phone number');
      return;
    }

    const customer: Customer = {
      id: `cust-${Date.now()}`,
      firstName: newCustomer.firstName,
      lastName: newCustomer.lastName,
      phone: newCustomer.phone,
      email: newCustomer.email || undefined,
      loyaltyPoints: 0,
      totalOrders: 0,
      totalSpent: 0,
      createdAt: new Date()
    };

    onSelectCustomer(customer);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl w-full max-w-2xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">Customer Lookup</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-6 border-b border-gray-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, phone, or email..."
              className="w-full bg-gray-700 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              autoFocus
            />
            {loading && (
              <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 animate-spin" />
            )}
          </div>
        </div>

        {/* Results or New Customer Form */}
        <div className="flex-1 overflow-y-auto p-6">
          {showNewCustomer ? (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white mb-4">New Customer</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">First Name *</label>
                  <input
                    type="text"
                    value={newCustomer.firstName}
                    onChange={(e) => setNewCustomer({ ...newCustomer, firstName: e.target.value })}
                    className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Last Name</label>
                  <input
                    type="text"
                    value={newCustomer.lastName}
                    onChange={(e) => setNewCustomer({ ...newCustomer, lastName: e.target.value })}
                    className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  value={newCustomer.phone}
                  onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                  className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">Email</label>
                <input
                  type="email"
                  value={newCustomer.email}
                  onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                  className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowNewCustomer(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateCustomer}
                  className="flex-1 bg-primary hover:bg-primary/90 text-white py-2 rounded-lg transition-colors"
                >
                  Create Customer
                </button>
              </div>
            </div>
          ) : (
            <>
              {customers.length > 0 ? (
                <div className="space-y-3">
                  {customers.map((customer) => (
                    <button
                      key={customer.id}
                      onClick={() => onSelectCustomer(customer)}
                      className="w-full bg-gray-700 hover:bg-gray-600 p-4 rounded-lg transition-colors text-left"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <User className="h-4 w-4 text-gray-400" />
                            <span className="font-medium text-white">
                              {customer.firstName} {customer.lastName}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2 text-sm text-gray-400">
                            <div className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {customer.phone}
                            </div>
                            {customer.email && (
                              <div className="flex items-center gap-1">
                                <Mail className="h-3 w-3" />
                                {customer.email}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="text-right">
                          {customer.loyaltyPoints !== undefined && (
                            <div className="flex items-center gap-1 text-yellow-400 mb-1">
                              <Award className="h-4 w-4" />
                              <span className="text-sm">{customer.loyaltyPoints} pts</span>
                            </div>
                          )}
                          {customer.totalOrders !== undefined && (
                            <div className="flex items-center gap-1 text-gray-400">
                              <ShoppingBag className="h-3 w-3" />
                              <span className="text-xs">{customer.totalOrders} orders</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : searchQuery.length >= 2 && !loading ? (
                <div className="text-center py-8">
                  <User className="h-12 w-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-400 mb-4">No customers found</p>
                  <button
                    onClick={() => setShowNewCustomer(true)}
                    className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    Add New Customer
                  </button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Search className="h-12 w-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-400">Start typing to search for customers</p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer Actions */}
        {!showNewCustomer && (
          <div className="p-6 border-t border-gray-700">
            <div className="flex gap-3">
              <button
                onClick={() => onSelectCustomer({ 
                  id: 'guest', 
                  firstName: 'Guest', 
                  lastName: 'Customer', 
                  phone: '', 
                  createdAt: new Date() 
                })}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg transition-colors"
              >
                Continue as Guest
              </button>
              <button
                onClick={() => setShowNewCustomer(true)}
                className="flex-1 bg-primary hover:bg-primary/90 text-white py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="h-4 w-4" />
                New Customer
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}