module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/utils/index.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// utils/index.ts
// Centralized utility functions
__turbopack_context__.s([
    "buildQueryString",
    ()=>buildQueryString,
    "calculateOrderTotal",
    ()=>calculateOrderTotal,
    "calculatePercentage",
    ()=>calculatePercentage,
    "capitalize",
    ()=>capitalize,
    "cn",
    ()=>cn,
    "debounce",
    ()=>debounce,
    "deepClone",
    ()=>deepClone,
    "formatCurrency",
    ()=>formatCurrency,
    "formatDate",
    ()=>formatDate,
    "formatFileSize",
    ()=>formatFileSize,
    "formatPhoneNumber",
    ()=>formatPhoneNumber,
    "formatTime",
    ()=>formatTime,
    "generateId",
    ()=>generateId,
    "generateOrderNumber",
    ()=>generateOrderNumber,
    "getCookie",
    ()=>getCookie,
    "getInitials",
    ()=>getInitials,
    "getLoginBypassEnabled",
    ()=>getLoginBypassEnabled,
    "getTimeAgo",
    ()=>getTimeAgo,
    "groupBy",
    ()=>groupBy,
    "isBrowser",
    ()=>isBrowser,
    "isEmpty",
    ()=>isEmpty,
    "isMobile",
    ()=>isMobile,
    "isValidEmail",
    ()=>isValidEmail,
    "isValidPhone",
    ()=>isValidPhone,
    "omit",
    ()=>omit,
    "parseQueryString",
    ()=>parseQueryString,
    "pick",
    ()=>pick,
    "removeCookie",
    ()=>removeCookie,
    "retry",
    ()=>retry,
    "setCookie",
    ()=>setCookie,
    "sleep",
    ()=>sleep,
    "sortBy",
    ()=>sortBy,
    "storage",
    ()=>storage,
    "throttle",
    ()=>throttle,
    "truncate",
    ()=>truncate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-ssr] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
function formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency
    }).format(amount);
}
function formatDate(date, format = 'MM/dd/yyyy') {
    const d = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat('en-US').format(d);
}
function formatTime(date) {
    const d = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    }).format(d);
}
function formatPhoneNumber(phone) {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
}
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
function truncate(str, length = 50) {
    if (str.length <= length) return str;
    return `${str.slice(0, length)}...`;
}
function generateId() {
    return Math.random().toString(36).substr(2, 9);
}
function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = ()=>{
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
function throttle(func, limit) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(()=>inThrottle = false, limit);
        }
    };
}
function isEmpty(obj) {
    if (obj == null) return true;
    if (typeof obj === 'object') {
        return Object.keys(obj).length === 0;
    }
    if (Array.isArray(obj)) {
        return obj.length === 0;
    }
    return false;
}
function getInitials(name) {
    return name.split(' ').map((n)=>n[0]).join('').toUpperCase().slice(0, 2);
}
function calculatePercentage(value, total) {
    if (total === 0) return 0;
    return Math.round(value / total * 100);
}
function formatFileSize(bytes) {
    const sizes = [
        'Bytes',
        'KB',
        'MB',
        'GB',
        'TB'
    ];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
}
function parseQueryString(queryString) {
    const params = new URLSearchParams(queryString);
    const result = {};
    params.forEach((value, key)=>{
        result[key] = value;
    });
    return result;
}
function buildQueryString(params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value])=>{
        if (value !== null && value !== undefined) {
            searchParams.append(key, String(value));
        }
    });
    return searchParams.toString();
}
function groupBy(array, key) {
    return array.reduce((result, item)=>{
        const group = String(item[key]);
        if (!result[group]) result[group] = [];
        result[group].push(item);
        return result;
    }, {});
}
function sortBy(array, key, order = 'asc') {
    return [
        ...array
    ].sort((a, b)=>{
        const aVal = a[key];
        const bVal = b[key];
        if (aVal < bVal) return order === 'asc' ? -1 : 1;
        if (aVal > bVal) return order === 'asc' ? 1 : -1;
        return 0;
    });
}
function pick(obj, keys) {
    const result = {};
    keys.forEach((key)=>{
        if (key in obj) {
            result[key] = obj[key];
        }
    });
    return result;
}
function omit(obj, keys) {
    const result = {
        ...obj
    };
    keys.forEach((key)=>{
        delete result[key];
    });
    return result;
}
function sleep(ms) {
    return new Promise((resolve)=>setTimeout(resolve, ms));
}
async function retry(fn, maxAttempts = 3, delay = 1000) {
    let lastError;
    for(let i = 0; i < maxAttempts; i++){
        try {
            return await fn();
        } catch (error) {
            lastError = error;
            if (i < maxAttempts - 1) {
                await sleep(delay * Math.pow(2, i)); // Exponential backoff
            }
        }
    }
    throw lastError;
}
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
function isValidPhone(phone) {
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return re.test(phone);
}
function generateOrderNumber() {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substr(2, 4).toUpperCase();
    return `ORD-${timestamp}-${random}`;
}
function calculateOrderTotal(subtotal, taxRate, gratuityRate, discount = 0) {
    const discountedSubtotal = subtotal - discount;
    const tax = discountedSubtotal * (taxRate / 100);
    const gratuity = discountedSubtotal * (gratuityRate / 100);
    const total = discountedSubtotal + tax + gratuity;
    return {
        tax: Math.round(tax * 100) / 100,
        gratuity: Math.round(gratuity * 100) / 100,
        total: Math.round(total * 100) / 100
    };
}
function getTimeAgo(date) {
    const d = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const seconds = Math.floor((now.getTime() - d.getTime()) / 1000);
    if (seconds < 60) return `${seconds} seconds ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
    return formatDate(d);
}
const isBrowser = "undefined" !== 'undefined';
function isMobile() {
    if ("TURBOPACK compile-time truthy", 1) return false;
    //TURBOPACK unreachable
    ;
}
function getCookie(name) {
    if ("TURBOPACK compile-time truthy", 1) return null;
    //TURBOPACK unreachable
    ;
    const value = undefined;
    const parts = undefined;
}
function setCookie(name, value, days = 7) {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
    const expires = undefined;
}
function removeCookie(name) {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
}
const storage = {
    get: (key)=>{
        if ("TURBOPACK compile-time truthy", 1) return null;
        //TURBOPACK unreachable
        ;
    },
    set: (key, value)=>{
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
    },
    remove: (key)=>{
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
    },
    clear: ()=>{
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
    }
};
function getLoginBypassEnabled() {
    return process.env.NEXT_PUBLIC_LOGIN_BUTTON_BYPASS_AUTH === 'on' || process.env.LOGIN_BUTTON_BYPASS_AUTH === 'on';
}
}),
"[project]/components/accessibility/announcer.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Live Region Announcer Component
 * 
 * Provides live region announcements for screen readers to communicate
 * dynamic content changes and important updates.
 */ __turbopack_context__.s([
    "Announcer",
    ()=>Announcer,
    "AnnouncerProvider",
    ()=>AnnouncerProvider,
    "FormAnnouncer",
    ()=>FormAnnouncer,
    "LoadingAnnouncer",
    ()=>LoadingAnnouncer,
    "RouteChangeAnnouncer",
    ()=>RouteChangeAnnouncer,
    "default",
    ()=>__TURBOPACK__default__export__,
    "useAnnouncer",
    ()=>useAnnouncer,
    "useCommonAnnouncements",
    ()=>useCommonAnnouncements
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/index.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
const AnnouncerContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createContext(null);
const useAnnouncer = ()=>{
    const context = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useContext(AnnouncerContext);
    if (!context) {
        throw new Error('useAnnouncer must be used within an AnnouncerProvider');
    }
    return context;
};
/**
 * Individual Live Region Component
 */ const LiveRegion = ({ priority, visible, className, children })=>{
    if (priority === 'off') {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        role: priority === 'assertive' ? 'alert' : 'status',
        "aria-live": priority,
        "aria-atomic": "true",
        "aria-relevant": "additions text",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(// Screen reader only by default
        !visible && 'sr-only', // Visible styles for debugging
        visible && [
            'fixed bottom-4 right-4 z-50',
            'bg-background border rounded-lg p-4 shadow-lg',
            'max-w-sm text-sm',
            priority === 'assertive' && 'border-red-200 bg-red-50 text-red-900',
            priority === 'polite' && 'border-blue-200 bg-blue-50 text-blue-900'
        ], className),
        children: children
    }, void 0, false, {
        fileName: "[project]/components/accessibility/announcer.tsx",
        lineNumber: 82,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const Announcer = ({ priority = 'polite', visible = false, maxHistory = 50, className })=>{
    const [politeContent, setPoliteContent] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState('');
    const [assertiveContent, setAssertiveContent] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState('');
    const [history, setHistory] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState([]);
    const timeoutRefs = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useRef(new Map());
    const idCounter = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useRef(0);
    /**
   * Generate unique announcement ID
   */ const generateId = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useCallback(()=>{
        return `announcement-${++idCounter.current}-${Date.now()}`;
    }, []);
    /**
   * Add announcement to history
   */ const addToHistory = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useCallback((announcement)=>{
        setHistory((prev)=>{
            const updated = [
                announcement,
                ...prev
            ];
            return updated.slice(0, maxHistory);
        });
    }, [
        maxHistory
    ]);
    /**
   * Clear announcement after duration
   */ const clearAnnouncementAfterDelay = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useCallback((id, priority, duration)=>{
        const timeoutId = setTimeout(()=>{
            if (priority === 'assertive') {
                setAssertiveContent('');
            } else if (priority === 'polite') {
                setPoliteContent('');
            }
            timeoutRefs.current.delete(id);
        }, duration);
        timeoutRefs.current.set(id, timeoutId);
    }, []);
    /**
   * Make an announcement
   */ const announce = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useCallback((message, announcementPriority = priority, duration = 3000)=>{
        if (!message.trim() || announcementPriority === 'off') {
            return '';
        }
        const id = generateId();
        const announcement = {
            id,
            message: message.trim(),
            priority: announcementPriority,
            timestamp: Date.now(),
            duration,
            persistent: duration === 0
        };
        // Add to history
        addToHistory(announcement);
        // Clear previous content first (for better screen reader support)
        if (announcementPriority === 'assertive') {
            setAssertiveContent('');
            setTimeout(()=>setAssertiveContent(message), 50);
        } else if (announcementPriority === 'polite') {
            setPoliteContent('');
            setTimeout(()=>setPoliteContent(message), 50);
        }
        // Clear announcement after duration (if not persistent)
        if (duration > 0) {
            clearAnnouncementAfterDelay(id, announcementPriority, duration);
        }
        return id;
    }, [
        priority,
        generateId,
        addToHistory,
        clearAnnouncementAfterDelay
    ]);
    /**
   * Make an immediate announcement (no delay)
   */ const announceImmediate = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useCallback((message, announcementPriority = priority)=>{
        if (!message.trim() || announcementPriority === 'off') {
            return;
        }
        if (announcementPriority === 'assertive') {
            setAssertiveContent(message);
        } else if (announcementPriority === 'polite') {
            setPoliteContent(message);
        }
        const announcement = {
            id: generateId(),
            message: message.trim(),
            priority: announcementPriority,
            timestamp: Date.now(),
            duration: 0,
            persistent: true
        };
        addToHistory(announcement);
    }, [
        priority,
        generateId,
        addToHistory
    ]);
    /**
   * Clear all announcements
   */ const clearAnnouncements = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useCallback(()=>{
        setPoliteContent('');
        setAssertiveContent('');
        // Clear all timeouts
        timeoutRefs.current.forEach((timeout)=>clearTimeout(timeout));
        timeoutRefs.current.clear();
    }, []);
    /**
   * Get announcement history
   */ const getHistory = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useCallback(()=>{
        return [
            ...history
        ];
    }, [
        history
    ]);
    // Cleanup timeouts on unmount
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        return ()=>{
            timeoutRefs.current.forEach((timeout)=>clearTimeout(timeout));
        };
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('announcer-container', className),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LiveRegion, {
                priority: "polite",
                visible: visible,
                className: "polite-announcer",
                children: politeContent
            }, void 0, false, {
                fileName: "[project]/components/accessibility/announcer.tsx",
                lineNumber: 258,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LiveRegion, {
                priority: "assertive",
                visible: visible,
                className: "assertive-announcer",
                children: assertiveContent
            }, void 0, false, {
                fileName: "[project]/components/accessibility/announcer.tsx",
                lineNumber: 267,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                role: "status",
                "aria-live": "polite",
                "aria-atomic": "true",
                className: "sr-only",
                id: "form-status-announcer"
            }, void 0, false, {
                fileName: "[project]/components/accessibility/announcer.tsx",
                lineNumber: 276,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                role: "log",
                "aria-live": "polite",
                "aria-atomic": "false",
                className: "sr-only",
                id: "activity-log-announcer"
            }, void 0, false, {
                fileName: "[project]/components/accessibility/announcer.tsx",
                lineNumber: 285,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/accessibility/announcer.tsx",
        lineNumber: 256,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const AnnouncerProvider = ({ maxHistory = 50, debugMode = false, children })=>{
    const announcerRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useRef(null);
    const [history, setHistory] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState([]);
    const [isActive, setIsActive] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState(true);
    const contextValue = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useMemo(()=>({
            announce: (message, priority, duration)=>{
                if (!isActive || !announcerRef.current) return '';
                return announcerRef.current.announce(message, priority, duration);
            },
            announceImmediate: (message, priority)=>{
                if (!isActive || !announcerRef.current) return;
                announcerRef.current.announceImmediate(message, priority);
            },
            clearAnnouncements: ()=>{
                if (!announcerRef.current) return;
                announcerRef.current.clearAnnouncements();
            },
            getHistory: ()=>{
                if (!announcerRef.current) return [];
                return announcerRef.current.getHistory();
            },
            isActive
        }), [
        isActive
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AnnouncerContext.Provider, {
        value: contextValue,
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AnnouncerImpl, {
                ref: announcerRef,
                maxHistory: maxHistory,
                visible: debugMode,
                onHistoryChange: setHistory
            }, void 0, false, {
                fileName: "[project]/components/accessibility/announcer.tsx",
                lineNumber: 337,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/accessibility/announcer.tsx",
        lineNumber: 335,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
/**
 * Internal Announcer Implementation
 */ const AnnouncerImpl = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].forwardRef(({ maxHistory, visible, onHistoryChange }, ref)=>{
    const [politeContent, setPoliteContent] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState('');
    const [assertiveContent, setAssertiveContent] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState('');
    const [history, setHistory] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState([]);
    const timeoutRefs = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useRef(new Map());
    const idCounter = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useRef(0);
    const generateId = ()=>`announcement-${++idCounter.current}-${Date.now()}`;
    const addToHistory = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useCallback((announcement)=>{
        setHistory((prev)=>{
            const updated = [
                announcement,
                ...prev
            ].slice(0, maxHistory);
            onHistoryChange(updated);
            return updated;
        });
    }, [
        maxHistory,
        onHistoryChange
    ]);
    const announce = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useCallback((message, priority = 'polite', duration = 3000)=>{
        if (!message.trim() || priority === 'off') return '';
        const id = generateId();
        const announcement = {
            id,
            message: message.trim(),
            priority,
            timestamp: Date.now(),
            duration,
            persistent: duration === 0
        };
        addToHistory(announcement);
        if (priority === 'assertive') {
            setAssertiveContent('');
            setTimeout(()=>setAssertiveContent(message), 50);
        } else if (priority === 'polite') {
            setPoliteContent('');
            setTimeout(()=>setPoliteContent(message), 50);
        }
        if (duration > 0) {
            const timeoutId = setTimeout(()=>{
                if (priority === 'assertive') {
                    setAssertiveContent('');
                } else if (priority === 'polite') {
                    setPoliteContent('');
                }
                timeoutRefs.current.delete(id);
            }, duration);
            timeoutRefs.current.set(id, timeoutId);
        }
        return id;
    }, [
        addToHistory
    ]);
    const announceImmediate = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useCallback((message, priority = 'polite')=>{
        if (!message.trim() || priority === 'off') return;
        if (priority === 'assertive') {
            setAssertiveContent(message);
        } else if (priority === 'polite') {
            setPoliteContent(message);
        }
        const announcement = {
            id: generateId(),
            message: message.trim(),
            priority,
            timestamp: Date.now(),
            duration: 0,
            persistent: true
        };
        addToHistory(announcement);
    }, [
        addToHistory
    ]);
    const clearAnnouncements = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useCallback(()=>{
        setPoliteContent('');
        setAssertiveContent('');
        timeoutRefs.current.forEach((timeout)=>clearTimeout(timeout));
        timeoutRefs.current.clear();
    }, []);
    const getHistory = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useCallback(()=>[
            ...history
        ], [
        history
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useImperativeHandle(ref, ()=>({
            announce,
            announceImmediate,
            clearAnnouncements,
            getHistory
        }), [
        announce,
        announceImmediate,
        clearAnnouncements,
        getHistory
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        return ()=>{
            timeoutRefs.current.forEach((timeout)=>clearTimeout(timeout));
        };
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LiveRegion, {
                priority: "polite",
                visible: visible,
                children: politeContent
            }, void 0, false, {
                fileName: "[project]/components/accessibility/announcer.tsx",
                lineNumber: 466,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LiveRegion, {
                priority: "assertive",
                visible: visible,
                children: assertiveContent
            }, void 0, false, {
                fileName: "[project]/components/accessibility/announcer.tsx",
                lineNumber: 469,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                role: "status",
                "aria-live": "polite",
                "aria-atomic": "true",
                className: "sr-only"
            }, void 0, false, {
                fileName: "[project]/components/accessibility/announcer.tsx",
                lineNumber: 472,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                role: "log",
                "aria-live": "polite",
                "aria-atomic": "false",
                className: "sr-only"
            }, void 0, false, {
                fileName: "[project]/components/accessibility/announcer.tsx",
                lineNumber: 473,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true);
});
AnnouncerImpl.displayName = 'AnnouncerImpl';
const FormAnnouncer = ({ errors, success, className })=>{
    const { announce } = useAnnouncer();
    const prevErrorsRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useRef();
    // Announce form errors
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        if (!errors) return;
        const currentErrors = Object.values(errors);
        const prevErrors = Object.values(prevErrorsRef.current || {});
        if (currentErrors.length > 0 && JSON.stringify(currentErrors) !== JSON.stringify(prevErrors)) {
            const message = currentErrors.length === 1 ? `Form error: ${currentErrors[0]}` : `Form has ${currentErrors.length} errors: ${currentErrors.join(', ')}`;
            announce(message, 'assertive', 5000);
        }
        prevErrorsRef.current = errors;
    }, [
        errors,
        announce
    ]);
    // Announce success message
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        if (success) {
            announce(success, 'polite', 3000);
        }
    }, [
        success,
        announce
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        role: "status",
        "aria-live": "polite",
        "aria-atomic": "true",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('sr-only', className),
        id: "form-announcer"
    }, void 0, false, {
        fileName: "[project]/components/accessibility/announcer.tsx",
        lineNumber: 519,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const LoadingAnnouncer = ({ isLoading, loadingMessage = 'Loading', completeMessage = 'Loading complete', className })=>{
    const { announce } = useAnnouncer();
    const prevLoadingRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useRef();
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        if (isLoading !== prevLoadingRef.current) {
            if (isLoading) {
                announce(loadingMessage, 'polite', 0);
            } else if (prevLoadingRef.current) {
                announce(completeMessage, 'polite');
            }
            prevLoadingRef.current = isLoading;
        }
    }, [
        isLoading,
        loadingMessage,
        completeMessage,
        announce
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        role: "status",
        "aria-live": "polite",
        "aria-atomic": "true",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('sr-only', className),
        id: "loading-announcer"
    }, void 0, false, {
        fileName: "[project]/components/accessibility/announcer.tsx",
        lineNumber: 560,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const RouteChangeAnnouncer = ({ currentPath, pageTitle, className })=>{
    const { announce } = useAnnouncer();
    const prevPathRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useRef();
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        if (currentPath && currentPath !== prevPathRef.current) {
            const message = pageTitle ? `Navigated to ${pageTitle}` : `Page changed to ${currentPath}`;
            announce(message, 'assertive', 2000);
            prevPathRef.current = currentPath;
        }
    }, [
        currentPath,
        pageTitle,
        announce
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        role: "status",
        "aria-live": "assertive",
        "aria-atomic": "true",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('sr-only', className),
        id: "route-announcer"
    }, void 0, false, {
        fileName: "[project]/components/accessibility/announcer.tsx",
        lineNumber: 595,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const useCommonAnnouncements = ()=>{
    const { announce } = useAnnouncer();
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useMemo(()=>({
            announceSuccess: (message)=>announce(`Success: ${message}`, 'polite'),
            announceError: (message)=>announce(`Error: ${message}`, 'assertive'),
            announceWarning: (message)=>announce(`Warning: ${message}`, 'polite'),
            announceInfo: (message)=>announce(message, 'polite'),
            announceNavigation: (destination)=>announce(`Navigated to ${destination}`, 'assertive'),
            announceAction: (action)=>announce(action, 'polite')
        }), [
        announce
    ]);
};
const __TURBOPACK__default__export__ = AnnouncerProvider;
}),
"[project]/lib/accessibility/keyboard.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Keyboard Navigation Helpers
 * 
 * Provides comprehensive keyboard navigation utilities for WCAG 2.1 AA compliance
 * including focus management, keyboard traps, and navigation patterns.
 */ /**
 * Keyboard navigation configuration
 */ __turbopack_context__.s([
    "FocusManager",
    ()=>FocusManager,
    "FocusTrap",
    ()=>FocusTrap,
    "KeyboardNavigationManager",
    ()=>KeyboardNavigationManager,
    "KeyboardShortcutsManager",
    ()=>KeyboardShortcutsManager,
    "RovingTabindex",
    ()=>RovingTabindex
]);
class FocusManager {
    focusHistory = [];
    maxHistorySize = 10;
    /**
   * Save current focus to history
   */ saveFocus(element) {
        const activeElement = element || document.activeElement;
        if (activeElement && activeElement !== document.body) {
            this.focusHistory.unshift(activeElement);
            if (this.focusHistory.length > this.maxHistorySize) {
                this.focusHistory.pop();
            }
        }
    }
    /**
   * Restore previous focus
   */ restoreFocus() {
        const previousElement = this.focusHistory.shift();
        if (previousElement && document.contains(previousElement)) {
            previousElement.focus();
            return true;
        }
        return false;
    }
    /**
   * Clear focus history
   */ clearHistory() {
        this.focusHistory = [];
    }
    /**
   * Get focus history
   */ getHistory() {
        return [
            ...this.focusHistory
        ];
    }
    /**
   * Focus first focusable element in container
   */ focusFirst(container) {
        const firstFocusable = this.getFocusableElements(container)[0];
        if (firstFocusable) {
            firstFocusable.focus();
            return true;
        }
        return false;
    }
    /**
   * Focus last focusable element in container
   */ focusLast(container) {
        const focusableElements = this.getFocusableElements(container);
        const lastFocusable = focusableElements[focusableElements.length - 1];
        if (lastFocusable) {
            lastFocusable.focus();
            return true;
        }
        return false;
    }
    /**
   * Focus next focusable element
   */ focusNext(container, currentElement) {
        const focusableElements = this.getFocusableElements(container);
        const current = currentElement || document.activeElement;
        const currentIndex = focusableElements.indexOf(current);
        if (currentIndex >= 0 && currentIndex < focusableElements.length - 1) {
            focusableElements[currentIndex + 1].focus();
            return true;
        }
        return false;
    }
    /**
   * Focus previous focusable element
   */ focusPrevious(container, currentElement) {
        const focusableElements = this.getFocusableElements(container);
        const current = currentElement || document.activeElement;
        const currentIndex = focusableElements.indexOf(current);
        if (currentIndex > 0) {
            focusableElements[currentIndex - 1].focus();
            return true;
        }
        return false;
    }
    /**
   * Get all focusable elements within a container
   */ getFocusableElements(container) {
        const focusableSelectors = [
            'a[href]',
            'button:not([disabled])',
            'textarea:not([disabled])',
            'input:not([disabled]):not([type="hidden"])',
            'select:not([disabled])',
            '[tabindex]:not([tabindex="-1"])',
            '[contenteditable="true"]',
            'summary',
            'iframe',
            'object',
            'embed',
            'area[href]',
            'audio[controls]',
            'video[controls]',
            '[draggable="true"]'
        ];
        const elements = Array.from(container.querySelectorAll(focusableSelectors.join(',')));
        return elements.filter((element)=>{
            // Check if element is visible and not disabled
            return this.isElementFocusable(element);
        });
    }
    /**
   * Check if an element is focusable
   */ isElementFocusable(element) {
        // Check if element is visible
        if (element.offsetWidth === 0 && element.offsetHeight === 0) {
            return false;
        }
        // Check if element or parents have display: none or visibility: hidden
        let current = element;
        while(current){
            const style = window.getComputedStyle(current);
            if (style.display === 'none' || style.visibility === 'hidden') {
                return false;
            }
            current = current.parentElement;
        }
        // Check for disabled state
        if ('disabled' in element && element.disabled) {
            return false;
        }
        // Check for negative tabindex (unless it's -1 which can still be programmatically focused)
        const tabindex = element.getAttribute('tabindex');
        if (tabindex && parseInt(tabindex, 10) < -1) {
            return false;
        }
        return true;
    }
}
class FocusTrap {
    container;
    firstFocusable = null;
    lastFocusable = null;
    previousActiveElement = null;
    focusManager;
    keydownHandler;
    constructor(container, focusManager){
        this.container = container;
        this.focusManager = focusManager;
        this.keydownHandler = this.handleKeydown.bind(this);
    }
    /**
   * Activate focus trap
   */ activate() {
        this.previousActiveElement = document.activeElement;
        this.updateFocusableElements();
        // Focus first element or container
        if (this.firstFocusable) {
            this.firstFocusable.focus();
        } else if (this.container.tabIndex >= 0) {
            this.container.focus();
        }
        // Add keydown listener
        document.addEventListener('keydown', this.keydownHandler, true);
        // Set aria-hidden on siblings
        this.setSiblingAriaHidden(true);
    }
    /**
   * Deactivate focus trap
   */ deactivate() {
        document.removeEventListener('keydown', this.keydownHandler, true);
        // Restore aria-hidden on siblings
        this.setSiblingAriaHidden(false);
        // Restore previous focus
        if (this.previousActiveElement && document.contains(this.previousActiveElement)) {
            this.previousActiveElement.focus();
        }
    }
    /**
   * Update focusable elements within trap
   */ updateFocusableElements() {
        const focusableElements = this.focusManager.getFocusableElements(this.container);
        this.firstFocusable = focusableElements[0] || null;
        this.lastFocusable = focusableElements[focusableElements.length - 1] || null;
    }
    /**
   * Handle keydown events for focus trap
   */ handleKeydown(event) {
        if (event.key !== 'Tab') return;
        // Update focusable elements (in case DOM changed)
        this.updateFocusableElements();
        if (!this.firstFocusable && !this.lastFocusable) {
            // No focusable elements, prevent tabbing
            event.preventDefault();
            return;
        }
        if (event.shiftKey) {
            // Shift + Tab (backward)
            if (document.activeElement === this.firstFocusable) {
                event.preventDefault();
                this.lastFocusable?.focus();
            }
        } else {
            // Tab (forward)
            if (document.activeElement === this.lastFocusable) {
                event.preventDefault();
                this.firstFocusable?.focus();
            }
        }
    }
    /**
   * Set aria-hidden on sibling elements
   */ setSiblingAriaHidden(hidden) {
        const siblings = Array.from(document.body.children);
        siblings.forEach((sibling)=>{
            if (sibling !== this.container && !this.container.contains(sibling)) {
                if (hidden) {
                    sibling.setAttribute('aria-hidden', 'true');
                    sibling.setAttribute('data-focus-trap-hidden', 'true');
                } else if (sibling.getAttribute('data-focus-trap-hidden')) {
                    sibling.removeAttribute('aria-hidden');
                    sibling.removeAttribute('data-focus-trap-hidden');
                }
            }
        });
    }
}
class RovingTabindex {
    container;
    items = [];
    currentIndex = 0;
    orientation = 'both';
    wrap = true;
    keydownHandler;
    constructor(container, options = {}){
        this.container = container;
        this.orientation = options.orientation || 'both';
        this.wrap = options.wrap !== false;
        this.keydownHandler = this.handleKeydown.bind(this);
    }
    /**
   * Initialize roving tabindex
   */ initialize(itemSelector) {
        this.updateItems(itemSelector);
        this.updateTabindices();
        this.container.addEventListener('keydown', this.keydownHandler);
        this.container.addEventListener('focusin', this.handleFocusin.bind(this));
    }
    /**
   * Update items list
   */ updateItems(itemSelector) {
        const selector = itemSelector || '[role="tab"], [role="option"], [role="gridcell"], [role="menuitem"]';
        this.items = Array.from(this.container.querySelectorAll(selector));
    }
    /**
   * Update tabindex attributes
   */ updateTabindices() {
        this.items.forEach((item, index)=>{
            item.setAttribute('tabindex', index === this.currentIndex ? '0' : '-1');
        });
    }
    /**
   * Move to specific index
   */ moveTo(index) {
        if (index >= 0 && index < this.items.length) {
            this.currentIndex = index;
            this.updateTabindices();
            this.items[index].focus();
        }
    }
    /**
   * Move to next item
   */ moveNext() {
        let nextIndex = this.currentIndex + 1;
        if (nextIndex >= this.items.length) {
            nextIndex = this.wrap ? 0 : this.items.length - 1;
        }
        this.moveTo(nextIndex);
    }
    /**
   * Move to previous item
   */ movePrevious() {
        let previousIndex = this.currentIndex - 1;
        if (previousIndex < 0) {
            previousIndex = this.wrap ? this.items.length - 1 : 0;
        }
        this.moveTo(previousIndex);
    }
    /**
   * Move to first item
   */ moveFirst() {
        this.moveTo(0);
    }
    /**
   * Move to last item
   */ moveLast() {
        this.moveTo(this.items.length - 1);
    }
    /**
   * Handle keydown events
   */ handleKeydown(event) {
        const { key } = event;
        let handled = false;
        switch(key){
            case 'ArrowRight':
                if (this.orientation === 'horizontal' || this.orientation === 'both') {
                    this.moveNext();
                    handled = true;
                }
                break;
            case 'ArrowLeft':
                if (this.orientation === 'horizontal' || this.orientation === 'both') {
                    this.movePrevious();
                    handled = true;
                }
                break;
            case 'ArrowDown':
                if (this.orientation === 'vertical' || this.orientation === 'both') {
                    this.moveNext();
                    handled = true;
                }
                break;
            case 'ArrowUp':
                if (this.orientation === 'vertical' || this.orientation === 'both') {
                    this.movePrevious();
                    handled = true;
                }
                break;
            case 'Home':
                this.moveFirst();
                handled = true;
                break;
            case 'End':
                this.moveLast();
                handled = true;
                break;
        }
        if (handled) {
            event.preventDefault();
            event.stopPropagation();
        }
    }
    /**
   * Handle focus events
   */ handleFocusin(event) {
        const target = event.target;
        const index = this.items.indexOf(target);
        if (index >= 0) {
            this.currentIndex = index;
            this.updateTabindices();
        }
    }
    /**
   * Destroy roving tabindex
   */ destroy() {
        this.container.removeEventListener('keydown', this.keydownHandler);
        this.container.removeEventListener('focusin', this.handleFocusin.bind(this));
        // Reset all tabindex values
        this.items.forEach((item)=>{
            item.removeAttribute('tabindex');
        });
    }
}
class KeyboardNavigationManager {
    focusManager;
    activeFocusTraps = new Map();
    activeRovingTabindices = new Map();
    constructor(){
        this.focusManager = new FocusManager();
    }
    /**
   * Initialize keyboard navigation
   */ initialize() {
        // Setup global keyboard shortcuts
        document.addEventListener('keydown', this.handleGlobalKeydown.bind(this));
    }
    /**
   * Create and activate focus trap
   */ trapFocus(container) {
        const existingTrap = this.activeFocusTraps.get(container);
        if (existingTrap) {
            existingTrap.deactivate();
        }
        const trap = new FocusTrap(container, this.focusManager);
        trap.activate();
        this.activeFocusTraps.set(container, trap);
        // Return cleanup function
        return ()=>{
            trap.deactivate();
            this.activeFocusTraps.delete(container);
        };
    }
    /**
   * Create roving tabindex for container
   */ createRovingTabindex(container, options) {
        const existingRoving = this.activeRovingTabindices.get(container);
        if (existingRoving) {
            existingRoving.destroy();
        }
        const roving = new RovingTabindex(container, options);
        roving.initialize(options?.itemSelector);
        this.activeRovingTabindices.set(container, roving);
        return roving;
    }
    /**
   * Save current focus
   */ saveFocus(element) {
        this.focusManager.saveFocus(element);
    }
    /**
   * Restore previous focus
   */ restoreFocus() {
        return this.focusManager.restoreFocus();
    }
    /**
   * Get focus manager
   */ getFocusManager() {
        return this.focusManager;
    }
    /**
   * Validate element for keyboard accessibility
   */ validateElement(element) {
        const issues = [];
        // Check if interactive element is keyboard accessible
        if (this.isInteractiveElement(element)) {
            if (!this.isKeyboardAccessible(element)) {
                issues.push('Interactive element is not keyboard accessible');
            }
        }
        // Check for proper focus indicators
        if (element.matches(':focus-visible') && !this.hasFocusIndicator(element)) {
            issues.push('Element lacks visible focus indicator');
        }
        return issues;
    }
    /**
   * Handle global keyboard events
   */ handleGlobalKeydown(event) {
        // Handle F6 for landmark navigation
        if (event.key === 'F6') {
            event.preventDefault();
            this.navigateLandmarks(event.shiftKey);
        }
        // Handle Alt+F6 for heading navigation
        if (event.altKey && event.key === 'F6') {
            event.preventDefault();
            this.navigateHeadings(event.shiftKey);
        }
    }
    /**
   * Navigate between landmarks
   */ navigateLandmarks(reverse = false) {
        const landmarks = document.querySelectorAll('[role="banner"], [role="navigation"], [role="main"], [role="contentinfo"], [role="complementary"], [role="search"], [role="form"], [role="region"], main, nav, header, footer, aside, section[aria-label], section[aria-labelledby]');
        const landmarkArray = Array.from(landmarks);
        if (landmarkArray.length === 0) return;
        const currentIndex = landmarkArray.findIndex((landmark)=>landmark.contains(document.activeElement) || landmark === document.activeElement);
        let nextIndex;
        if (currentIndex === -1) {
            nextIndex = reverse ? landmarkArray.length - 1 : 0;
        } else {
            nextIndex = reverse ? (currentIndex - 1 + landmarkArray.length) % landmarkArray.length : (currentIndex + 1) % landmarkArray.length;
        }
        const nextLandmark = landmarkArray[nextIndex];
        if (nextLandmark.tabIndex >= 0) {
            nextLandmark.focus();
        } else {
            const firstFocusable = this.focusManager.getFocusableElements(nextLandmark)[0];
            if (firstFocusable) {
                firstFocusable.focus();
            } else {
                nextLandmark.setAttribute('tabindex', '-1');
                nextLandmark.focus();
            }
        }
    }
    /**
   * Navigate between headings
   */ navigateHeadings(reverse = false) {
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6, [role="heading"]');
        const headingArray = Array.from(headings);
        if (headingArray.length === 0) return;
        const currentIndex = headingArray.findIndex((heading)=>heading.contains(document.activeElement) || heading === document.activeElement);
        let nextIndex;
        if (currentIndex === -1) {
            nextIndex = reverse ? headingArray.length - 1 : 0;
        } else {
            nextIndex = reverse ? (currentIndex - 1 + headingArray.length) % headingArray.length : (currentIndex + 1) % headingArray.length;
        }
        const nextHeading = headingArray[nextIndex];
        nextHeading.setAttribute('tabindex', '-1');
        nextHeading.focus();
    }
    /**
   * Check if element is interactive
   */ isInteractiveElement(element) {
        const interactiveRoles = [
            'button',
            'link',
            'textbox',
            'checkbox',
            'radio',
            'combobox',
            'listbox',
            'menu',
            'menuitem',
            'tab',
            'tabpanel',
            'option',
            'gridcell',
            'slider'
        ];
        const tagName = element.tagName.toLowerCase();
        const role = element.getAttribute('role');
        return [
            'a',
            'button',
            'input',
            'select',
            'textarea'
        ].includes(tagName) || role && interactiveRoles.includes(role) || element.hasAttribute('onclick') || element.hasAttribute('onkeydown') || element.tabIndex >= 0;
    }
    /**
   * Check if element is keyboard accessible
   */ isKeyboardAccessible(element) {
        // Check if element can receive focus
        const focusableElements = this.focusManager.getFocusableElements(document.body);
        return focusableElements.includes(element);
    }
    /**
   * Check if element has visible focus indicator
   */ hasFocusIndicator(element) {
        const computedStyle = window.getComputedStyle(element);
        // Check for outline
        if (computedStyle.outline !== 'none' && computedStyle.outline !== '0px') {
            return true;
        }
        // Check for box-shadow (common for custom focus indicators)
        if (computedStyle.boxShadow !== 'none') {
            return true;
        }
        // Check for border changes
        const originalBorder = computedStyle.border;
        element.classList.add('focus-test');
        const focusStyle = window.getComputedStyle(element);
        element.classList.remove('focus-test');
        return focusStyle.border !== originalBorder;
    }
    /**
   * Cleanup all keyboard navigation
   */ destroy() {
        // Deactivate all focus traps
        this.activeFocusTraps.forEach((trap)=>trap.deactivate());
        this.activeFocusTraps.clear();
        // Destroy all roving tabindices
        this.activeRovingTabindices.forEach((roving)=>roving.destroy());
        this.activeRovingTabindices.clear();
        // Clear focus history
        this.focusManager.clearHistory();
    }
}
class KeyboardShortcutsManager {
    shortcuts = new Map();
    keydownHandler;
    constructor(){
        this.keydownHandler = this.handleKeydown.bind(this);
    }
    /**
   * Register a keyboard shortcut
   */ register(shortcut) {
        const key = this.getShortcutKey(shortcut);
        this.shortcuts.set(key, shortcut);
    }
    /**
   * Unregister a keyboard shortcut
   */ unregister(shortcut) {
        const key = this.getShortcutKey(shortcut);
        this.shortcuts.delete(key);
    }
    /**
   * Start listening for keyboard shortcuts
   */ start() {
        document.addEventListener('keydown', this.keydownHandler);
    }
    /**
   * Stop listening for keyboard shortcuts
   */ stop() {
        document.removeEventListener('keydown', this.keydownHandler);
    }
    /**
   * Get all registered shortcuts
   */ getShortcuts() {
        return Array.from(this.shortcuts.values());
    }
    /**
   * Handle keydown events
   */ handleKeydown(event) {
        const key = this.getEventKey(event);
        const shortcut = this.shortcuts.get(key);
        if (shortcut) {
            event.preventDefault();
            shortcut.action();
        }
    }
    /**
   * Generate shortcut key from shortcut object
   */ getShortcutKey(shortcut) {
        const parts = [];
        if (shortcut.ctrlKey) parts.push('Ctrl');
        if (shortcut.altKey) parts.push('Alt');
        if (shortcut.shiftKey) parts.push('Shift');
        if (shortcut.metaKey) parts.push('Meta');
        if (shortcut.key) parts.push(shortcut.key);
        return parts.join('+');
    }
    /**
   * Generate key from keyboard event
   */ getEventKey(event) {
        const parts = [];
        if (event.ctrlKey) parts.push('Ctrl');
        if (event.altKey) parts.push('Alt');
        if (event.shiftKey) parts.push('Shift');
        if (event.metaKey) parts.push('Meta');
        parts.push(event.key);
        return parts.join('+');
    }
}
}),
"[project]/components/accessibility/focus-trap.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Focus Trap Component
 * 
 * Provides focus trapping for modals, dialogs, and other overlay components
 * to ensure WCAG 2.1 AA compliance and proper keyboard navigation.
 */ __turbopack_context__.s([
    "DrawerFocusTrap",
    ()=>DrawerFocusTrap,
    "FocusGuard",
    ()=>FocusGuard,
    "FocusLock",
    ()=>FocusLock,
    "FocusTrap",
    ()=>FocusTrap,
    "ModalFocusTrap",
    ()=>ModalFocusTrap,
    "PopoverFocusTrap",
    ()=>PopoverFocusTrap,
    "default",
    ()=>__TURBOPACK__default__export__,
    "useFocusTrap",
    ()=>useFocusTrap
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$accessibility$2f$keyboard$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/accessibility/keyboard.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
const useFocusTrap = (config = {})=>{
    const containerRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useRef(null);
    const focusTrapRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useRef(null);
    const focusManagerRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useRef(new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$accessibility$2f$keyboard$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FocusManager"]());
    const previousActiveElement = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useRef(null);
    const additionalElementsRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useRef([]);
    const { autoFocus = true, restoreFocus = true, preventScroll = true, hideOthers = true, initialFocus, fallbackFocus, additionalElements } = config;
    /**
   * Activate focus trap
   */ const activate = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useCallback(()=>{
        const container = containerRef.current;
        if (!container) return false;
        try {
            // Store current active element for restoration
            previousActiveElement.current = document.activeElement;
            // Create focus trap
            focusTrapRef.current = new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$accessibility$2f$keyboard$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FocusTrap"](container, focusManagerRef.current);
            // Process additional elements
            if (additionalElements) {
                const elements = typeof additionalElements === 'string' ? Array.from(document.querySelectorAll(additionalElements)) : Array.isArray(additionalElements) ? additionalElements : [
                    additionalElements
                ];
                additionalElementsRef.current = elements;
            }
            // Activate trap
            focusTrapRef.current.activate();
            // Handle initial focus
            if (autoFocus) {
                requestAnimationFrame(()=>{
                    let targetElement = null;
                    // Try initial focus element
                    if (initialFocus) {
                        if (typeof initialFocus === 'string') {
                            targetElement = container.querySelector(initialFocus);
                        } else {
                            targetElement = initialFocus;
                        }
                    }
                    // Try fallback focus element
                    if (!targetElement && fallbackFocus) {
                        if (typeof fallbackFocus === 'string') {
                            targetElement = container.querySelector(fallbackFocus);
                        } else {
                            targetElement = fallbackFocus;
                        }
                    }
                    // Use first focusable element as final fallback
                    if (!targetElement) {
                        const focusableElements = focusManagerRef.current.getFocusableElements(container);
                        targetElement = focusableElements[0] || container;
                    }
                    if (targetElement) {
                        targetElement.focus();
                    }
                });
            }
            // Handle scroll prevention
            if (preventScroll) {
                document.body.style.overflow = 'hidden';
            }
            return true;
        } catch (error) {
            console.error('Failed to activate focus trap:', error);
            return false;
        }
    }, [
        autoFocus,
        initialFocus,
        fallbackFocus,
        additionalElements,
        preventScroll
    ]);
    /**
   * Deactivate focus trap
   */ const deactivate = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useCallback(()=>{
        try {
            // Deactivate trap
            if (focusTrapRef.current) {
                focusTrapRef.current.deactivate();
                focusTrapRef.current = null;
            }
            // Restore focus
            if (restoreFocus && previousActiveElement.current) {
                if (document.contains(previousActiveElement.current)) {
                    previousActiveElement.current.focus();
                }
                previousActiveElement.current = null;
            }
            // Restore scroll
            if (preventScroll) {
                document.body.style.overflow = '';
            }
            // Clear additional elements
            additionalElementsRef.current = [];
            return true;
        } catch (error) {
            console.error('Failed to deactivate focus trap:', error);
            return false;
        }
    }, [
        restoreFocus,
        preventScroll
    ]);
    /**
   * Check if focus is within trap
   */ const isActive = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useCallback(()=>{
        return !!focusTrapRef.current;
    }, []);
    /**
   * Get focusable elements in trap
   */ const getFocusableElements = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useCallback(()=>{
        const container = containerRef.current;
        if (!container) return [];
        return focusManagerRef.current.getFocusableElements(container);
    }, []);
    return {
        containerRef,
        activate,
        deactivate,
        isActive,
        getFocusableElements
    };
};
const FocusTrap = ({ active, config = {}, className, children, onActivate, onDeactivate, onEscapeAttempt })=>{
    const { containerRef, activate, deactivate, isActive } = useFocusTrap(config);
    // Handle active state changes
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        if (active && !isActive()) {
            const success = activate();
            if (success && onActivate) {
                onActivate();
            }
        } else if (!active && isActive()) {
            const success = deactivate();
            if (success && onDeactivate) {
                onDeactivate();
            }
        }
    }, [
        active,
        activate,
        deactivate,
        isActive,
        onActivate,
        onDeactivate
    ]);
    // Handle escape key
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        if (!active) return;
        const handleKeydown = (event)=>{
            if (event.key === 'Escape') {
                event.preventDefault();
                event.stopPropagation();
                if (onEscapeAttempt) {
                    onEscapeAttempt();
                } else {
                    deactivate();
                }
            }
        };
        document.addEventListener('keydown', handleKeydown, true);
        return ()=>document.removeEventListener('keydown', handleKeydown, true);
    }, [
        active,
        onEscapeAttempt,
        deactivate
    ]);
    // Cleanup on unmount
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        return ()=>{
            if (isActive()) {
                deactivate();
            }
        };
    }, [
        deactivate,
        isActive
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: containerRef,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('focus-trap', active && 'focus-trap-active', className),
        "data-focus-trap": active ? 'true' : 'false',
        children: children
    }, void 0, false, {
        fileName: "[project]/components/accessibility/focus-trap.tsx",
        lineNumber: 274,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const ModalFocusTrap = ({ isOpen, onClose, title, description, className, children })=>{
    const titleId = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useId();
    const descriptionId = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useId();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FocusTrap, {
        active: isOpen,
        config: {
            autoFocus: true,
            restoreFocus: true,
            preventScroll: true,
            hideOthers: true,
            initialFocus: '[data-modal-close], button',
            fallbackFocus: '[tabindex="0"], button, input, select, textarea, [href]'
        },
        onEscapeAttempt: onClose,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('modal-focus-trap', className),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": title ? titleId : undefined,
            "aria-describedby": description ? descriptionId : undefined,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('fixed inset-0 z-50 flex items-center justify-center', 'bg-black/50 backdrop-blur-sm', isOpen ? 'visible opacity-100' : 'invisible opacity-0', 'transition-all duration-200'),
            onClick: (e)=>e.target === e.currentTarget && onClose(),
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('bg-background rounded-lg shadow-xl border', 'max-w-lg w-full max-h-[90vh] overflow-auto', 'mx-4 p-6', 'focus:outline-none', isOpen ? 'scale-100' : 'scale-95', 'transition-transform duration-200'),
                tabIndex: -1,
                children: [
                    title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        id: titleId,
                        className: "text-xl font-semibold mb-4",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/components/accessibility/focus-trap.tsx",
                        lineNumber: 350,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)),
                    description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        id: descriptionId,
                        className: "text-muted-foreground mb-4",
                        children: description
                    }, void 0, false, {
                        fileName: "[project]/components/accessibility/focus-trap.tsx",
                        lineNumber: 359,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)),
                    children,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        "data-modal-close": true,
                        onClick: onClose,
                        className: "absolute top-4 right-4 p-2 rounded-md hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring sr-only focus:not-sr-only",
                        "aria-label": "Close dialog",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            "aria-hidden": "true",
                            children: "×"
                        }, void 0, false, {
                            fileName: "[project]/components/accessibility/focus-trap.tsx",
                            lineNumber: 376,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/components/accessibility/focus-trap.tsx",
                        lineNumber: 370,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/accessibility/focus-trap.tsx",
                lineNumber: 338,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/components/accessibility/focus-trap.tsx",
            lineNumber: 325,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/accessibility/focus-trap.tsx",
        lineNumber: 312,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const DrawerFocusTrap = ({ isOpen, onClose, side = 'right', className, children })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FocusTrap, {
        active: isOpen,
        config: {
            autoFocus: true,
            restoreFocus: true,
            preventScroll: true,
            hideOthers: true,
            initialFocus: 'button, [href], input, select, textarea, [tabindex="0"]'
        },
        onEscapeAttempt: onClose,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('drawer-focus-trap', className),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('fixed inset-0 z-50', isOpen ? 'visible' : 'invisible'),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('absolute inset-0 bg-black/50 backdrop-blur-sm', isOpen ? 'opacity-100' : 'opacity-0', 'transition-opacity duration-300'),
                    onClick: onClose
                }, void 0, false, {
                    fileName: "[project]/components/accessibility/focus-trap.tsx",
                    lineNumber: 422,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    role: "dialog",
                    "aria-modal": "true",
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('absolute bg-background shadow-xl border', 'transition-transform duration-300', // Position based on side
                    side === 'left' && [
                        'left-0 top-0 bottom-0 w-80 max-w-[80vw]',
                        isOpen ? 'translate-x-0' : '-translate-x-full'
                    ], side === 'right' && [
                        'right-0 top-0 bottom-0 w-80 max-w-[80vw]',
                        isOpen ? 'translate-x-0' : 'translate-x-full'
                    ], side === 'top' && [
                        'top-0 left-0 right-0 h-80 max-h-[80vh]',
                        isOpen ? 'translate-y-0' : '-translate-y-full'
                    ], side === 'bottom' && [
                        'bottom-0 left-0 right-0 h-80 max-h-[80vh]',
                        isOpen ? 'translate-y-0' : 'translate-y-full'
                    ]),
                    tabIndex: -1,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-6 h-full overflow-auto",
                        children: [
                            children,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onClose,
                                className: "absolute top-4 right-4 p-2 rounded-md hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring",
                                "aria-label": "Close drawer",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    "aria-hidden": "true",
                                    children: "×"
                                }, void 0, false, {
                                    fileName: "[project]/components/accessibility/focus-trap.tsx",
                                    lineNumber: 467,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/components/accessibility/focus-trap.tsx",
                                lineNumber: 462,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/accessibility/focus-trap.tsx",
                        lineNumber: 458,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/components/accessibility/focus-trap.tsx",
                    lineNumber: 432,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/components/accessibility/focus-trap.tsx",
            lineNumber: 415,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/accessibility/focus-trap.tsx",
        lineNumber: 403,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const PopoverFocusTrap = ({ isOpen, onClose, trigger, className, children })=>{
    const popoverRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useRef(null);
    // Position popover relative to trigger
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        if (!isOpen || !trigger || !popoverRef.current) return;
        const updatePosition = ()=>{
            const triggerRect = trigger.getBoundingClientRect();
            const popoverElement = popoverRef.current;
            if (popoverElement) {
                popoverElement.style.top = `${triggerRect.bottom + 8}px`;
                popoverElement.style.left = `${triggerRect.left}px`;
            }
        };
        updatePosition();
        window.addEventListener('resize', updatePosition);
        window.addEventListener('scroll', updatePosition);
        return ()=>{
            window.removeEventListener('resize', updatePosition);
            window.removeEventListener('scroll', updatePosition);
        };
    }, [
        isOpen,
        trigger
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FocusTrap, {
        active: isOpen,
        config: {
            autoFocus: true,
            restoreFocus: true,
            preventScroll: false,
            hideOthers: false
        },
        onEscapeAttempt: onClose,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('popover-focus-trap', className),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: popoverRef,
            role: "dialog",
            "aria-modal": "false",
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('fixed z-50 bg-background rounded-md shadow-lg border p-4', 'min-w-48 max-w-sm', isOpen ? 'visible opacity-100 scale-100' : 'invisible opacity-0 scale-95', 'transition-all duration-200'),
            tabIndex: -1,
            children: children
        }, void 0, false, {
            fileName: "[project]/components/accessibility/focus-trap.tsx",
            lineNumber: 532,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/accessibility/focus-trap.tsx",
        lineNumber: 521,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const FocusGuard = ({ onFocus, className })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        tabIndex: -1,
        onFocus: onFocus,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('focus-guard sr-only', className),
        style: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: 1,
            height: 1,
            padding: 0,
            margin: 0,
            border: 0,
            clip: 'rect(0 0 0 0)'
        }
    }, void 0, false, {
        fileName: "[project]/components/accessibility/focus-trap.tsx",
        lineNumber: 560,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const FocusLock = ({ disabled = false, autoFocus = true, restoreFocus = true, className, children })=>{
    // This would use react-focus-lock if available
    // For now, we'll use our custom implementation
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FocusTrap, {
        active: !disabled,
        config: {
            autoFocus,
            restoreFocus,
            preventScroll: false,
            hideOthers: false
        },
        className: className,
        children: children
    }, void 0, false, {
        fileName: "[project]/components/accessibility/focus-trap.tsx",
        lineNumber: 600,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = FocusTrap;
}),
"[project]/components/accessibility/keyboard-shortcuts.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Keyboard Shortcuts Component
 * 
 * Provides discoverable keyboard shortcuts overlay and management
 * to enhance keyboard navigation accessibility.
 */ __turbopack_context__.s([
    "KeyboardShortcutsProvider",
    ()=>KeyboardShortcutsProvider,
    "ShortcutDisplay",
    ()=>ShortcutDisplay,
    "ShortcutsSummary",
    ()=>ShortcutsSummary,
    "default",
    ()=>__TURBOPACK__default__export__,
    "useKeyboardShortcuts",
    ()=>useKeyboardShortcuts,
    "useShortcut",
    ()=>useShortcut
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$accessibility$2f$focus$2d$trap$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/accessibility/focus-trap.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
const KeyboardShortcutsContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createContext(null);
const useKeyboardShortcuts = ()=>{
    const context = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useContext(KeyboardShortcutsContext);
    if (!context) {
        throw new Error('useKeyboardShortcuts must be used within a KeyboardShortcutsProvider');
    }
    return context;
};
/**
 * Default categories
 */ const DEFAULT_CATEGORIES = [
    {
        id: 'navigation',
        name: 'Navigation',
        priority: 1
    },
    {
        id: 'actions',
        name: 'Actions',
        priority: 2
    },
    {
        id: 'editing',
        name: 'Editing',
        priority: 3
    },
    {
        id: 'view',
        name: 'View',
        priority: 4
    },
    {
        id: 'accessibility',
        name: 'Accessibility',
        priority: 5
    }
];
/**
 * Default global shortcuts
 */ const DEFAULT_SHORTCUTS = [
    {
        id: 'skip-to-main',
        keys: [
            'Alt',
            '1'
        ],
        description: 'Skip to main content',
        category: 'navigation',
        handler: ()=>{
            const main = document.querySelector('#main-content, main, [role="main"]');
            if (main) {
                main.focus();
                main.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    },
    {
        id: 'skip-to-nav',
        keys: [
            'Alt',
            '2'
        ],
        description: 'Skip to navigation',
        category: 'navigation',
        handler: ()=>{
            const nav = document.querySelector('#main-navigation, nav, [role="navigation"]');
            if (nav) {
                nav.focus();
                nav.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    },
    {
        id: 'toggle-help',
        keys: [
            'Alt',
            '/'
        ],
        description: 'Show keyboard shortcuts help',
        category: 'accessibility',
        handler: ()=>{
        // This will be handled by the provider
        }
    },
    {
        id: 'close-modal',
        keys: [
            'Escape'
        ],
        description: 'Close modal or dialog',
        category: 'navigation',
        handler: ()=>{
            const modal = document.querySelector('[role="dialog"]:not([aria-hidden="true"])');
            if (modal) {
                const closeButton = modal.querySelector('[data-close], [aria-label*="close" i]');
                if (closeButton) {
                    closeButton.click();
                }
            }
        }
    }
];
/**
 * Utility to detect platform
 */ const getPlatform = ()=>{
    if ("TURBOPACK compile-time truthy", 1) return 'windows';
    //TURBOPACK unreachable
    ;
    const platform = undefined;
};
/**
 * Utility to normalize key combination
 */ const normalizeKeys = (keys)=>{
    const platform = getPlatform();
    const keyMap = {
        'Mod': platform === 'mac' ? 'Cmd' : 'Ctrl',
        'Command': 'Cmd',
        'Control': 'Ctrl',
        'Option': 'Alt',
        'Meta': platform === 'mac' ? 'Cmd' : 'Win'
    };
    return keys.map((key)=>keyMap[key] || key);
};
/**
 * Utility to format key combination for display
 */ const formatKeyCombo = (keys)=>{
    const normalized = normalizeKeys(keys);
    const platform = getPlatform();
    if (platform === 'mac') {
        return normalized.map((key)=>{
            const symbols = {
                'Cmd': '⌘',
                'Ctrl': '⌃',
                'Alt': '⌥',
                'Shift': '⇧',
                'Enter': '↵',
                'Space': '␣',
                'Tab': '⇥',
                'Escape': '⎋',
                'Backspace': '⌫',
                'Delete': '⌦',
                'ArrowUp': '↑',
                'ArrowDown': '↓',
                'ArrowLeft': '←',
                'ArrowRight': '→'
            };
            return symbols[key] || key;
        }).join('');
    }
    return normalized.join(' + ');
};
/**
 * Utility to check if key combination matches event
 */ const matchesKeyEvent = (keys, event)=>{
    const normalized = normalizeKeys(keys);
    const eventKeys = [];
    if (event.ctrlKey) eventKeys.push('Ctrl');
    if (event.altKey) eventKeys.push('Alt');
    if (event.shiftKey) eventKeys.push('Shift');
    if (event.metaKey) eventKeys.push(getPlatform() === 'mac' ? 'Cmd' : 'Win');
    eventKeys.push(event.key);
    return eventKeys.length === normalized.length && eventKeys.every((key)=>normalized.includes(key));
};
const KeyboardShortcutsProvider = ({ shortcuts: initialShortcuts = [], categories: initialCategories = DEFAULT_CATEGORIES, globalShortcuts = true, showHelp: showHelpProp = true, helpKey = [
    'Alt',
    '/'
], children })=>{
    const [shortcuts, setShortcuts] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState(()=>[
            ...globalShortcuts ? DEFAULT_SHORTCUTS : [],
            ...initialShortcuts
        ]);
    const [categories] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState(initialCategories);
    const [isHelpVisible, setIsHelpVisible] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState(false);
    /**
   * Register a new shortcut
   */ const registerShortcut = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useCallback((shortcut)=>{
        setShortcuts((prev)=>{
            const existing = prev.find((s)=>s.id === shortcut.id);
            if (existing) {
                console.warn(`Shortcut with id "${shortcut.id}" already exists`);
                return prev;
            }
            return [
                ...prev,
                {
                    ...shortcut,
                    enabled: shortcut.enabled !== false
                }
            ];
        });
        // Return unregister function
        return ()=>unregisterShortcut(shortcut.id);
    }, []);
    /**
   * Unregister a shortcut
   */ const unregisterShortcut = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useCallback((id)=>{
        setShortcuts((prev)=>prev.filter((s)=>s.id !== id));
    }, []);
    /**
   * Update a shortcut
   */ const updateShortcut = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useCallback((id, updates)=>{
        setShortcuts((prev)=>prev.map((shortcut)=>shortcut.id === id ? {
                    ...shortcut,
                    ...updates
                } : shortcut));
    }, []);
    /**
   * Toggle shortcut enabled state
   */ const toggleShortcut = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useCallback((id, enabled)=>{
        setShortcuts((prev)=>prev.map((shortcut)=>shortcut.id === id ? {
                    ...shortcut,
                    enabled: enabled !== undefined ? enabled : !shortcut.enabled
                } : shortcut));
    }, []);
    /**
   * Show help overlay
   */ const showHelp = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useCallback(()=>{
        setIsHelpVisible(true);
    }, []);
    /**
   * Hide help overlay
   */ const hideHelp = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useCallback(()=>{
        setIsHelpVisible(false);
    }, []);
    /**
   * Handle keyboard events
   */ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        const handleKeyDown = (event)=>{
            // Check for help shortcut first
            if (showHelpProp && matchesKeyEvent(helpKey, event)) {
                event.preventDefault();
                setIsHelpVisible((prev)=>!prev);
                return;
            }
            // Skip if help is visible (let help handle its own shortcuts)
            if (isHelpVisible) return;
            // Find matching shortcut
            const matchingShortcut = shortcuts.find((shortcut)=>shortcut.enabled !== false && matchesKeyEvent(shortcut.keys, event));
            if (matchingShortcut) {
                if (matchingShortcut.preventDefault !== false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                try {
                    matchingShortcut.handler(event);
                } catch (error) {
                    console.error(`Error executing shortcut "${matchingShortcut.id}":`, error);
                }
            }
        };
        document.addEventListener('keydown', handleKeyDown, true);
        return ()=>document.removeEventListener('keydown', handleKeyDown, true);
    }, [
        shortcuts,
        isHelpVisible,
        showHelpProp,
        helpKey
    ]);
    const contextValue = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useMemo(()=>({
            shortcuts,
            categories,
            registerShortcut,
            unregisterShortcut,
            updateShortcut,
            toggleShortcut,
            showHelp,
            hideHelp,
            isHelpVisible
        }), [
        shortcuts,
        categories,
        registerShortcut,
        unregisterShortcut,
        updateShortcut,
        toggleShortcut,
        showHelp,
        hideHelp,
        isHelpVisible
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(KeyboardShortcutsContext.Provider, {
        value: contextValue,
        children: [
            children,
            showHelpProp && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(KeyboardShortcutsHelp, {
                isVisible: isHelpVisible,
                onClose: hideHelp
            }, void 0, false, {
                fileName: "[project]/components/accessibility/keyboard-shortcuts.tsx",
                lineNumber: 384,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/accessibility/keyboard-shortcuts.tsx",
        lineNumber: 381,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
/**
 * Keyboard Shortcuts Help Component
 */ const KeyboardShortcutsHelp = ({ isVisible, onClose })=>{
    const { shortcuts, categories } = useKeyboardShortcuts();
    // Group shortcuts by category
    const groupedShortcuts = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useMemo(()=>{
        const groups = {};
        shortcuts.filter((shortcut)=>shortcut.enabled !== false).forEach((shortcut)=>{
            const categoryId = shortcut.category || 'other';
            if (!groups[categoryId]) {
                groups[categoryId] = [];
            }
            groups[categoryId].push(shortcut);
        });
        return groups;
    }, [
        shortcuts
    ]);
    // Sort categories by priority
    const sortedCategories = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useMemo(()=>{
        const categoriesWithShortcuts = categories.filter((cat)=>groupedShortcuts[cat.id] && groupedShortcuts[cat.id].length > 0);
        return categoriesWithShortcuts.sort((a, b)=>(a.priority || 999) - (b.priority || 999));
    }, [
        categories,
        groupedShortcuts
    ]);
    if (!isVisible) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$accessibility$2f$focus$2d$trap$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FocusTrap"], {
        active: isVisible,
        config: {
            autoFocus: true,
            restoreFocus: true,
            preventScroll: true,
            initialFocus: '[data-close-help]'
        },
        onEscapeAttempt: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm",
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": "shortcuts-title",
            "aria-describedby": "shortcuts-description",
            onClick: (e)=>e.target === e.currentTarget && onClose(),
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-background rounded-lg shadow-xl border max-w-2xl w-full max-h-[90vh] overflow-hidden mx-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between p-6 border-b",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        id: "shortcuts-title",
                                        className: "text-xl font-semibold",
                                        children: "Keyboard Shortcuts"
                                    }, void 0, false, {
                                        fileName: "[project]/components/accessibility/keyboard-shortcuts.tsx",
                                        lineNumber: 453,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        id: "shortcuts-description",
                                        className: "text-sm text-muted-foreground mt-1",
                                        children: "Navigate faster with these keyboard shortcuts"
                                    }, void 0, false, {
                                        fileName: "[project]/components/accessibility/keyboard-shortcuts.tsx",
                                        lineNumber: 456,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/accessibility/keyboard-shortcuts.tsx",
                                lineNumber: 452,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                "data-close-help": true,
                                onClick: onClose,
                                className: "p-2 rounded-md hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring",
                                "aria-label": "Close shortcuts help",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    "aria-hidden": "true",
                                    className: "text-xl",
                                    children: "×"
                                }, void 0, false, {
                                    fileName: "[project]/components/accessibility/keyboard-shortcuts.tsx",
                                    lineNumber: 466,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/components/accessibility/keyboard-shortcuts.tsx",
                                lineNumber: 460,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/accessibility/keyboard-shortcuts.tsx",
                        lineNumber: 451,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-6 overflow-y-auto max-h-[calc(90vh-8rem)]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-6",
                            children: [
                                sortedCategories.map((category)=>{
                                    const categoryShortcuts = groupedShortcuts[category.id];
                                    if (!categoryShortcuts?.length) return null;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-lg font-medium mb-3 text-foreground",
                                                children: category.name
                                            }, void 0, false, {
                                                fileName: "[project]/components/accessibility/keyboard-shortcuts.tsx",
                                                lineNumber: 479,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            category.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-muted-foreground mb-3",
                                                children: category.description
                                            }, void 0, false, {
                                                fileName: "[project]/components/accessibility/keyboard-shortcuts.tsx",
                                                lineNumber: 483,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-2",
                                                children: categoryShortcuts.map((shortcut)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-between py-2 px-3 rounded-md hover:bg-muted/50",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-sm text-foreground",
                                                                children: shortcut.description
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/accessibility/keyboard-shortcuts.tsx",
                                                                lineNumber: 493,
                                                                columnNumber: 27
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-1",
                                                                children: shortcut.keys.map((key, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Fragment, {
                                                                        children: [
                                                                            index > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-xs text-muted-foreground mx-1",
                                                                                children: "+"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/accessibility/keyboard-shortcuts.tsx",
                                                                                lineNumber: 500,
                                                                                columnNumber: 35
                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("kbd", {
                                                                                className: "px-2 py-1 text-xs bg-muted border border-border rounded",
                                                                                children: formatKeyCombo([
                                                                                    key
                                                                                ])
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/accessibility/keyboard-shortcuts.tsx",
                                                                                lineNumber: 504,
                                                                                columnNumber: 33
                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                        ]
                                                                    }, index, true, {
                                                                        fileName: "[project]/components/accessibility/keyboard-shortcuts.tsx",
                                                                        lineNumber: 498,
                                                                        columnNumber: 31
                                                                    }, ("TURBOPACK compile-time value", void 0)))
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/accessibility/keyboard-shortcuts.tsx",
                                                                lineNumber: 496,
                                                                columnNumber: 27
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, shortcut.id, true, {
                                                        fileName: "[project]/components/accessibility/keyboard-shortcuts.tsx",
                                                        lineNumber: 489,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0)))
                                            }, void 0, false, {
                                                fileName: "[project]/components/accessibility/keyboard-shortcuts.tsx",
                                                lineNumber: 487,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, category.id, true, {
                                        fileName: "[project]/components/accessibility/keyboard-shortcuts.tsx",
                                        lineNumber: 478,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0));
                                }),
                                groupedShortcuts.other && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-lg font-medium mb-3",
                                            children: "Other"
                                        }, void 0, false, {
                                            fileName: "[project]/components/accessibility/keyboard-shortcuts.tsx",
                                            lineNumber: 520,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: groupedShortcuts.other.map((shortcut)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between py-2 px-3 rounded-md hover:bg-muted/50",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-sm",
                                                            children: shortcut.description
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/accessibility/keyboard-shortcuts.tsx",
                                                            lineNumber: 527,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("kbd", {
                                                            className: "px-2 py-1 text-xs bg-muted border border-border rounded",
                                                            children: formatKeyCombo(shortcut.keys)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/accessibility/keyboard-shortcuts.tsx",
                                                            lineNumber: 528,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, shortcut.id, true, {
                                                    fileName: "[project]/components/accessibility/keyboard-shortcuts.tsx",
                                                    lineNumber: 523,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0)))
                                        }, void 0, false, {
                                            fileName: "[project]/components/accessibility/keyboard-shortcuts.tsx",
                                            lineNumber: 521,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/accessibility/keyboard-shortcuts.tsx",
                                    lineNumber: 519,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/accessibility/keyboard-shortcuts.tsx",
                            lineNumber: 472,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/components/accessibility/keyboard-shortcuts.tsx",
                        lineNumber: 471,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-6 border-t bg-muted/50",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between text-sm text-muted-foreground",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: [
                                        "Press ",
                                        formatKeyCombo([
                                            'Escape'
                                        ]),
                                        " to close"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/accessibility/keyboard-shortcuts.tsx",
                                    lineNumber: 542,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: [
                                        shortcuts.filter((s)=>s.enabled !== false).length,
                                        " shortcuts available"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/accessibility/keyboard-shortcuts.tsx",
                                    lineNumber: 543,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/accessibility/keyboard-shortcuts.tsx",
                            lineNumber: 541,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/components/accessibility/keyboard-shortcuts.tsx",
                        lineNumber: 540,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/accessibility/keyboard-shortcuts.tsx",
                lineNumber: 449,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/components/accessibility/keyboard-shortcuts.tsx",
            lineNumber: 441,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/accessibility/keyboard-shortcuts.tsx",
        lineNumber: 431,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const useShortcut = (keys, handler, options)=>{
    const { registerShortcut } = useKeyboardShortcuts();
    const shortcutId = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useRef();
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        const id = `shortcut-${Math.random().toString(36).substr(2, 9)}`;
        shortcutId.current = id;
        const unregister = registerShortcut({
            id,
            keys,
            handler,
            ...options
        });
        return unregister;
    }, [
        keys.join(','),
        handler,
        options.description,
        options.category,
        options.enabled,
        options.preventDefault,
        options.context,
        registerShortcut
    ]);
};
const ShortcutDisplay = ({ keys, className })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex items-center gap-1', className),
        children: keys.map((key, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Fragment, {
                children: [
                    index > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs text-muted-foreground",
                        children: "+"
                    }, void 0, false, {
                        fileName: "[project]/components/accessibility/keyboard-shortcuts.tsx",
                        lineNumber: 598,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("kbd", {
                        className: "px-1.5 py-0.5 text-xs bg-muted border border-border rounded",
                        children: formatKeyCombo([
                            key
                        ])
                    }, void 0, false, {
                        fileName: "[project]/components/accessibility/keyboard-shortcuts.tsx",
                        lineNumber: 600,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, index, true, {
                fileName: "[project]/components/accessibility/keyboard-shortcuts.tsx",
                lineNumber: 596,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)))
    }, void 0, false, {
        fileName: "[project]/components/accessibility/keyboard-shortcuts.tsx",
        lineNumber: 594,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const ShortcutsSummary = ({ categoryId, limit, className })=>{
    const { shortcuts } = useKeyboardShortcuts();
    const relevantShortcuts = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useMemo(()=>{
        let filtered = shortcuts.filter((s)=>s.enabled !== false);
        if (categoryId) {
            filtered = filtered.filter((s)=>s.category === categoryId);
        }
        if (limit) {
            filtered = filtered.slice(0, limit);
        }
        return filtered;
    }, [
        shortcuts,
        categoryId,
        limit
    ]);
    if (relevantShortcuts.length === 0) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('space-y-1', className),
        children: relevantShortcuts.map((shortcut)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between text-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-muted-foreground",
                        children: shortcut.description
                    }, void 0, false, {
                        fileName: "[project]/components/accessibility/keyboard-shortcuts.tsx",
                        lineNumber: 643,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ShortcutDisplay, {
                        keys: shortcut.keys
                    }, void 0, false, {
                        fileName: "[project]/components/accessibility/keyboard-shortcuts.tsx",
                        lineNumber: 644,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, shortcut.id, true, {
                fileName: "[project]/components/accessibility/keyboard-shortcuts.tsx",
                lineNumber: 642,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)))
    }, void 0, false, {
        fileName: "[project]/components/accessibility/keyboard-shortcuts.tsx",
        lineNumber: 640,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = KeyboardShortcutsProvider;
}),
"[project]/components/accessibility/skip-link.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Skip Link Component
 * 
 * Provides keyboard navigation skip links for WCAG 2.1 AA compliance.
 * Skip links allow keyboard users to quickly navigate to main content areas.
 */ __turbopack_context__.s([
    "DataTableSkipLinks",
    ()=>DataTableSkipLinks,
    "FormSkipLinks",
    ()=>FormSkipLinks,
    "SkipLink",
    ()=>SkipLink,
    "SkipLinks",
    ()=>SkipLinks,
    "SkipNavigation",
    ()=>SkipNavigation,
    "SkipToMain",
    ()=>SkipToMain,
    "TableOfContentsSkipLinks",
    ()=>TableOfContentsSkipLinks,
    "default",
    ()=>__TURBOPACK__default__export__,
    "useSkipLinks",
    ()=>useSkipLinks
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/index.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
/**
 * Default skip links configuration
 */ const DEFAULT_SKIP_LINKS = [
    {
        href: '#main-content',
        text: 'Skip to main content',
        title: 'Skip directly to the main content of the page'
    },
    {
        href: '#main-navigation',
        text: 'Skip to navigation',
        title: 'Skip to the main navigation menu'
    },
    {
        href: '#page-footer',
        text: 'Skip to footer',
        title: 'Skip to the page footer'
    }
];
const SkipLink = ({ href, title, className, onClick, children })=>{
    const handleClick = (event)=>{
        // Call custom click handler if provided
        if (onClick) {
            onClick(event);
        }
        // Ensure target element is focusable
        const target = document.querySelector(href);
        if (target && target instanceof HTMLElement) {
            // Add tabindex if element is not naturally focusable
            if (!target.hasAttribute('tabindex') && ![
                'A',
                'BUTTON',
                'INPUT',
                'SELECT',
                'TEXTAREA'
            ].includes(target.tagName)) {
                target.setAttribute('tabindex', '-1');
            }
            // Focus the target element
            setTimeout(()=>{
                target.focus();
                // Scroll target into view smoothly
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                    inline: 'nearest'
                });
            }, 100);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
        href: href,
        title: title,
        onClick: handleClick,
        suppressHydrationWarning: true,
        contentEditable: false,
        style: {
            cursor: 'pointer'
        },
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(// Base styles - hidden by default
        'absolute left-4 top-4 z-50', 'px-4 py-2', 'bg-primary text-primary-foreground', 'border border-primary-foreground/20', 'rounded-md shadow-lg', 'font-medium text-sm', 'transition-all duration-200', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring', // Screen reader only by default
        'sr-only', // Show on focus
        'focus:not-sr-only focus:fixed focus:left-4 focus:top-4', // Hover effects when visible
        'hover:bg-primary/90 hover:text-primary-foreground', 'hover:shadow-xl hover:scale-105', // High contrast mode support
        'contrast-more:border-2 contrast-more:border-current', className),
        children: children
    }, void 0, false, {
        fileName: "[project]/components/accessibility/skip-link.tsx",
        lineNumber: 103,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const SkipLinks = ({ links = DEFAULT_SKIP_LINKS, className, children })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        role: "navigation",
        "aria-label": "Skip links",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('skip-links-container', className),
        suppressHydrationWarning: true,
        children: [
            links.map((link, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SkipLink, {
                    href: link.href,
                    title: link.title,
                    children: link.text
                }, link.href, false, {
                    fileName: "[project]/components/accessibility/skip-link.tsx",
                    lineNumber: 161,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/components/accessibility/skip-link.tsx",
        lineNumber: 153,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const SkipToMain = ({ href = '#main-content', text = 'Skip to main content', className })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SkipLink, {
        href: href,
        title: "Skip directly to the main content of the page",
        className: className,
        children: text
    }, void 0, false, {
        fileName: "[project]/components/accessibility/skip-link.tsx",
        lineNumber: 191,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const SkipNavigation = ({ sections, className })=>{
    if (sections.length === 0) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        role: "navigation",
        "aria-label": "Skip navigation",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('skip-navigation', className),
        children: sections.map((section)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SkipLink, {
                href: `#${section.id}`,
                title: section.title || `Skip to ${section.label}`,
                children: [
                    "Skip to ",
                    section.label
                ]
            }, section.id, true, {
                fileName: "[project]/components/accessibility/skip-link.tsx",
                lineNumber: 225,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)))
    }, void 0, false, {
        fileName: "[project]/components/accessibility/skip-link.tsx",
        lineNumber: 219,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const TableOfContentsSkipLinks = ({ containerId = 'main-content', headingLevels = [
    'h2',
    'h3'
], maxItems = 5, className })=>{
    const [headings, setHeadings] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState([]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        const container = containerId ? document.getElementById(containerId) : document;
        if (!container) return;
        const selector = headingLevels.join(', ');
        const headingElements = container.querySelectorAll(selector);
        const headingData = Array.from(headingElements).slice(0, maxItems).map((heading)=>{
            const element = heading;
            let id = element.id;
            // Generate ID if not present
            if (!id) {
                const text = element.textContent || '';
                id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                // Ensure uniqueness
                let counter = 1;
                let uniqueId = id;
                while(document.getElementById(uniqueId)){
                    uniqueId = `${id}-${counter}`;
                    counter++;
                }
                element.id = uniqueId;
                id = uniqueId;
            }
            return {
                id,
                text: element.textContent || '',
                level: parseInt(element.tagName.charAt(1), 10)
            };
        });
        setHeadings(headingData);
    }, [
        containerId,
        headingLevels,
        maxItems
    ]);
    if (headings.length === 0) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        role: "navigation",
        "aria-label": "Table of contents skip links",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('toc-skip-links', className),
        children: headings.map((heading)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SkipLink, {
                href: `#${heading.id}`,
                title: `Skip to section: ${heading.text}`,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(// Indent based on heading level
                heading.level === 3 && 'ml-4', heading.level === 4 && 'ml-8', heading.level === 5 && 'ml-12', heading.level === 6 && 'ml-16'),
                children: heading.text
            }, heading.id, false, {
                fileName: "[project]/components/accessibility/skip-link.tsx",
                lineNumber: 313,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)))
    }, void 0, false, {
        fileName: "[project]/components/accessibility/skip-link.tsx",
        lineNumber: 307,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const DataTableSkipLinks = ({ tableId, sections = [
    {
        selector: 'thead',
        label: 'table headers'
    },
    {
        selector: 'tbody',
        label: 'table data'
    },
    {
        selector: 'tfoot',
        label: 'table footer'
    }
], className })=>{
    const [availableSections, setAvailableSections] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState([]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        const table = document.getElementById(tableId);
        if (!table) return;
        const found = [];
        sections.forEach((section)=>{
            const element = table.querySelector(section.selector);
            if (element) {
                let id = element.id;
                if (!id) {
                    id = `${tableId}-${section.selector}`;
                    element.id = id;
                }
                found.push({
                    id,
                    label: section.label
                });
            }
        });
        setAvailableSections(found);
    }, [
        tableId,
        sections
    ]);
    if (availableSections.length === 0) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        role: "navigation",
        "aria-label": "Table navigation skip links",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('table-skip-links', className),
        children: availableSections.map((section)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SkipLink, {
                href: `#${section.id}`,
                title: `Skip to ${section.label}`,
                children: [
                    "Skip to ",
                    section.label
                ]
            }, section.id, true, {
                fileName: "[project]/components/accessibility/skip-link.tsx",
                lineNumber: 390,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)))
    }, void 0, false, {
        fileName: "[project]/components/accessibility/skip-link.tsx",
        lineNumber: 384,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const FormSkipLinks = ({ formId, sections = [
    {
        selector: 'fieldset',
        label: 'form sections'
    },
    {
        selector: '.form-actions, .form-buttons',
        label: 'form actions'
    }
], className })=>{
    const [formSections, setFormSections] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState([]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        const form = document.getElementById(formId);
        if (!form) return;
        const found = [];
        sections.forEach((section)=>{
            const elements = form.querySelectorAll(section.selector);
            elements.forEach((element, index)=>{
                let id = element.id;
                if (!id) {
                    id = `${formId}-${section.selector.replace(/[^a-z0-9]/gi, '-')}-${index}`;
                    element.id = id;
                }
                // Get section title from legend or heading
                const legend = element.querySelector('legend');
                const heading = element.querySelector('h2, h3, h4, h5, h6');
                const title = legend?.textContent || heading?.textContent || `${section.label} ${index + 1}`;
                found.push({
                    id,
                    label: title
                });
            });
        });
        setFormSections(found);
    }, [
        formId,
        sections
    ]);
    if (formSections.length === 0) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        role: "navigation",
        "aria-label": "Form section skip links",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('form-skip-links', className),
        children: formSections.map((section)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SkipLink, {
                href: `#${section.id}`,
                title: `Skip to ${section.label}`,
                children: section.label
            }, section.id, false, {
                fileName: "[project]/components/accessibility/skip-link.tsx",
                lineNumber: 465,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)))
    }, void 0, false, {
        fileName: "[project]/components/accessibility/skip-link.tsx",
        lineNumber: 459,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const useSkipLinks = ()=>{
    const [isSkipLinkActive, setIsSkipLinkActive] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState(false);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        const handleFocus = (event)=>{
            const target = event.target;
            if (target && target.closest('.skip-links-container')) {
                setIsSkipLinkActive(true);
            } else {
                setIsSkipLinkActive(false);
            }
        };
        document.addEventListener('focusin', handleFocus);
        return ()=>document.removeEventListener('focusin', handleFocus);
    }, []);
    const announceSkipLinkUsage = (targetId)=>{
        const target = document.querySelector(targetId);
        if (target) {
            const targetName = target.getAttribute('aria-label') || target.textContent?.slice(0, 50) || 'content area';
            // Create announcement
            const announcement = `Skipped to ${targetName}`;
            // Use live region for announcement
            const announcer = document.querySelector('[role="status"]') || document.querySelector('[aria-live="polite"]');
            if (announcer) {
                announcer.textContent = announcement;
                setTimeout(()=>{
                    announcer.textContent = '';
                }, 1000);
            }
        }
    };
    return {
        isSkipLinkActive,
        announceSkipLinkUsage
    };
};
const __TURBOPACK__default__export__ = SkipLinks;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__e1cfb20e._.js.map