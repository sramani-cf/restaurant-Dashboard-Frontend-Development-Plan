// Comprehensive permissions system for restaurant dashboard

import { 
  Permission, 
  Role, 
  User, 
  PermissionModule, 
  PermissionAction, 
  PermissionScope,
  RoleType 
} from './types';

// Permission constants
export const MODULES: PermissionModule[] = [
  'dashboard',
  'menu',
  'orders',
  'pos',
  'analytics',
  'settings',
  'users',
  'payments',
  'inventory',
  'marketing',
  'integrations'
];

export const ACTIONS: PermissionAction[] = [
  'view',
  'create',
  'edit',
  'delete',
  'approve',
  'export',
  'admin'
];

export const SCOPES: PermissionScope[] = [
  'global',
  'location',
  'own',
  'team'
];

// Permission definitions with descriptions
export const PERMISSION_DEFINITIONS: Record<string, {
  label: string;
  description: string;
  category: string;
  requiresAdmin?: boolean;
  dangerous?: boolean;
}> = {
  'dashboard.view': {
    label: 'View Dashboard',
    description: 'View main dashboard and analytics',
    category: 'Dashboard'
  },
  'dashboard.export': {
    label: 'Export Dashboard Data',
    description: 'Export dashboard reports and analytics',
    category: 'Dashboard'
  },
  
  'menu.view': {
    label: 'View Menu',
    description: 'View menu items and categories',
    category: 'Menu Management'
  },
  'menu.create': {
    label: 'Create Menu Items',
    description: 'Add new menu items and categories',
    category: 'Menu Management'
  },
  'menu.edit': {
    label: 'Edit Menu Items',
    description: 'Modify existing menu items and categories',
    category: 'Menu Management'
  },
  'menu.delete': {
    label: 'Delete Menu Items',
    description: 'Remove menu items and categories',
    category: 'Menu Management',
    dangerous: true
  },
  'menu.approve': {
    label: 'Approve Menu Changes',
    description: 'Approve menu modifications before going live',
    category: 'Menu Management'
  },
  
  'orders.view': {
    label: 'View Orders',
    description: 'View order history and details',
    category: 'Order Management'
  },
  'orders.create': {
    label: 'Create Orders',
    description: 'Place new orders manually',
    category: 'Order Management'
  },
  'orders.edit': {
    label: 'Edit Orders',
    description: 'Modify existing orders',
    category: 'Order Management'
  },
  'orders.delete': {
    label: 'Cancel/Delete Orders',
    description: 'Cancel or delete orders',
    category: 'Order Management',
    dangerous: true
  },
  
  'pos.view': {
    label: 'View POS',
    description: 'Access point of sale interface',
    category: 'Point of Sale'
  },
  'pos.create': {
    label: 'Process Transactions',
    description: 'Process sales transactions',
    category: 'Point of Sale'
  },
  'pos.edit': {
    label: 'Modify Transactions',
    description: 'Edit or void transactions',
    category: 'Point of Sale'
  },
  'pos.admin': {
    label: 'POS Administration',
    description: 'Configure POS settings and terminals',
    category: 'Point of Sale',
    requiresAdmin: true
  },
  
  'analytics.view': {
    label: 'View Analytics',
    description: 'View reports and analytics',
    category: 'Analytics & Reports'
  },
  'analytics.export': {
    label: 'Export Reports',
    description: 'Export analytics and reports',
    category: 'Analytics & Reports'
  },
  
  'payments.view': {
    label: 'View Payments',
    description: 'View payment transactions and history',
    category: 'Payment Management'
  },
  'payments.create': {
    label: 'Process Payments',
    description: 'Process payment transactions',
    category: 'Payment Management'
  },
  'payments.edit': {
    label: 'Modify Payments',
    description: 'Refund or adjust payments',
    category: 'Payment Management'
  },
  'payments.admin': {
    label: 'Payment Configuration',
    description: 'Configure payment gateways and settings',
    category: 'Payment Management',
    requiresAdmin: true
  },
  
  'inventory.view': {
    label: 'View Inventory',
    description: 'View inventory levels and items',
    category: 'Inventory Management'
  },
  'inventory.create': {
    label: 'Add Inventory',
    description: 'Add new inventory items',
    category: 'Inventory Management'
  },
  'inventory.edit': {
    label: 'Edit Inventory',
    description: 'Modify inventory levels and items',
    category: 'Inventory Management'
  },
  'inventory.delete': {
    label: 'Delete Inventory',
    description: 'Remove inventory items',
    category: 'Inventory Management',
    dangerous: true
  },
  
  'users.view': {
    label: 'View Users',
    description: 'View user accounts and profiles',
    category: 'User Management',
    requiresAdmin: true
  },
  'users.create': {
    label: 'Create Users',
    description: 'Add new user accounts',
    category: 'User Management',
    requiresAdmin: true
  },
  'users.edit': {
    label: 'Edit Users',
    description: 'Modify user accounts and permissions',
    category: 'User Management',
    requiresAdmin: true
  },
  'users.delete': {
    label: 'Delete Users',
    description: 'Remove user accounts',
    category: 'User Management',
    requiresAdmin: true,
    dangerous: true
  },
  
  'settings.view': {
    label: 'View Settings',
    description: 'View system and restaurant settings',
    category: 'System Settings',
    requiresAdmin: true
  },
  'settings.edit': {
    label: 'Edit Settings',
    description: 'Modify system and restaurant settings',
    category: 'System Settings',
    requiresAdmin: true
  },
  'settings.admin': {
    label: 'System Administration',
    description: 'Full system administration access',
    category: 'System Settings',
    requiresAdmin: true,
    dangerous: true
  },
  
  'marketing.view': {
    label: 'View Marketing',
    description: 'View marketing campaigns and analytics',
    category: 'Marketing'
  },
  'marketing.create': {
    label: 'Create Campaigns',
    description: 'Create marketing campaigns',
    category: 'Marketing'
  },
  'marketing.edit': {
    label: 'Edit Campaigns',
    description: 'Modify marketing campaigns',
    category: 'Marketing'
  },
  'marketing.delete': {
    label: 'Delete Campaigns',
    description: 'Remove marketing campaigns',
    category: 'Marketing',
    dangerous: true
  },
  
  'integrations.view': {
    label: 'View Integrations',
    description: 'View third-party integrations',
    category: 'Integrations',
    requiresAdmin: true
  },
  'integrations.create': {
    label: 'Add Integrations',
    description: 'Connect new third-party services',
    category: 'Integrations',
    requiresAdmin: true
  },
  'integrations.edit': {
    label: 'Configure Integrations',
    description: 'Modify integration settings',
    category: 'Integrations',
    requiresAdmin: true
  },
  'integrations.delete': {
    label: 'Remove Integrations',
    description: 'Disconnect third-party services',
    category: 'Integrations',
    requiresAdmin: true,
    dangerous: true
  }
};

// Default role permissions
export const DEFAULT_ROLE_PERMISSIONS: Record<RoleType, Permission[]> = {
  super_admin: MODULES.flatMap(module =>
    ACTIONS.map(action => ({
      id: `${module}.${action}`,
      module,
      action,
      scope: 'global' as PermissionScope
    }))
  ),
  
  admin: [
    // Dashboard
    { id: 'dashboard.view', module: 'dashboard', action: 'view', scope: 'global' },
    { id: 'dashboard.export', module: 'dashboard', action: 'export', scope: 'global' },
    
    // Menu
    { id: 'menu.view', module: 'menu', action: 'view', scope: 'location' },
    { id: 'menu.create', module: 'menu', action: 'create', scope: 'location' },
    { id: 'menu.edit', module: 'menu', action: 'edit', scope: 'location' },
    { id: 'menu.delete', module: 'menu', action: 'delete', scope: 'location' },
    { id: 'menu.approve', module: 'menu', action: 'approve', scope: 'location' },
    
    // Orders
    { id: 'orders.view', module: 'orders', action: 'view', scope: 'location' },
    { id: 'orders.create', module: 'orders', action: 'create', scope: 'location' },
    { id: 'orders.edit', module: 'orders', action: 'edit', scope: 'location' },
    { id: 'orders.delete', module: 'orders', action: 'delete', scope: 'location' },
    
    // POS
    { id: 'pos.view', module: 'pos', action: 'view', scope: 'location' },
    { id: 'pos.create', module: 'pos', action: 'create', scope: 'location' },
    { id: 'pos.edit', module: 'pos', action: 'edit', scope: 'location' },
    { id: 'pos.admin', module: 'pos', action: 'admin', scope: 'location' },
    
    // Analytics
    { id: 'analytics.view', module: 'analytics', action: 'view', scope: 'location' },
    { id: 'analytics.export', module: 'analytics', action: 'export', scope: 'location' },
    
    // Payments
    { id: 'payments.view', module: 'payments', action: 'view', scope: 'location' },
    { id: 'payments.create', module: 'payments', action: 'create', scope: 'location' },
    { id: 'payments.edit', module: 'payments', action: 'edit', scope: 'location' },
    { id: 'payments.admin', module: 'payments', action: 'admin', scope: 'location' },
    
    // Users
    { id: 'users.view', module: 'users', action: 'view', scope: 'location' },
    { id: 'users.create', module: 'users', action: 'create', scope: 'location' },
    { id: 'users.edit', module: 'users', action: 'edit', scope: 'location' },
    
    // Settings
    { id: 'settings.view', module: 'settings', action: 'view', scope: 'location' },
    { id: 'settings.edit', module: 'settings', action: 'edit', scope: 'location' }
  ],
  
  manager: [
    // Dashboard
    { id: 'dashboard.view', module: 'dashboard', action: 'view', scope: 'location' },
    { id: 'dashboard.export', module: 'dashboard', action: 'export', scope: 'location' },
    
    // Menu
    { id: 'menu.view', module: 'menu', action: 'view', scope: 'location' },
    { id: 'menu.edit', module: 'menu', action: 'edit', scope: 'location' },
    
    // Orders
    { id: 'orders.view', module: 'orders', action: 'view', scope: 'location' },
    { id: 'orders.create', module: 'orders', action: 'create', scope: 'location' },
    { id: 'orders.edit', module: 'orders', action: 'edit', scope: 'location' },
    
    // POS
    { id: 'pos.view', module: 'pos', action: 'view', scope: 'location' },
    { id: 'pos.create', module: 'pos', action: 'create', scope: 'location' },
    { id: 'pos.edit', module: 'pos', action: 'edit', scope: 'location' },
    
    // Analytics
    { id: 'analytics.view', module: 'analytics', action: 'view', scope: 'location' },
    { id: 'analytics.export', module: 'analytics', action: 'export', scope: 'location' },
    
    // Payments
    { id: 'payments.view', module: 'payments', action: 'view', scope: 'location' },
    { id: 'payments.create', module: 'payments', action: 'create', scope: 'location' },
    
    // Inventory
    { id: 'inventory.view', module: 'inventory', action: 'view', scope: 'location' },
    { id: 'inventory.edit', module: 'inventory', action: 'edit', scope: 'location' }
  ],
  
  staff: [
    // Dashboard
    { id: 'dashboard.view', module: 'dashboard', action: 'view', scope: 'own' },
    
    // Menu
    { id: 'menu.view', module: 'menu', action: 'view', scope: 'location' },
    
    // Orders
    { id: 'orders.view', module: 'orders', action: 'view', scope: 'own' },
    { id: 'orders.create', module: 'orders', action: 'create', scope: 'own' },
    
    // POS
    { id: 'pos.view', module: 'pos', action: 'view', scope: 'own' },
    { id: 'pos.create', module: 'pos', action: 'create', scope: 'own' },
    
    // Inventory
    { id: 'inventory.view', module: 'inventory', action: 'view', scope: 'location' }
  ],
  
  custom: [] // Custom roles start with no permissions
};

// Permission checker class
export class PermissionChecker {
  private user: User;
  private context: {
    locationId?: string;
    resourceOwnerId?: string;
    teamMembers?: string[];
  };

  constructor(user: User, context: PermissionChecker['context'] = {}) {
    this.user = user;
    this.context = context;
  }

  /**
   * Check if user has a specific permission
   */
  can(module: PermissionModule, action: PermissionAction, scope?: PermissionScope): boolean {
    // Super admin has all permissions
    if (this.user.role.type === 'super_admin') {
      return true;
    }

    // Find matching permission in user's role
    const permission = this.user.role.permissions.find(p => 
      p.module === module && p.action === action
    );

    if (!permission) {
      return false;
    }

    // Check scope restrictions
    return this.checkScope(permission, scope);
  }

  /**
   * Check multiple permissions (OR logic)
   */
  canAny(checks: Array<[PermissionModule, PermissionAction, PermissionScope?]>): boolean {
    return checks.some(([module, action, scope]) => this.can(module, action, scope));
  }

  /**
   * Check multiple permissions (AND logic)
   */
  canAll(checks: Array<[PermissionModule, PermissionAction, PermissionScope?]>): boolean {
    return checks.every(([module, action, scope]) => this.can(module, action, scope));
  }

  /**
   * Get all permissions for the user
   */
  getPermissions(): Permission[] {
    return this.user.role.permissions;
  }

  /**
   * Get permissions grouped by module
   */
  getPermissionsByModule(): Record<PermissionModule, Permission[]> {
    const grouped: Record<string, Permission[]> = {};
    
    this.user.role.permissions.forEach(permission => {
      if (!grouped[permission.module]) {
        grouped[permission.module] = [];
      }
      grouped[permission.module].push(permission);
    });

    return grouped as Record<PermissionModule, Permission[]>;
  }

  /**
   * Check if user can access a specific location
   */
  canAccessLocation(locationId: string): boolean {
    // Super admin can access all locations
    if (this.user.role.type === 'super_admin') {
      return true;
    }

    // Check if user has access to this location
    return this.user.locationAccess.includes(locationId);
  }

  /**
   * Get accessible locations for user
   */
  getAccessibleLocations(): string[] {
    if (this.user.role.type === 'super_admin') {
      // Return all location IDs - would need to fetch from a location service
      return ['*']; // Placeholder for all locations
    }

    return this.user.locationAccess;
  }

  private checkScope(permission: Permission, requestedScope?: PermissionScope): boolean {
    const permissionScope = permission.scope;
    const effectiveScope = requestedScope || permissionScope;

    switch (effectiveScope) {
      case 'global':
        // Must have global permission or be super admin
        return permissionScope === 'global' || this.user.role.type === 'super_admin';

      case 'location':
        // Must have location or global permission, and access to the location
        if (permissionScope !== 'location' && permissionScope !== 'global') {
          return false;
        }
        
        if (this.context.locationId) {
          return this.canAccessLocation(this.context.locationId);
        }
        return true;

      case 'team':
        // Must have team, location, or global permission
        if (!['team', 'location', 'global'].includes(permissionScope)) {
          return false;
        }
        
        // Additional team-specific checks could be added here
        return true;

      case 'own':
        // User can always access their own resources
        if (permissionScope === 'own' || this.user.role.type === 'super_admin') {
          return true;
        }
        
        // Check if user owns the resource
        if (this.context.resourceOwnerId) {
          return this.context.resourceOwnerId === this.user.id;
        }
        return true;

      default:
        return false;
    }
  }
}

// Permission utilities
export const PermissionUtils = {
  /**
   * Create a permission ID from module and action
   */
  createPermissionId(module: PermissionModule, action: PermissionAction): string {
    return `${module}.${action}`;
  },

  /**
   * Parse permission ID into module and action
   */
  parsePermissionId(permissionId: string): { module: PermissionModule; action: PermissionAction } | null {
    const [module, action] = permissionId.split('.');
    
    if (MODULES.includes(module as PermissionModule) && ACTIONS.includes(action as PermissionAction)) {
      return {
        module: module as PermissionModule,
        action: action as PermissionAction
      };
    }
    
    return null;
  },

  /**
   * Get all available permissions
   */
  getAllPermissions(): Permission[] {
    return MODULES.flatMap(module =>
      ACTIONS.map(action => ({
        id: this.createPermissionId(module, action),
        module,
        action,
        scope: 'location' as PermissionScope // Default scope
      }))
    );
  },

  /**
   * Get permissions for a role type
   */
  getDefaultPermissionsForRole(roleType: RoleType): Permission[] {
    return DEFAULT_ROLE_PERMISSIONS[roleType] || [];
  },

  /**
   * Check if a permission is dangerous
   */
  isDangerousPermission(permissionId: string): boolean {
    return PERMISSION_DEFINITIONS[permissionId]?.dangerous === true;
  },

  /**
   * Check if a permission requires admin access
   */
  requiresAdminAccess(permissionId: string): boolean {
    return PERMISSION_DEFINITIONS[permissionId]?.requiresAdmin === true;
  },

  /**
   * Get permission definition
   */
  getPermissionDefinition(permissionId: string) {
    return PERMISSION_DEFINITIONS[permissionId];
  },

  /**
   * Get permissions grouped by category
   */
  getPermissionsByCategory(): Record<string, Array<{ id: string; definition: any }>> {
    const categories: Record<string, Array<{ id: string; definition: any }>> = {};
    
    Object.entries(PERMISSION_DEFINITIONS).forEach(([id, definition]) => {
      if (!categories[definition.category]) {
        categories[definition.category] = [];
      }
      categories[definition.category].push({ id, definition });
    });

    return categories;
  },

  /**
   * Validate permissions array
   */
  validatePermissions(permissions: Permission[]): {
    valid: Permission[];
    invalid: string[];
  } {
    const valid: Permission[] = [];
    const invalid: string[] = [];

    permissions.forEach(permission => {
      if (
        MODULES.includes(permission.module) &&
        ACTIONS.includes(permission.action) &&
        SCOPES.includes(permission.scope)
      ) {
        valid.push(permission);
      } else {
        invalid.push(permission.id);
      }
    });

    return { valid, invalid };
  },

  /**
   * Compare two permission sets
   */
  comparePermissions(current: Permission[], updated: Permission[]): {
    added: Permission[];
    removed: Permission[];
    unchanged: Permission[];
  } {
    const currentIds = new Set(current.map(p => p.id));
    const updatedIds = new Set(updated.map(p => p.id));

    const added = updated.filter(p => !currentIds.has(p.id));
    const removed = current.filter(p => !updatedIds.has(p.id));
    const unchanged = current.filter(p => updatedIds.has(p.id));

    return { added, removed, unchanged };
  }
};

// Permission middleware for API routes
export function requirePermission(
  module: PermissionModule, 
  action: PermissionAction, 
  scope?: PermissionScope
) {
  return (user: User, context?: any) => {
    const checker = new PermissionChecker(user, context);
    return checker.can(module, action, scope);
  };
}

// Permission hooks for components
export function usePermissions(user: User, context?: any) {
  const checker = new PermissionChecker(user, context);
  
  return {
    can: (module: PermissionModule, action: PermissionAction, scope?: PermissionScope) =>
      checker.can(module, action, scope),
    canAny: (checks: Array<[PermissionModule, PermissionAction, PermissionScope?]>) =>
      checker.canAny(checks),
    canAll: (checks: Array<[PermissionModule, PermissionAction, PermissionScope?]>) =>
      checker.canAll(checks),
    canAccessLocation: (locationId: string) =>
      checker.canAccessLocation(locationId),
    getPermissions: () => checker.getPermissions(),
    getAccessibleLocations: () => checker.getAccessibleLocations()
  };
}