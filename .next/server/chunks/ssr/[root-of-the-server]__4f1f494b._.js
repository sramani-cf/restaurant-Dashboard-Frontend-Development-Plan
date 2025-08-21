module.exports = [
"[project]/.next-internal/server/app/orders/[id]/page/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__, module, exports) => {

}),
"[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[project]/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/lib/orders/types.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Order Management Types
__turbopack_context__.s([
    "OrderStatus",
    ()=>OrderStatus,
    "OrderType",
    ()=>OrderType,
    "PaymentMethod",
    ()=>PaymentMethod,
    "PaymentStatus",
    ()=>PaymentStatus
]);
var OrderStatus = /*#__PURE__*/ function(OrderStatus) {
    OrderStatus["PENDING"] = "pending";
    OrderStatus["CONFIRMED"] = "confirmed";
    OrderStatus["PREPARING"] = "preparing";
    OrderStatus["READY"] = "ready";
    OrderStatus["COMPLETED"] = "completed";
    OrderStatus["DELIVERED"] = "delivered";
    OrderStatus["CANCELLED"] = "cancelled";
    OrderStatus["REFUNDED"] = "refunded";
    return OrderStatus;
}({});
var OrderType = /*#__PURE__*/ function(OrderType) {
    OrderType["DINE_IN"] = "dine_in";
    OrderType["TAKEOUT"] = "takeout";
    OrderType["DELIVERY"] = "delivery";
    OrderType["PICKUP"] = "pickup";
    OrderType["CATERING"] = "catering";
    return OrderType;
}({});
var PaymentStatus = /*#__PURE__*/ function(PaymentStatus) {
    PaymentStatus["PENDING"] = "pending";
    PaymentStatus["PROCESSING"] = "processing";
    PaymentStatus["COMPLETED"] = "completed";
    PaymentStatus["FAILED"] = "failed";
    PaymentStatus["REFUNDED"] = "refunded";
    PaymentStatus["PARTIALLY_REFUNDED"] = "partially_refunded";
    return PaymentStatus;
}({});
var PaymentMethod = /*#__PURE__*/ function(PaymentMethod) {
    PaymentMethod["CASH"] = "cash";
    PaymentMethod["CREDIT_CARD"] = "credit_card";
    PaymentMethod["DEBIT_CARD"] = "debit_card";
    PaymentMethod["DIGITAL_WALLET"] = "digital_wallet";
    PaymentMethod["GIFT_CARD"] = "gift_card";
    PaymentMethod["LOYALTY_POINTS"] = "loyalty_points";
    PaymentMethod["CHECK"] = "check";
    PaymentMethod["OTHER"] = "other";
    return PaymentMethod;
}({});
}),
"[project]/lib/orders/data.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Order data layer with mock data
__turbopack_context__.s([
    "cancelOrder",
    ()=>cancelOrder,
    "createOrder",
    ()=>createOrder,
    "getOrder",
    ()=>getOrder,
    "getOrderListItems",
    ()=>getOrderListItems,
    "getOrderStats",
    ()=>getOrderStats,
    "getOrderSummary",
    ()=>getOrderSummary,
    "getOrders",
    ()=>getOrders,
    "processRefund",
    ()=>processRefund,
    "updateOrder",
    ()=>updateOrder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/orders/types.ts [app-rsc] (ecmascript)");
;
// Mock data generation
const generateMockOrders = (count = 100)=>{
    const orders = [];
    const now = new Date();
    const customerNames = [
        'John Smith',
        'Emma Johnson',
        'Michael Brown',
        'Sarah Davis',
        'Robert Wilson',
        'Lisa Anderson',
        'David Martinez',
        'Jennifer Taylor',
        'Chris Lee',
        'Amanda White',
        'James Harris',
        'Maria Garcia'
    ];
    const menuItems = [
        {
            id: 'item-1',
            name: 'Classic Burger',
            price: 12.99,
            station: 'grill'
        },
        {
            id: 'item-2',
            name: 'Caesar Salad',
            price: 9.99,
            station: 'cold'
        },
        {
            id: 'item-3',
            name: 'Margherita Pizza',
            price: 14.99,
            station: 'oven'
        },
        {
            id: 'item-4',
            name: 'Grilled Salmon',
            price: 22.99,
            station: 'grill'
        },
        {
            id: 'item-5',
            name: 'Chicken Alfredo',
            price: 16.99,
            station: 'saute'
        },
        {
            id: 'item-6',
            name: 'Ribeye Steak',
            price: 32.99,
            station: 'grill'
        },
        {
            id: 'item-7',
            name: 'Fish Tacos',
            price: 13.99,
            station: 'fryer'
        },
        {
            id: 'item-8',
            name: 'Veggie Wrap',
            price: 10.99,
            station: 'cold'
        }
    ];
    const statuses = Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["OrderStatus"]);
    const types = Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["OrderType"]);
    const paymentMethods = Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PaymentMethod"]);
    for(let i = 0; i < count; i++){
        const createdAt = new Date(now.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000);
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const type = types[Math.floor(Math.random() * types.length)];
        const customerName = customerNames[Math.floor(Math.random() * customerNames.length)];
        // Generate items
        const itemCount = Math.floor(Math.random() * 4) + 1;
        const items = [];
        let subtotal = 0;
        for(let j = 0; j < itemCount; j++){
            const menuItem = menuItems[Math.floor(Math.random() * menuItems.length)];
            const quantity = Math.floor(Math.random() * 3) + 1;
            const totalPrice = menuItem.price * quantity;
            subtotal += totalPrice;
            items.push({
                id: `order-item-${i}-${j}`,
                menuItemId: menuItem.id,
                menuItemName: menuItem.name,
                quantity,
                unitPrice: menuItem.price,
                totalPrice,
                modifiers: [],
                status: status === __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["OrderStatus"].COMPLETED ? 'served' : status === __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["OrderStatus"].READY ? 'ready' : status === __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["OrderStatus"].PREPARING ? 'preparing' : 'pending',
                prepTime: Math.floor(Math.random() * 20) + 10,
                station: menuItem.station
            });
        }
        const tax = subtotal * 0.08;
        const tip = type === __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["OrderType"].DINE_IN ? subtotal * (Math.random() * 0.1 + 0.15) : 0;
        const discount = Math.random() > 0.8 ? subtotal * 0.1 : 0;
        const total = subtotal + tax + tip - discount;
        // Generate timeline
        const timeline = [
            {
                id: `timeline-${i}-1`,
                timestamp: createdAt.toISOString(),
                event: 'Order Created',
                description: `Order #${1000 + i} created`,
                user: 'System'
            }
        ];
        if (status !== __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["OrderStatus"].PENDING) {
            timeline.push({
                id: `timeline-${i}-2`,
                timestamp: new Date(createdAt.getTime() + 60000).toISOString(),
                event: 'Order Confirmed',
                description: 'Order confirmed by kitchen',
                user: 'Kitchen Staff'
            });
        }
        if ([
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["OrderStatus"].PREPARING,
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["OrderStatus"].READY,
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["OrderStatus"].COMPLETED,
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["OrderStatus"].DELIVERED
        ].includes(status)) {
            timeline.push({
                id: `timeline-${i}-3`,
                timestamp: new Date(createdAt.getTime() + 120000).toISOString(),
                event: 'Preparation Started',
                description: 'Kitchen started preparing order',
                user: 'Chef Mike'
            });
        }
        if ([
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["OrderStatus"].READY,
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["OrderStatus"].COMPLETED,
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["OrderStatus"].DELIVERED
        ].includes(status)) {
            timeline.push({
                id: `timeline-${i}-4`,
                timestamp: new Date(createdAt.getTime() + 900000).toISOString(),
                event: 'Order Ready',
                description: 'Order ready for pickup/delivery',
                user: 'Chef Mike'
            });
        }
        orders.push({
            id: `order-${i}`,
            orderNumber: `#${1000 + i}`,
            status,
            type,
            customerId: `customer-${Math.floor(Math.random() * 50)}`,
            customerName,
            customerPhone: `555-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
            customerEmail: `${customerName.toLowerCase().replace(' ', '.')}@email.com`,
            tableNumber: type === __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["OrderType"].DINE_IN ? `T${Math.floor(Math.random() * 20) + 1}` : undefined,
            items,
            subtotal,
            tax,
            tip,
            discount,
            total,
            paymentStatus: status === __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["OrderStatus"].COMPLETED || status === __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["OrderStatus"].DELIVERED ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PaymentStatus"].COMPLETED : status === __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["OrderStatus"].CANCELLED ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PaymentStatus"].FAILED : status === __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["OrderStatus"].REFUNDED ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PaymentStatus"].REFUNDED : __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PaymentStatus"].PENDING,
            paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
            paymentDetails: status === __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["OrderStatus"].COMPLETED || status === __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["OrderStatus"].DELIVERED ? {
                transactionId: `txn-${Date.now()}-${i}`,
                lastFourDigits: String(Math.floor(Math.random() * 10000)).padStart(4, '0'),
                cardBrand: 'Visa',
                authorizationCode: `AUTH${Math.floor(Math.random() * 1000000)}`,
                amount: total,
                tip: tip
            } : undefined,
            notes: Math.random() > 0.7 ? 'No onions please' : undefined,
            createdAt: createdAt.toISOString(),
            updatedAt: new Date(createdAt.getTime() + Math.random() * 3600000).toISOString(),
            confirmedAt: status !== __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["OrderStatus"].PENDING ? new Date(createdAt.getTime() + 60000).toISOString() : undefined,
            prepStartedAt: [
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["OrderStatus"].PREPARING,
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["OrderStatus"].READY,
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["OrderStatus"].COMPLETED,
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["OrderStatus"].DELIVERED
            ].includes(status) ? new Date(createdAt.getTime() + 120000).toISOString() : undefined,
            readyAt: [
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["OrderStatus"].READY,
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["OrderStatus"].COMPLETED,
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["OrderStatus"].DELIVERED
            ].includes(status) ? new Date(createdAt.getTime() + 900000).toISOString() : undefined,
            completedAt: [
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["OrderStatus"].COMPLETED,
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["OrderStatus"].DELIVERED
            ].includes(status) ? new Date(createdAt.getTime() + 1200000).toISOString() : undefined,
            deliveredAt: status === __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["OrderStatus"].DELIVERED ? new Date(createdAt.getTime() + 2400000).toISOString() : undefined,
            cancelledAt: status === __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["OrderStatus"].CANCELLED ? new Date(createdAt.getTime() + 300000).toISOString() : undefined,
            refundedAt: status === __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["OrderStatus"].REFUNDED ? new Date(createdAt.getTime() + 86400000).toISOString() : undefined,
            estimatedReadyTime: status === __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["OrderStatus"].PREPARING ? new Date(Date.now() + 900000).toISOString() : undefined,
            assignedStaff: type === __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["OrderType"].DINE_IN ? [
                {
                    id: `staff-${Math.floor(Math.random() * 10)}`,
                    name: [
                        'Alice',
                        'Bob',
                        'Carol',
                        'Dave'
                    ][Math.floor(Math.random() * 4)],
                    role: 'server',
                    assignedAt: createdAt.toISOString()
                }
            ] : undefined,
            deliveryInfo: type === __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["OrderType"].DELIVERY ? {
                address: `${Math.floor(Math.random() * 9999) + 1} Main St`,
                city: 'San Francisco',
                state: 'CA',
                zipCode: '94101',
                instructions: 'Leave at door',
                driverId: `driver-${Math.floor(Math.random() * 5)}`,
                driverName: [
                    'Tom',
                    'Jerry',
                    'Mike'
                ][Math.floor(Math.random() * 3)],
                estimatedDeliveryTime: new Date(createdAt.getTime() + 2400000).toISOString(),
                actualDeliveryTime: status === __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["OrderStatus"].DELIVERED ? new Date(createdAt.getTime() + 2400000).toISOString() : undefined,
                deliveryFee: 4.99,
                distance: Math.random() * 5 + 1
            } : undefined,
            timeline,
            posOrderId: `pos-${Date.now()}-${i}`,
            source: [
                'pos',
                'online',
                'phone',
                'kiosk'
            ][Math.floor(Math.random() * 4)],
            thirdPartyProvider: Math.random() > 0.7 ? 'DoorDash' : undefined
        });
    }
    return orders;
};
// Cache for mock data
let cachedOrders = null;
async function getOrders(filters) {
    // Simulate API delay
    await new Promise((resolve)=>setTimeout(resolve, 500));
    if (!cachedOrders) {
        cachedOrders = generateMockOrders(100);
    }
    let filtered = [
        ...cachedOrders
    ];
    if (filters) {
        if (filters.status?.length) {
            filtered = filtered.filter((o)=>filters.status.includes(o.status));
        }
        if (filters.type?.length) {
            filtered = filtered.filter((o)=>filters.type.includes(o.type));
        }
        if (filters.paymentStatus?.length) {
            filtered = filtered.filter((o)=>filters.paymentStatus.includes(o.paymentStatus));
        }
        if (filters.dateRange) {
            const start = new Date(filters.dateRange.start);
            const end = new Date(filters.dateRange.end);
            filtered = filtered.filter((o)=>{
                const orderDate = new Date(o.createdAt);
                return orderDate >= start && orderDate <= end;
            });
        }
        if (filters.customerId) {
            filtered = filtered.filter((o)=>o.customerId === filters.customerId);
        }
        if (filters.tableNumber) {
            filtered = filtered.filter((o)=>o.tableNumber === filters.tableNumber);
        }
        if (filters.searchTerm) {
            const term = filters.searchTerm.toLowerCase();
            filtered = filtered.filter((o)=>o.orderNumber.toLowerCase().includes(term) || o.customerName?.toLowerCase().includes(term) || o.customerEmail?.toLowerCase().includes(term) || o.customerPhone?.includes(term));
        }
        if (filters.minAmount !== undefined) {
            filtered = filtered.filter((o)=>o.total >= filters.minAmount);
        }
        if (filters.maxAmount !== undefined) {
            filtered = filtered.filter((o)=>o.total <= filters.maxAmount);
        }
    }
    // Sort by creation date, newest first
    filtered.sort((a, b)=>new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return filtered;
}
async function getOrder(id) {
    await new Promise((resolve)=>setTimeout(resolve, 300));
    if (!cachedOrders) {
        cachedOrders = generateMockOrders(100);
    }
    return cachedOrders.find((o)=>o.id === id) || null;
}
async function getOrderListItems(filters) {
    const orders = await getOrders(filters);
    return orders.map((order)=>({
            id: order.id,
            orderNumber: order.orderNumber,
            status: order.status,
            type: order.type,
            customerName: order.customerName,
            tableNumber: order.tableNumber,
            total: order.total,
            itemCount: order.items.reduce((sum, item)=>sum + item.quantity, 0),
            createdAt: order.createdAt,
            estimatedReadyTime: order.estimatedReadyTime,
            paymentStatus: order.paymentStatus,
            source: order.source
        }));
}
async function getOrderStats(dateRange) {
    const orders = await getOrders(dateRange ? {
        dateRange
    } : undefined);
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const todayOrders = orders.filter((o)=>new Date(o.createdAt) >= todayStart);
    // Calculate peak hours
    const hourCounts = {};
    orders.forEach((order)=>{
        const hour = new Date(order.createdAt).getHours();
        hourCounts[hour] = (hourCounts[hour] || 0) + 1;
    });
    const peakHours = Object.entries(hourCounts).map(([hour, count])=>({
            hour: parseInt(hour),
            orders: count
        })).sort((a, b)=>b.orders - a.orders).slice(0, 5);
    // Calculate stats by status
    const ordersByStatus = {};
    Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["OrderStatus"]).forEach((status)=>{
        ordersByStatus[status] = orders.filter((o)=>o.status === status).length;
    });
    // Calculate stats by type
    const ordersByType = {};
    Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["OrderType"]).forEach((type)=>{
        ordersByType[type] = orders.filter((o)=>o.type === type).length;
    });
    const totalRevenue = orders.reduce((sum, o)=>sum + o.total, 0);
    const todayRevenue = todayOrders.reduce((sum, o)=>sum + o.total, 0);
    const refundedAmount = orders.filter((o)=>o.status === __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["OrderStatus"].REFUNDED).reduce((sum, o)=>sum + o.total, 0);
    const completedOrders = orders.filter((o)=>[
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["OrderStatus"].COMPLETED,
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["OrderStatus"].DELIVERED
        ].includes(o.status));
    const averagePrepTime = completedOrders.length > 0 ? completedOrders.reduce((sum, o)=>{
        if (o.prepStartedAt && o.readyAt) {
            return sum + (new Date(o.readyAt).getTime() - new Date(o.prepStartedAt).getTime());
        }
        return sum;
    }, 0) / completedOrders.length / 60000 : 0; // Convert to minutes
    return {
        totalOrders: orders.length,
        totalRevenue,
        averageOrderValue: orders.length > 0 ? totalRevenue / orders.length : 0,
        ordersByStatus,
        ordersByType,
        todayOrders: todayOrders.length,
        todayRevenue,
        pendingOrders: ordersByStatus[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["OrderStatus"].PENDING] || 0,
        preparingOrders: ordersByStatus[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["OrderStatus"].PREPARING] || 0,
        readyOrders: ordersByStatus[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["OrderStatus"].READY] || 0,
        completedOrders: ordersByStatus[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["OrderStatus"].COMPLETED] || 0,
        cancelledOrders: ordersByStatus[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["OrderStatus"].CANCELLED] || 0,
        refundedAmount,
        averagePrepTime,
        peakHours
    };
}
async function createOrder(data) {
    await new Promise((resolve)=>setTimeout(resolve, 500));
    if (!cachedOrders) {
        cachedOrders = generateMockOrders(100);
    }
    const newOrder = {
        id: `order-${Date.now()}`,
        orderNumber: `#${1000 + cachedOrders.length}`,
        status: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["OrderStatus"].PENDING,
        type: data.type,
        customerId: data.customerId,
        customerName: data.customerName,
        customerPhone: data.customerPhone,
        customerEmail: data.customerEmail,
        tableNumber: data.tableNumber,
        items: data.items.map((item, index)=>({
                id: `item-${Date.now()}-${index}`,
                menuItemId: item.menuItemId,
                menuItemName: `Item ${item.menuItemId}`,
                quantity: item.quantity,
                unitPrice: 15.99,
                totalPrice: 15.99 * item.quantity,
                modifiers: [],
                specialInstructions: item.specialInstructions,
                status: 'pending',
                prepTime: 15,
                station: 'grill'
            })),
        subtotal: 0,
        tax: 0,
        tip: 0,
        discount: 0,
        total: 0,
        paymentStatus: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PaymentStatus"].PENDING,
        paymentMethod: data.paymentMethod,
        notes: data.notes,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        timeline: [
            {
                id: `timeline-${Date.now()}`,
                timestamp: new Date().toISOString(),
                event: 'Order Created',
                description: 'New order created',
                user: 'System'
            }
        ],
        source: 'pos',
        deliveryInfo: data.deliveryInfo
    };
    // Calculate totals
    newOrder.subtotal = newOrder.items.reduce((sum, item)=>sum + item.totalPrice, 0);
    newOrder.tax = newOrder.subtotal * 0.08;
    newOrder.total = newOrder.subtotal + newOrder.tax;
    cachedOrders.unshift(newOrder);
    return newOrder;
}
async function updateOrder(id, updates) {
    await new Promise((resolve)=>setTimeout(resolve, 300));
    if (!cachedOrders) {
        cachedOrders = generateMockOrders(100);
    }
    const orderIndex = cachedOrders.findIndex((o)=>o.id === id);
    if (orderIndex === -1) return null;
    const order = {
        ...cachedOrders[orderIndex]
    };
    if (updates.status) {
        order.status = updates.status;
        order.timeline.push({
            id: `timeline-${Date.now()}`,
            timestamp: new Date().toISOString(),
            event: 'Status Updated',
            description: `Order status changed to ${updates.status}`,
            user: 'Staff'
        });
    }
    if (updates.paymentStatus) {
        order.paymentStatus = updates.paymentStatus;
    }
    if (updates.notes !== undefined) {
        order.notes = updates.notes;
    }
    if (updates.estimatedReadyTime) {
        order.estimatedReadyTime = updates.estimatedReadyTime;
    }
    order.updatedAt = new Date().toISOString();
    cachedOrders[orderIndex] = order;
    return order;
}
async function cancelOrder(id, reason) {
    return updateOrder(id, {
        status: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["OrderStatus"].CANCELLED,
        notes: reason
    });
}
async function processRefund(orderId, request) {
    await new Promise((resolve)=>setTimeout(resolve, 500));
    const order = await getOrder(orderId);
    if (!order) return null;
    return updateOrder(orderId, {
        status: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["OrderStatus"].REFUNDED,
        paymentStatus: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PaymentStatus"].REFUNDED,
        notes: `Refund processed: ${request.reason}`
    });
}
async function getOrderSummary(date) {
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);
    const orders = await getOrders({
        dateRange: {
            start: startDate.toISOString(),
            end: endDate.toISOString()
        }
    });
    // Calculate top items
    const itemCounts = {};
    orders.forEach((order)=>{
        order.items.forEach((item)=>{
            if (!itemCounts[item.menuItemId]) {
                itemCounts[item.menuItemId] = {
                    name: item.menuItemName,
                    quantity: 0,
                    revenue: 0
                };
            }
            itemCounts[item.menuItemId].quantity += item.quantity;
            itemCounts[item.menuItemId].revenue += item.totalPrice;
        });
    });
    const topItems = Object.entries(itemCounts).map(([id, data])=>({
            itemId: id,
            itemName: data.name,
            quantity: data.quantity,
            revenue: data.revenue
        })).sort((a, b)=>b.revenue - a.revenue).slice(0, 10);
    // Calculate hourly distribution
    const hourlyData = {};
    for(let hour = 0; hour < 24; hour++){
        hourlyData[hour] = {
            orders: 0,
            revenue: 0
        };
    }
    orders.forEach((order)=>{
        const hour = new Date(order.createdAt).getHours();
        hourlyData[hour].orders++;
        hourlyData[hour].revenue += order.total;
    });
    const hourlyDistribution = Object.entries(hourlyData).map(([hour, data])=>({
            hour: parseInt(hour),
            orders: data.orders,
            revenue: data.revenue
        }));
    const totalRevenue = orders.reduce((sum, o)=>sum + o.total, 0);
    return {
        date,
        orderCount: orders.length,
        revenue: totalRevenue,
        averageOrderValue: orders.length > 0 ? totalRevenue / orders.length : 0,
        topItems,
        hourlyDistribution
    };
}
}),
"[project]/app/orders/[id]/order-detail-content.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "OrderDetailContent",
    ()=>OrderDetailContent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const OrderDetailContent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call OrderDetailContent() from the server but OrderDetailContent is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/app/orders/[id]/order-detail-content.tsx <module evaluation>", "OrderDetailContent");
}),
"[project]/app/orders/[id]/order-detail-content.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "OrderDetailContent",
    ()=>OrderDetailContent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const OrderDetailContent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call OrderDetailContent() from the server but OrderDetailContent is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/app/orders/[id]/order-detail-content.tsx", "OrderDetailContent");
}),
"[project]/app/orders/[id]/order-detail-content.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$orders$2f5b$id$5d2f$order$2d$detail$2d$content$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/app/orders/[id]/order-detail-content.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$orders$2f5b$id$5d2f$order$2d$detail$2d$content$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/app/orders/[id]/order-detail-content.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$orders$2f5b$id$5d2f$order$2d$detail$2d$content$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/components/ui/utils.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn,
    "disabledStyles",
    ()=>disabledStyles,
    "focusRing",
    ()=>focusRing,
    "transitions",
    ()=>transitions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-rsc] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';
const disabledStyles = 'disabled:pointer-events-none disabled:opacity-50';
const transitions = {
    fast: 'transition-fast',
    base: 'transition-base',
    slow: 'transition-slow'
};
}),
"[project]/components/ui/skeleton.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Skeleton",
    ()=>Skeleton,
    "SkeletonAvatar",
    ()=>SkeletonAvatar,
    "SkeletonCard",
    ()=>SkeletonCard,
    "SkeletonTable",
    ()=>SkeletonTable,
    "SkeletonText",
    ()=>SkeletonText
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/utils.ts [app-rsc] (ecmascript)");
;
;
function Skeleton({ className, variant = 'default', width, height, lines = 1, animate = true, style, ...props }) {
    const baseClasses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cn"])('bg-muted', animate && 'animate-pulse', {
        'rounded-md': variant === 'default' || variant === 'card',
        'rounded-full': variant === 'circular',
        'rounded': variant === 'text'
    }, className);
    const inlineStyles = {
        width: width,
        height: height,
        ...style
    };
    // For text variant with multiple lines
    if (variant === 'text' && lines > 1) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-2",
            ...props,
            children: Array.from({
                length: lines
            }, (_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cn"])(baseClasses, i === lines - 1 ? 'w-3/4' : 'w-full' // Last line is shorter
                    ),
                    style: {
                        height: height || '1rem',
                        width: i === lines - 1 ? '75%' : width || '100%'
                    }
                }, i, false, {
                    fileName: "[project]/components/ui/skeleton.tsx",
                    lineNumber: 45,
                    columnNumber: 11
                }, this))
        }, void 0, false, {
            fileName: "[project]/components/ui/skeleton.tsx",
            lineNumber: 43,
            columnNumber: 7
        }, this);
    }
    // Default height based on variant
    const getDefaultHeight = ()=>{
        if (height) return height;
        switch(variant){
            case 'text':
                return '1rem';
            case 'circular':
                return '2.5rem';
            case 'card':
                return '8rem';
            default:
                return '1.25rem';
        }
    };
    // Default width based on variant
    const getDefaultWidth = ()=>{
        if (width) return width;
        switch(variant){
            case 'circular':
                return '2.5rem';
            default:
                return '100%';
        }
    };
    const defaultHeight = getDefaultHeight();
    const defaultWidth = getDefaultWidth();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: baseClasses,
        style: {
            ...inlineStyles,
            height: inlineStyles.height || defaultHeight,
            width: inlineStyles.width || defaultWidth
        },
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/skeleton.tsx",
        lineNumber: 91,
        columnNumber: 5
    }, this);
}
function SkeletonCard({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cn"])('space-y-3', className),
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(Skeleton, {
                variant: "card",
                height: "12rem"
            }, void 0, false, {
                fileName: "[project]/components/ui/skeleton.tsx",
                lineNumber: 107,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(Skeleton, {
                        height: "1.25rem"
                    }, void 0, false, {
                        fileName: "[project]/components/ui/skeleton.tsx",
                        lineNumber: 109,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(Skeleton, {
                        height: "1rem",
                        width: "80%"
                    }, void 0, false, {
                        fileName: "[project]/components/ui/skeleton.tsx",
                        lineNumber: 110,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ui/skeleton.tsx",
                lineNumber: 108,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/skeleton.tsx",
        lineNumber: 106,
        columnNumber: 5
    }, this);
}
function SkeletonAvatar({ className, size = 'md', ...props }) {
    const sizeMap = {
        sm: '2rem',
        md: '2.5rem',
        lg: '3rem'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(Skeleton, {
        variant: "circular",
        width: sizeMap[size],
        height: sizeMap[size],
        className: className,
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/skeleton.tsx",
        lineNumber: 128,
        columnNumber: 5
    }, this);
}
function SkeletonText({ lines = 3, className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(Skeleton, {
        variant: "text",
        lines: lines,
        className: className,
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/skeleton.tsx",
        lineNumber: 144,
        columnNumber: 5
    }, this);
}
function SkeletonTable({ rows = 5, columns = 4, className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cn"])('space-y-3', className),
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex space-x-4",
                children: Array.from({
                    length: columns
                }, (_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(Skeleton, {
                        height: "1.5rem",
                        className: "flex-1"
                    }, `header-${i}`, false, {
                        fileName: "[project]/components/ui/skeleton.tsx",
                        lineNumber: 164,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/ui/skeleton.tsx",
                lineNumber: 162,
                columnNumber: 7
            }, this),
            Array.from({
                length: rows
            }, (_, rowIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex space-x-4",
                    children: Array.from({
                        length: columns
                    }, (_, colIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(Skeleton, {
                            height: "1.25rem",
                            className: "flex-1"
                        }, `cell-${rowIndex}-${colIndex}`, false, {
                            fileName: "[project]/components/ui/skeleton.tsx",
                            lineNumber: 171,
                            columnNumber: 13
                        }, this))
                }, `row-${rowIndex}`, false, {
                    fileName: "[project]/components/ui/skeleton.tsx",
                    lineNumber: 169,
                    columnNumber: 9
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/skeleton.tsx",
        lineNumber: 160,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/components/ui/card.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ActionCard",
    ()=>ActionCard,
    "Card",
    ()=>Card,
    "CardContent",
    ()=>CardContent,
    "CardDescription",
    ()=>CardDescription,
    "CardFooter",
    ()=>CardFooter,
    "CardHeader",
    ()=>CardHeader,
    "CardTitle",
    ()=>CardTitle,
    "MetricCard",
    ()=>MetricCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/utils.ts [app-rsc] (ecmascript)");
;
;
;
const Card = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["forwardRef"](({ className, variant = 'default', padding = 'md', ...props }, ref)=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cn"])('rounded-lg bg-card text-card-foreground', {
            'border border-border': variant === 'default' || variant === 'outlined',
            'shadow-sm': variant === 'default',
            'shadow-md': variant === 'elevated',
            'p-0': padding === 'none',
            'p-4': padding === 'sm',
            'p-6': padding === 'md',
            'p-8': padding === 'lg'
        }, className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 12,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
Card.displayName = 'Card';
const CardHeader = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["forwardRef"](({ className, divider = false, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cn"])('flex flex-col space-y-1.5 p-6', divider && 'border-b border-border', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0)));
CardHeader.displayName = 'CardHeader';
const CardTitle = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cn"])('text-2xl font-semibold leading-none tracking-tight', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 57,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
CardTitle.displayName = 'CardTitle';
const CardDescription = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cn"])('text-sm text-muted-foreground', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 72,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
CardDescription.displayName = 'CardDescription';
const CardContent = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["forwardRef"](({ className, padding = 'md', ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cn"])({
            'p-0': padding === 'none',
            'p-4': padding === 'sm',
            'p-6': padding === 'md',
            'p-8': padding === 'lg'
        }, className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 86,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0)));
CardContent.displayName = 'CardContent';
const CardFooter = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["forwardRef"](({ className, divider = false, justify = 'start', ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cn"])('flex items-center p-6 pt-0', {
            'border-t border-border pt-6': divider,
            'justify-start': justify === 'start',
            'justify-center': justify === 'center',
            'justify-end': justify === 'end',
            'justify-between': justify === 'between'
        }, className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 110,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0)));
CardFooter.displayName = 'CardFooter';
function ActionCard({ title, description, action, icon, className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(Card, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cn"])('transition-all hover:shadow-md', className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(CardHeader, {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center space-x-4",
                children: [
                    icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-shrink-0 p-2 rounded-lg bg-primary/10 text-primary",
                        children: icon
                    }, void 0, false, {
                        fileName: "[project]/components/ui/card.tsx",
                        lineNumber: 150,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 min-w-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(CardTitle, {
                                className: "text-lg",
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/components/ui/card.tsx",
                                lineNumber: 155,
                                columnNumber: 13
                            }, this),
                            description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(CardDescription, {
                                children: description
                            }, void 0, false, {
                                fileName: "[project]/components/ui/card.tsx",
                                lineNumber: 157,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ui/card.tsx",
                        lineNumber: 154,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-shrink-0",
                        children: action
                    }, void 0, false, {
                        fileName: "[project]/components/ui/card.tsx",
                        lineNumber: 160,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ui/card.tsx",
                lineNumber: 148,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/ui/card.tsx",
            lineNumber: 147,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 146,
        columnNumber: 5
    }, this);
}
function MetricCard({ label, value, change, icon, loading = false, className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(Card, {
        className: className,
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(CardContent, {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between space-y-0 pb-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm font-medium text-muted-foreground",
                            children: label
                        }, void 0, false, {
                            fileName: "[project]/components/ui/card.tsx",
                            lineNumber: 192,
                            columnNumber: 11
                        }, this),
                        icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-muted-foreground",
                            children: icon
                        }, void 0, false, {
                            fileName: "[project]/components/ui/card.tsx",
                            lineNumber: 193,
                            columnNumber: 20
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/ui/card.tsx",
                    lineNumber: 191,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-8 w-24 bg-muted rounded animate-pulse"
                        }, void 0, false, {
                            fileName: "[project]/components/ui/card.tsx",
                            lineNumber: 197,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-2xl font-bold",
                            children: value
                        }, void 0, false, {
                            fileName: "[project]/components/ui/card.tsx",
                            lineNumber: 199,
                            columnNumber: 13
                        }, this),
                        change && !loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cn"])('text-xs', change.type === 'increase' ? 'text-green-600' : 'text-destructive'),
                            children: [
                                change.type === 'increase' ? '+' : '-',
                                Math.abs(change.value),
                                "%",
                                change.period && ` from ${change.period}`
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/ui/card.tsx",
                            lineNumber: 202,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/ui/card.tsx",
                    lineNumber: 195,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/ui/card.tsx",
            lineNumber: 190,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 189,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/app/orders/[id]/order-detail-skeleton.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OrderDetailSkeleton",
    ()=>OrderDetailSkeleton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/skeleton.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/card.tsx [app-rsc] (ecmascript)");
;
;
;
function OrderDetailSkeleton() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Card"], {
                className: "p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Skeleton"], {
                                    className: "h-8 w-24"
                                }, void 0, false, {
                                    fileName: "[project]/app/orders/[id]/order-detail-skeleton.tsx",
                                    lineNumber: 11,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Skeleton"], {
                                    className: "h-5 w-32"
                                }, void 0, false, {
                                    fileName: "[project]/app/orders/[id]/order-detail-skeleton.tsx",
                                    lineNumber: 12,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/orders/[id]/order-detail-skeleton.tsx",
                            lineNumber: 10,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Skeleton"], {
                                    className: "h-9 w-28"
                                }, void 0, false, {
                                    fileName: "[project]/app/orders/[id]/order-detail-skeleton.tsx",
                                    lineNumber: 15,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Skeleton"], {
                                    className: "h-9 w-20"
                                }, void 0, false, {
                                    fileName: "[project]/app/orders/[id]/order-detail-skeleton.tsx",
                                    lineNumber: 16,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/orders/[id]/order-detail-skeleton.tsx",
                            lineNumber: 14,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/orders/[id]/order-detail-skeleton.tsx",
                    lineNumber: 9,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/orders/[id]/order-detail-skeleton.tsx",
                lineNumber: 8,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:col-span-2 space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-4 border-b",
                                children: Array.from({
                                    length: 4
                                }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Skeleton"], {
                                        className: "h-10 w-24"
                                    }, i, false, {
                                        fileName: "[project]/app/orders/[id]/order-detail-skeleton.tsx",
                                        lineNumber: 27,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/orders/[id]/order-detail-skeleton.tsx",
                                lineNumber: 25,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Card"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-4 border-b",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Skeleton"], {
                                            className: "h-6 w-40"
                                        }, void 0, false, {
                                            fileName: "[project]/app/orders/[id]/order-detail-skeleton.tsx",
                                            lineNumber: 34,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/orders/[id]/order-detail-skeleton.tsx",
                                        lineNumber: 33,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-4 space-y-3",
                                        children: Array.from({
                                            length: 3
                                        }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Skeleton"], {
                                                        className: "h-4 w-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/orders/[id]/order-detail-skeleton.tsx",
                                                        lineNumber: 39,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Skeleton"], {
                                                        className: "h-5 w-48"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/orders/[id]/order-detail-skeleton.tsx",
                                                        lineNumber: 40,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, i, true, {
                                                fileName: "[project]/app/orders/[id]/order-detail-skeleton.tsx",
                                                lineNumber: 38,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/orders/[id]/order-detail-skeleton.tsx",
                                        lineNumber: 36,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/orders/[id]/order-detail-skeleton.tsx",
                                lineNumber: 32,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Card"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-4 border-b",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Skeleton"], {
                                            className: "h-6 w-32"
                                        }, void 0, false, {
                                            fileName: "[project]/app/orders/[id]/order-detail-skeleton.tsx",
                                            lineNumber: 49,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/orders/[id]/order-detail-skeleton.tsx",
                                        lineNumber: 48,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-4 space-y-2",
                                        children: [
                                            Array.from({
                                                length: 4
                                            }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-between",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Skeleton"], {
                                                            className: "h-4 w-20"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/orders/[id]/order-detail-skeleton.tsx",
                                                            lineNumber: 54,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Skeleton"], {
                                                            className: "h-4 w-16"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/orders/[id]/order-detail-skeleton.tsx",
                                                            lineNumber: 55,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, i, true, {
                                                    fileName: "[project]/app/orders/[id]/order-detail-skeleton.tsx",
                                                    lineNumber: 53,
                                                    columnNumber: 17
                                                }, this)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "pt-2 border-t",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-between",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Skeleton"], {
                                                            className: "h-5 w-16"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/orders/[id]/order-detail-skeleton.tsx",
                                                            lineNumber: 60,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Skeleton"], {
                                                            className: "h-5 w-20"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/orders/[id]/order-detail-skeleton.tsx",
                                                            lineNumber: 61,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/orders/[id]/order-detail-skeleton.tsx",
                                                    lineNumber: 59,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/orders/[id]/order-detail-skeleton.tsx",
                                                lineNumber: 58,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/orders/[id]/order-detail-skeleton.tsx",
                                        lineNumber: 51,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/orders/[id]/order-detail-skeleton.tsx",
                                lineNumber: 47,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/orders/[id]/order-detail-skeleton.tsx",
                        lineNumber: 23,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Card"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-4 border-b",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Skeleton"], {
                                            className: "h-6 w-32"
                                        }, void 0, false, {
                                            fileName: "[project]/app/orders/[id]/order-detail-skeleton.tsx",
                                            lineNumber: 73,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/orders/[id]/order-detail-skeleton.tsx",
                                        lineNumber: 72,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-4 space-y-2",
                                        children: Array.from({
                                            length: 4
                                        }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Skeleton"], {
                                                className: "h-10 w-full"
                                            }, i, false, {
                                                fileName: "[project]/app/orders/[id]/order-detail-skeleton.tsx",
                                                lineNumber: 77,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/orders/[id]/order-detail-skeleton.tsx",
                                        lineNumber: 75,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/orders/[id]/order-detail-skeleton.tsx",
                                lineNumber: 71,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Card"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-4 border-b",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Skeleton"], {
                                            className: "h-6 w-36"
                                        }, void 0, false, {
                                            fileName: "[project]/app/orders/[id]/order-detail-skeleton.tsx",
                                            lineNumber: 85,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/orders/[id]/order-detail-skeleton.tsx",
                                        lineNumber: 84,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-4 space-y-3",
                                        children: Array.from({
                                            length: 5
                                        }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Skeleton"], {
                                                        className: "h-4 w-24"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/orders/[id]/order-detail-skeleton.tsx",
                                                        lineNumber: 90,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Skeleton"], {
                                                        className: "h-4 w-32"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/orders/[id]/order-detail-skeleton.tsx",
                                                        lineNumber: 91,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, i, true, {
                                                fileName: "[project]/app/orders/[id]/order-detail-skeleton.tsx",
                                                lineNumber: 89,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/orders/[id]/order-detail-skeleton.tsx",
                                        lineNumber: 87,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/orders/[id]/order-detail-skeleton.tsx",
                                lineNumber: 83,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/orders/[id]/order-detail-skeleton.tsx",
                        lineNumber: 69,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/orders/[id]/order-detail-skeleton.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/orders/[id]/order-detail-skeleton.tsx",
        lineNumber: 6,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/ui/button.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-slot/dist/index.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/utils.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-rsc] (ecmascript)");
;
;
;
;
;
const buttonVariants = {
    variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        danger: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline'
    },
    size: {
        sm: 'h-9 rounded-md px-3 text-sm',
        md: 'h-10 px-4 py-2',
        lg: 'h-11 rounded-md px-8 text-base',
        icon: 'h-10 w-10'
    }
};
const Button = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["forwardRef"](({ className, variant = 'primary', size = 'md', asChild = false, loading = false, loadingText, disabled, children, ...props }, ref)=>{
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Slot"] : 'button';
    const buttonClasses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cn"])(// Base styles
    'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium', 'ring-offset-background transition-colors', __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["focusRing"], __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["disabledStyles"], // Variant styles
    buttonVariants.variant[variant], // Size styles  
    buttonVariants.size[size], className);
    const isDisabled = disabled || loading;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        className: buttonClasses,
        ref: ref,
        disabled: isDisabled,
        ...props,
        children: [
            loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                className: "mr-2 h-4 w-4 animate-spin"
            }, void 0, false, {
                fileName: "[project]/components/ui/button.tsx",
                lineNumber: 72,
                columnNumber: 11
            }, ("TURBOPACK compile-time value", void 0)),
            loading && loadingText ? loadingText : children
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/button.tsx",
        lineNumber: 65,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
Button.displayName = 'Button';
;
}),
"[project]/components/ui/badge.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Badge",
    ()=>Badge,
    "PriorityBadge",
    ()=>PriorityBadge,
    "StatusBadge",
    ()=>StatusBadge,
    "badgeVariants",
    ()=>badgeVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/utils.ts [app-rsc] (ecmascript)");
;
;
const badgeVariants = {
    variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/80',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        success: 'bg-green-500 text-white hover:bg-green-600',
        warning: 'bg-yellow-500 text-white hover:bg-yellow-600',
        error: 'bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'border border-input bg-background text-foreground hover:bg-accent',
        ghost: 'text-foreground hover:bg-accent'
    },
    size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-0.5 text-sm',
        lg: 'px-3 py-1 text-sm'
    }
};
function Badge({ className, variant = 'default', size = 'md', pulse = false, children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cn"])(// Base styles
        'inline-flex items-center rounded-full font-semibold transition-colors', 'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2', // Variant and size styles
        badgeVariants.variant[variant], badgeVariants.size[size], // Pulse animation
        pulse && 'animate-pulse', className),
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/components/ui/badge.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, this);
}
function StatusBadge({ status, className, ...props }) {
    const variantMap = {
        online: 'success',
        completed: 'success',
        busy: 'warning',
        pending: 'warning',
        offline: 'secondary',
        cancelled: 'error'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(Badge, {
        variant: variantMap[status],
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cn"])('capitalize', className),
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mr-1 h-2 w-2 rounded-full bg-current opacity-75"
            }, void 0, false, {
                fileName: "[project]/components/ui/badge.tsx",
                lineNumber: 77,
                columnNumber: 7
            }, this),
            status
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/badge.tsx",
        lineNumber: 72,
        columnNumber: 5
    }, this);
}
function PriorityBadge({ priority, className, ...props }) {
    const variantMap = {
        low: 'secondary',
        medium: 'default',
        high: 'warning',
        urgent: 'error'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(Badge, {
        variant: variantMap[priority],
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cn"])('capitalize', className),
        pulse: priority === 'urgent',
        ...props,
        children: priority
    }, void 0, false, {
        fileName: "[project]/components/ui/badge.tsx",
        lineNumber: 97,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/components/ui/page-header.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DashboardPageHeader",
    ()=>DashboardPageHeader,
    "ListPageHeader",
    ()=>ListPageHeader,
    "PageHeader",
    ()=>PageHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/utils.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/badge.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
function PageHeader({ title, description, badge, breadcrumbs, actions, backButton, className, size = 'md' }) {
    const sizeClasses = {
        sm: {
            container: 'py-4',
            title: 'text-lg',
            description: 'text-sm'
        },
        md: {
            container: 'py-6',
            title: 'text-2xl',
            description: 'text-base'
        },
        lg: {
            container: 'py-8',
            title: 'text-3xl',
            description: 'text-lg'
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cn"])('border-b border-border bg-background', sizeClasses[size].container, className),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-4",
            children: [
                breadcrumbs && breadcrumbs.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                    className: "flex items-center space-x-1 text-sm text-muted-foreground",
                    children: breadcrumbs.map((crumb, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                index > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "mx-1",
                                    children: "/"
                                }, void 0, false, {
                                    fileName: "[project]/components/ui/page-header.tsx",
                                    lineNumber: 68,
                                    columnNumber: 31
                                }, this),
                                crumb.href || crumb.onClick ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: crumb.onClick,
                                    className: "hover:text-foreground transition-colors",
                                    type: "button",
                                    children: crumb.label
                                }, void 0, false, {
                                    fileName: "[project]/components/ui/page-header.tsx",
                                    lineNumber: 70,
                                    columnNumber: 19
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-foreground font-medium",
                                    children: crumb.label
                                }, void 0, false, {
                                    fileName: "[project]/components/ui/page-header.tsx",
                                    lineNumber: 78,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, index, true, {
                            fileName: "[project]/components/ui/page-header.tsx",
                            lineNumber: 67,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/ui/page-header.tsx",
                    lineNumber: 65,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-start justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-start space-x-4 min-w-0 flex-1",
                            children: [
                                backButton && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "ghost",
                                    size: "icon",
                                    onClick: backButton.onClick,
                                    className: "mt-1 flex-shrink-0",
                                    "aria-label": backButton.label || 'Go back',
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                        className: "h-4 w-4"
                                    }, void 0, false, {
                                        fileName: "[project]/components/ui/page-header.tsx",
                                        lineNumber: 97,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/ui/page-header.tsx",
                                    lineNumber: 90,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "min-w-0 flex-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center space-x-3 mb-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cn"])('font-bold tracking-tight text-foreground truncate', sizeClasses[size].title),
                                                    children: title
                                                }, void 0, false, {
                                                    fileName: "[project]/components/ui/page-header.tsx",
                                                    lineNumber: 104,
                                                    columnNumber: 17
                                                }, this),
                                                badge && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Badge"], {
                                                    variant: badge.variant,
                                                    size: "sm",
                                                    children: badge.text
                                                }, void 0, false, {
                                                    fileName: "[project]/components/ui/page-header.tsx",
                                                    lineNumber: 111,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/ui/page-header.tsx",
                                            lineNumber: 103,
                                            columnNumber: 15
                                        }, this),
                                        description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cn"])('text-muted-foreground', sizeClasses[size].description),
                                            children: description
                                        }, void 0, false, {
                                            fileName: "[project]/components/ui/page-header.tsx",
                                            lineNumber: 119,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/ui/page-header.tsx",
                                    lineNumber: 101,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/ui/page-header.tsx",
                            lineNumber: 87,
                            columnNumber: 11
                        }, this),
                        actions && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center space-x-2 flex-shrink-0 ml-4",
                            children: actions
                        }, void 0, false, {
                            fileName: "[project]/components/ui/page-header.tsx",
                            lineNumber: 131,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/ui/page-header.tsx",
                    lineNumber: 86,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/ui/page-header.tsx",
            lineNumber: 62,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ui/page-header.tsx",
        lineNumber: 57,
        columnNumber: 5
    }, this);
}
function DashboardPageHeader({ title, subtitle, stats, actions, className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cn"])('border-b border-border bg-background py-6', className),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-between",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "min-w-0 flex-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-2xl font-bold tracking-tight text-foreground",
                            children: title
                        }, void 0, false, {
                            fileName: "[project]/components/ui/page-header.tsx",
                            lineNumber: 164,
                            columnNumber: 11
                        }, this),
                        subtitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-muted-foreground mt-1",
                            children: subtitle
                        }, void 0, false, {
                            fileName: "[project]/components/ui/page-header.tsx",
                            lineNumber: 168,
                            columnNumber: 13
                        }, this),
                        stats && stats.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center space-x-6 mt-4",
                            children: stats.map((stat, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-2xl font-bold text-foreground",
                                            children: stat.value
                                        }, void 0, false, {
                                            fileName: "[project]/components/ui/page-header.tsx",
                                            lineNumber: 176,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs text-muted-foreground uppercase tracking-wide",
                                            children: stat.label
                                        }, void 0, false, {
                                            fileName: "[project]/components/ui/page-header.tsx",
                                            lineNumber: 179,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, index, true, {
                                    fileName: "[project]/components/ui/page-header.tsx",
                                    lineNumber: 175,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/ui/page-header.tsx",
                            lineNumber: 173,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/ui/page-header.tsx",
                    lineNumber: 163,
                    columnNumber: 9
                }, this),
                actions && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center space-x-2 flex-shrink-0 ml-6",
                    children: actions
                }, void 0, false, {
                    fileName: "[project]/components/ui/page-header.tsx",
                    lineNumber: 189,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/ui/page-header.tsx",
            lineNumber: 162,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ui/page-header.tsx",
        lineNumber: 161,
        columnNumber: 5
    }, this);
}
function ListPageHeader({ title, count, searchPlaceholder = 'Search...', onSearch, filters, actions, className }) {
    const [searchQuery, setSearchQuery] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"]('');
    const handleSearchChange = (event)=>{
        const query = event.target.value;
        setSearchQuery(query);
        onSearch?.(query);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cn"])('border-b border-border bg-background py-6', className),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-2xl font-bold tracking-tight text-foreground",
                                children: [
                                    title,
                                    typeof count === 'number' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "ml-2 text-lg font-normal text-muted-foreground",
                                        children: [
                                            "(",
                                            count,
                                            ")"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/ui/page-header.tsx",
                                        lineNumber: 234,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ui/page-header.tsx",
                                lineNumber: 231,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/ui/page-header.tsx",
                            lineNumber: 230,
                            columnNumber: 11
                        }, this),
                        actions && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center space-x-2",
                            children: actions
                        }, void 0, false, {
                            fileName: "[project]/components/ui/page-header.tsx",
                            lineNumber: 241,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/ui/page-header.tsx",
                    lineNumber: 229,
                    columnNumber: 9
                }, this),
                (onSearch || filters) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center space-x-4",
                    children: [
                        onSearch && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 max-w-md",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                placeholder: searchPlaceholder,
                                value: searchQuery,
                                onChange: handleSearchChange,
                                className: "w-full h-10 px-3 rounded-md border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                            }, void 0, false, {
                                fileName: "[project]/components/ui/page-header.tsx",
                                lineNumber: 252,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/ui/page-header.tsx",
                            lineNumber: 251,
                            columnNumber: 15
                        }, this),
                        filters && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center space-x-2",
                            children: filters
                        }, void 0, false, {
                            fileName: "[project]/components/ui/page-header.tsx",
                            lineNumber: 261,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/ui/page-header.tsx",
                    lineNumber: 249,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/ui/page-header.tsx",
            lineNumber: 227,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ui/page-header.tsx",
        lineNumber: 226,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/app/orders/[id]/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>OrderDetailPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/orders/data.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$orders$2f5b$id$5d2f$order$2d$detail$2d$content$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/orders/[id]/order-detail-content.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$orders$2f5b$id$5d2f$order$2d$detail$2d$skeleton$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/orders/[id]/order-detail-skeleton.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$page$2d$header$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/page-header.tsx [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
async function OrderDetailPage({ params }) {
    const order = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getOrder"])(params.id);
    if (!order) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])();
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "container mx-auto px-4 py-6 max-w-7xl",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$page$2d$header$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PageHeader"], {
                title: `Order ${order.orderNumber}`,
                description: `${order.type.replace('_', ' ')} • ${order.customerName || 'Guest'}`,
                backHref: "/orders",
                actions: [
                    {
                        label: 'Print',
                        onClick: ()=>{},
                        variant: 'outline'
                    },
                    {
                        label: 'Edit',
                        href: `/orders/${params.id}/edit`,
                        variant: 'secondary'
                    }
                ]
            }, void 0, false, {
                fileName: "[project]/app/orders/[id]/page.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Suspense"], {
                fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$orders$2f5b$id$5d2f$order$2d$detail$2d$skeleton$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["OrderDetailSkeleton"], {}, void 0, false, {
                    fileName: "[project]/app/orders/[id]/page.tsx",
                    lineNumber: 39,
                    columnNumber: 27
                }, void 0),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$orders$2f5b$id$5d2f$order$2d$detail$2d$content$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["OrderDetailContent"], {
                    order: order
                }, void 0, false, {
                    fileName: "[project]/app/orders/[id]/page.tsx",
                    lineNumber: 40,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/orders/[id]/page.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/orders/[id]/page.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/orders/[id]/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/orders/[id]/page.tsx [app-rsc] (ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__4f1f494b._.js.map