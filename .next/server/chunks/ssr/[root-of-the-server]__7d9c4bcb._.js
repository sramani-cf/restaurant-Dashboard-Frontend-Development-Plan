module.exports = [
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/lib/orders/types.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/lib/orders/data.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/orders/types.ts [app-ssr] (ecmascript)");
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
    const statuses = Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"]);
    const types = Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderType"]);
    const paymentMethods = Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PaymentMethod"]);
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
                status: status === __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].COMPLETED ? 'served' : status === __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].READY ? 'ready' : status === __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].PREPARING ? 'preparing' : 'pending',
                prepTime: Math.floor(Math.random() * 20) + 10,
                station: menuItem.station
            });
        }
        const tax = subtotal * 0.08;
        const tip = type === __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderType"].DINE_IN ? subtotal * (Math.random() * 0.1 + 0.15) : 0;
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
        if (status !== __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].PENDING) {
            timeline.push({
                id: `timeline-${i}-2`,
                timestamp: new Date(createdAt.getTime() + 60000).toISOString(),
                event: 'Order Confirmed',
                description: 'Order confirmed by kitchen',
                user: 'Kitchen Staff'
            });
        }
        if ([
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].PREPARING,
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].READY,
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].COMPLETED,
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].DELIVERED
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
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].READY,
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].COMPLETED,
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].DELIVERED
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
            tableNumber: type === __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderType"].DINE_IN ? `T${Math.floor(Math.random() * 20) + 1}` : undefined,
            items,
            subtotal,
            tax,
            tip,
            discount,
            total,
            paymentStatus: status === __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].COMPLETED || status === __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].DELIVERED ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PaymentStatus"].COMPLETED : status === __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].CANCELLED ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PaymentStatus"].FAILED : status === __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].REFUNDED ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PaymentStatus"].REFUNDED : __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PaymentStatus"].PENDING,
            paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
            paymentDetails: status === __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].COMPLETED || status === __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].DELIVERED ? {
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
            confirmedAt: status !== __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].PENDING ? new Date(createdAt.getTime() + 60000).toISOString() : undefined,
            prepStartedAt: [
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].PREPARING,
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].READY,
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].COMPLETED,
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].DELIVERED
            ].includes(status) ? new Date(createdAt.getTime() + 120000).toISOString() : undefined,
            readyAt: [
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].READY,
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].COMPLETED,
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].DELIVERED
            ].includes(status) ? new Date(createdAt.getTime() + 900000).toISOString() : undefined,
            completedAt: [
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].COMPLETED,
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].DELIVERED
            ].includes(status) ? new Date(createdAt.getTime() + 1200000).toISOString() : undefined,
            deliveredAt: status === __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].DELIVERED ? new Date(createdAt.getTime() + 2400000).toISOString() : undefined,
            cancelledAt: status === __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].CANCELLED ? new Date(createdAt.getTime() + 300000).toISOString() : undefined,
            refundedAt: status === __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].REFUNDED ? new Date(createdAt.getTime() + 86400000).toISOString() : undefined,
            estimatedReadyTime: status === __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].PREPARING ? new Date(Date.now() + 900000).toISOString() : undefined,
            assignedStaff: type === __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderType"].DINE_IN ? [
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
            deliveryInfo: type === __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderType"].DELIVERY ? {
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
                actualDeliveryTime: status === __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].DELIVERED ? new Date(createdAt.getTime() + 2400000).toISOString() : undefined,
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
    Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"]).forEach((status)=>{
        ordersByStatus[status] = orders.filter((o)=>o.status === status).length;
    });
    // Calculate stats by type
    const ordersByType = {};
    Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderType"]).forEach((type)=>{
        ordersByType[type] = orders.filter((o)=>o.type === type).length;
    });
    const totalRevenue = orders.reduce((sum, o)=>sum + o.total, 0);
    const todayRevenue = todayOrders.reduce((sum, o)=>sum + o.total, 0);
    const refundedAmount = orders.filter((o)=>o.status === __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].REFUNDED).reduce((sum, o)=>sum + o.total, 0);
    const completedOrders = orders.filter((o)=>[
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].COMPLETED,
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].DELIVERED
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
        pendingOrders: ordersByStatus[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].PENDING] || 0,
        preparingOrders: ordersByStatus[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].PREPARING] || 0,
        readyOrders: ordersByStatus[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].READY] || 0,
        completedOrders: ordersByStatus[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].COMPLETED] || 0,
        cancelledOrders: ordersByStatus[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].CANCELLED] || 0,
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
        status: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].PENDING,
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
        paymentStatus: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PaymentStatus"].PENDING,
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
        status: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].CANCELLED,
        notes: reason
    });
}
async function processRefund(orderId, request) {
    await new Promise((resolve)=>setTimeout(resolve, 500));
    const order = await getOrder(orderId);
    if (!order) return null;
    return updateOrder(orderId, {
        status: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].REFUNDED,
        paymentStatus: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PaymentStatus"].REFUNDED,
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
"[project]/components/ui/utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-ssr] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';
const disabledStyles = 'disabled:pointer-events-none disabled:opacity-50';
const transitions = {
    fast: 'transition-fast',
    base: 'transition-base',
    slow: 'transition-slow'
};
}),
"[project]/components/ui/card.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/utils.ts [app-ssr] (ecmascript)");
;
;
;
const Card = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, variant = 'default', padding = 'md', ...props }, ref)=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('rounded-lg bg-card text-card-foreground', {
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
const CardHeader = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, divider = false, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex flex-col space-y-1.5 p-6', divider && 'border-b border-border', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0)));
CardHeader.displayName = 'CardHeader';
const CardTitle = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('text-2xl font-semibold leading-none tracking-tight', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 57,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
CardTitle.displayName = 'CardTitle';
const CardDescription = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('text-sm text-muted-foreground', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 72,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
CardDescription.displayName = 'CardDescription';
const CardContent = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, padding = 'md', ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])({
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
const CardFooter = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, divider = false, justify = 'start', ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex items-center p-6 pt-0', {
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Card, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('transition-all hover:shadow-md', className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CardHeader, {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center space-x-4",
                children: [
                    icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-shrink-0 p-2 rounded-lg bg-primary/10 text-primary",
                        children: icon
                    }, void 0, false, {
                        fileName: "[project]/components/ui/card.tsx",
                        lineNumber: 150,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 min-w-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CardTitle, {
                                className: "text-lg",
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/components/ui/card.tsx",
                                lineNumber: 155,
                                columnNumber: 13
                            }, this),
                            description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CardDescription, {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Card, {
        className: className,
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CardContent, {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between space-y-0 pb-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm font-medium text-muted-foreground",
                            children: label
                        }, void 0, false, {
                            fileName: "[project]/components/ui/card.tsx",
                            lineNumber: 192,
                            columnNumber: 11
                        }, this),
                        icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-8 w-24 bg-muted rounded animate-pulse"
                        }, void 0, false, {
                            fileName: "[project]/components/ui/card.tsx",
                            lineNumber: 197,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-2xl font-bold",
                            children: value
                        }, void 0, false, {
                            fileName: "[project]/components/ui/card.tsx",
                            lineNumber: 199,
                            columnNumber: 13
                        }, this),
                        change && !loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('text-xs', change.type === 'increase' ? 'text-green-600' : 'text-destructive'),
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
"[project]/components/ui/button.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-slot/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-ssr] (ecmascript)");
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
const Button = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, variant = 'primary', size = 'md', asChild = false, loading = false, loadingText, disabled, children, ...props }, ref)=>{
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Slot"] : 'button';
    const buttonClasses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(// Base styles
    'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium', 'ring-offset-background transition-colors', __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["focusRing"], __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["disabledStyles"], // Variant styles
    buttonVariants.variant[variant], // Size styles  
    buttonVariants.size[size], className);
    const isDisabled = disabled || loading;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        className: buttonClasses,
        ref: ref,
        disabled: isDisabled,
        ...props,
        children: [
            loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
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
"[project]/components/ui/badge.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/utils.ts [app-ssr] (ecmascript)");
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(// Base styles
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Badge, {
        variant: variantMap[status],
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('capitalize', className),
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Badge, {
        variant: variantMap[priority],
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('capitalize', className),
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
"[project]/components/ui/tabs.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ControlledTabs",
    ()=>ControlledTabs,
    "SimpleTabs",
    ()=>SimpleTabs,
    "Tabs",
    ()=>Tabs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$tabs$2f$tabs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/components/tabs/tabs.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/utils.ts [app-ssr] (ecmascript)");
;
;
;
;
function Tabs({ items, defaultTab, selectedTab, onTabChange, variant = 'default', size = 'md', className, tabListClassName, tabPanelClassName, orientation = 'horizontal' }) {
    const [internalSelectedIndex, setInternalSelectedIndex] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](()=>{
        const initialTab = selectedTab || defaultTab || items[0]?.key;
        return items.findIndex((item)=>item.key === initialTab) || 0;
    });
    const selectedIndex = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>{
        if (selectedTab) {
            const index = items.findIndex((item)=>item.key === selectedTab);
            return index >= 0 ? index : 0;
        }
        return internalSelectedIndex;
    }, [
        selectedTab,
        items,
        internalSelectedIndex
    ]);
    const handleChange = (index)=>{
        const selectedItem = items[index];
        if (selectedItem && !selectedItem.disabled) {
            setInternalSelectedIndex(index);
            onTabChange?.(selectedItem.key);
        }
    };
    const getTabVariantClasses = (selected, disabled)=>{
        const baseClasses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('relative inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all', 'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2', {
            'opacity-50 cursor-not-allowed': disabled,
            'cursor-pointer': !disabled
        });
        const sizeClasses = {
            sm: 'px-3 py-1.5 text-xs',
            md: 'px-4 py-2 text-sm',
            lg: 'px-6 py-3 text-base'
        };
        const variantClasses = {
            default: selected ? 'bg-background text-foreground shadow-sm border border-border rounded-md' : 'text-muted-foreground hover:text-foreground hover:bg-muted rounded-md',
            pills: selected ? 'bg-primary text-primary-foreground rounded-full' : 'text-muted-foreground hover:text-foreground hover:bg-muted rounded-full',
            underline: selected ? 'text-foreground border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground border-b-2 border-transparent',
            minimal: selected ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
        };
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(baseClasses, sizeClasses[size], variantClasses[variant]);
    };
    const getTabListClasses = ()=>{
        const baseClasses = 'flex';
        const orientationClasses = {
            horizontal: 'flex-row',
            vertical: 'flex-col'
        };
        const variantClasses = {
            default: 'bg-muted p-1 rounded-lg',
            pills: 'space-x-1',
            underline: 'border-b border-border',
            minimal: 'space-x-6'
        };
        const spacingClasses = {
            horizontal: {
                default: '',
                pills: 'space-x-1',
                underline: 'space-x-6',
                minimal: 'space-x-6'
            },
            vertical: {
                default: '',
                pills: 'space-y-1',
                underline: 'space-y-2',
                minimal: 'space-y-2'
            }
        };
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(baseClasses, orientationClasses[orientation], variantClasses[variant], spacingClasses[orientation][variant]);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('w-full', className),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$tabs$2f$tabs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabGroup"], {
            selectedIndex: selectedIndex,
            onChange: handleChange,
            vertical: orientation === 'vertical',
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$tabs$2f$tabs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabList"], {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(getTabListClasses(), tabListClassName),
                    children: items.map((item, _index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$tabs$2f$tabs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tab"], {
                            disabled: item.disabled,
                            className: ({ selected })=>getTabVariantClasses(selected, !!item.disabled),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center space-x-2",
                                children: [
                                    item.icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex-shrink-0",
                                        children: item.icon
                                    }, void 0, false, {
                                        fileName: "[project]/components/ui/tabs.tsx",
                                        lineNumber: 150,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: item.label
                                    }, void 0, false, {
                                        fileName: "[project]/components/ui/tabs.tsx",
                                        lineNumber: 152,
                                        columnNumber: 17
                                    }, this),
                                    item.badge && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "ml-2 bg-muted text-muted-foreground rounded-full px-2 py-0.5 text-xs font-medium",
                                        children: item.badge
                                    }, void 0, false, {
                                        fileName: "[project]/components/ui/tabs.tsx",
                                        lineNumber: 154,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ui/tabs.tsx",
                                lineNumber: 148,
                                columnNumber: 15
                            }, this)
                        }, item.key, false, {
                            fileName: "[project]/components/ui/tabs.tsx",
                            lineNumber: 141,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/ui/tabs.tsx",
                    lineNumber: 139,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$tabs$2f$tabs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabPanels"], {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('mt-4', tabPanelClassName),
                    children: items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$tabs$2f$tabs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TabPanel"], {
                            className: "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md",
                            children: item.content
                        }, item.key, false, {
                            fileName: "[project]/components/ui/tabs.tsx",
                            lineNumber: 165,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/ui/tabs.tsx",
                    lineNumber: 163,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/ui/tabs.tsx",
            lineNumber: 134,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ui/tabs.tsx",
        lineNumber: 133,
        columnNumber: 5
    }, this);
}
function SimpleTabs({ tabs, defaultIndex = 0, className }) {
    const tabItems = tabs.map((tab, index)=>({
            key: index.toString(),
            label: tab.label,
            content: tab.content,
            disabled: tab.disabled
        }));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tabs, {
        items: tabItems,
        defaultTab: defaultIndex.toString(),
        className: className
    }, void 0, false, {
        fileName: "[project]/components/ui/tabs.tsx",
        lineNumber: 198,
        columnNumber: 5
    }, this);
}
function ControlledTabs({ tabs, activeTab, onTabChange, variant = 'default', className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tabs, {
        items: tabs,
        selectedTab: activeTab,
        onTabChange: onTabChange,
        variant: variant,
        className: className
    }, void 0, false, {
        fileName: "[project]/components/ui/tabs.tsx",
        lineNumber: 223,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/app/orders/[id]/order-detail-content.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OrderDetailContent",
    ()=>OrderDetailContent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/orders/types.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/orders/data.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/badge.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/tabs.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/phone.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mail.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/credit-card.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$pen$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/square-pen.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$printer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/printer.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-square.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$timer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/timer.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
function OrderDetailContent({ order: initialOrder }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [order, setOrder] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialOrder);
    const [updating, setUpdating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showRefundModal, setShowRefundModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showNotes, setShowNotes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Status colors
    const getStatusColor = (status)=>{
        switch(status){
            case __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].PENDING:
                return 'yellow';
            case __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].CONFIRMED:
                return 'blue';
            case __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].PREPARING:
                return 'orange';
            case __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].READY:
                return 'green';
            case __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].COMPLETED:
                return 'gray';
            case __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].DELIVERED:
                return 'green';
            case __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].CANCELLED:
                return 'red';
            case __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].REFUNDED:
                return 'purple';
            default:
                return 'gray';
        }
    };
    const getPaymentStatusColor = (status)=>{
        switch(status){
            case __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PaymentStatus"].PENDING:
                return 'yellow';
            case __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PaymentStatus"].PROCESSING:
                return 'blue';
            case __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PaymentStatus"].COMPLETED:
                return 'green';
            case __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PaymentStatus"].FAILED:
                return 'red';
            case __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PaymentStatus"].REFUNDED:
                return 'purple';
            case __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PaymentStatus"].PARTIALLY_REFUNDED:
                return 'orange';
            default:
                return 'gray';
        }
    };
    // Update order status
    const handleStatusUpdate = async (status)=>{
        setUpdating(true);
        try {
            const updated = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateOrder"])(order.id, {
                status
            });
            if (updated) {
                setOrder(updated);
            }
        } catch (error) {
            console.error('Failed to update order:', error);
        } finally{
            setUpdating(false);
        }
    };
    // Cancel order
    const handleCancel = async ()=>{
        if (!confirm('Are you sure you want to cancel this order?')) return;
        setUpdating(true);
        try {
            const updated = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cancelOrder"])(order.id, 'Cancelled by staff');
            if (updated) {
                setOrder(updated);
            }
        } catch (error) {
            console.error('Failed to cancel order:', error);
        } finally{
            setUpdating(false);
        }
    };
    // Process refund
    const handleRefund = async (amount, reason)=>{
        setUpdating(true);
        try {
            const updated = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["processRefund"])(order.id, {
                orderId: order.id,
                amount,
                reason,
                refundMethod: 'original',
                notes: reason
            });
            if (updated) {
                setOrder(updated);
                setShowRefundModal(false);
            }
        } catch (error) {
            console.error('Failed to process refund:', error);
        } finally{
            setUpdating(false);
        }
    };
    // Calculate times
    const getElapsedTime = (start, end)=>{
        const startTime = new Date(start).getTime();
        const endTime = end ? new Date(end).getTime() : Date.now();
        const elapsed = Math.floor((endTime - startTime) / 60000); // minutes
        if (elapsed < 60) return `${elapsed}m`;
        const hours = Math.floor(elapsed / 60);
        const minutes = elapsed % 60;
        return `${hours}h ${minutes}m`;
    };
    const tabs = [
        {
            id: 'overview',
            label: 'Overview'
        },
        {
            id: 'items',
            label: 'Items'
        },
        {
            id: 'timeline',
            label: 'Timeline'
        },
        {
            id: 'payment',
            label: 'Payment'
        }
    ];
    if (order.type === OrderType.DELIVERY) {
        tabs.push({
            id: 'delivery',
            label: 'Delivery'
        });
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                className: "p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                    variant: getStatusColor(order.status),
                                    className: "text-lg px-3 py-1",
                                    children: order.status.replace('_', ' ')
                                }, void 0, false, {
                                    fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                    lineNumber: 154,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 text-sm text-muted-foreground",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            className: "h-4 w-4"
                                        }, void 0, false, {
                                            fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                            lineNumber: 158,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: [
                                                "Created ",
                                                getElapsedTime(order.createdAt),
                                                " ago"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                            lineNumber: 159,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                    lineNumber: 157,
                                    columnNumber: 13
                                }, this),
                                order.estimatedReadyTime && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 text-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$timer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            className: "h-4 w-4 text-orange-500"
                                        }, void 0, false, {
                                            fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                            lineNumber: 163,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: [
                                                "Est. ready in ",
                                                getElapsedTime(new Date().toISOString(), order.estimatedReadyTime)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                            lineNumber: 164,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                    lineNumber: 162,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                            lineNumber: 153,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: [
                                order.status === __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].PENDING && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                    size: "sm",
                                    onClick: ()=>handleStatusUpdate(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].CONFIRMED),
                                    disabled: updating,
                                    children: "Confirm Order"
                                }, void 0, false, {
                                    fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                    lineNumber: 171,
                                    columnNumber: 15
                                }, this),
                                order.status === __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].CONFIRMED && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                    size: "sm",
                                    onClick: ()=>handleStatusUpdate(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].PREPARING),
                                    disabled: updating,
                                    children: "Start Preparing"
                                }, void 0, false, {
                                    fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                    lineNumber: 180,
                                    columnNumber: 15
                                }, this),
                                order.status === __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].PREPARING && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                    size: "sm",
                                    onClick: ()=>handleStatusUpdate(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].READY),
                                    disabled: updating,
                                    children: "Mark Ready"
                                }, void 0, false, {
                                    fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                    lineNumber: 189,
                                    columnNumber: 15
                                }, this),
                                order.status === __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].READY && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                    size: "sm",
                                    onClick: ()=>handleStatusUpdate(order.type === OrderType.DELIVERY ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].DELIVERED : __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].COMPLETED),
                                    disabled: updating,
                                    children: order.type === OrderType.DELIVERY ? 'Mark Delivered' : 'Complete Order'
                                }, void 0, false, {
                                    fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                    lineNumber: 198,
                                    columnNumber: 15
                                }, this),
                                ![
                                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].CANCELLED,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].REFUNDED,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].COMPLETED,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].DELIVERED
                                ].includes(order.status) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                    size: "sm",
                                    variant: "destructive",
                                    onClick: handleCancel,
                                    disabled: updating,
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                    lineNumber: 209,
                                    columnNumber: 15
                                }, this),
                                [
                                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].COMPLETED,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$orders$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OrderStatus"].DELIVERED
                                ].includes(order.status) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                    size: "sm",
                                    variant: "outline",
                                    onClick: ()=>setShowRefundModal(true),
                                    children: "Process Refund"
                                }, void 0, false, {
                                    fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                    lineNumber: 219,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                            lineNumber: 169,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                    lineNumber: 152,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                lineNumber: 151,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:col-span-2 space-y-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tabs"], {
                            defaultValue: "overview",
                            tabs: tabs,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    value: "overview",
                                    className: "space-y-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "p-4 border-b",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "font-semibold",
                                                        children: "Customer Information"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                        lineNumber: 240,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                    lineNumber: 239,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "p-4 space-y-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                    className: "h-4 w-4 text-muted-foreground"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                                    lineNumber: 244,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: order.customerName || 'Guest Customer'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                                    lineNumber: 245,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                            lineNumber: 243,
                                                            columnNumber: 19
                                                        }, this),
                                                        order.customerPhone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                    className: "h-4 w-4 text-muted-foreground"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                                    lineNumber: 249,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: order.customerPhone
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                                    lineNumber: 250,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                            lineNumber: 248,
                                                            columnNumber: 21
                                                        }, this),
                                                        order.customerEmail && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                    className: "h-4 w-4 text-muted-foreground"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                                    lineNumber: 255,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: order.customerEmail
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                                    lineNumber: 256,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                            lineNumber: 254,
                                                            columnNumber: 21
                                                        }, this),
                                                        order.tableNumber && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                    className: "h-4 w-4 text-muted-foreground"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                                    lineNumber: 261,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: [
                                                                        "Table ",
                                                                        order.tableNumber
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                                    lineNumber: 262,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                            lineNumber: 260,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                    lineNumber: 242,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                            lineNumber: 238,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "p-4 border-b",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "font-semibold",
                                                        children: "Order Summary"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                        lineNumber: 271,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                    lineNumber: 270,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "p-4 space-y-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex justify-between text-sm",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: "Subtotal"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                                    lineNumber: 275,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: [
                                                                        "$",
                                                                        order.subtotal.toFixed(2)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                                    lineNumber: 276,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                            lineNumber: 274,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex justify-between text-sm",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: "Tax"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                                    lineNumber: 279,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: [
                                                                        "$",
                                                                        order.tax.toFixed(2)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                                    lineNumber: 280,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                            lineNumber: 278,
                                                            columnNumber: 19
                                                        }, this),
                                                        order.tip > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex justify-between text-sm",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: "Tip"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                                    lineNumber: 284,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: [
                                                                        "$",
                                                                        order.tip.toFixed(2)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                                    lineNumber: 285,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                            lineNumber: 283,
                                                            columnNumber: 21
                                                        }, this),
                                                        order.discount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex justify-between text-sm text-red-600",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: "Discount"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                                    lineNumber: 290,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: [
                                                                        "-$",
                                                                        order.discount.toFixed(2)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                                    lineNumber: 291,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                            lineNumber: 289,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "pt-2 border-t",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between font-semibold",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: "Total"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                                        lineNumber: 296,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: [
                                                                            "$",
                                                                            order.total.toFixed(2)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                                        lineNumber: 297,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                                lineNumber: 295,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                            lineNumber: 294,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                    lineNumber: 273,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                            lineNumber: 269,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                    lineNumber: 236,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    value: "items",
                                    className: "space-y-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-4 border-b",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "font-semibold",
                                                    children: "Order Items"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                    lineNumber: 308,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                lineNumber: 307,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "divide-y",
                                                children: order.items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "p-4",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-start justify-between",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "space-y-1",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex items-center gap-2",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "font-medium",
                                                                                    children: [
                                                                                        item.quantity,
                                                                                        "x"
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                                                    lineNumber: 316,
                                                                                    columnNumber: 29
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    children: item.menuItemName
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                                                    lineNumber: 317,
                                                                                    columnNumber: 29
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                                            lineNumber: 315,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        item.modifiers.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "text-sm text-muted-foreground pl-8",
                                                                            children: item.modifiers.map((mod)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    children: [
                                                                                        "• ",
                                                                                        mod.name
                                                                                    ]
                                                                                }, mod.id, true, {
                                                                                    fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                                                    lineNumber: 322,
                                                                                    columnNumber: 33
                                                                                }, this))
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                                            lineNumber: 320,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        item.specialInstructions && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "text-sm text-muted-foreground pl-8 italic",
                                                                            children: [
                                                                                "Note: ",
                                                                                item.specialInstructions
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                                            lineNumber: 327,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex items-center gap-4 text-sm text-muted-foreground pl-8",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    children: [
                                                                                        "Station: ",
                                                                                        item.station
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                                                    lineNumber: 332,
                                                                                    columnNumber: 29
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    children: [
                                                                                        "Prep time: ",
                                                                                        item.prepTime,
                                                                                        "m"
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                                                    lineNumber: 333,
                                                                                    columnNumber: 29
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                                                    variant: item.status === 'served' ? 'default' : item.status === 'ready' ? 'success' : item.status === 'preparing' ? 'warning' : 'secondary',
                                                                                    className: "text-xs",
                                                                                    children: item.status
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                                                    lineNumber: 334,
                                                                                    columnNumber: 29
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                                            lineNumber: 331,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                                    lineNumber: 314,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-right",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "font-medium",
                                                                            children: [
                                                                                "$",
                                                                                item.totalPrice.toFixed(2)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                                            lineNumber: 345,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "text-sm text-muted-foreground",
                                                                            children: [
                                                                                "$",
                                                                                item.unitPrice.toFixed(2),
                                                                                " each"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                                            lineNumber: 346,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                                    lineNumber: 344,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                            lineNumber: 313,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, item.id, false, {
                                                        fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                        lineNumber: 312,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                lineNumber: 310,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                        lineNumber: 306,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                    lineNumber: 305,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    value: "timeline",
                                    className: "space-y-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-4 border-b",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "font-semibold",
                                                    children: "Order Timeline"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                    lineNumber: 361,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                lineNumber: 360,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-4",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "relative",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "absolute left-4 top-0 bottom-0 w-0.5 bg-border"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                            lineNumber: 365,
                                                            columnNumber: 21
                                                        }, this),
                                                        order.timeline.map((event, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "relative flex gap-4 pb-8 last:pb-0",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "absolute left-4 -translate-x-1/2 w-2 h-2 bg-primary rounded-full"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                                        lineNumber: 368,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "ml-8 flex-1",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex items-center justify-between mb-1",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                        className: "font-medium",
                                                                                        children: event.event
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                                                        lineNumber: 371,
                                                                                        columnNumber: 29
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "text-sm text-muted-foreground",
                                                                                        children: new Date(event.timestamp).toLocaleString()
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                                                        lineNumber: 372,
                                                                                        columnNumber: 29
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                                                lineNumber: 370,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-sm text-muted-foreground",
                                                                                children: event.description
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                                                lineNumber: 376,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            event.user && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-sm text-muted-foreground mt-1",
                                                                                children: [
                                                                                    "by ",
                                                                                    event.user
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                                                lineNumber: 378,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                                        lineNumber: 369,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, event.id, true, {
                                                                fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                                lineNumber: 367,
                                                                columnNumber: 23
                                                            }, this))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                    lineNumber: 364,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                lineNumber: 363,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                        lineNumber: 359,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                    lineNumber: 358,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    value: "payment",
                                    className: "space-y-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-4 border-b",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "font-semibold",
                                                    children: "Payment Information"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                    lineNumber: 392,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                lineNumber: 391,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-4 space-y-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-between",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-muted-foreground",
                                                                children: "Status"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                                lineNumber: 396,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                                variant: getPaymentStatusColor(order.paymentStatus),
                                                                children: order.paymentStatus.replace('_', ' ')
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                                lineNumber: 397,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                        lineNumber: 395,
                                                        columnNumber: 19
                                                    }, this),
                                                    order.paymentMethod && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-between",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-muted-foreground",
                                                                children: "Method"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                                lineNumber: 403,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "flex items-center gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                        className: "h-4 w-4"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                                        lineNumber: 405,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    order.paymentMethod.replace('_', ' ')
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                                lineNumber: 404,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                        lineNumber: 402,
                                                        columnNumber: 21
                                                    }, this),
                                                    order.paymentDetails && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-muted-foreground",
                                                                        children: "Transaction ID"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                                        lineNumber: 413,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-mono text-sm",
                                                                        children: order.paymentDetails.transactionId
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                                        lineNumber: 414,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                                lineNumber: 412,
                                                                columnNumber: 23
                                                            }, this),
                                                            order.paymentDetails.lastFourDigits && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-muted-foreground",
                                                                        children: "Card"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                                        lineNumber: 418,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: [
                                                                            order.paymentDetails.cardBrand,
                                                                            " •••• ",
                                                                            order.paymentDetails.lastFourDigits
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                                        lineNumber: 419,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                                lineNumber: 417,
                                                                columnNumber: 25
                                                            }, this),
                                                            order.paymentDetails.authorizationCode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-muted-foreground",
                                                                        children: "Auth Code"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                                        lineNumber: 426,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-mono text-sm",
                                                                        children: order.paymentDetails.authorizationCode
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                                        lineNumber: 427,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                                lineNumber: 425,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                lineNumber: 394,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                        lineNumber: 390,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                    lineNumber: 389,
                                    columnNumber: 13
                                }, this),
                                order.type === OrderType.DELIVERY && order.deliveryInfo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    value: "delivery",
                                    className: "space-y-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-4 border-b",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "font-semibold",
                                                    children: "Delivery Information"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                    lineNumber: 441,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                lineNumber: 440,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-4 space-y-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm text-muted-foreground mb-1",
                                                                children: "Delivery Address"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                                lineNumber: 445,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                children: order.deliveryInfo.address
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                                lineNumber: 446,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                children: [
                                                                    order.deliveryInfo.city,
                                                                    ", ",
                                                                    order.deliveryInfo.state,
                                                                    " ",
                                                                    order.deliveryInfo.zipCode
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                                lineNumber: 447,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                        lineNumber: 444,
                                                        columnNumber: 21
                                                    }, this),
                                                    order.deliveryInfo.instructions && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm text-muted-foreground mb-1",
                                                                children: "Instructions"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                                lineNumber: 451,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                children: order.deliveryInfo.instructions
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                                lineNumber: 452,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                        lineNumber: 450,
                                                        columnNumber: 23
                                                    }, this),
                                                    order.deliveryInfo.driverName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm text-muted-foreground mb-1",
                                                                children: "Driver"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                                lineNumber: 457,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                children: order.deliveryInfo.driverName
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                                lineNumber: 458,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                        lineNumber: 456,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "grid grid-cols-2 gap-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-sm text-muted-foreground mb-1",
                                                                        children: "Estimated Delivery"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                                        lineNumber: 463,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        children: order.deliveryInfo.estimatedDeliveryTime ? new Date(order.deliveryInfo.estimatedDeliveryTime).toLocaleString() : 'Not set'
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                                        lineNumber: 464,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                                lineNumber: 462,
                                                                columnNumber: 23
                                                            }, this),
                                                            order.deliveryInfo.actualDeliveryTime && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-sm text-muted-foreground mb-1",
                                                                        children: "Actual Delivery"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                                        lineNumber: 470,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        children: new Date(order.deliveryInfo.actualDeliveryTime).toLocaleString()
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                                        lineNumber: 471,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                                lineNumber: 469,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                        lineNumber: 461,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-between pt-2 border-t",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "Delivery Fee"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                                lineNumber: 476,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-medium",
                                                                children: [
                                                                    "$",
                                                                    order.deliveryInfo.deliveryFee.toFixed(2)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                                lineNumber: 477,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                        lineNumber: 475,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                lineNumber: 443,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                        lineNumber: 439,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                    lineNumber: 438,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                            lineNumber: 234,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                        lineNumber: 233,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-4 border-b",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "font-semibold",
                                            children: "Quick Actions"
                                        }, void 0, false, {
                                            fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                            lineNumber: 491,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                        lineNumber: 490,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-4 space-y-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "outline",
                                                className: "w-full justify-start",
                                                onClick: ()=>window.print(),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$printer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                        className: "h-4 w-4 mr-2"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                        lineNumber: 499,
                                                        columnNumber: 17
                                                    }, this),
                                                    "Print Order"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                lineNumber: 494,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "outline",
                                                className: "w-full justify-start",
                                                onClick: ()=>router.push(`/orders/${order.id}/edit`),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$pen$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                        className: "h-4 w-4 mr-2"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                        lineNumber: 507,
                                                        columnNumber: 17
                                                    }, this),
                                                    "Edit Order"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                lineNumber: 502,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "outline",
                                                className: "w-full justify-start",
                                                onClick: ()=>setShowNotes(!showNotes),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                        className: "h-4 w-4 mr-2"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                        lineNumber: 515,
                                                        columnNumber: 17
                                                    }, this),
                                                    "Add Note"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                lineNumber: 510,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "outline",
                                                className: "w-full justify-start",
                                                onClick: ()=>router.refresh(),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                        className: "h-4 w-4 mr-2"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                        lineNumber: 523,
                                                        columnNumber: 17
                                                    }, this),
                                                    "Refresh"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                lineNumber: 518,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                        lineNumber: 493,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                lineNumber: 489,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-4 border-b",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "font-semibold",
                                            children: "Order Information"
                                        }, void 0, false, {
                                            fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                            lineNumber: 532,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                        lineNumber: 531,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-4 space-y-3 text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-muted-foreground",
                                                        children: "Order ID"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                        lineNumber: 536,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-mono",
                                                        children: order.id
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                        lineNumber: 537,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                lineNumber: 535,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-muted-foreground",
                                                        children: "Order Number"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                        lineNumber: 540,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-medium",
                                                        children: order.orderNumber
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                        lineNumber: 541,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                lineNumber: 539,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-muted-foreground",
                                                        children: "Type"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                        lineNumber: 544,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                        variant: "outline",
                                                        children: order.type.replace('_', ' ')
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                        lineNumber: 545,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                lineNumber: 543,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-muted-foreground",
                                                        children: "Source"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                        lineNumber: 548,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: order.source
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                        lineNumber: 549,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                lineNumber: 547,
                                                columnNumber: 15
                                            }, this),
                                            order.thirdPartyProvider && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-muted-foreground",
                                                        children: "Provider"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                        lineNumber: 553,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: order.thirdPartyProvider
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                        lineNumber: 554,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                lineNumber: 552,
                                                columnNumber: 17
                                            }, this),
                                            order.posOrderId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-muted-foreground",
                                                        children: "POS ID"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                        lineNumber: 559,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-mono text-xs",
                                                        children: order.posOrderId
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                        lineNumber: 560,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                lineNumber: 558,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                        lineNumber: 534,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                lineNumber: 530,
                                columnNumber: 11
                            }, this),
                            order.assignedStaff && order.assignedStaff.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-4 border-b",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "font-semibold",
                                            children: "Assigned Staff"
                                        }, void 0, false, {
                                            fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                            lineNumber: 570,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                        lineNumber: 569,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-4 space-y-2",
                                        children: order.assignedStaff.map((staff)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                className: "h-4 w-4 text-muted-foreground"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                                lineNumber: 576,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-sm",
                                                                children: staff.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                                lineNumber: 577,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                        lineNumber: 575,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                        variant: "outline",
                                                        className: "text-xs",
                                                        children: staff.role
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                        lineNumber: 579,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, staff.id, true, {
                                                fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                                lineNumber: 574,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                        lineNumber: 572,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                lineNumber: 568,
                                columnNumber: 13
                            }, this),
                            order.notes && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-4 border-b",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "font-semibold",
                                            children: "Notes"
                                        }, void 0, false, {
                                            fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                            lineNumber: 592,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                        lineNumber: 591,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-4",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm",
                                            children: order.notes
                                        }, void 0, false, {
                                            fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                            lineNumber: 595,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                        lineNumber: 594,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                                lineNumber: 590,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                        lineNumber: 487,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
                lineNumber: 231,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/orders/[id]/order-detail-content.tsx",
        lineNumber: 149,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__7d9c4bcb._.js.map