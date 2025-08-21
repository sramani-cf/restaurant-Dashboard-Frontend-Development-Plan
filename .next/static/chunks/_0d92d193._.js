(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/ui/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn() {
    for(var _len = arguments.length, inputs = new Array(_len), _key = 0; _key < _len; _key++){
        inputs[_key] = arguments[_key];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';
const disabledStyles = 'disabled:pointer-events-none disabled:opacity-50';
const transitions = {
    fast: 'transition-fast',
    base: 'transition-base',
    slow: 'transition-slow'
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript)");
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
const Button = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = (param, ref)=>{
    let { className, variant = 'primary', size = 'md', asChild = false, loading = false, loadingText, disabled, children, ...props } = param;
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slot"] : 'button';
    const buttonClasses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(// Base styles
    'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium', 'ring-offset-background transition-colors', __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["focusRing"], __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["disabledStyles"], // Variant styles
    buttonVariants.variant[variant], // Size styles  
    buttonVariants.size[size], className);
    const isDisabled = disabled || loading;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        className: buttonClasses,
        ref: ref,
        disabled: isDisabled,
        ...props,
        children: [
            loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
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
_c1 = Button;
Button.displayName = 'Button';
;
var _c, _c1;
__turbopack_context__.k.register(_c, "Button$React.forwardRef");
__turbopack_context__.k.register(_c1, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/badge.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/utils.ts [app-client] (ecmascript)");
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
function Badge(param) {
    let { className, variant = 'default', size = 'md', pulse = false, children, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(// Base styles
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
_c = Badge;
function StatusBadge(param) {
    let { status, className, ...props } = param;
    const variantMap = {
        online: 'success',
        completed: 'success',
        busy: 'warning',
        pending: 'warning',
        offline: 'secondary',
        cancelled: 'error'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Badge, {
        variant: variantMap[status],
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('capitalize', className),
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
_c1 = StatusBadge;
function PriorityBadge(param) {
    let { priority, className, ...props } = param;
    const variantMap = {
        low: 'secondary',
        medium: 'default',
        high: 'warning',
        urgent: 'error'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Badge, {
        variant: variantMap[priority],
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('capitalize', className),
        pulse: priority === 'urgent',
        ...props,
        children: priority
    }, void 0, false, {
        fileName: "[project]/components/ui/badge.tsx",
        lineNumber: 97,
        columnNumber: 5
    }, this);
}
_c2 = PriorityBadge;
;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "Badge");
__turbopack_context__.k.register(_c1, "StatusBadge");
__turbopack_context__.k.register(_c2, "PriorityBadge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/alert.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Alert",
    ()=>Alert,
    "ErrorAlert",
    ()=>ErrorAlert,
    "InfoAlert",
    ()=>InfoAlert,
    "SuccessAlert",
    ()=>SuccessAlert,
    "WarningAlert",
    ()=>WarningAlert,
    "alertVariants",
    ()=>alertVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/info.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
;
const alertVariants = {
    variant: {
        default: 'bg-background text-foreground border-border',
        success: 'bg-green-50 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-200 dark:border-green-800',
        warning: 'bg-yellow-50 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-200 dark:border-yellow-800',
        error: 'bg-destructive/10 text-destructive border-destructive/20 dark:bg-destructive/10 dark:text-destructive dark:border-destructive/20',
        info: 'bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-200 dark:border-blue-800'
    }
};
const Alert = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_s((param, ref)=>{
    let { className, variant = 'default', title, dismissible = false, onDismiss, icon, children, ...props } = param;
    _s();
    const [isVisible, setIsVisible] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](true);
    const handleDismiss = ()=>{
        setIsVisible(false);
        onDismiss === null || onDismiss === void 0 ? void 0 : onDismiss();
    };
    const getDefaultIcon = ()=>{
        switch(variant){
            case 'success':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    className: "h-4 w-4"
                }, void 0, false, {
                    fileName: "[project]/components/ui/alert.tsx",
                    lineNumber: 48,
                    columnNumber: 18
                }, ("TURBOPACK compile-time value", void 0));
            case 'warning':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    className: "h-4 w-4"
                }, void 0, false, {
                    fileName: "[project]/components/ui/alert.tsx",
                    lineNumber: 50,
                    columnNumber: 18
                }, ("TURBOPACK compile-time value", void 0));
            case 'error':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    className: "h-4 w-4"
                }, void 0, false, {
                    fileName: "[project]/components/ui/alert.tsx",
                    lineNumber: 52,
                    columnNumber: 18
                }, ("TURBOPACK compile-time value", void 0));
            case 'info':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    className: "h-4 w-4"
                }, void 0, false, {
                    fileName: "[project]/components/ui/alert.tsx",
                    lineNumber: 54,
                    columnNumber: 18
                }, ("TURBOPACK compile-time value", void 0));
            default:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    className: "h-4 w-4"
                }, void 0, false, {
                    fileName: "[project]/components/ui/alert.tsx",
                    lineNumber: 56,
                    columnNumber: 18
                }, ("TURBOPACK compile-time value", void 0));
        }
    };
    const displayIcon = icon !== null ? icon || getDefaultIcon() : null;
    if (!isVisible) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        role: "alert",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('relative w-full rounded-lg border p-4 transition-all duration-300', alertVariants.variant[variant], className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex",
            children: [
                displayIcon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-shrink-0",
                    children: displayIcon
                }, void 0, false, {
                    fileName: "[project]/components/ui/alert.tsx",
                    lineNumber: 77,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex-1', displayIcon && 'ml-3'),
                    children: [
                        title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h5", {
                            className: "mb-1 font-semibold leading-none tracking-tight",
                            children: title
                        }, void 0, false, {
                            fileName: "[project]/components/ui/alert.tsx",
                            lineNumber: 83,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-sm', title && '[&_p]:leading-relaxed'),
                            children: children
                        }, void 0, false, {
                            fileName: "[project]/components/ui/alert.tsx",
                            lineNumber: 87,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/ui/alert.tsx",
                    lineNumber: 81,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)),
                dismissible && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: handleDismiss,
                    className: "ml-auto flex-shrink-0 rounded-md p-1.5 hover:bg-black/5 dark:hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                    "aria-label": "Dismiss alert",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        className: "h-4 w-4"
                    }, void 0, false, {
                        fileName: "[project]/components/ui/alert.tsx",
                        lineNumber: 97,
                        columnNumber: 15
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/components/ui/alert.tsx",
                    lineNumber: 92,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/components/ui/alert.tsx",
            lineNumber: 75,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/ui/alert.tsx",
        lineNumber: 65,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
}, "C45KFF5iQHXNkju7O/pllv86QL4="));
_c = Alert;
Alert.displayName = 'Alert';
function SuccessAlert(props) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Alert, {
        variant: "success",
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/alert.tsx",
        lineNumber: 110,
        columnNumber: 10
    }, this);
}
_c1 = SuccessAlert;
function WarningAlert(props) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Alert, {
        variant: "warning",
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/alert.tsx",
        lineNumber: 114,
        columnNumber: 10
    }, this);
}
_c2 = WarningAlert;
function ErrorAlert(props) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Alert, {
        variant: "error",
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/alert.tsx",
        lineNumber: 118,
        columnNumber: 10
    }, this);
}
_c3 = ErrorAlert;
function InfoAlert(props) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Alert, {
        variant: "info",
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/alert.tsx",
        lineNumber: 122,
        columnNumber: 10
    }, this);
}
_c4 = InfoAlert;
;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "Alert");
__turbopack_context__.k.register(_c1, "SuccessAlert");
__turbopack_context__.k.register(_c2, "WarningAlert");
__turbopack_context__.k.register(_c3, "ErrorAlert");
__turbopack_context__.k.register(_c4, "InfoAlert");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/input.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Input",
    ()=>Input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
const Input = /*#__PURE__*/ _s(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = _s((param, ref)=>{
    let { className, type, error, success, label, helperText, leftIcon, rightIcon, id, ...props } = param;
    _s();
    const generatedId = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"]();
    const inputId = id || generatedId;
    const hasError = !!error;
    const hasSuccess = success && !hasError;
    const inputClasses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(// Base styles
    'flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm', 'ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium', 'placeholder:text-muted-foreground', __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["focusRing"], 'disabled:cursor-not-allowed disabled:opacity-50', // State styles
    {
        'border-input': !hasError && !hasSuccess,
        'border-destructive text-destructive focus-visible:ring-destructive': hasError,
        'border-green-500 text-green-700 focus-visible:ring-green-500': hasSuccess,
        'pl-10': leftIcon,
        'pr-10': rightIcon || hasError || hasSuccess
    }, className);
    const getStateIcon = ()=>{
        if (hasError) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            className: "h-4 w-4 text-destructive"
        }, void 0, false, {
            fileName: "[project]/components/ui/input.tsx",
            lineNumber: 55,
            columnNumber: 28
        }, ("TURBOPACK compile-time value", void 0));
        if (hasSuccess) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            className: "h-4 w-4 text-green-500"
        }, void 0, false, {
            fileName: "[project]/components/ui/input.tsx",
            lineNumber: 56,
            columnNumber: 30
        }, ("TURBOPACK compile-time value", void 0));
        return rightIcon;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full",
        children: [
            label && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                htmlFor: inputId,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70', hasError ? 'text-destructive' : 'text-foreground'),
                children: label
            }, void 0, false, {
                fileName: "[project]/components/ui/input.tsx",
                lineNumber: 63,
                columnNumber: 11
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative",
                children: [
                    leftIcon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute left-3 top-1/2 -translate-y-1/2",
                        children: leftIcon
                    }, void 0, false, {
                        fileName: "[project]/components/ui/input.tsx",
                        lineNumber: 75,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: type,
                        className: inputClasses,
                        ref: ref,
                        id: inputId,
                        "aria-invalid": hasError ? 'true' : 'false',
                        "aria-describedby": error ? "".concat(inputId, "-error") : helperText ? "".concat(inputId, "-helper") : undefined,
                        ...props
                    }, void 0, false, {
                        fileName: "[project]/components/ui/input.tsx",
                        lineNumber: 79,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    (rightIcon || hasError || hasSuccess) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute right-3 top-1/2 -translate-y-1/2",
                        children: getStateIcon()
                    }, void 0, false, {
                        fileName: "[project]/components/ui/input.tsx",
                        lineNumber: 91,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/ui/input.tsx",
                lineNumber: 73,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                id: "".concat(inputId, "-error"),
                className: "mt-1 text-sm text-destructive",
                role: "alert",
                children: error
            }, void 0, false, {
                fileName: "[project]/components/ui/input.tsx",
                lineNumber: 97,
                columnNumber: 11
            }, ("TURBOPACK compile-time value", void 0)),
            helperText && !error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                id: "".concat(inputId, "-helper"),
                className: "mt-1 text-sm text-muted-foreground",
                children: helperText
            }, void 0, false, {
                fileName: "[project]/components/ui/input.tsx",
                lineNumber: 106,
                columnNumber: 11
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/input.tsx",
        lineNumber: 61,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
}, "P3bvVUypbBAHy0F8g4TFKgtieUM=")), "P3bvVUypbBAHy0F8g4TFKgtieUM=");
_c1 = Input;
Input.displayName = 'Input';
;
var _c, _c1;
__turbopack_context__.k.register(_c, "Input$React.forwardRef");
__turbopack_context__.k.register(_c1, "Input");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/dropdown.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ActionDropdown",
    ()=>ActionDropdown,
    "Dropdown",
    ()=>Dropdown,
    "SelectDropdown",
    ()=>SelectDropdown
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/components/menu/menu.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$transition$2f$transition$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/components/transition/transition.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
;
;
;
;
;
;
;
function Dropdown(param) {
    let { items, trigger, label, placeholder = 'Select option', align = 'start', side = 'bottom', className, menuClassName, disabled = false, loading = false } = param;
    const getAlignmentClasses = ()=>{
        const alignClasses = {
            start: 'origin-top-left left-0',
            end: 'origin-top-right right-0'
        };
        const sideClasses = {
            bottom: 'top-full mt-1',
            top: 'bottom-full mb-1'
        };
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(alignClasses[align], sideClasses[side]);
    };
    const renderTrigger = ()=>{
        if (trigger) return trigger;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
            variant: "outline",
            className: "justify-between",
            disabled: disabled || loading,
            children: [
                label || placeholder,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    className: "ml-2 h-4 w-4"
                }, void 0, false, {
                    fileName: "[project]/components/ui/dropdown.tsx",
                    lineNumber: 69,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/ui/dropdown.tsx",
            lineNumber: 63,
            columnNumber: 7
        }, this);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Menu"], {
        as: "div",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('relative inline-block text-left', className),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MenuButton"], {
                as: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"],
                children: renderTrigger()
            }, void 0, false, {
                fileName: "[project]/components/ui/dropdown.tsx",
                lineNumber: 76,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$transition$2f$transition$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Transition"], {
                enter: "transition ease-out duration-100",
                enterFrom: "transform opacity-0 scale-95",
                enterTo: "transform opacity-100 scale-100",
                leave: "transition ease-in duration-75",
                leaveFrom: "transform opacity-100 scale-100",
                leaveTo: "transform opacity-0 scale-95",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MenuItems"], {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md', getAlignmentClasses(), menuClassName),
                    children: items.map((item)=>{
                        if (item.divider) {
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "my-1 h-px bg-border"
                            }, item.key, false, {
                                fileName: "[project]/components/ui/dropdown.tsx",
                                lineNumber: 98,
                                columnNumber: 17
                            }, this);
                        }
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$menu$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MenuItem"], {
                            disabled: item.disabled,
                            children: (param)=>{
                                let { active, disabled: itemDisabled } = param;
                                const content = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors', {
                                        'bg-accent text-accent-foreground': active && !itemDisabled,
                                        'text-muted-foreground cursor-not-allowed opacity-50': itemDisabled,
                                        'text-destructive focus:text-destructive': item.danger && !itemDisabled
                                    }),
                                    onClick: item.onClick,
                                    children: [
                                        item.icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "mr-2 h-4 w-4 flex-shrink-0",
                                            children: item.icon
                                        }, void 0, false, {
                                            fileName: "[project]/components/ui/dropdown.tsx",
                                            lineNumber: 121,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "flex-1",
                                            children: item.label
                                        }, void 0, false, {
                                            fileName: "[project]/components/ui/dropdown.tsx",
                                            lineNumber: 125,
                                            columnNumber: 23
                                        }, this),
                                        item.shortcut && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "ml-auto text-xs tracking-widest opacity-60",
                                            children: item.shortcut
                                        }, void 0, false, {
                                            fileName: "[project]/components/ui/dropdown.tsx",
                                            lineNumber: 127,
                                            columnNumber: 25
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/ui/dropdown.tsx",
                                    lineNumber: 109,
                                    columnNumber: 21
                                }, this);
                                if (item.href) {
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: item.href,
                                        target: item.target,
                                        className: "block",
                                        children: content
                                    }, void 0, false, {
                                        fileName: "[project]/components/ui/dropdown.tsx",
                                        lineNumber: 136,
                                        columnNumber: 23
                                    }, this);
                                }
                                return content;
                            }
                        }, item.key, false, {
                            fileName: "[project]/components/ui/dropdown.tsx",
                            lineNumber: 106,
                            columnNumber: 15
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/components/ui/dropdown.tsx",
                    lineNumber: 88,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/ui/dropdown.tsx",
                lineNumber: 80,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/dropdown.tsx",
        lineNumber: 75,
        columnNumber: 5
    }, this);
}
_c = Dropdown;
function ActionDropdown(param) {
    let { onEdit, onDelete, onDuplicate, onView, customActions = [], disabled = false, className } = param;
    const defaultActions = [
        ...onView ? [
            {
                key: 'view',
                label: 'View',
                onClick: onView
            }
        ] : [],
        ...onEdit ? [
            {
                key: 'edit',
                label: 'Edit',
                onClick: onEdit
            }
        ] : [],
        ...onDuplicate ? [
            {
                key: 'duplicate',
                label: 'Duplicate',
                onClick: onDuplicate
            }
        ] : [],
        ...customActions,
        ...onDelete ? [
            {
                key: 'divider-1',
                label: '',
                divider: true
            },
            {
                key: 'delete',
                label: 'Delete',
                onClick: onDelete,
                danger: true
            }
        ] : []
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Dropdown, {
        items: defaultActions,
        trigger: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
            variant: "ghost",
            size: "icon",
            disabled: disabled,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "sr-only",
                    children: "Open menu"
                }, void 0, false, {
                    fileName: "[project]/components/ui/dropdown.tsx",
                    lineNumber: 210,
                    columnNumber: 11
                }, void 0),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "h-4 w-4",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d: "M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zM12 13a1 1 0 110-2 1 1 0 010 2zM12 20a1 1 0 110-2 1 1 0 010 2z"
                    }, void 0, false, {
                        fileName: "[project]/components/ui/dropdown.tsx",
                        lineNumber: 217,
                        columnNumber: 13
                    }, void 0)
                }, void 0, false, {
                    fileName: "[project]/components/ui/dropdown.tsx",
                    lineNumber: 211,
                    columnNumber: 11
                }, void 0)
            ]
        }, void 0, true, {
            fileName: "[project]/components/ui/dropdown.tsx",
            lineNumber: 209,
            columnNumber: 9
        }, void 0),
        align: "end",
        className: className
    }, void 0, false, {
        fileName: "[project]/components/ui/dropdown.tsx",
        lineNumber: 206,
        columnNumber: 5
    }, this);
}
_c1 = ActionDropdown;
function SelectDropdown(param) {
    let { options, value, onChange, placeholder = 'Select option', disabled = false, className, error = false } = param;
    const selectedOption = options.find((option)=>option.value === value);
    const items = options.map((option)=>({
            key: option.value,
            label: option.label,
            disabled: option.disabled,
            onClick: ()=>onChange === null || onChange === void 0 ? void 0 : onChange(option.value),
            icon: value === option.value ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                className: "h-4 w-4"
            }, void 0, false, {
                fileName: "[project]/components/ui/dropdown.tsx",
                lineNumber: 263,
                columnNumber: 36
            }, this) : undefined
        }));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Dropdown, {
        items: items,
        trigger: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
            variant: "outline",
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('w-full justify-between', error && 'border-destructive', className),
            disabled: disabled,
            children: [
                selectedOption ? selectedOption.label : placeholder,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    className: "ml-2 h-4 w-4 opacity-50"
                }, void 0, false, {
                    fileName: "[project]/components/ui/dropdown.tsx",
                    lineNumber: 280,
                    columnNumber: 11
                }, void 0)
            ]
        }, void 0, true, {
            fileName: "[project]/components/ui/dropdown.tsx",
            lineNumber: 270,
            columnNumber: 9
        }, void 0),
        align: "start",
        menuClassName: "w-full"
    }, void 0, false, {
        fileName: "[project]/components/ui/dropdown.tsx",
        lineNumber: 267,
        columnNumber: 5
    }, this);
}
_c2 = SelectDropdown;
;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "Dropdown");
__turbopack_context__.k.register(_c1, "ActionDropdown");
__turbopack_context__.k.register(_c2, "SelectDropdown");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/menu/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildMenuTree",
    ()=>buildMenuTree,
    "calculateDropResult",
    ()=>calculateDropResult,
    "calculateItemPrice",
    ()=>calculateItemPrice,
    "calculateModifierPrice",
    ()=>calculateModifierPrice,
    "canDropItem",
    ()=>canDropItem,
    "cn",
    ()=>cn,
    "deepClone",
    ()=>deepClone,
    "filterMenuItems",
    ()=>filterMenuItems,
    "findNodeInTree",
    ()=>findNodeInTree,
    "flattenMenuTree",
    ()=>flattenMenuTree,
    "formatPrepTime",
    ()=>formatPrepTime,
    "formatPrice",
    ()=>formatPrice,
    "formatStockStatus",
    ()=>formatStockStatus,
    "generateId",
    ()=>generateId,
    "getNodePath",
    ()=>getNodePath,
    "isGroupAvailable",
    ()=>isGroupAvailable,
    "isItemAvailable",
    ()=>isItemAvailable,
    "isMenuAvailable",
    ()=>isMenuAvailable,
    "sortMenuItems",
    ()=>sortMenuItems,
    "validateModifierSelections",
    ()=>validateModifierSelections
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn() {
    for(var _len = arguments.length, inputs = new Array(_len), _key = 0; _key < _len; _key++){
        inputs[_key] = arguments[_key];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
function calculateItemPrice(item, channel, date, location) {
    let effectivePrice = item.basePrice;
    // Find applicable pricing strategies
    const applicableStrategies = item.pricingStrategies.filter((strategy)=>isPricingStrategyApplicable(strategy, channel, date, location)).sort((a, b)=>b.priority - a.priority); // Higher priority first
    // Apply the highest priority strategy
    if (applicableStrategies.length > 0) {
        const strategy = applicableStrategies[0];
        const strategyPrice = strategy.prices.find((p)=>(!p.validFrom || new Date(p.validFrom) <= (date || new Date())) && (!p.validTo || new Date(p.validTo) >= (date || new Date())));
        if (strategyPrice) {
            effectivePrice = strategyPrice.amount;
        }
    }
    return effectivePrice;
}
function calculateModifierPrice(option, channel, date, location) {
    let effectivePrice = option.price;
    const applicableStrategies = option.pricingStrategies.filter((strategy)=>isPricingStrategyApplicable(strategy, channel, date, location)).sort((a, b)=>b.priority - a.priority);
    if (applicableStrategies.length > 0) {
        const strategy = applicableStrategies[0];
        const strategyPrice = strategy.prices.find((p)=>(!p.validFrom || new Date(p.validFrom) <= (date || new Date())) && (!p.validTo || new Date(p.validTo) >= (date || new Date())));
        if (strategyPrice) {
            effectivePrice = strategyPrice.amount;
        }
    }
    return effectivePrice;
}
function isPricingStrategyApplicable(strategy, channel, date, location) {
    const currentDate = date || new Date();
    const currentDay = currentDate.getDay();
    const currentTime = currentDate.getHours() * 60 + currentDate.getMinutes();
    switch(strategy.type){
        case 'base':
            return true;
        case 'time_based':
            var _strategy_conditions, _strategy_conditions1;
            if (((_strategy_conditions = strategy.conditions) === null || _strategy_conditions === void 0 ? void 0 : _strategy_conditions.startTime) && ((_strategy_conditions1 = strategy.conditions) === null || _strategy_conditions1 === void 0 ? void 0 : _strategy_conditions1.endTime)) {
                const startTime = parseTimeString(strategy.conditions.startTime);
                const endTime = parseTimeString(strategy.conditions.endTime);
                return currentTime >= startTime && currentTime <= endTime;
            }
            return true;
        case 'day_of_week':
            var _strategy_conditions2;
            if ((_strategy_conditions2 = strategy.conditions) === null || _strategy_conditions2 === void 0 ? void 0 : _strategy_conditions2.daysOfWeek) {
                return strategy.conditions.daysOfWeek.includes(currentDay);
            }
            return true;
        case 'location_based':
            var _strategy_conditions3;
            if (((_strategy_conditions3 = strategy.conditions) === null || _strategy_conditions3 === void 0 ? void 0 : _strategy_conditions3.locationIds) && location) {
                return strategy.conditions.locationIds.includes(location);
            }
            return true;
        case 'menu_specific':
            var _strategy_conditions4;
            if (((_strategy_conditions4 = strategy.conditions) === null || _strategy_conditions4 === void 0 ? void 0 : _strategy_conditions4.channelId) && channel) {
                return strategy.conditions.channelId === channel;
            }
            return true;
        default:
            return true;
    }
}
function parseTimeString(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
}
function isItemAvailable(item, channel, date) {
    if (!item.isActive || !item.isAvailable) {
        return false;
    }
    const currentDate = date || new Date();
    // Check channel visibility
    if (channel) {
        const channelConfig = item.channelVisibility.find((cv)=>cv.channelId === channel);
        if (channelConfig && !channelConfig.isVisible) {
            return false;
        }
        // Check time-based availability for channel
        if (channelConfig && (channelConfig.availableFrom || channelConfig.availableTo)) {
            const currentTime = formatTime(currentDate);
            if (channelConfig.availableFrom && currentTime < channelConfig.availableFrom) {
                return false;
            }
            if (channelConfig.availableTo && currentTime > channelConfig.availableTo) {
                return false;
            }
        }
        // Check day-based availability for channel
        if (channelConfig && channelConfig.daysOfWeek) {
            const currentDay = currentDate.getDay();
            if (!channelConfig.daysOfWeek.includes(currentDay)) {
                return false;
            }
        }
    }
    // Check inventory
    if (item.trackInventory && item.stockQuantity !== undefined) {
        return item.stockQuantity > 0;
    }
    return true;
}
function isGroupAvailable(group, channel, date) {
    if (!group.isActive) {
        return false;
    }
    const currentDate = date || new Date();
    // Check time-based availability
    if (group.availableFrom || group.availableTo) {
        const currentTime = formatTime(currentDate);
        if (group.availableFrom && currentTime < group.availableFrom) {
            return false;
        }
        if (group.availableTo && currentTime > group.availableTo) {
            return false;
        }
    }
    // Check day-based availability
    if (group.daysOfWeek) {
        const currentDay = currentDate.getDay();
        if (!group.daysOfWeek.includes(currentDay)) {
            return false;
        }
    }
    // Check channel visibility
    if (channel) {
        const channelConfig = group.channelVisibility.find((cv)=>cv.channelId === channel);
        if (channelConfig && !channelConfig.isVisible) {
            return false;
        }
    }
    return true;
}
function isMenuAvailable(menu, channel, date) {
    if (!menu.isActive) {
        return false;
    }
    const currentDate = date || new Date();
    // Check date range
    if (menu.validFrom && currentDate < menu.validFrom) {
        return false;
    }
    if (menu.validTo && currentDate > menu.validTo) {
        return false;
    }
    // Check time-based availability
    if (menu.availableFrom || menu.availableTo) {
        const currentTime = formatTime(currentDate);
        if (menu.availableFrom && currentTime < menu.availableFrom) {
            return false;
        }
        if (menu.availableTo && currentTime > menu.availableTo) {
            return false;
        }
    }
    // Check day-based availability
    if (menu.daysOfWeek) {
        const currentDay = currentDate.getDay();
        if (!menu.daysOfWeek.includes(currentDay)) {
            return false;
        }
    }
    // Check channel visibility
    if (channel) {
        const channelConfig = menu.channelVisibility.find((cv)=>cv.channelId === channel);
        if (channelConfig && !channelConfig.isVisible) {
            return false;
        }
    }
    return true;
}
function formatTime(date) {
    return date.toTimeString().slice(0, 5); // "HH:mm"
}
function buildMenuTree(menus) {
    return menus.map((menu)=>({
            id: menu.id,
            type: 'menu',
            name: menu.name,
            description: menu.description,
            isActive: menu.isActive,
            sortOrder: menu.sortOrder,
            children: buildGroupTree(menu.groups, menu.id),
            data: menu
        })).sort((a, b)=>a.sortOrder - b.sortOrder);
}
function buildGroupTree(groups, parentId) {
    const rootGroups = groups.filter((group)=>group.parentGroupId === parentId);
    return rootGroups.map((group)=>({
            id: group.id,
            type: 'group',
            name: group.name,
            description: group.description,
            isActive: group.isActive,
            sortOrder: group.sortOrder,
            parentId,
            children: [
                ...buildGroupTree(groups, group.id),
                ...group.items.map((item)=>({
                        id: item.id,
                        type: 'item',
                        name: item.name,
                        description: item.description,
                        isActive: item.isActive,
                        sortOrder: item.sortOrder,
                        parentId: group.id,
                        children: [],
                        data: item
                    }))
            ].sort((a, b)=>a.sortOrder - b.sortOrder),
            data: group
        })).sort((a, b)=>a.sortOrder - b.sortOrder);
}
function flattenMenuTree(nodes) {
    const result = [];
    function flatten(nodes) {
        let depth = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
        nodes.forEach((node)=>{
            result.push({
                ...node,
                children: []
            });
            if (node.children.length > 0) {
                flatten(node.children, depth + 1);
            }
        });
    }
    flatten(nodes);
    return result;
}
function findNodeInTree(nodes, id) {
    for (const node of nodes){
        if (node.id === id) {
            return node;
        }
        const found = findNodeInTree(node.children, id);
        if (found) {
            return found;
        }
    }
    return null;
}
function getNodePath(nodes, id) {
    let path = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
    for (const node of nodes){
        const currentPath = [
            ...path,
            node.name
        ];
        if (node.id === id) {
            return currentPath;
        }
        const foundPath = getNodePath(node.children, id, currentPath);
        if (foundPath) {
            return foundPath;
        }
    }
    return null;
}
function filterMenuItems(items, filters, channel, date) {
    return items.filter((item)=>{
        // Search filter
        if (filters.search) {
            var _item_description;
            const searchTerm = filters.search.toLowerCase();
            if (!item.name.toLowerCase().includes(searchTerm) && !((_item_description = item.description) === null || _item_description === void 0 ? void 0 : _item_description.toLowerCase().includes(searchTerm)) && !item.tags.some((tag)=>tag.toLowerCase().includes(searchTerm))) {
                return false;
            }
        }
        // Menu/Group filter
        if (filters.menuId && item.menuGroupId) {
        // This would need to be expanded based on how you store menu relationships
        // For now, assuming a simple check
        }
        // Active filter
        if (filters.isActive !== undefined && item.isActive !== filters.isActive) {
            return false;
        }
        // Availability filter
        if (filters.isAvailable !== undefined) {
            const available = isItemAvailable(item, channel, date);
            if (available !== filters.isAvailable) {
                return false;
            }
        }
        // Price range filter
        if (filters.priceRange) {
            const price = calculateItemPrice(item, channel, date);
            if (price < filters.priceRange[0] || price > filters.priceRange[1]) {
                return false;
            }
        }
        // Allergen filter
        if (filters.allergens && filters.allergens.length > 0) {
            const hasAllergen = filters.allergens.some((allergen)=>item.allergens.includes(allergen));
            if (hasAllergen) {
                return false;
            }
        }
        // Dietary restrictions filter
        if (filters.dietaryRestrictions && filters.dietaryRestrictions.length > 0) {
            const hasRestriction = filters.dietaryRestrictions.every((restriction)=>item.dietaryRestrictions.includes(restriction));
            if (!hasRestriction) {
                return false;
            }
        }
        // Tags filter
        if (filters.tags && filters.tags.length > 0) {
            const hasTag = filters.tags.some((tag)=>item.tags.includes(tag));
            if (!hasTag) {
                return false;
            }
        }
        return true;
    });
}
function sortMenuItems(items, field) {
    let direction = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 'asc', channel = arguments.length > 3 ? arguments[3] : void 0, date = arguments.length > 4 ? arguments[4] : void 0;
    return [
        ...items
    ].sort((a, b)=>{
        let aValue;
        let bValue;
        switch(field){
            case 'name':
                aValue = a.name.toLowerCase();
                bValue = b.name.toLowerCase();
                break;
            case 'basePrice':
                aValue = calculateItemPrice(a, channel, date);
                bValue = calculateItemPrice(b, channel, date);
                break;
            case 'sortOrder':
                aValue = a.sortOrder;
                bValue = b.sortOrder;
                break;
            case 'createdAt':
                aValue = a.createdAt.getTime();
                bValue = b.createdAt.getTime();
                break;
            case 'updatedAt':
                aValue = a.updatedAt.getTime();
                bValue = b.updatedAt.getTime();
                break;
            default:
                aValue = a[field];
                bValue = b[field];
        }
        if (aValue < bValue) {
            return direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
            return direction === 'asc' ? 1 : -1;
        }
        return 0;
    });
}
function validateModifierSelections(group, selectedOptions) {
    const errors = [];
    let isValid = true;
    const totalSelections = selectedOptions.reduce((sum, sel)=>sum + sel.quantity, 0);
    // Check minimum selections
    if (totalSelections < group.minSelections) {
        errors.push("Minimum ".concat(group.minSelections, " selection(s) required for ").concat(group.name));
        isValid = false;
    }
    // Check maximum selections
    if (group.maxSelections && totalSelections > group.maxSelections) {
        errors.push("Maximum ".concat(group.maxSelections, " selection(s) allowed for ").concat(group.name));
        isValid = false;
    }
    // Check individual option max quantities
    selectedOptions.forEach((selection)=>{
        const option = group.options.find((opt)=>opt.id === selection.optionId);
        if (option && option.maxQuantity && selection.quantity > option.maxQuantity) {
            errors.push("Maximum ".concat(option.maxQuantity, " of ").concat(option.name, " allowed"));
            isValid = false;
        }
    });
    // Check if required and no selections
    if (group.isRequired && totalSelections === 0) {
        errors.push("".concat(group.name, " is required"));
        isValid = false;
    }
    return {
        isValid,
        errors
    };
}
function canDropItem(dragItem, targetId, position, targetType) {
    // Prevent dropping on self
    if (dragItem.id === targetId) {
        return false;
    }
    // Business rules for what can be dropped where
    switch(dragItem.type){
        case 'menu':
            // Menus can only be reordered with other menus
            return targetType === 'menu' && position !== 'inside';
        case 'group':
            // Groups can be moved to menus or other groups
            if (targetType === 'menu' && position === 'inside') return true;
            if (targetType === 'group' && position !== 'inside') return true;
            return false;
        case 'item':
            // Items can be moved to groups or reordered with other items
            if (targetType === 'group' && position === 'inside') return true;
            if (targetType === 'item' && position !== 'inside') return true;
            return false;
        default:
            return false;
    }
}
function calculateDropResult(dragItem, targetId, position) {
    return {
        draggedId: dragItem.id,
        targetId,
        position,
        type: position === 'inside' ? 'move' : 'reorder'
    };
}
function formatPrice(amount) {
    let currency = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 'USD', locale = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 'en-US';
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits: 2
    }).format(amount);
}
function formatPrepTime(minutes) {
    if (minutes < 60) {
        return "".concat(minutes, "m");
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (remainingMinutes === 0) {
        return "".concat(hours, "h");
    }
    return "".concat(hours, "h ").concat(remainingMinutes, "m");
}
function formatStockStatus(quantity, threshold) {
    if (quantity === undefined) {
        return {
            status: 'in_stock',
            label: 'Not tracked',
            variant: 'default'
        };
    }
    if (quantity === 0) {
        return {
            status: 'out_of_stock',
            label: 'Out of stock',
            variant: 'destructive'
        };
    }
    if (threshold && quantity <= threshold) {
        return {
            status: 'low_stock',
            label: "Low stock (".concat(quantity, ")"),
            variant: 'warning'
        };
    }
    return {
        status: 'in_stock',
        label: "In stock (".concat(quantity, ")"),
        variant: 'default'
    };
}
function generateId() {
    return Math.random().toString(36).substr(2, 9);
}
function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj.getTime());
    if (obj instanceof Array) return obj.map((item)=>deepClone(item));
    if (typeof obj === 'object') {
        const clonedObj = {};
        for(const key in obj){
            if (obj.hasOwnProperty(key)) {
                clonedObj[key] = deepClone(obj[key]);
            }
        }
        return clonedObj;
    }
    return obj;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/menu/menu-tree-navigator.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MenuTreeNavigator",
    ()=>MenuTreeNavigator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/menu.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$folder$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/folder-open.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$folder$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/folder.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/ellipsis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye-off.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/square-pen.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grip$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/grip-vertical.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/dropdown.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$menu$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/menu/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
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
function MenuTreeNavigator(param) {
    let { data, selectedId, expandedIds = [], onSelect, onExpand, onCreate, onEdit, onDelete, onToggleVisibility, onDragStart, onDragOver, onDrop, className, searchable = true, draggable = false, showActions = true } = param;
    var _this = this;
    _s();
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [draggedNode, setDraggedNode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [dragOverNode, setDragOverNode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Filter nodes based on search term
    const filteredData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MenuTreeNavigator.useMemo[filteredData]": ()=>{
            if (!searchTerm) return data;
            const filterNodes = {
                "MenuTreeNavigator.useMemo[filteredData].filterNodes": (nodes)=>{
                    return nodes.reduce({
                        "MenuTreeNavigator.useMemo[filteredData].filterNodes": (acc, node)=>{
                            var _node_description;
                            const matchesSearch = node.name.toLowerCase().includes(searchTerm.toLowerCase()) || ((_node_description = node.description) === null || _node_description === void 0 ? void 0 : _node_description.toLowerCase().includes(searchTerm.toLowerCase()));
                            const filteredChildren = filterNodes(node.children);
                            if (matchesSearch || filteredChildren.length > 0) {
                                acc.push({
                                    ...node,
                                    children: filteredChildren
                                });
                            }
                            return acc;
                        }
                    }["MenuTreeNavigator.useMemo[filteredData].filterNodes"], []);
                }
            }["MenuTreeNavigator.useMemo[filteredData].filterNodes"];
            return filterNodes(data);
        }
    }["MenuTreeNavigator.useMemo[filteredData]"], [
        data,
        searchTerm
    ]);
    const handleExpand = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MenuTreeNavigator.useCallback[handleExpand]": (id)=>{
            const isExpanded = expandedIds.includes(id);
            onExpand === null || onExpand === void 0 ? void 0 : onExpand(id, !isExpanded);
        }
    }["MenuTreeNavigator.useCallback[handleExpand]"], [
        expandedIds,
        onExpand
    ]);
    const handleDragStart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MenuTreeNavigator.useCallback[handleDragStart]": (e, node)=>{
            if (!draggable) return;
            setDraggedNode(node);
            onDragStart === null || onDragStart === void 0 ? void 0 : onDragStart(node);
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', node.id);
        }
    }["MenuTreeNavigator.useCallback[handleDragStart]"], [
        draggable,
        onDragStart
    ]);
    const handleDragOver = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MenuTreeNavigator.useCallback[handleDragOver]": (e, node, position)=>{
            if (!draggable || !draggedNode) return;
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            setDragOverNode({
                node,
                position
            });
            onDragOver === null || onDragOver === void 0 ? void 0 : onDragOver(node, position);
        }
    }["MenuTreeNavigator.useCallback[handleDragOver]"], [
        draggable,
        draggedNode,
        onDragOver
    ]);
    const handleDrop = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MenuTreeNavigator.useCallback[handleDrop]": (e, node, position)=>{
            if (!draggable || !draggedNode) return;
            e.preventDefault();
            setDragOverNode(null);
            onDrop === null || onDrop === void 0 ? void 0 : onDrop(draggedNode, node, position);
            setDraggedNode(null);
        }
    }["MenuTreeNavigator.useCallback[handleDrop]"], [
        draggable,
        draggedNode,
        onDrop
    ]);
    const getNodeIcon = (node, isExpanded)=>{
        switch(node.type){
            case 'menu':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    className: "h-4 w-4"
                }, void 0, false, {
                    fileName: "[project]/components/menu/menu-tree-navigator.tsx",
                    lineNumber: 130,
                    columnNumber: 16
                }, this);
            case 'group':
                return isExpanded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$folder$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    className: "h-4 w-4"
                }, void 0, false, {
                    fileName: "[project]/components/menu/menu-tree-navigator.tsx",
                    lineNumber: 132,
                    columnNumber: 29
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$folder$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    className: "h-4 w-4"
                }, void 0, false, {
                    fileName: "[project]/components/menu/menu-tree-navigator.tsx",
                    lineNumber: 132,
                    columnNumber: 66
                }, this);
            case 'item':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    className: "h-4 w-4"
                }, void 0, false, {
                    fileName: "[project]/components/menu/menu-tree-navigator.tsx",
                    lineNumber: 134,
                    columnNumber: 16
                }, this);
            default:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    className: "h-4 w-4"
                }, void 0, false, {
                    fileName: "[project]/components/menu/menu-tree-navigator.tsx",
                    lineNumber: 136,
                    columnNumber: 16
                }, this);
        }
    };
    const renderNode = function(node) {
        let depth = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
        const isExpanded = expandedIds.includes(node.id);
        const isSelected = selectedId === node.id;
        const hasChildren = node.children.length > 0;
        const isDraggedOver = (dragOverNode === null || dragOverNode === void 0 ? void 0 : dragOverNode.node.id) === node.id;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$menu$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("select-none", isDraggedOver && "opacity-50"),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$menu$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center group hover:bg-gray-50 rounded px-2 py-1 cursor-pointer", isSelected && "bg-blue-50 border-r-2 border-blue-500", isDraggedOver && "bg-blue-100"),
                    style: {
                        paddingLeft: "".concat(depth * 16 + 8, "px")
                    },
                    onClick: ()=>onSelect === null || onSelect === void 0 ? void 0 : onSelect(node),
                    draggable: draggable,
                    onDragStart: (e)=>handleDragStart(e, node),
                    onDragOver: (e)=>handleDragOver(e, node, 'inside'),
                    onDrop: (e)=>handleDrop(e, node, 'inside'),
                    children: [
                        draggable && showActions && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grip$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            className: "h-3 w-3 text-gray-400 mr-1 opacity-0 group-hover:opacity-100"
                        }, void 0, false, {
                            fileName: "[project]/components/menu/menu-tree-navigator.tsx",
                            lineNumber: 163,
                            columnNumber: 13
                        }, _this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "ghost",
                            size: "sm",
                            className: "h-4 w-4 p-0 hover:bg-transparent",
                            onClick: (e)=>{
                                e.stopPropagation();
                                handleExpand(node.id);
                            },
                            disabled: !hasChildren,
                            children: hasChildren ? isExpanded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                className: "h-3 w-3"
                            }, void 0, false, {
                                fileName: "[project]/components/menu/menu-tree-navigator.tsx",
                                lineNumber: 179,
                                columnNumber: 17
                            }, _this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                className: "h-3 w-3"
                            }, void 0, false, {
                                fileName: "[project]/components/menu/menu-tree-navigator.tsx",
                                lineNumber: 181,
                                columnNumber: 17
                            }, _this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-3 w-3"
                            }, void 0, false, {
                                fileName: "[project]/components/menu/menu-tree-navigator.tsx",
                                lineNumber: 184,
                                columnNumber: 15
                            }, _this)
                        }, void 0, false, {
                            fileName: "[project]/components/menu/menu-tree-navigator.tsx",
                            lineNumber: 167,
                            columnNumber: 11
                        }, _this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center text-gray-500 mr-2",
                            children: getNodeIcon(node, isExpanded)
                        }, void 0, false, {
                            fileName: "[project]/components/menu/menu-tree-navigator.tsx",
                            lineNumber: 189,
                            columnNumber: 11
                        }, _this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 min-w-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$menu$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-sm truncate", !node.isActive && "text-gray-400 line-through"),
                                            children: node.name
                                        }, void 0, false, {
                                            fileName: "[project]/components/menu/menu-tree-navigator.tsx",
                                            lineNumber: 196,
                                            columnNumber: 15
                                        }, _this),
                                        !node.isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            className: "h-3 w-3 text-gray-400 ml-1"
                                        }, void 0, false, {
                                            fileName: "[project]/components/menu/menu-tree-navigator.tsx",
                                            lineNumber: 203,
                                            columnNumber: 17
                                        }, _this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/menu/menu-tree-navigator.tsx",
                                    lineNumber: 195,
                                    columnNumber: 13
                                }, _this),
                                node.type === 'item' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center space-x-1 mt-1",
                                    children: [
                                        node.data.basePrice && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                            variant: "secondary",
                                            className: "text-xs",
                                            children: [
                                                "$",
                                                node.data.basePrice.toFixed(2)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/menu/menu-tree-navigator.tsx",
                                            lineNumber: 211,
                                            columnNumber: 19
                                        }, _this),
                                        !node.data.isAvailable && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                            variant: "destructive",
                                            className: "text-xs",
                                            children: "Unavailable"
                                        }, void 0, false, {
                                            fileName: "[project]/components/menu/menu-tree-navigator.tsx",
                                            lineNumber: 216,
                                            columnNumber: 19
                                        }, _this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/menu/menu-tree-navigator.tsx",
                                    lineNumber: 209,
                                    columnNumber: 15
                                }, _this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/menu/menu-tree-navigator.tsx",
                            lineNumber: 194,
                            columnNumber: 11
                        }, _this),
                        showActions && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "opacity-0 group-hover:opacity-100",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dropdown"], {
                                trigger: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "ghost",
                                    size: "sm",
                                    className: "h-6 w-6 p-0",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        className: "h-3 w-3"
                                    }, void 0, false, {
                                        fileName: "[project]/components/menu/menu-tree-navigator.tsx",
                                        lineNumber: 230,
                                        columnNumber: 21
                                    }, void 0)
                                }, void 0, false, {
                                    fileName: "[project]/components/menu/menu-tree-navigator.tsx",
                                    lineNumber: 229,
                                    columnNumber: 19
                                }, void 0),
                                items: [
                                    {
                                        label: 'Edit',
                                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            className: "h-3 w-3"
                                        }, void 0, false, {
                                            fileName: "[project]/components/menu/menu-tree-navigator.tsx",
                                            lineNumber: 236,
                                            columnNumber: 27
                                        }, void 0),
                                        onClick: ()=>onEdit === null || onEdit === void 0 ? void 0 : onEdit(node)
                                    },
                                    {
                                        label: node.isActive ? 'Hide' : 'Show',
                                        icon: node.isActive ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            className: "h-3 w-3"
                                        }, void 0, false, {
                                            fileName: "[project]/components/menu/menu-tree-navigator.tsx",
                                            lineNumber: 241,
                                            columnNumber: 43
                                        }, void 0) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            className: "h-3 w-3"
                                        }, void 0, false, {
                                            fileName: "[project]/components/menu/menu-tree-navigator.tsx",
                                            lineNumber: 241,
                                            columnNumber: 76
                                        }, void 0),
                                        onClick: ()=>onToggleVisibility === null || onToggleVisibility === void 0 ? void 0 : onToggleVisibility(node)
                                    },
                                    {
                                        type: 'separator'
                                    },
                                    ...node.type !== 'item' ? [
                                        {
                                            label: "Add ".concat(node.type === 'menu' ? 'Group' : 'Item'),
                                            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                className: "h-3 w-3"
                                            }, void 0, false, {
                                                fileName: "[project]/components/menu/menu-tree-navigator.tsx",
                                                lineNumber: 248,
                                                columnNumber: 29
                                            }, void 0),
                                            onClick: ()=>onCreate === null || onCreate === void 0 ? void 0 : onCreate(node.type === 'menu' ? 'group' : 'item', node.id)
                                        }
                                    ] : [],
                                    {
                                        type: 'separator'
                                    },
                                    {
                                        label: 'Delete',
                                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            className: "h-3 w-3"
                                        }, void 0, false, {
                                            fileName: "[project]/components/menu/menu-tree-navigator.tsx",
                                            lineNumber: 255,
                                            columnNumber: 27
                                        }, void 0),
                                        onClick: ()=>onDelete === null || onDelete === void 0 ? void 0 : onDelete(node),
                                        className: 'text-red-600'
                                    }
                                ]
                            }, void 0, false, {
                                fileName: "[project]/components/menu/menu-tree-navigator.tsx",
                                lineNumber: 227,
                                columnNumber: 15
                            }, _this)
                        }, void 0, false, {
                            fileName: "[project]/components/menu/menu-tree-navigator.tsx",
                            lineNumber: 226,
                            columnNumber: 13
                        }, _this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/menu/menu-tree-navigator.tsx",
                    lineNumber: 148,
                    columnNumber: 9
                }, _this),
                draggable && draggedNode && draggedNode.id !== node.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-1 bg-blue-500 opacity-0 hover:opacity-100",
                        style: {
                            marginLeft: "".concat(depth * 16 + 8, "px")
                        },
                        onDragOver: (e)=>handleDragOver(e, node, 'before'),
                        onDrop: (e)=>handleDrop(e, node, 'before')
                    }, void 0, false, {
                        fileName: "[project]/components/menu/menu-tree-navigator.tsx",
                        lineNumber: 268,
                        columnNumber: 13
                    }, _this)
                }, void 0, false),
                isExpanded && hasChildren && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "ml-2",
                    children: node.children.map((child)=>renderNode(child, depth + 1))
                }, void 0, false, {
                    fileName: "[project]/components/menu/menu-tree-navigator.tsx",
                    lineNumber: 279,
                    columnNumber: 11
                }, _this),
                draggable && draggedNode && draggedNode.id !== node.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-1 bg-blue-500 opacity-0 hover:opacity-100",
                    style: {
                        marginLeft: "".concat(depth * 16 + 8, "px")
                    },
                    onDragOver: (e)=>handleDragOver(e, node, 'after'),
                    onDrop: (e)=>handleDrop(e, node, 'after')
                }, void 0, false, {
                    fileName: "[project]/components/menu/menu-tree-navigator.tsx",
                    lineNumber: 286,
                    columnNumber: 11
                }, _this)
            ]
        }, node.id, true, {
            fileName: "[project]/components/menu/menu-tree-navigator.tsx",
            lineNumber: 147,
            columnNumber: 7
        }, _this);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$menu$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-white border rounded-lg", className),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 border-b",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between mb-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-semibold text-lg",
                                children: "Menu Structure"
                            }, void 0, false, {
                                fileName: "[project]/components/menu/menu-tree-navigator.tsx",
                                lineNumber: 302,
                                columnNumber: 11
                            }, this),
                            showActions && onCreate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                size: "sm",
                                onClick: ()=>onCreate('menu'),
                                className: "h-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        className: "h-3 w-3 mr-1"
                                    }, void 0, false, {
                                        fileName: "[project]/components/menu/menu-tree-navigator.tsx",
                                        lineNumber: 309,
                                        columnNumber: 15
                                    }, this),
                                    "Menu"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/menu/menu-tree-navigator.tsx",
                                lineNumber: 304,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/menu/menu-tree-navigator.tsx",
                        lineNumber: 301,
                        columnNumber: 9
                    }, this),
                    searchable && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                        placeholder: "Search menus...",
                        value: searchTerm,
                        onChange: (e)=>setSearchTerm(e.target.value),
                        className: "h-8"
                    }, void 0, false, {
                        fileName: "[project]/components/menu/menu-tree-navigator.tsx",
                        lineNumber: 317,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/menu/menu-tree-navigator.tsx",
                lineNumber: 300,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-2 max-h-96 overflow-y-auto",
                children: filteredData.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center py-8 text-gray-500",
                    children: searchTerm ? 'No matching items found' : 'No menus created yet'
                }, void 0, false, {
                    fileName: "[project]/components/menu/menu-tree-navigator.tsx",
                    lineNumber: 329,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-1",
                    children: filteredData.map((node)=>renderNode(node))
                }, void 0, false, {
                    fileName: "[project]/components/menu/menu-tree-navigator.tsx",
                    lineNumber: 333,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/menu/menu-tree-navigator.tsx",
                lineNumber: 327,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/menu/menu-tree-navigator.tsx",
        lineNumber: 298,
        columnNumber: 5
    }, this);
}
_s(MenuTreeNavigator, "RDzOSXbQRp2Z/K1sp8pfGOXORo4=");
_c = MenuTreeNavigator;
var _c;
__turbopack_context__.k.register(_c, "MenuTreeNavigator");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/skeleton.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/utils.ts [app-client] (ecmascript)");
;
;
function Skeleton(param) {
    let { className, variant = 'default', width, height, lines = 1, animate = true, style, ...props } = param;
    const baseClasses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('bg-muted', animate && 'animate-pulse', {
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
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-2",
            ...props,
            children: Array.from({
                length: lines
            }, (_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(baseClasses, i === lines - 1 ? 'w-3/4' : 'w-full' // Last line is shorter
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
_c = Skeleton;
function SkeletonCard(param) {
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('space-y-3', className),
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Skeleton, {
                variant: "card",
                height: "12rem"
            }, void 0, false, {
                fileName: "[project]/components/ui/skeleton.tsx",
                lineNumber: 107,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Skeleton, {
                        height: "1.25rem"
                    }, void 0, false, {
                        fileName: "[project]/components/ui/skeleton.tsx",
                        lineNumber: 109,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Skeleton, {
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
_c1 = SkeletonCard;
function SkeletonAvatar(param) {
    let { className, size = 'md', ...props } = param;
    const sizeMap = {
        sm: '2rem',
        md: '2.5rem',
        lg: '3rem'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Skeleton, {
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
_c2 = SkeletonAvatar;
function SkeletonText(param) {
    let { lines = 3, className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Skeleton, {
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
_c3 = SkeletonText;
function SkeletonTable(param) {
    let { rows = 5, columns = 4, className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('space-y-3', className),
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex space-x-4",
                children: Array.from({
                    length: columns
                }, (_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Skeleton, {
                        height: "1.5rem",
                        className: "flex-1"
                    }, "header-".concat(i), false, {
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
            }, (_, rowIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex space-x-4",
                    children: Array.from({
                        length: columns
                    }, (_, colIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Skeleton, {
                            height: "1.25rem",
                            className: "flex-1"
                        }, "cell-".concat(rowIndex, "-").concat(colIndex), false, {
                            fileName: "[project]/components/ui/skeleton.tsx",
                            lineNumber: 171,
                            columnNumber: 13
                        }, this))
                }, "row-".concat(rowIndex), false, {
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
_c4 = SkeletonTable;
;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "Skeleton");
__turbopack_context__.k.register(_c1, "SkeletonCard");
__turbopack_context__.k.register(_c2, "SkeletonAvatar");
__turbopack_context__.k.register(_c3, "SkeletonText");
__turbopack_context__.k.register(_c4, "SkeletonTable");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/data-table.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DataTable",
    ()=>DataTable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$table$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-table/build/lib/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$table$2d$core$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/table-core/build/lib/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/skeleton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevrons$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevrons-left.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevrons$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevrons-right.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-up-down.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-up.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-down.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$funnel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/funnel.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/settings.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
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
function DataTable(param) {
    let { columns, data, loading = false, searchable = true, searchPlaceholder = 'Search...', filterable = false, exportable = false, selectable = false, pagination = true, pageSize = 10, className, onRowClick, onExport, toolbar } = param;
    var _table_getRowModel_rows;
    _s();
    const [sorting, setSorting] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]([]);
    const [columnFilters, setColumnFilters] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]([]);
    const [columnVisibility, setColumnVisibility] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]({});
    const [rowSelection, setRowSelection] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]({});
    const [globalFilter, setGlobalFilter] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]('');
    const [paginationState, setPaginationState] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]({
        pageIndex: 0,
        pageSize
    });
    const table = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$table$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useReactTable"])({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$table$2d$core$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCoreRowModel"])(),
        getPaginationRowModel: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$table$2d$core$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPaginationRowModel"])(),
        getSortedRowModel: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$table$2d$core$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSortedRowModel"])(),
        getFilteredRowModel: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$table$2d$core$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFilteredRowModel"])(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        onGlobalFilterChange: setGlobalFilter,
        onPaginationChange: setPaginationState,
        globalFilterFn: 'includesString',
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            globalFilter,
            pagination: paginationState
        }
    });
    const getSortIcon = (isSorted)=>{
        if (isSorted === 'asc') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            className: "h-4 w-4"
        }, void 0, false, {
            fileName: "[project]/components/ui/data-table.tsx",
            lineNumber: 101,
            columnNumber: 36
        }, this);
        if (isSorted === 'desc') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            className: "h-4 w-4"
        }, void 0, false, {
            fileName: "[project]/components/ui/data-table.tsx",
            lineNumber: 102,
            columnNumber: 37
        }, this);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            className: "h-4 w-4"
        }, void 0, false, {
            fileName: "[project]/components/ui/data-table.tsx",
            lineNumber: 103,
            columnNumber: 12
        }, this);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('space-y-4', className),
        children: [
            (searchable || filterable || exportable || toolbar) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center space-x-2",
                        children: [
                            searchable && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                                    }, void 0, false, {
                                        fileName: "[project]/components/ui/data-table.tsx",
                                        lineNumber: 114,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                        placeholder: searchPlaceholder,
                                        value: globalFilter,
                                        onChange: (e)=>setGlobalFilter(e.target.value),
                                        className: "pl-9 w-[250px]"
                                    }, void 0, false, {
                                        fileName: "[project]/components/ui/data-table.tsx",
                                        lineNumber: 115,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ui/data-table.tsx",
                                lineNumber: 113,
                                columnNumber: 15
                            }, this),
                            filterable && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "outline",
                                size: "sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$funnel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        className: "mr-2 h-4 w-4"
                                    }, void 0, false, {
                                        fileName: "[project]/components/ui/data-table.tsx",
                                        lineNumber: 125,
                                        columnNumber: 17
                                    }, this),
                                    "Filter"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ui/data-table.tsx",
                                lineNumber: 124,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ui/data-table.tsx",
                        lineNumber: 111,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center space-x-2",
                        children: [
                            toolbar,
                            exportable && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "outline",
                                size: "sm",
                                onClick: onExport,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        className: "mr-2 h-4 w-4"
                                    }, void 0, false, {
                                        fileName: "[project]/components/ui/data-table.tsx",
                                        lineNumber: 134,
                                        columnNumber: 17
                                    }, this),
                                    "Export"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ui/data-table.tsx",
                                lineNumber: 133,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "outline",
                                size: "sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        className: "mr-2 h-4 w-4"
                                    }, void 0, false, {
                                        fileName: "[project]/components/ui/data-table.tsx",
                                        lineNumber: 139,
                                        columnNumber: 15
                                    }, this),
                                    "Columns"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ui/data-table.tsx",
                                lineNumber: 138,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ui/data-table.tsx",
                        lineNumber: 130,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ui/data-table.tsx",
                lineNumber: 110,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-md border",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    className: "w-full",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            children: table.getHeaderGroups().map((headerGroup)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    className: "border-b",
                                    children: headerGroup.headers.map((header)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "h-12 px-4 text-left align-middle font-medium text-muted-foreground",
                                            children: header.isPlaceholder ? null : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex items-center space-x-2', header.column.getCanSort() && 'cursor-pointer select-none hover:text-foreground'),
                                                onClick: header.column.getToggleSortingHandler(),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$table$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["flexRender"])(header.column.columnDef.header, header.getContext())
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/ui/data-table.tsx",
                                                        lineNumber: 165,
                                                        columnNumber: 25
                                                    }, this),
                                                    header.column.getCanSort() && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-muted-foreground",
                                                        children: getSortIcon(header.column.getIsSorted())
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/ui/data-table.tsx",
                                                        lineNumber: 169,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/ui/data-table.tsx",
                                                lineNumber: 158,
                                                columnNumber: 23
                                            }, this)
                                        }, header.id, false, {
                                            fileName: "[project]/components/ui/data-table.tsx",
                                            lineNumber: 153,
                                            columnNumber: 19
                                        }, this))
                                }, headerGroup.id, false, {
                                    fileName: "[project]/components/ui/data-table.tsx",
                                    lineNumber: 151,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/ui/data-table.tsx",
                            lineNumber: 149,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            children: loading ? // Loading skeleton
                            Array.from({
                                length: pageSize
                            }, (_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: columns.map((_, columnIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "p-4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                                                height: "1.25rem"
                                            }, void 0, false, {
                                                fileName: "[project]/components/ui/data-table.tsx",
                                                lineNumber: 187,
                                                columnNumber: 23
                                            }, this)
                                        }, columnIndex, false, {
                                            fileName: "[project]/components/ui/data-table.tsx",
                                            lineNumber: 186,
                                            columnNumber: 21
                                        }, this))
                                }, index, false, {
                                    fileName: "[project]/components/ui/data-table.tsx",
                                    lineNumber: 184,
                                    columnNumber: 17
                                }, this)) : ((_table_getRowModel_rows = table.getRowModel().rows) === null || _table_getRowModel_rows === void 0 ? void 0 : _table_getRowModel_rows.length) ? table.getRowModel().rows.map((row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('border-b transition-colors hover:bg-muted/50', row.getIsSelected() && 'bg-muted', onRowClick && 'cursor-pointer'),
                                    onClick: ()=>onRowClick === null || onRowClick === void 0 ? void 0 : onRowClick(row.original),
                                    "data-state": row.getIsSelected() && 'selected',
                                    children: row.getVisibleCells().map((cell)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "p-4 align-middle",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$table$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["flexRender"])(cell.column.columnDef.cell, cell.getContext())
                                        }, cell.id, false, {
                                            fileName: "[project]/components/ui/data-table.tsx",
                                            lineNumber: 205,
                                            columnNumber: 21
                                        }, this))
                                }, row.id, false, {
                                    fileName: "[project]/components/ui/data-table.tsx",
                                    lineNumber: 194,
                                    columnNumber: 17
                                }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    colSpan: columns.length,
                                    className: "h-24 text-center",
                                    children: "No results."
                                }, void 0, false, {
                                    fileName: "[project]/components/ui/data-table.tsx",
                                    lineNumber: 213,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/ui/data-table.tsx",
                                lineNumber: 212,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/ui/data-table.tsx",
                            lineNumber: 180,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/ui/data-table.tsx",
                    lineNumber: 148,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/ui/data-table.tsx",
                lineNumber: 147,
                columnNumber: 7
            }, this),
            pagination && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between px-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 text-sm text-muted-foreground",
                        children: selectable && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                table.getFilteredSelectedRowModel().rows.length,
                                " of",
                                ' ',
                                table.getFilteredRowModel().rows.length,
                                " row(s) selected."
                            ]
                        }, void 0, true)
                    }, void 0, false, {
                        fileName: "[project]/components/ui/data-table.tsx",
                        lineNumber: 225,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center space-x-6 lg:space-x-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center space-x-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-medium",
                                        children: "Rows per page"
                                    }, void 0, false, {
                                        fileName: "[project]/components/ui/data-table.tsx",
                                        lineNumber: 235,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: table.getState().pagination.pageSize,
                                        onChange: (e)=>{
                                            table.setPageSize(Number(e.target.value));
                                        },
                                        className: "h-8 w-[70px] rounded border border-input bg-background px-2 text-sm",
                                        children: [
                                            10,
                                            20,
                                            30,
                                            40,
                                            50
                                        ].map((size)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: size,
                                                children: size
                                            }, size, false, {
                                                fileName: "[project]/components/ui/data-table.tsx",
                                                lineNumber: 244,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/ui/data-table.tsx",
                                        lineNumber: 236,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ui/data-table.tsx",
                                lineNumber: 234,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex w-[100px] items-center justify-center text-sm font-medium",
                                children: [
                                    "Page ",
                                    table.getState().pagination.pageIndex + 1,
                                    " of",
                                    ' ',
                                    table.getPageCount()
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ui/data-table.tsx",
                                lineNumber: 250,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center space-x-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "outline",
                                        className: "hidden h-8 w-8 p-0 lg:flex",
                                        onClick: ()=>table.setPageIndex(0),
                                        disabled: !table.getCanPreviousPage(),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "sr-only",
                                                children: "Go to first page"
                                            }, void 0, false, {
                                                fileName: "[project]/components/ui/data-table.tsx",
                                                lineNumber: 261,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevrons$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                className: "h-4 w-4"
                                            }, void 0, false, {
                                                fileName: "[project]/components/ui/data-table.tsx",
                                                lineNumber: 262,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/ui/data-table.tsx",
                                        lineNumber: 255,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "outline",
                                        className: "h-8 w-8 p-0",
                                        onClick: ()=>table.previousPage(),
                                        disabled: !table.getCanPreviousPage(),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "sr-only",
                                                children: "Go to previous page"
                                            }, void 0, false, {
                                                fileName: "[project]/components/ui/data-table.tsx",
                                                lineNumber: 270,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                className: "h-4 w-4"
                                            }, void 0, false, {
                                                fileName: "[project]/components/ui/data-table.tsx",
                                                lineNumber: 271,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/ui/data-table.tsx",
                                        lineNumber: 264,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "outline",
                                        className: "h-8 w-8 p-0",
                                        onClick: ()=>table.nextPage(),
                                        disabled: !table.getCanNextPage(),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "sr-only",
                                                children: "Go to next page"
                                            }, void 0, false, {
                                                fileName: "[project]/components/ui/data-table.tsx",
                                                lineNumber: 279,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                className: "h-4 w-4"
                                            }, void 0, false, {
                                                fileName: "[project]/components/ui/data-table.tsx",
                                                lineNumber: 280,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/ui/data-table.tsx",
                                        lineNumber: 273,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "outline",
                                        className: "hidden h-8 w-8 p-0 lg:flex",
                                        onClick: ()=>table.setPageIndex(table.getPageCount() - 1),
                                        disabled: !table.getCanNextPage(),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "sr-only",
                                                children: "Go to last page"
                                            }, void 0, false, {
                                                fileName: "[project]/components/ui/data-table.tsx",
                                                lineNumber: 288,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevrons$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                className: "h-4 w-4"
                                            }, void 0, false, {
                                                fileName: "[project]/components/ui/data-table.tsx",
                                                lineNumber: 289,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/ui/data-table.tsx",
                                        lineNumber: 282,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ui/data-table.tsx",
                                lineNumber: 254,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ui/data-table.tsx",
                        lineNumber: 233,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ui/data-table.tsx",
                lineNumber: 224,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/data-table.tsx",
        lineNumber: 107,
        columnNumber: 5
    }, this);
}
_s(DataTable, "VBHDON+wNOtEU1EJ595Vf9V+80U=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$table$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useReactTable"]
    ];
});
_c = DataTable;
;
var _c;
__turbopack_context__.k.register(_c, "DataTable");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/menu/menu-items-table.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MenuItemsTable",
    ()=>MenuItemsTable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/square-pen.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/copy.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye-off.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/dollar-sign.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/tag.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/ellipsis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$data$2d$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/data-table.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/dropdown.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$menu$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/menu/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
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
function MenuItemsTable(param) {
    let { data, loading = false, selectedIds = [], filters = {}, onItemClick, onEdit, onCopy, onDelete, onToggleVisibility, onSelectionChange, onFiltersChange, onCreate, className, channel, showBulkActions = true } = param;
    _s();
    const [sortField, setSortField] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('name');
    const [sortDirection, setSortDirection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('asc');
    // Calculate derived data for each item
    const enhancedData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MenuItemsTable.useMemo[enhancedData]": ()=>{
            return data.map({
                "MenuItemsTable.useMemo[enhancedData]": (item)=>({
                        ...item,
                        effectivePrice: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$menu$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateItemPrice"])(item, channel),
                        available: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$menu$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isItemAvailable"])(item, channel),
                        stockStatus: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$menu$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatStockStatus"])(item.stockQuantity, item.lowStockThreshold)
                    })
            }["MenuItemsTable.useMemo[enhancedData]"]);
        }
    }["MenuItemsTable.useMemo[enhancedData]"], [
        data,
        channel
    ]);
    // Table columns
    const columns = [
        {
            id: 'select',
            header: (param)=>{
                let { table } = param;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "checkbox",
                    checked: table.getIsAllPageRowsSelected(),
                    onChange: table.getToggleAllPageRowsSelectedHandler(),
                    className: "rounded border-gray-300"
                }, void 0, false, {
                    fileName: "[project]/components/menu/menu-items-table.tsx",
                    lineNumber: 87,
                    columnNumber: 9
                }, this);
            },
            cell: (param)=>{
                let { row } = param;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "checkbox",
                    checked: row.getIsSelected(),
                    onChange: row.getToggleSelectedHandler(),
                    className: "rounded border-gray-300"
                }, void 0, false, {
                    fileName: "[project]/components/menu/menu-items-table.tsx",
                    lineNumber: 95,
                    columnNumber: 9
                }, this);
            },
            enableSorting: false,
            size: 40
        },
        {
            accessorKey: 'name',
            header: 'Item',
            cell: (param)=>{
                let { row } = param;
                const item = row.original;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-start space-x-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-12 h-12 bg-gray-100 rounded border flex items-center justify-center flex-shrink-0",
                            children: item.media.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: item.media[0].url,
                                alt: item.media[0].alt,
                                className: "w-full h-full object-cover rounded"
                            }, void 0, false, {
                                fileName: "[project]/components/menu/menu-items-table.tsx",
                                lineNumber: 115,
                                columnNumber: 17
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                className: "h-5 w-5 text-gray-400"
                            }, void 0, false, {
                                fileName: "[project]/components/menu/menu-items-table.tsx",
                                lineNumber: 121,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/menu/menu-items-table.tsx",
                            lineNumber: 113,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 min-w-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center space-x-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$menu$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("font-medium truncate cursor-pointer hover:text-blue-600", !item.isActive && "text-gray-400 line-through"),
                                            onClick: ()=>onItemClick === null || onItemClick === void 0 ? void 0 : onItemClick(item),
                                            children: item.name
                                        }, void 0, false, {
                                            fileName: "[project]/components/menu/menu-items-table.tsx",
                                            lineNumber: 127,
                                            columnNumber: 17
                                        }, this),
                                        !item.isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            className: "h-3 w-3 text-gray-400"
                                        }, void 0, false, {
                                            fileName: "[project]/components/menu/menu-items-table.tsx",
                                            lineNumber: 136,
                                            columnNumber: 36
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/menu/menu-items-table.tsx",
                                    lineNumber: 126,
                                    columnNumber: 15
                                }, this),
                                item.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-gray-500 truncate mt-1",
                                    children: item.description
                                }, void 0, false, {
                                    fileName: "[project]/components/menu/menu-items-table.tsx",
                                    lineNumber: 140,
                                    columnNumber: 17
                                }, this),
                                item.tags.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap gap-1 mt-2",
                                    children: [
                                        item.tags.slice(0, 3).map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                variant: "secondary",
                                                className: "text-xs",
                                                children: tag
                                            }, tag, false, {
                                                fileName: "[project]/components/menu/menu-items-table.tsx",
                                                lineNumber: 149,
                                                columnNumber: 21
                                            }, this)),
                                        item.tags.length > 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                            variant: "secondary",
                                            className: "text-xs",
                                            children: [
                                                "+",
                                                item.tags.length - 3
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/menu/menu-items-table.tsx",
                                            lineNumber: 154,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/menu/menu-items-table.tsx",
                                    lineNumber: 147,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/menu/menu-items-table.tsx",
                            lineNumber: 125,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/menu/menu-items-table.tsx",
                    lineNumber: 111,
                    columnNumber: 11
                }, this);
            }
        },
        {
            accessorKey: 'effectivePrice',
            header: 'Price',
            cell: (param)=>{
                let { row } = param;
                const item = row.original;
                const showStrategyPrice = item.effectivePrice !== item.basePrice;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-right",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "font-medium",
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$menu$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPrice"])(item.effectivePrice)
                        }, void 0, false, {
                            fileName: "[project]/components/menu/menu-items-table.tsx",
                            lineNumber: 174,
                            columnNumber: 13
                        }, this),
                        showStrategyPrice && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-xs text-gray-500 line-through",
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$menu$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPrice"])(item.basePrice)
                        }, void 0, false, {
                            fileName: "[project]/components/menu/menu-items-table.tsx",
                            lineNumber: 178,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/menu/menu-items-table.tsx",
                    lineNumber: 173,
                    columnNumber: 11
                }, this);
            }
        },
        {
            accessorKey: 'available',
            header: 'Status',
            cell: (param)=>{
                let { row } = param;
                const item = row.original;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col space-y-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                            variant: item.available ? 'default' : 'destructive',
                            className: "w-fit",
                            children: item.available ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        className: "h-3 w-3 mr-1"
                                    }, void 0, false, {
                                        fileName: "[project]/components/menu/menu-items-table.tsx",
                                        lineNumber: 201,
                                        columnNumber: 19
                                    }, this),
                                    "Available"
                                ]
                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        className: "h-3 w-3 mr-1"
                                    }, void 0, false, {
                                        fileName: "[project]/components/menu/menu-items-table.tsx",
                                        lineNumber: 206,
                                        columnNumber: 19
                                    }, this),
                                    "Unavailable"
                                ]
                            }, void 0, true)
                        }, void 0, false, {
                            fileName: "[project]/components/menu/menu-items-table.tsx",
                            lineNumber: 195,
                            columnNumber: 13
                        }, this),
                        item.trackInventory && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                            variant: item.stockStatus.variant,
                            className: "w-fit text-xs",
                            children: item.stockStatus.label
                        }, void 0, false, {
                            fileName: "[project]/components/menu/menu-items-table.tsx",
                            lineNumber: 214,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/menu/menu-items-table.tsx",
                    lineNumber: 193,
                    columnNumber: 11
                }, this);
            }
        },
        {
            accessorKey: 'preparationTime',
            header: 'Prep Time',
            cell: (param)=>{
                let { row } = param;
                const prepTime = row.original.preparationTime;
                if (!prepTime) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-gray-400",
                    children: "—"
                }, void 0, false, {
                    fileName: "[project]/components/menu/menu-items-table.tsx",
                    lineNumber: 230,
                    columnNumber: 31
                }, this);
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center text-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            className: "h-3 w-3 mr-1"
                        }, void 0, false, {
                            fileName: "[project]/components/menu/menu-items-table.tsx",
                            lineNumber: 234,
                            columnNumber: 13
                        }, this),
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$menu$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPrepTime"])(prepTime)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/menu/menu-items-table.tsx",
                    lineNumber: 233,
                    columnNumber: 11
                }, this);
            }
        },
        {
            accessorKey: 'modifierGroups',
            header: 'Modifiers',
            cell: (param)=>{
                let { row } = param;
                const modifierCount = row.original.modifierGroups.length;
                if (modifierCount === 0) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-gray-400",
                    children: "None"
                }, void 0, false, {
                    fileName: "[project]/components/menu/menu-items-table.tsx",
                    lineNumber: 245,
                    columnNumber: 41
                }, this);
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                    variant: "outline",
                    className: "text-xs",
                    children: [
                        modifierCount,
                        " group",
                        modifierCount !== 1 ? 's' : ''
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/menu/menu-items-table.tsx",
                    lineNumber: 248,
                    columnNumber: 11
                }, this);
            }
        },
        {
            accessorKey: 'allergens',
            header: 'Allergens',
            cell: (param)=>{
                let { row } = param;
                const allergens = row.original.allergens;
                if (allergens.length === 0) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-gray-400",
                    children: "None"
                }, void 0, false, {
                    fileName: "[project]/components/menu/menu-items-table.tsx",
                    lineNumber: 259,
                    columnNumber: 44
                }, this);
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            className: "h-3 w-3 text-orange-500 mr-1"
                        }, void 0, false, {
                            fileName: "[project]/components/menu/menu-items-table.tsx",
                            lineNumber: 263,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-xs",
                            children: [
                                allergens.length,
                                " allergen",
                                allergens.length !== 1 ? 's' : ''
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/menu/menu-items-table.tsx",
                            lineNumber: 264,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/menu/menu-items-table.tsx",
                    lineNumber: 262,
                    columnNumber: 11
                }, this);
            }
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: (param)=>{
                let { row } = param;
                const item = row.original;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dropdown"], {
                    trigger: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "ghost",
                        size: "sm",
                        className: "h-8 w-8 p-0",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            className: "h-4 w-4"
                        }, void 0, false, {
                            fileName: "[project]/components/menu/menu-items-table.tsx",
                            lineNumber: 279,
                            columnNumber: 17
                        }, void 0)
                    }, void 0, false, {
                        fileName: "[project]/components/menu/menu-items-table.tsx",
                        lineNumber: 278,
                        columnNumber: 15
                    }, void 0),
                    items: [
                        {
                            label: 'Edit',
                            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/components/menu/menu-items-table.tsx",
                                lineNumber: 285,
                                columnNumber: 23
                            }, void 0),
                            onClick: ()=>onEdit === null || onEdit === void 0 ? void 0 : onEdit(item)
                        },
                        {
                            label: 'Duplicate',
                            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/components/menu/menu-items-table.tsx",
                                lineNumber: 290,
                                columnNumber: 23
                            }, void 0),
                            onClick: ()=>onCopy === null || onCopy === void 0 ? void 0 : onCopy(item)
                        },
                        {
                            label: item.isActive ? 'Hide' : 'Show',
                            icon: item.isActive ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/components/menu/menu-items-table.tsx",
                                lineNumber: 295,
                                columnNumber: 39
                            }, void 0) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/components/menu/menu-items-table.tsx",
                                lineNumber: 295,
                                columnNumber: 72
                            }, void 0),
                            onClick: ()=>onToggleVisibility === null || onToggleVisibility === void 0 ? void 0 : onToggleVisibility(item)
                        },
                        {
                            type: 'separator'
                        },
                        {
                            label: 'Delete',
                            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/components/menu/menu-items-table.tsx",
                                lineNumber: 301,
                                columnNumber: 23
                            }, void 0),
                            onClick: ()=>onDelete === null || onDelete === void 0 ? void 0 : onDelete(item),
                            className: 'text-red-600'
                        }
                    ]
                }, void 0, false, {
                    fileName: "[project]/components/menu/menu-items-table.tsx",
                    lineNumber: 276,
                    columnNumber: 11
                }, this);
            },
            enableSorting: false,
            size: 60
        }
    ];
    // Handle selection changes
    const handleSelectionChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MenuItemsTable.useCallback[handleSelectionChange]": (selection)=>{
            const selectedRowIds = Object.keys(selection);
            const selectedItemIds = selectedRowIds.map({
                "MenuItemsTable.useCallback[handleSelectionChange].selectedItemIds": (index)=>{
                    var _enhancedData_parseInt;
                    return (_enhancedData_parseInt = enhancedData[parseInt(index)]) === null || _enhancedData_parseInt === void 0 ? void 0 : _enhancedData_parseInt.id;
                }
            }["MenuItemsTable.useCallback[handleSelectionChange].selectedItemIds"]).filter(Boolean);
            onSelectionChange === null || onSelectionChange === void 0 ? void 0 : onSelectionChange(selectedItemIds);
        }
    }["MenuItemsTable.useCallback[handleSelectionChange]"], [
        enhancedData,
        onSelectionChange
    ]);
    // Bulk actions
    const bulkActions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MenuItemsTable.useMemo[bulkActions]": ()=>{
            if (!showBulkActions || selectedIds.length === 0) return null;
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center space-x-2 px-4 py-2 bg-blue-50 border-b",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm font-medium",
                        children: [
                            selectedIds.length,
                            " item",
                            selectedIds.length !== 1 ? 's' : '',
                            " selected"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/menu/menu-items-table.tsx",
                        lineNumber: 327,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center space-x-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                size: "sm",
                                variant: "outline",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        className: "h-3 w-3 mr-1"
                                    }, void 0, false, {
                                        fileName: "[project]/components/menu/menu-items-table.tsx",
                                        lineNumber: 333,
                                        columnNumber: 13
                                    }, this),
                                    "Show"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/menu/menu-items-table.tsx",
                                lineNumber: 332,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                size: "sm",
                                variant: "outline",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        className: "h-3 w-3 mr-1"
                                    }, void 0, false, {
                                        fileName: "[project]/components/menu/menu-items-table.tsx",
                                        lineNumber: 337,
                                        columnNumber: 13
                                    }, this),
                                    "Hide"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/menu/menu-items-table.tsx",
                                lineNumber: 336,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                size: "sm",
                                variant: "outline",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        className: "h-3 w-3 mr-1"
                                    }, void 0, false, {
                                        fileName: "[project]/components/menu/menu-items-table.tsx",
                                        lineNumber: 341,
                                        columnNumber: 13
                                    }, this),
                                    "Update Prices"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/menu/menu-items-table.tsx",
                                lineNumber: 340,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                size: "sm",
                                variant: "outline",
                                className: "text-red-600",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        className: "h-3 w-3 mr-1"
                                    }, void 0, false, {
                                        fileName: "[project]/components/menu/menu-items-table.tsx",
                                        lineNumber: 345,
                                        columnNumber: 13
                                    }, this),
                                    "Delete"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/menu/menu-items-table.tsx",
                                lineNumber: 344,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/menu/menu-items-table.tsx",
                        lineNumber: 331,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/menu/menu-items-table.tsx",
                lineNumber: 326,
                columnNumber: 7
            }, this);
        }
    }["MenuItemsTable.useMemo[bulkActions]"], [
        showBulkActions,
        selectedIds.length
    ]);
    // Custom toolbar
    const toolbar = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MenuItemsTable.useMemo[toolbar]": ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center space-x-2",
                children: onCreate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                    size: "sm",
                    onClick: onCreate,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            className: "h-3 w-3 mr-1"
                        }, void 0, false, {
                            fileName: "[project]/components/menu/menu-items-table.tsx",
                            lineNumber: 358,
                            columnNumber: 11
                        }, this),
                        "Add Item"
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/menu/menu-items-table.tsx",
                    lineNumber: 357,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/menu/menu-items-table.tsx",
                lineNumber: 355,
                columnNumber: 5
            }, this)
    }["MenuItemsTable.useMemo[toolbar]"], [
        onCreate
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$menu$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-white border rounded-lg", className),
        children: [
            bulkActions,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$data$2d$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DataTable"], {
                columns: columns,
                data: enhancedData,
                loading: loading,
                searchable: true,
                searchPlaceholder: "Search menu items...",
                filterable: true,
                exportable: true,
                selectable: true,
                pagination: true,
                pageSize: 20,
                onRowClick: onItemClick,
                toolbar: toolbar,
                className: "border-none"
            }, void 0, false, {
                fileName: "[project]/components/menu/menu-items-table.tsx",
                lineNumber: 369,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/menu/menu-items-table.tsx",
        lineNumber: 366,
        columnNumber: 5
    }, this);
}
_s(MenuItemsTable, "BIKWV4UORxHQESPCzKvB/z3hV0Q=");
_c = MenuItemsTable;
var _c;
__turbopack_context__.k.register(_c, "MenuItemsTable");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/switch.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Switch",
    ()=>Switch
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/utils.ts [app-client] (ecmascript)");
'use client';
;
;
;
const Switch = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = (param, ref)=>{
    let { checked = false, onCheckedChange, disabled = false, className, size = 'md', ...props } = param;
    const sizeClasses = {
        sm: 'h-4 w-7',
        md: 'h-5 w-9',
        lg: 'h-6 w-11'
    };
    const thumbSizeClasses = {
        sm: 'h-3 w-3',
        md: 'h-4 w-4',
        lg: 'h-5 w-5'
    };
    const translateClasses = {
        sm: checked ? 'translate-x-3' : 'translate-x-0.5',
        md: checked ? 'translate-x-4' : 'translate-x-0.5',
        lg: checked ? 'translate-x-5' : 'translate-x-0.5'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        role: "switch",
        "aria-checked": checked,
        disabled: disabled,
        onClick: ()=>onCheckedChange === null || onCheckedChange === void 0 ? void 0 : onCheckedChange(!checked),
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2', 'disabled:cursor-not-allowed disabled:opacity-50', checked ? 'bg-blue-600' : 'bg-gray-200', sizeClasses[size], className),
        ref: ref,
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('pointer-events-none block rounded-full bg-white shadow-lg ring-0 transition-transform', thumbSizeClasses[size], translateClasses[size])
        }, void 0, false, {
            fileName: "[project]/components/ui/switch.tsx",
            lineNumber: 52,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/ui/switch.tsx",
        lineNumber: 35,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = Switch;
Switch.displayName = 'Switch';
;
var _c, _c1;
__turbopack_context__.k.register(_c, "Switch$React.forwardRef");
__turbopack_context__.k.register(_c1, "Switch");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/tabs.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ControlledTabs",
    ()=>ControlledTabs,
    "SimpleTabs",
    ()=>SimpleTabs,
    "Tabs",
    ()=>Tabs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$tabs$2f$tabs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@headlessui/react/dist/components/tabs/tabs.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
function Tabs(param) {
    let { items, defaultTab, selectedTab, onTabChange, variant = 'default', size = 'md', className, tabListClassName, tabPanelClassName, orientation = 'horizontal' } = param;
    _s();
    const [internalSelectedIndex, setInternalSelectedIndex] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]({
        "Tabs.useState": ()=>{
            var _items_;
            const initialTab = selectedTab || defaultTab || ((_items_ = items[0]) === null || _items_ === void 0 ? void 0 : _items_.key);
            return items.findIndex({
                "Tabs.useState": (item)=>item.key === initialTab
            }["Tabs.useState"]) || 0;
        }
    }["Tabs.useState"]);
    const selectedIndex = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "Tabs.useMemo[selectedIndex]": ()=>{
            if (selectedTab) {
                const index = items.findIndex({
                    "Tabs.useMemo[selectedIndex].index": (item)=>item.key === selectedTab
                }["Tabs.useMemo[selectedIndex].index"]);
                return index >= 0 ? index : 0;
            }
            return internalSelectedIndex;
        }
    }["Tabs.useMemo[selectedIndex]"], [
        selectedTab,
        items,
        internalSelectedIndex
    ]);
    const handleChange = (index)=>{
        const selectedItem = items[index];
        if (selectedItem && !selectedItem.disabled) {
            setInternalSelectedIndex(index);
            onTabChange === null || onTabChange === void 0 ? void 0 : onTabChange(selectedItem.key);
        }
    };
    const getTabVariantClasses = (selected, disabled)=>{
        const baseClasses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('relative inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all', 'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2', {
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
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(baseClasses, sizeClasses[size], variantClasses[variant]);
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
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(baseClasses, orientationClasses[orientation], variantClasses[variant], spacingClasses[orientation][variant]);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('w-full', className),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$tabs$2f$tabs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabGroup"], {
            selectedIndex: selectedIndex,
            onChange: handleChange,
            vertical: orientation === 'vertical',
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$tabs$2f$tabs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabList"], {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(getTabListClasses(), tabListClassName),
                    children: items.map((item, _index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$tabs$2f$tabs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tab"], {
                            disabled: item.disabled,
                            className: (param)=>{
                                let { selected } = param;
                                return getTabVariantClasses(selected, !!item.disabled);
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center space-x-2",
                                children: [
                                    item.icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex-shrink-0",
                                        children: item.icon
                                    }, void 0, false, {
                                        fileName: "[project]/components/ui/tabs.tsx",
                                        lineNumber: 150,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: item.label
                                    }, void 0, false, {
                                        fileName: "[project]/components/ui/tabs.tsx",
                                        lineNumber: 152,
                                        columnNumber: 17
                                    }, this),
                                    item.badge && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$tabs$2f$tabs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabPanels"], {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('mt-4', tabPanelClassName),
                    children: items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$tabs$2f$tabs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabPanel"], {
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
_s(Tabs, "dKbfmecS3iD3MuWt4pCihBZn9o4=");
_c = Tabs;
function SimpleTabs(param) {
    let { tabs, defaultIndex = 0, className } = param;
    const tabItems = tabs.map((tab, index)=>({
            key: index.toString(),
            label: tab.label,
            content: tab.content,
            disabled: tab.disabled
        }));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tabs, {
        items: tabItems,
        defaultTab: defaultIndex.toString(),
        className: className
    }, void 0, false, {
        fileName: "[project]/components/ui/tabs.tsx",
        lineNumber: 198,
        columnNumber: 5
    }, this);
}
_c1 = SimpleTabs;
function ControlledTabs(param) {
    let { tabs, activeTab, onTabChange, variant = 'default', className } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tabs, {
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
_c2 = ControlledTabs;
;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "Tabs");
__turbopack_context__.k.register(_c1, "SimpleTabs");
__turbopack_context__.k.register(_c2, "ControlledTabs");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/utils.ts [app-client] (ecmascript)");
;
;
;
const Card = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"]((param, ref)=>{
    let { className, variant = 'default', padding = 'md', ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('rounded-lg bg-card text-card-foreground', {
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
_c = Card;
Card.displayName = 'Card';
const CardHeader = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"]((param, ref)=>{
    let { className, divider = false, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex flex-col space-y-1.5 p-6', divider && 'border-b border-border', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = CardHeader;
CardHeader.displayName = 'CardHeader';
const CardTitle = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"]((param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-2xl font-semibold leading-none tracking-tight', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 57,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
});
_c2 = CardTitle;
CardTitle.displayName = 'CardTitle';
const CardDescription = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"]((param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-sm text-muted-foreground', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 72,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
});
_c3 = CardDescription;
CardDescription.displayName = 'CardDescription';
const CardContent = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"]((param, ref)=>{
    let { className, padding = 'md', ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])({
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
    }, ("TURBOPACK compile-time value", void 0));
});
_c4 = CardContent;
CardContent.displayName = 'CardContent';
const CardFooter = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c5 = (param, ref)=>{
    let { className, divider = false, justify = 'start', ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex items-center p-6 pt-0', {
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
    }, ("TURBOPACK compile-time value", void 0));
});
_c6 = CardFooter;
CardFooter.displayName = 'CardFooter';
function ActionCard(param) {
    let { title, description, action, icon, className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Card, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('transition-all hover:shadow-md', className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CardHeader, {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center space-x-4",
                children: [
                    icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-shrink-0 p-2 rounded-lg bg-primary/10 text-primary",
                        children: icon
                    }, void 0, false, {
                        fileName: "[project]/components/ui/card.tsx",
                        lineNumber: 150,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 min-w-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CardTitle, {
                                className: "text-lg",
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/components/ui/card.tsx",
                                lineNumber: 155,
                                columnNumber: 13
                            }, this),
                            description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CardDescription, {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
_c7 = ActionCard;
function MetricCard(param) {
    let { label, value, change, icon, loading = false, className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Card, {
        className: className,
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CardContent, {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between space-y-0 pb-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm font-medium text-muted-foreground",
                            children: label
                        }, void 0, false, {
                            fileName: "[project]/components/ui/card.tsx",
                            lineNumber: 192,
                            columnNumber: 11
                        }, this),
                        icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-8 w-24 bg-muted rounded animate-pulse"
                        }, void 0, false, {
                            fileName: "[project]/components/ui/card.tsx",
                            lineNumber: 197,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-2xl font-bold",
                            children: value
                        }, void 0, false, {
                            fileName: "[project]/components/ui/card.tsx",
                            lineNumber: 199,
                            columnNumber: 13
                        }, this),
                        change && !loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-xs', change.type === 'increase' ? 'text-green-600' : 'text-destructive'),
                            children: [
                                change.type === 'increase' ? '+' : '-',
                                Math.abs(change.value),
                                "%",
                                change.period && " from ".concat(change.period)
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
_c8 = MetricCard;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8;
__turbopack_context__.k.register(_c, "Card");
__turbopack_context__.k.register(_c1, "CardHeader");
__turbopack_context__.k.register(_c2, "CardTitle");
__turbopack_context__.k.register(_c3, "CardDescription");
__turbopack_context__.k.register(_c4, "CardContent");
__turbopack_context__.k.register(_c5, "CardFooter$React.forwardRef");
__turbopack_context__.k.register(_c6, "CardFooter");
__turbopack_context__.k.register(_c7, "ActionCard");
__turbopack_context__.k.register(_c8, "MetricCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/menu/modifier-group-editor.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ModifierGroupEditor",
    ()=>ModifierGroupEditor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grip$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/grip-vertical.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$switch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/switch.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/card.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
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
function ModifierGroupEditor(param) {
    let { modifierGroups, onChange, className } = param;
    _s();
    const [expandedGroups, setExpandedGroups] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [editingGroup, setEditingGroup] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editingOption, setEditingOption] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Toggle group expansion
    const toggleGroup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ModifierGroupEditor.useCallback[toggleGroup]": (groupId)=>{
            setExpandedGroups({
                "ModifierGroupEditor.useCallback[toggleGroup]": (prev)=>prev.includes(groupId) ? prev.filter({
                        "ModifierGroupEditor.useCallback[toggleGroup]": (id)=>id !== groupId
                    }["ModifierGroupEditor.useCallback[toggleGroup]"]) : [
                        ...prev,
                        groupId
                    ]
            }["ModifierGroupEditor.useCallback[toggleGroup]"]);
        }
    }["ModifierGroupEditor.useCallback[toggleGroup]"], []);
    // Add new modifier group
    const addGroup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ModifierGroupEditor.useCallback[addGroup]": ()=>{
            const newGroup = {
                id: "temp-group-".concat(Date.now()),
                name: 'New Modifier Group',
                description: '',
                isRequired: false,
                minSelections: 0,
                maxSelections: 1,
                sortOrder: modifierGroups.length,
                displayType: 'checkbox',
                isActive: true,
                createdAt: new Date(),
                updatedAt: new Date(),
                options: []
            };
            onChange([
                ...modifierGroups,
                newGroup
            ]);
            setExpandedGroups({
                "ModifierGroupEditor.useCallback[addGroup]": (prev)=>[
                        ...prev,
                        newGroup.id
                    ]
            }["ModifierGroupEditor.useCallback[addGroup]"]);
            setEditingGroup(newGroup.id);
        }
    }["ModifierGroupEditor.useCallback[addGroup]"], [
        modifierGroups,
        onChange
    ]);
    // Update modifier group
    const updateGroup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ModifierGroupEditor.useCallback[updateGroup]": (groupId, updates)=>{
            const updatedGroups = modifierGroups.map({
                "ModifierGroupEditor.useCallback[updateGroup].updatedGroups": (group)=>group.id === groupId ? {
                        ...group,
                        ...updates,
                        updatedAt: new Date()
                    } : group
            }["ModifierGroupEditor.useCallback[updateGroup].updatedGroups"]);
            onChange(updatedGroups);
        }
    }["ModifierGroupEditor.useCallback[updateGroup]"], [
        modifierGroups,
        onChange
    ]);
    // Delete modifier group
    const deleteGroup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ModifierGroupEditor.useCallback[deleteGroup]": (groupId)=>{
            if (window.confirm('Are you sure you want to delete this modifier group?')) {
                onChange(modifierGroups.filter({
                    "ModifierGroupEditor.useCallback[deleteGroup]": (group)=>group.id !== groupId
                }["ModifierGroupEditor.useCallback[deleteGroup]"]));
                setExpandedGroups({
                    "ModifierGroupEditor.useCallback[deleteGroup]": (prev)=>prev.filter({
                            "ModifierGroupEditor.useCallback[deleteGroup]": (id)=>id !== groupId
                        }["ModifierGroupEditor.useCallback[deleteGroup]"])
                }["ModifierGroupEditor.useCallback[deleteGroup]"]);
            }
        }
    }["ModifierGroupEditor.useCallback[deleteGroup]"], [
        modifierGroups,
        onChange
    ]);
    // Add modifier option
    const addOption = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ModifierGroupEditor.useCallback[addOption]": (groupId)=>{
            const group = modifierGroups.find({
                "ModifierGroupEditor.useCallback[addOption].group": (g)=>g.id === groupId
            }["ModifierGroupEditor.useCallback[addOption].group"]);
            if (!group) return;
            const newOption = {
                id: "temp-option-".concat(Date.now()),
                name: 'New Option',
                description: '',
                price: 0,
                sortOrder: group.options.length,
                isDefault: false,
                isActive: true,
                createdAt: new Date(),
                updatedAt: new Date(),
                pricingStrategies: [],
                allergens: [],
                media: []
            };
            updateGroup(groupId, {
                options: [
                    ...group.options,
                    newOption
                ]
            });
            setEditingOption(newOption.id);
        }
    }["ModifierGroupEditor.useCallback[addOption]"], [
        modifierGroups,
        updateGroup
    ]);
    // Update modifier option
    const updateOption = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ModifierGroupEditor.useCallback[updateOption]": (groupId, optionId, updates)=>{
            const group = modifierGroups.find({
                "ModifierGroupEditor.useCallback[updateOption].group": (g)=>g.id === groupId
            }["ModifierGroupEditor.useCallback[updateOption].group"]);
            if (!group) return;
            const updatedOptions = group.options.map({
                "ModifierGroupEditor.useCallback[updateOption].updatedOptions": (option)=>option.id === optionId ? {
                        ...option,
                        ...updates,
                        updatedAt: new Date()
                    } : option
            }["ModifierGroupEditor.useCallback[updateOption].updatedOptions"]);
            updateGroup(groupId, {
                options: updatedOptions
            });
        }
    }["ModifierGroupEditor.useCallback[updateOption]"], [
        modifierGroups,
        updateGroup
    ]);
    // Delete modifier option
    const deleteOption = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ModifierGroupEditor.useCallback[deleteOption]": (groupId, optionId)=>{
            if (window.confirm('Are you sure you want to delete this modifier option?')) {
                const group = modifierGroups.find({
                    "ModifierGroupEditor.useCallback[deleteOption].group": (g)=>g.id === groupId
                }["ModifierGroupEditor.useCallback[deleteOption].group"]);
                if (!group) return;
                updateGroup(groupId, {
                    options: group.options.filter({
                        "ModifierGroupEditor.useCallback[deleteOption]": (option)=>option.id !== optionId
                    }["ModifierGroupEditor.useCallback[deleteOption]"])
                });
            }
        }
    }["ModifierGroupEditor.useCallback[deleteOption]"], [
        modifierGroups,
        updateGroup
    ]);
    // Reorder groups
    const reorderGroups = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ModifierGroupEditor.useCallback[reorderGroups]": (fromIndex, toIndex)=>{
            const newGroups = [
                ...modifierGroups
            ];
            const [movedGroup] = newGroups.splice(fromIndex, 1);
            newGroups.splice(toIndex, 0, movedGroup);
            // Update sort orders
            newGroups.forEach({
                "ModifierGroupEditor.useCallback[reorderGroups]": (group, index)=>{
                    group.sortOrder = index;
                }
            }["ModifierGroupEditor.useCallback[reorderGroups]"]);
            onChange(newGroups);
        }
    }["ModifierGroupEditor.useCallback[reorderGroups]"], [
        modifierGroups,
        onChange
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: className,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-semibold",
                        children: "Modifier Groups"
                    }, void 0, false, {
                        fileName: "[project]/components/menu/modifier-group-editor.tsx",
                        lineNumber: 151,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        size: "sm",
                        onClick: addGroup,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                className: "h-4 w-4 mr-2"
                            }, void 0, false, {
                                fileName: "[project]/components/menu/modifier-group-editor.tsx",
                                lineNumber: 153,
                                columnNumber: 11
                            }, this),
                            "Add Group"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/menu/modifier-group-editor.tsx",
                        lineNumber: 152,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/menu/modifier-group-editor.tsx",
                lineNumber: 150,
                columnNumber: 7
            }, this),
            modifierGroups.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-2",
                        children: "No modifier groups added yet"
                    }, void 0, false, {
                        fileName: "[project]/components/menu/modifier-group-editor.tsx",
                        lineNumber: 160,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "outline",
                        onClick: addGroup,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                className: "h-4 w-4 mr-2"
                            }, void 0, false, {
                                fileName: "[project]/components/menu/modifier-group-editor.tsx",
                                lineNumber: 162,
                                columnNumber: 13
                            }, this),
                            "Add Your First Group"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/menu/modifier-group-editor.tsx",
                        lineNumber: 161,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/menu/modifier-group-editor.tsx",
                lineNumber: 159,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: modifierGroups.map((group, groupIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        className: "p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center space-x-2 flex-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "ghost",
                                                size: "sm",
                                                className: "h-6 w-6 p-0",
                                                onClick: ()=>toggleGroup(group.id),
                                                children: expandedGroups.includes(group.id) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    className: "h-4 w-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/menu/modifier-group-editor.tsx",
                                                    lineNumber: 180,
                                                    columnNumber: 23
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    className: "h-4 w-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/menu/modifier-group-editor.tsx",
                                                    lineNumber: 182,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/menu/modifier-group-editor.tsx",
                                                lineNumber: 173,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grip$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                className: "h-4 w-4 text-gray-400 cursor-move"
                                            }, void 0, false, {
                                                fileName: "[project]/components/menu/modifier-group-editor.tsx",
                                                lineNumber: 186,
                                                columnNumber: 19
                                            }, this),
                                            editingGroup === group.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                value: group.name,
                                                onChange: (e)=>updateGroup(group.id, {
                                                        name: e.target.value
                                                    }),
                                                onBlur: ()=>setEditingGroup(null),
                                                onKeyDown: (e)=>{
                                                    if (e.key === 'Enter') setEditingGroup(null);
                                                },
                                                className: "h-7 text-sm font-medium",
                                                autoFocus: true
                                            }, void 0, false, {
                                                fileName: "[project]/components/menu/modifier-group-editor.tsx",
                                                lineNumber: 189,
                                                columnNumber: 21
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                className: "font-medium cursor-pointer hover:text-blue-600",
                                                onClick: ()=>setEditingGroup(group.id),
                                                children: group.name
                                            }, void 0, false, {
                                                fileName: "[project]/components/menu/modifier-group-editor.tsx",
                                                lineNumber: 200,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center space-x-2",
                                                children: [
                                                    group.isRequired && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                        variant: "default",
                                                        className: "text-xs",
                                                        children: "Required"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/menu/modifier-group-editor.tsx",
                                                        lineNumber: 210,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                        variant: "secondary",
                                                        className: "text-xs",
                                                        children: [
                                                            group.options.length,
                                                            " option",
                                                            group.options.length !== 1 ? 's' : ''
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/menu/modifier-group-editor.tsx",
                                                        lineNumber: 212,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/menu/modifier-group-editor.tsx",
                                                lineNumber: 208,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/menu/modifier-group-editor.tsx",
                                        lineNumber: 172,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center space-x-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$switch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Switch"], {
                                                size: "sm",
                                                checked: group.isActive,
                                                onCheckedChange: (checked)=>updateGroup(group.id, {
                                                        isActive: checked
                                                    })
                                            }, void 0, false, {
                                                fileName: "[project]/components/menu/modifier-group-editor.tsx",
                                                lineNumber: 219,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "ghost",
                                                size: "sm",
                                                className: "h-7 w-7 p-0",
                                                onClick: ()=>deleteGroup(group.id),
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    className: "h-3 w-3 text-red-600"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/menu/modifier-group-editor.tsx",
                                                    lineNumber: 230,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/menu/modifier-group-editor.tsx",
                                                lineNumber: 224,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/menu/modifier-group-editor.tsx",
                                        lineNumber: 218,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/menu/modifier-group-editor.tsx",
                                lineNumber: 171,
                                columnNumber: 15
                            }, this),
                            expandedGroups.includes(group.id) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4 border-t pt-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-2 gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-sm font-medium mb-1",
                                                        children: "Description"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/menu/modifier-group-editor.tsx",
                                                        lineNumber: 241,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                        value: group.description || '',
                                                        onChange: (e)=>updateGroup(group.id, {
                                                                description: e.target.value
                                                            }),
                                                        placeholder: "Optional description",
                                                        className: "h-8 text-sm"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/menu/modifier-group-editor.tsx",
                                                        lineNumber: 242,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/menu/modifier-group-editor.tsx",
                                                lineNumber: 240,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-sm font-medium mb-1",
                                                        children: "Display Type"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/menu/modifier-group-editor.tsx",
                                                        lineNumber: 251,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        value: group.displayType,
                                                        onChange: (e)=>updateGroup(group.id, {
                                                                displayType: e.target.value
                                                            }),
                                                        className: "w-full h-8 px-2 text-sm border border-gray-300 rounded-md",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "radio",
                                                                children: "Radio Buttons"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/menu/modifier-group-editor.tsx",
                                                                lineNumber: 257,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "checkbox",
                                                                children: "Checkboxes"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/menu/modifier-group-editor.tsx",
                                                                lineNumber: 258,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "dropdown",
                                                                children: "Dropdown"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/menu/modifier-group-editor.tsx",
                                                                lineNumber: 259,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "quantity",
                                                                children: "Quantity"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/menu/modifier-group-editor.tsx",
                                                                lineNumber: 260,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/menu/modifier-group-editor.tsx",
                                                        lineNumber: 252,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/menu/modifier-group-editor.tsx",
                                                lineNumber: 250,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/menu/modifier-group-editor.tsx",
                                        lineNumber: 239,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-3 gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center space-x-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$switch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Switch"], {
                                                        size: "sm",
                                                        checked: group.isRequired,
                                                        onCheckedChange: (checked)=>updateGroup(group.id, {
                                                                isRequired: checked
                                                            })
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/menu/modifier-group-editor.tsx",
                                                        lineNumber: 267,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-sm",
                                                        children: "Required"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/menu/modifier-group-editor.tsx",
                                                        lineNumber: 272,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/menu/modifier-group-editor.tsx",
                                                lineNumber: 266,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-sm font-medium mb-1",
                                                        children: "Min Selections"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/menu/modifier-group-editor.tsx",
                                                        lineNumber: 276,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                        type: "number",
                                                        min: "0",
                                                        value: group.minSelections,
                                                        onChange: (e)=>updateGroup(group.id, {
                                                                minSelections: parseInt(e.target.value) || 0
                                                            }),
                                                        className: "h-8 text-sm"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/menu/modifier-group-editor.tsx",
                                                        lineNumber: 277,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/menu/modifier-group-editor.tsx",
                                                lineNumber: 275,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-sm font-medium mb-1",
                                                        children: "Max Selections"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/menu/modifier-group-editor.tsx",
                                                        lineNumber: 287,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                        type: "number",
                                                        min: "0",
                                                        value: group.maxSelections || '',
                                                        onChange: (e)=>updateGroup(group.id, {
                                                                maxSelections: parseInt(e.target.value) || undefined
                                                            }),
                                                        placeholder: "Unlimited",
                                                        className: "h-8 text-sm"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/menu/modifier-group-editor.tsx",
                                                        lineNumber: 288,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/menu/modifier-group-editor.tsx",
                                                lineNumber: 286,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/menu/modifier-group-editor.tsx",
                                        lineNumber: 265,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between mb-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h5", {
                                                        className: "font-medium",
                                                        children: "Options"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/menu/modifier-group-editor.tsx",
                                                        lineNumber: 302,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                        size: "sm",
                                                        onClick: ()=>addOption(group.id),
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                className: "h-3 w-3 mr-1"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/menu/modifier-group-editor.tsx",
                                                                lineNumber: 304,
                                                                columnNumber: 25
                                                            }, this),
                                                            "Add Option"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/menu/modifier-group-editor.tsx",
                                                        lineNumber: 303,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/menu/modifier-group-editor.tsx",
                                                lineNumber: 301,
                                                columnNumber: 21
                                            }, this),
                                            group.options.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-center py-4 text-gray-500 border border-dashed border-gray-200 rounded",
                                                children: "No options added yet"
                                            }, void 0, false, {
                                                fileName: "[project]/components/menu/modifier-group-editor.tsx",
                                                lineNumber: 310,
                                                columnNumber: 23
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-2",
                                                children: group.options.map((option, optionIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center space-x-3 p-3 bg-gray-50 rounded border",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grip$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                className: "h-4 w-4 text-gray-400 cursor-move"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/menu/modifier-group-editor.tsx",
                                                                lineNumber: 320,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex-1 grid grid-cols-3 gap-3",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: editingOption === option.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                                            value: option.name,
                                                                            onChange: (e)=>updateOption(group.id, option.id, {
                                                                                    name: e.target.value
                                                                                }),
                                                                            onBlur: ()=>setEditingOption(null),
                                                                            onKeyDown: (e)=>{
                                                                                if (e.key === 'Enter') setEditingOption(null);
                                                                            },
                                                                            className: "h-7 text-sm",
                                                                            autoFocus: true
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/menu/modifier-group-editor.tsx",
                                                                            lineNumber: 325,
                                                                            columnNumber: 35
                                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "text-sm font-medium cursor-pointer hover:text-blue-600",
                                                                            onClick: ()=>setEditingOption(option.id),
                                                                            children: option.name
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/menu/modifier-group-editor.tsx",
                                                                            lineNumber: 336,
                                                                            columnNumber: 35
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/menu/modifier-group-editor.tsx",
                                                                        lineNumber: 323,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "relative",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "absolute left-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-500",
                                                                                children: "$"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/menu/modifier-group-editor.tsx",
                                                                                lineNumber: 346,
                                                                                columnNumber: 33
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                                                type: "number",
                                                                                step: "0.01",
                                                                                min: "0",
                                                                                value: option.price,
                                                                                onChange: (e)=>updateOption(group.id, option.id, {
                                                                                        price: parseFloat(e.target.value) || 0
                                                                                    }),
                                                                                className: "h-7 text-sm pl-6",
                                                                                placeholder: "0.00"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/menu/modifier-group-editor.tsx",
                                                                                lineNumber: 347,
                                                                                columnNumber: 33
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/menu/modifier-group-editor.tsx",
                                                                        lineNumber: 345,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                                        value: option.description || '',
                                                                        onChange: (e)=>updateOption(group.id, option.id, {
                                                                                description: e.target.value
                                                                            }),
                                                                        placeholder: "Optional description",
                                                                        className: "h-7 text-sm"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/menu/modifier-group-editor.tsx",
                                                                        lineNumber: 358,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/menu/modifier-group-editor.tsx",
                                                                lineNumber: 322,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center space-x-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center space-x-1",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                type: "checkbox",
                                                                                checked: option.isDefault,
                                                                                onChange: (e)=>updateOption(group.id, option.id, {
                                                                                        isDefault: e.target.checked
                                                                                    }),
                                                                                className: "rounded text-xs"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/menu/modifier-group-editor.tsx",
                                                                                lineNumber: 368,
                                                                                columnNumber: 33
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                className: "text-xs text-gray-600",
                                                                                children: "Default"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/menu/modifier-group-editor.tsx",
                                                                                lineNumber: 374,
                                                                                columnNumber: 33
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/menu/modifier-group-editor.tsx",
                                                                        lineNumber: 367,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$switch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Switch"], {
                                                                        size: "sm",
                                                                        checked: option.isActive,
                                                                        onCheckedChange: (checked)=>updateOption(group.id, option.id, {
                                                                                isActive: checked
                                                                            })
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/menu/modifier-group-editor.tsx",
                                                                        lineNumber: 377,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                        variant: "ghost",
                                                                        size: "sm",
                                                                        className: "h-7 w-7 p-0",
                                                                        onClick: ()=>deleteOption(group.id, option.id),
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                            className: "h-3 w-3 text-red-600"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/menu/modifier-group-editor.tsx",
                                                                            lineNumber: 389,
                                                                            columnNumber: 33
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/menu/modifier-group-editor.tsx",
                                                                        lineNumber: 383,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/menu/modifier-group-editor.tsx",
                                                                lineNumber: 366,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, option.id, true, {
                                                        fileName: "[project]/components/menu/modifier-group-editor.tsx",
                                                        lineNumber: 316,
                                                        columnNumber: 27
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/components/menu/modifier-group-editor.tsx",
                                                lineNumber: 314,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/menu/modifier-group-editor.tsx",
                                        lineNumber: 300,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/menu/modifier-group-editor.tsx",
                                lineNumber: 237,
                                columnNumber: 17
                            }, this)
                        ]
                    }, group.id, true, {
                        fileName: "[project]/components/menu/modifier-group-editor.tsx",
                        lineNumber: 169,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/menu/modifier-group-editor.tsx",
                lineNumber: 167,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/menu/modifier-group-editor.tsx",
        lineNumber: 149,
        columnNumber: 5
    }, this);
}
_s(ModifierGroupEditor, "eF9yrz9w5LUhrGtYiu+Tz5Bb7qA=");
_c = ModifierGroupEditor;
var _c;
__turbopack_context__.k.register(_c, "ModifierGroupEditor");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/menu/pricing-strategy-editor.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PricingStrategyEditor",
    ()=>PricingStrategyEditor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/target.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/dollar-sign.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$menu$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/menu/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
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
function PricingStrategyEditor(param) {
    let { strategies, onChange, className } = param;
    _s();
    const [expandedStrategies, setExpandedStrategies] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [editingStrategy, setEditingStrategy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Toggle strategy expansion
    const toggleStrategy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PricingStrategyEditor.useCallback[toggleStrategy]": (strategyId)=>{
            setExpandedStrategies({
                "PricingStrategyEditor.useCallback[toggleStrategy]": (prev)=>prev.includes(strategyId) ? prev.filter({
                        "PricingStrategyEditor.useCallback[toggleStrategy]": (id)=>id !== strategyId
                    }["PricingStrategyEditor.useCallback[toggleStrategy]"]) : [
                        ...prev,
                        strategyId
                    ]
            }["PricingStrategyEditor.useCallback[toggleStrategy]"]);
        }
    }["PricingStrategyEditor.useCallback[toggleStrategy]"], []);
    // Add new pricing strategy
    const addStrategy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PricingStrategyEditor.useCallback[addStrategy]": ()=>{
            const newStrategy = {
                id: "temp-strategy-".concat(Date.now()),
                name: 'New Pricing Strategy',
                type: 'time_based',
                priority: strategies.length,
                conditions: {},
                prices: [
                    {
                        id: "temp-price-".concat(Date.now()),
                        amount: 0,
                        currency: 'USD'
                    }
                ]
            };
            onChange([
                ...strategies,
                newStrategy
            ]);
            setExpandedStrategies({
                "PricingStrategyEditor.useCallback[addStrategy]": (prev)=>[
                        ...prev,
                        newStrategy.id
                    ]
            }["PricingStrategyEditor.useCallback[addStrategy]"]);
            setEditingStrategy(newStrategy.id);
        }
    }["PricingStrategyEditor.useCallback[addStrategy]"], [
        strategies,
        onChange
    ]);
    // Update pricing strategy
    const updateStrategy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PricingStrategyEditor.useCallback[updateStrategy]": (strategyId, updates)=>{
            const updatedStrategies = strategies.map({
                "PricingStrategyEditor.useCallback[updateStrategy].updatedStrategies": (strategy)=>strategy.id === strategyId ? {
                        ...strategy,
                        ...updates
                    } : strategy
            }["PricingStrategyEditor.useCallback[updateStrategy].updatedStrategies"]);
            onChange(updatedStrategies);
        }
    }["PricingStrategyEditor.useCallback[updateStrategy]"], [
        strategies,
        onChange
    ]);
    // Delete pricing strategy
    const deleteStrategy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PricingStrategyEditor.useCallback[deleteStrategy]": (strategyId)=>{
            if (window.confirm('Are you sure you want to delete this pricing strategy?')) {
                onChange(strategies.filter({
                    "PricingStrategyEditor.useCallback[deleteStrategy]": (strategy)=>strategy.id !== strategyId
                }["PricingStrategyEditor.useCallback[deleteStrategy]"]));
                setExpandedStrategies({
                    "PricingStrategyEditor.useCallback[deleteStrategy]": (prev)=>prev.filter({
                            "PricingStrategyEditor.useCallback[deleteStrategy]": (id)=>id !== strategyId
                        }["PricingStrategyEditor.useCallback[deleteStrategy]"])
                }["PricingStrategyEditor.useCallback[deleteStrategy]"]);
            }
        }
    }["PricingStrategyEditor.useCallback[deleteStrategy]"], [
        strategies,
        onChange
    ]);
    // Update price within a strategy
    const updatePrice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PricingStrategyEditor.useCallback[updatePrice]": (strategyId, priceId, updates)=>{
            const strategy = strategies.find({
                "PricingStrategyEditor.useCallback[updatePrice].strategy": (s)=>s.id === strategyId
            }["PricingStrategyEditor.useCallback[updatePrice].strategy"]);
            if (!strategy) return;
            const updatedPrices = strategy.prices.map({
                "PricingStrategyEditor.useCallback[updatePrice].updatedPrices": (price)=>price.id === priceId ? {
                        ...price,
                        ...updates
                    } : price
            }["PricingStrategyEditor.useCallback[updatePrice].updatedPrices"]);
            updateStrategy(strategyId, {
                prices: updatedPrices
            });
        }
    }["PricingStrategyEditor.useCallback[updatePrice]"], [
        strategies,
        updateStrategy
    ]);
    // Add price to strategy
    const addPrice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PricingStrategyEditor.useCallback[addPrice]": (strategyId)=>{
            const strategy = strategies.find({
                "PricingStrategyEditor.useCallback[addPrice].strategy": (s)=>s.id === strategyId
            }["PricingStrategyEditor.useCallback[addPrice].strategy"]);
            if (!strategy) return;
            const newPrice = {
                id: "temp-price-".concat(Date.now()),
                amount: 0,
                currency: 'USD'
            };
            updateStrategy(strategyId, {
                prices: [
                    ...strategy.prices,
                    newPrice
                ]
            });
        }
    }["PricingStrategyEditor.useCallback[addPrice]"], [
        strategies,
        updateStrategy
    ]);
    // Delete price from strategy
    const deletePrice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PricingStrategyEditor.useCallback[deletePrice]": (strategyId, priceId)=>{
            const strategy = strategies.find({
                "PricingStrategyEditor.useCallback[deletePrice].strategy": (s)=>s.id === strategyId
            }["PricingStrategyEditor.useCallback[deletePrice].strategy"]);
            if (!strategy || strategy.prices.length <= 1) return; // Keep at least one price
            updateStrategy(strategyId, {
                prices: strategy.prices.filter({
                    "PricingStrategyEditor.useCallback[deletePrice]": (price)=>price.id !== priceId
                }["PricingStrategyEditor.useCallback[deletePrice]"])
            });
        }
    }["PricingStrategyEditor.useCallback[deletePrice]"], [
        strategies,
        updateStrategy
    ]);
    // Update strategy conditions based on type
    const updateConditions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PricingStrategyEditor.useCallback[updateConditions]": (strategyId, field, value)=>{
            const strategy = strategies.find({
                "PricingStrategyEditor.useCallback[updateConditions].strategy": (s)=>s.id === strategyId
            }["PricingStrategyEditor.useCallback[updateConditions].strategy"]);
            if (!strategy) return;
            const newConditions = {
                ...strategy.conditions,
                [field]: value
            };
            updateStrategy(strategyId, {
                conditions: newConditions
            });
        }
    }["PricingStrategyEditor.useCallback[updateConditions]"], [
        strategies,
        updateStrategy
    ]);
    // Get strategy type icon
    const getStrategyIcon = (type)=>{
        switch(type){
            case 'time_based':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    className: "h-4 w-4"
                }, void 0, false, {
                    fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                    lineNumber: 133,
                    columnNumber: 16
                }, this);
            case 'day_of_week':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    className: "h-4 w-4"
                }, void 0, false, {
                    fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                    lineNumber: 135,
                    columnNumber: 16
                }, this);
            case 'location_based':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    className: "h-4 w-4"
                }, void 0, false, {
                    fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                    lineNumber: 137,
                    columnNumber: 16
                }, this);
            case 'menu_specific':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    className: "h-4 w-4"
                }, void 0, false, {
                    fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                    lineNumber: 139,
                    columnNumber: 16
                }, this);
            default:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    className: "h-4 w-4"
                }, void 0, false, {
                    fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                    lineNumber: 141,
                    columnNumber: 16
                }, this);
        }
    };
    // Render conditions based on strategy type
    const renderConditions = (strategy)=>{
        switch(strategy.type){
            case 'time_based':
                var _strategy_conditions, _strategy_conditions1;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-2 gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm font-medium mb-1",
                                    children: "Start Time"
                                }, void 0, false, {
                                    fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                                    lineNumber: 152,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                    type: "time",
                                    value: ((_strategy_conditions = strategy.conditions) === null || _strategy_conditions === void 0 ? void 0 : _strategy_conditions.startTime) || '',
                                    onChange: (e)=>updateConditions(strategy.id, 'startTime', e.target.value),
                                    className: "h-8 text-sm"
                                }, void 0, false, {
                                    fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                                    lineNumber: 153,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                            lineNumber: 151,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm font-medium mb-1",
                                    children: "End Time"
                                }, void 0, false, {
                                    fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                                    lineNumber: 161,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                    type: "time",
                                    value: ((_strategy_conditions1 = strategy.conditions) === null || _strategy_conditions1 === void 0 ? void 0 : _strategy_conditions1.endTime) || '',
                                    onChange: (e)=>updateConditions(strategy.id, 'endTime', e.target.value),
                                    className: "h-8 text-sm"
                                }, void 0, false, {
                                    fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                                    lineNumber: 162,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                            lineNumber: 160,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                    lineNumber: 150,
                    columnNumber: 11
                }, this);
            case 'day_of_week':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: "block text-sm font-medium mb-2",
                            children: "Days of Week"
                        }, void 0, false, {
                            fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                            lineNumber: 175,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-4 gap-2",
                            children: [
                                'Sunday',
                                'Monday',
                                'Tuesday',
                                'Wednesday',
                                'Thursday',
                                'Friday',
                                'Saturday'
                            ].map((day, index)=>{
                                var _strategy_conditions_daysOfWeek, _strategy_conditions;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center space-x-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "checkbox",
                                            id: "".concat(strategy.id, "-day-").concat(index),
                                            checked: ((_strategy_conditions = strategy.conditions) === null || _strategy_conditions === void 0 ? void 0 : (_strategy_conditions_daysOfWeek = _strategy_conditions.daysOfWeek) === null || _strategy_conditions_daysOfWeek === void 0 ? void 0 : _strategy_conditions_daysOfWeek.includes(index)) || false,
                                            onChange: (e)=>{
                                                var _strategy_conditions;
                                                const currentDays = ((_strategy_conditions = strategy.conditions) === null || _strategy_conditions === void 0 ? void 0 : _strategy_conditions.daysOfWeek) || [];
                                                const newDays = e.target.checked ? [
                                                    ...currentDays,
                                                    index
                                                ] : currentDays.filter((d)=>d !== index);
                                                updateConditions(strategy.id, 'daysOfWeek', newDays);
                                            },
                                            className: "rounded text-xs"
                                        }, void 0, false, {
                                            fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                                            lineNumber: 179,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "".concat(strategy.id, "-day-").concat(index),
                                            className: "text-xs",
                                            children: day.slice(0, 3)
                                        }, void 0, false, {
                                            fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                                            lineNumber: 192,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, day, true, {
                                    fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                                    lineNumber: 178,
                                    columnNumber: 17
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                            lineNumber: 176,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                    lineNumber: 174,
                    columnNumber: 11
                }, this);
            case 'location_based':
                var _strategy_conditions_locationIds, _strategy_conditions2;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: "block text-sm font-medium mb-1",
                            children: "Location IDs"
                        }, void 0, false, {
                            fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                            lineNumber: 204,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                            value: ((_strategy_conditions2 = strategy.conditions) === null || _strategy_conditions2 === void 0 ? void 0 : (_strategy_conditions_locationIds = _strategy_conditions2.locationIds) === null || _strategy_conditions_locationIds === void 0 ? void 0 : _strategy_conditions_locationIds.join(', ')) || '',
                            onChange: (e)=>{
                                const locations = e.target.value.split(',').map((id)=>id.trim()).filter(Boolean);
                                updateConditions(strategy.id, 'locationIds', locations);
                            },
                            placeholder: "Enter location IDs separated by commas",
                            className: "h-8 text-sm"
                        }, void 0, false, {
                            fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                            lineNumber: 205,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                    lineNumber: 203,
                    columnNumber: 11
                }, this);
            case 'menu_specific':
                var _strategy_conditions3;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: "block text-sm font-medium mb-1",
                            children: "Channel ID"
                        }, void 0, false, {
                            fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                            lineNumber: 220,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                            value: ((_strategy_conditions3 = strategy.conditions) === null || _strategy_conditions3 === void 0 ? void 0 : _strategy_conditions3.channelId) || '',
                            onChange: (e)=>updateConditions(strategy.id, 'channelId', e.target.value),
                            className: "w-full h-8 px-2 text-sm border border-gray-300 rounded-md",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "",
                                    children: "Select channel"
                                }, void 0, false, {
                                    fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                                    lineNumber: 226,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "dine-in",
                                    children: "Dine In"
                                }, void 0, false, {
                                    fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                                    lineNumber: 227,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "takeout",
                                    children: "Takeout"
                                }, void 0, false, {
                                    fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                                    lineNumber: 228,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "delivery",
                                    children: "Delivery"
                                }, void 0, false, {
                                    fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                                    lineNumber: 229,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "online",
                                    children: "Online"
                                }, void 0, false, {
                                    fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                                    lineNumber: 230,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                            lineNumber: 221,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                    lineNumber: 219,
                    columnNumber: 11
                }, this);
            default:
                return null;
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: className,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-sm font-semibold",
                                children: "Pricing Strategies"
                            }, void 0, false, {
                                fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                                lineNumber: 244,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-500",
                                children: "Different prices for different conditions"
                            }, void 0, false, {
                                fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                                lineNumber: 245,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                        lineNumber: 243,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        size: "sm",
                        onClick: addStrategy,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                className: "h-3 w-3 mr-1"
                            }, void 0, false, {
                                fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                                lineNumber: 248,
                                columnNumber: 11
                            }, this),
                            "Add Strategy"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                        lineNumber: 247,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                lineNumber: 242,
                columnNumber: 7
            }, this),
            strategies.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center py-6 text-gray-500 border border-dashed border-gray-300 rounded-lg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm mb-2",
                        children: "No pricing strategies configured"
                    }, void 0, false, {
                        fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                        lineNumber: 255,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-gray-400 mb-3",
                        children: "Add strategies for time-based, location-based, or channel-specific pricing"
                    }, void 0, false, {
                        fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                        lineNumber: 256,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        size: "sm",
                        variant: "outline",
                        onClick: addStrategy,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                className: "h-3 w-3 mr-1"
                            }, void 0, false, {
                                fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                                lineNumber: 258,
                                columnNumber: 13
                            }, this),
                            "Add Strategy"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                        lineNumber: 257,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                lineNumber: 254,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-3",
                children: strategies.map((strategy, index)=>{
                    var _strategy_prices_;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        className: "p-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mb-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center space-x-2 flex-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "ghost",
                                                size: "sm",
                                                className: "h-5 w-5 p-0",
                                                onClick: ()=>toggleStrategy(strategy.id),
                                                children: expandedStrategies.includes(strategy.id) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    className: "h-3 w-3"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                                                    lineNumber: 276,
                                                    columnNumber: 23
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    className: "h-3 w-3"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                                                    lineNumber: 278,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                                                lineNumber: 269,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center space-x-2",
                                                children: [
                                                    getStrategyIcon(strategy.type),
                                                    editingStrategy === strategy.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                        value: strategy.name,
                                                        onChange: (e)=>updateStrategy(strategy.id, {
                                                                name: e.target.value
                                                            }),
                                                        onBlur: ()=>setEditingStrategy(null),
                                                        onKeyDown: (e)=>{
                                                            if (e.key === 'Enter') setEditingStrategy(null);
                                                        },
                                                        className: "h-6 text-sm font-medium",
                                                        autoFocus: true
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                                                        lineNumber: 286,
                                                        columnNumber: 23
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-sm font-medium cursor-pointer hover:text-blue-600",
                                                        onClick: ()=>setEditingStrategy(strategy.id),
                                                        children: strategy.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                                                        lineNumber: 297,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                                                lineNumber: 282,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                variant: "secondary",
                                                className: "text-xs",
                                                children: [
                                                    "Priority: ",
                                                    strategy.priority
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                                                lineNumber: 306,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                variant: "outline",
                                                className: "text-xs capitalize",
                                                children: strategy.type.replace('_', ' ')
                                            }, void 0, false, {
                                                fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                                                lineNumber: 310,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                                        lineNumber: 268,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center space-x-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-sm font-medium",
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$menu$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPrice"])(((_strategy_prices_ = strategy.prices[0]) === null || _strategy_prices_ === void 0 ? void 0 : _strategy_prices_.amount) || 0)
                                            }, void 0, false, {
                                                fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                                                lineNumber: 316,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "ghost",
                                                size: "sm",
                                                className: "h-6 w-6 p-0",
                                                onClick: ()=>deleteStrategy(strategy.id),
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    className: "h-3 w-3 text-red-600"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                                                    lineNumber: 325,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                                                lineNumber: 319,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                                        lineNumber: 315,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                                lineNumber: 267,
                                columnNumber: 15
                            }, this),
                            expandedStrategies.includes(strategy.id) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4 border-t pt-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-2 gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-sm font-medium mb-1",
                                                        children: "Strategy Type"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                                                        lineNumber: 336,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        value: strategy.type,
                                                        onChange: (e)=>updateStrategy(strategy.id, {
                                                                type: e.target.value,
                                                                conditions: {} // Reset conditions when type changes
                                                            }),
                                                        className: "w-full h-8 px-2 text-sm border border-gray-300 rounded-md",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "base",
                                                                children: "Base Price"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                                                                lineNumber: 345,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "time_based",
                                                                children: "Time Based"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                                                                lineNumber: 346,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "day_of_week",
                                                                children: "Day of Week"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                                                                lineNumber: 347,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "location_based",
                                                                children: "Location Based"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                                                                lineNumber: 348,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "menu_specific",
                                                                children: "Menu/Channel Specific"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                                                                lineNumber: 349,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                                                        lineNumber: 337,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                                                lineNumber: 335,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-sm font-medium mb-1",
                                                        children: "Priority"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                                                        lineNumber: 354,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                        type: "number",
                                                        min: "0",
                                                        value: strategy.priority,
                                                        onChange: (e)=>updateStrategy(strategy.id, {
                                                                priority: parseInt(e.target.value) || 0
                                                            }),
                                                        className: "h-8 text-sm"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                                                        lineNumber: 355,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                                                lineNumber: 353,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                                        lineNumber: 334,
                                        columnNumber: 19
                                    }, this),
                                    strategy.type !== 'base' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h5", {
                                                className: "text-sm font-medium mb-2",
                                                children: "Conditions"
                                            }, void 0, false, {
                                                fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                                                lineNumber: 368,
                                                columnNumber: 23
                                            }, this),
                                            renderConditions(strategy)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                                        lineNumber: 367,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between mb-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h5", {
                                                        className: "text-sm font-medium",
                                                        children: "Prices"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                                                        lineNumber: 376,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                        size: "sm",
                                                        onClick: ()=>addPrice(strategy.id),
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                className: "h-3 w-3 mr-1"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                                                                lineNumber: 378,
                                                                columnNumber: 25
                                                            }, this),
                                                            "Add Price"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                                                        lineNumber: 377,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                                                lineNumber: 375,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-2",
                                                children: strategy.prices.map((price, priceIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center space-x-3 p-2 bg-gray-50 rounded border",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex-1 grid grid-cols-4 gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "relative",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "absolute left-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-500",
                                                                                children: "$"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                                                                                lineNumber: 391,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                                                type: "number",
                                                                                step: "0.01",
                                                                                min: "0",
                                                                                value: price.amount,
                                                                                onChange: (e)=>updatePrice(strategy.id, price.id, {
                                                                                        amount: parseFloat(e.target.value) || 0
                                                                                    }),
                                                                                className: "h-7 text-sm pl-6",
                                                                                placeholder: "0.00"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                                                                                lineNumber: 392,
                                                                                columnNumber: 31
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                                                                        lineNumber: 390,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                                        type: "date",
                                                                        value: price.validFrom ? price.validFrom.toISOString().split('T')[0] : '',
                                                                        onChange: (e)=>updatePrice(strategy.id, price.id, {
                                                                                validFrom: e.target.value ? new Date(e.target.value) : undefined
                                                                            }),
                                                                        className: "h-7 text-sm",
                                                                        placeholder: "Valid from"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                                                                        lineNumber: 403,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                                        type: "date",
                                                                        value: price.validTo ? price.validTo.toISOString().split('T')[0] : '',
                                                                        onChange: (e)=>updatePrice(strategy.id, price.id, {
                                                                                validTo: e.target.value ? new Date(e.target.value) : undefined
                                                                            }),
                                                                        className: "h-7 text-sm",
                                                                        placeholder: "Valid to"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                                                                        lineNumber: 413,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                        value: price.currency,
                                                                        onChange: (e)=>updatePrice(strategy.id, price.id, {
                                                                                currency: e.target.value
                                                                            }),
                                                                        className: "h-7 px-2 text-sm border border-gray-300 rounded-md",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                value: "USD",
                                                                                children: "USD"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                                                                                lineNumber: 428,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                value: "EUR",
                                                                                children: "EUR"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                                                                                lineNumber: 429,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                value: "GBP",
                                                                                children: "GBP"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                                                                                lineNumber: 430,
                                                                                columnNumber: 31
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                                                                        lineNumber: 423,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                                                                lineNumber: 389,
                                                                columnNumber: 27
                                                            }, this),
                                                            strategy.prices.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                variant: "ghost",
                                                                size: "sm",
                                                                className: "h-7 w-7 p-0",
                                                                onClick: ()=>deletePrice(strategy.id, price.id),
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                    className: "h-3 w-3 text-red-600"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                                                                    lineNumber: 441,
                                                                    columnNumber: 31
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                                                                lineNumber: 435,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, price.id, true, {
                                                        fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                                                        lineNumber: 385,
                                                        columnNumber: 25
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                                                lineNumber: 383,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                                        lineNumber: 374,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                                lineNumber: 332,
                                columnNumber: 17
                            }, this)
                        ]
                    }, strategy.id, true, {
                        fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                        lineNumber: 265,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
                lineNumber: 263,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/menu/pricing-strategy-editor.tsx",
        lineNumber: 241,
        columnNumber: 5
    }, this);
}
_s(PricingStrategyEditor, "K5jpYtAb7pwuOr4mJGe/ItJWCkU=");
_c = PricingStrategyEditor;
var _c;
__turbopack_context__.k.register(_c, "PricingStrategyEditor");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/menu/channel-visibility-editor.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChannelVisibilityEditor",
    ()=>ChannelVisibilityEditor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye-off.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/settings.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$switch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/switch.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/badge.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
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
function ChannelVisibilityEditor(param) {
    let { channelVisibility, availableChannels, onChange, className } = param;
    _s();
    const [showAdvanced, setShowAdvanced] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    // Toggle advanced settings for a channel
    const toggleAdvanced = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ChannelVisibilityEditor.useCallback[toggleAdvanced]": (channelId)=>{
            setShowAdvanced({
                "ChannelVisibilityEditor.useCallback[toggleAdvanced]": (prev)=>prev.includes(channelId) ? prev.filter({
                        "ChannelVisibilityEditor.useCallback[toggleAdvanced]": (id)=>id !== channelId
                    }["ChannelVisibilityEditor.useCallback[toggleAdvanced]"]) : [
                        ...prev,
                        channelId
                    ]
            }["ChannelVisibilityEditor.useCallback[toggleAdvanced]"]);
        }
    }["ChannelVisibilityEditor.useCallback[toggleAdvanced]"], []);
    // Get or create channel visibility settings
    const getChannelSettings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ChannelVisibilityEditor.useCallback[getChannelSettings]": (channelId)=>{
            const existing = channelVisibility.find({
                "ChannelVisibilityEditor.useCallback[getChannelSettings].existing": (cv)=>cv.channelId === channelId
            }["ChannelVisibilityEditor.useCallback[getChannelSettings].existing"]);
            if (existing) return existing;
            return {
                channelId,
                isVisible: true
            };
        }
    }["ChannelVisibilityEditor.useCallback[getChannelSettings]"], [
        channelVisibility
    ]);
    // Update channel visibility
    const updateChannelVisibility = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ChannelVisibilityEditor.useCallback[updateChannelVisibility]": (channelId, updates)=>{
            const existing = channelVisibility.find({
                "ChannelVisibilityEditor.useCallback[updateChannelVisibility].existing": (cv)=>cv.channelId === channelId
            }["ChannelVisibilityEditor.useCallback[updateChannelVisibility].existing"]);
            if (existing) {
                // Update existing
                const updated = channelVisibility.map({
                    "ChannelVisibilityEditor.useCallback[updateChannelVisibility].updated": (cv)=>cv.channelId === channelId ? {
                            ...cv,
                            ...updates
                        } : cv
                }["ChannelVisibilityEditor.useCallback[updateChannelVisibility].updated"]);
                onChange(updated);
            } else {
                // Create new
                const newVisibility = {
                    channelId,
                    isVisible: true,
                    ...updates
                };
                onChange([
                    ...channelVisibility,
                    newVisibility
                ]);
            }
        }
    }["ChannelVisibilityEditor.useCallback[updateChannelVisibility]"], [
        channelVisibility,
        onChange
    ]);
    // Toggle day of week
    const toggleDayOfWeek = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ChannelVisibilityEditor.useCallback[toggleDayOfWeek]": (channelId, day)=>{
            const settings = getChannelSettings(channelId);
            const currentDays = settings.daysOfWeek || [];
            const newDays = currentDays.includes(day) ? currentDays.filter({
                "ChannelVisibilityEditor.useCallback[toggleDayOfWeek]": (d)=>d !== day
            }["ChannelVisibilityEditor.useCallback[toggleDayOfWeek]"]) : [
                ...currentDays,
                day
            ].sort();
            updateChannelVisibility(channelId, {
                daysOfWeek: newDays.length > 0 ? newDays : undefined
            });
        }
    }["ChannelVisibilityEditor.useCallback[toggleDayOfWeek]"], [
        getChannelSettings,
        updateChannelVisibility
    ]);
    const daysOfWeek = [
        {
            label: 'Sun',
            value: 0
        },
        {
            label: 'Mon',
            value: 1
        },
        {
            label: 'Tue',
            value: 2
        },
        {
            label: 'Wed',
            value: 3
        },
        {
            label: 'Thu',
            value: 4
        },
        {
            label: 'Fri',
            value: 5
        },
        {
            label: 'Sat',
            value: 6
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: className,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-sm font-semibold mb-1",
                        children: "Channel Visibility"
                    }, void 0, false, {
                        fileName: "[project]/components/menu/channel-visibility-editor.tsx",
                        lineNumber: 101,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-gray-500",
                        children: "Control which sales channels can see and order this item"
                    }, void 0, false, {
                        fileName: "[project]/components/menu/channel-visibility-editor.tsx",
                        lineNumber: 102,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/menu/channel-visibility-editor.tsx",
                lineNumber: 100,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-3",
                children: availableChannels.map((channel)=>{
                    const settings = getChannelSettings(channel.id);
                    const hasAdvancedSettings = settings.availableFrom || settings.availableTo || settings.daysOfWeek && settings.daysOfWeek.length > 0;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        className: "p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center space-x-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center space-x-2",
                                                children: [
                                                    settings.isVisible ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        className: "h-4 w-4 text-green-600"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/menu/channel-visibility-editor.tsx",
                                                        lineNumber: 121,
                                                        columnNumber: 23
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        className: "h-4 w-4 text-gray-400"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/menu/channel-visibility-editor.tsx",
                                                        lineNumber: 123,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-medium",
                                                        children: channel.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/menu/channel-visibility-editor.tsx",
                                                        lineNumber: 125,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/menu/channel-visibility-editor.tsx",
                                                lineNumber: 119,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                variant: "outline",
                                                className: "text-xs capitalize",
                                                children: channel.type.replace('_', ' ')
                                            }, void 0, false, {
                                                fileName: "[project]/components/menu/channel-visibility-editor.tsx",
                                                lineNumber: 128,
                                                columnNumber: 19
                                            }, this),
                                            hasAdvancedSettings && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                variant: "secondary",
                                                className: "text-xs",
                                                children: "Custom Schedule"
                                            }, void 0, false, {
                                                fileName: "[project]/components/menu/channel-visibility-editor.tsx",
                                                lineNumber: 133,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/menu/channel-visibility-editor.tsx",
                                        lineNumber: 118,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center space-x-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$switch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Switch"], {
                                                size: "sm",
                                                checked: settings.isVisible,
                                                onCheckedChange: (checked)=>updateChannelVisibility(channel.id, {
                                                        isVisible: checked
                                                    })
                                            }, void 0, false, {
                                                fileName: "[project]/components/menu/channel-visibility-editor.tsx",
                                                lineNumber: 140,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "ghost",
                                                size: "sm",
                                                className: "h-7 w-7 p-0",
                                                onClick: ()=>toggleAdvanced(channel.id),
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    className: "h-3 w-3"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/menu/channel-visibility-editor.tsx",
                                                    lineNumber: 154,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/menu/channel-visibility-editor.tsx",
                                                lineNumber: 148,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/menu/channel-visibility-editor.tsx",
                                        lineNumber: 139,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/menu/channel-visibility-editor.tsx",
                                lineNumber: 117,
                                columnNumber: 15
                            }, this),
                            showAdvanced.includes(channel.id) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4 border-t pt-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center space-x-2 mb-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        className: "h-4 w-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/menu/channel-visibility-editor.tsx",
                                                        lineNumber: 165,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        className: "text-sm font-medium",
                                                        children: "Time Availability"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/menu/channel-visibility-editor.tsx",
                                                        lineNumber: 166,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/menu/channel-visibility-editor.tsx",
                                                lineNumber: 164,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-2 gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "block text-xs font-medium mb-1 text-gray-600",
                                                                children: "Available From"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/menu/channel-visibility-editor.tsx",
                                                                lineNumber: 171,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                                type: "time",
                                                                value: settings.availableFrom || '',
                                                                onChange: (e)=>updateChannelVisibility(channel.id, {
                                                                        availableFrom: e.target.value || undefined
                                                                    }),
                                                                className: "h-8 text-sm"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/menu/channel-visibility-editor.tsx",
                                                                lineNumber: 174,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/menu/channel-visibility-editor.tsx",
                                                        lineNumber: 170,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "block text-xs font-medium mb-1 text-gray-600",
                                                                children: "Available To"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/menu/channel-visibility-editor.tsx",
                                                                lineNumber: 185,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                                type: "time",
                                                                value: settings.availableTo || '',
                                                                onChange: (e)=>updateChannelVisibility(channel.id, {
                                                                        availableTo: e.target.value || undefined
                                                                    }),
                                                                className: "h-8 text-sm"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/menu/channel-visibility-editor.tsx",
                                                                lineNumber: 188,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/menu/channel-visibility-editor.tsx",
                                                        lineNumber: 184,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/menu/channel-visibility-editor.tsx",
                                                lineNumber: 169,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-gray-500 mt-1",
                                                children: "Leave empty for all-day availability"
                                            }, void 0, false, {
                                                fileName: "[project]/components/menu/channel-visibility-editor.tsx",
                                                lineNumber: 199,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/menu/channel-visibility-editor.tsx",
                                        lineNumber: 163,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center space-x-2 mb-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        className: "h-4 w-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/menu/channel-visibility-editor.tsx",
                                                        lineNumber: 207,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        className: "text-sm font-medium",
                                                        children: "Day Availability"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/menu/channel-visibility-editor.tsx",
                                                        lineNumber: 208,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/menu/channel-visibility-editor.tsx",
                                                lineNumber: 206,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-wrap gap-2",
                                                children: daysOfWeek.map((day)=>{
                                                    var _settings_daysOfWeek;
                                                    const isSelected = (_settings_daysOfWeek = settings.daysOfWeek) === null || _settings_daysOfWeek === void 0 ? void 0 : _settings_daysOfWeek.includes(day.value);
                                                    const allDaysSelected = !settings.daysOfWeek || settings.daysOfWeek.length === 0;
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                        size: "sm",
                                                        variant: isSelected || allDaysSelected ? 'default' : 'outline',
                                                        className: "h-8 px-3 text-xs",
                                                        onClick: ()=>toggleDayOfWeek(channel.id, day.value),
                                                        children: day.label
                                                    }, day.value, false, {
                                                        fileName: "[project]/components/menu/channel-visibility-editor.tsx",
                                                        lineNumber: 217,
                                                        columnNumber: 27
                                                    }, this);
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/components/menu/channel-visibility-editor.tsx",
                                                lineNumber: 211,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between mt-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-gray-500",
                                                        children: !settings.daysOfWeek || settings.daysOfWeek.length === 0 ? 'Available all days' : "Available ".concat(settings.daysOfWeek.length, " day").concat(settings.daysOfWeek.length !== 1 ? 's' : '', " per week")
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/menu/channel-visibility-editor.tsx",
                                                        lineNumber: 231,
                                                        columnNumber: 23
                                                    }, this),
                                                    settings.daysOfWeek && settings.daysOfWeek.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                        size: "sm",
                                                        variant: "ghost",
                                                        className: "h-6 text-xs",
                                                        onClick: ()=>updateChannelVisibility(channel.id, {
                                                                daysOfWeek: undefined
                                                            }),
                                                        children: "Clear"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/menu/channel-visibility-editor.tsx",
                                                        lineNumber: 239,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/menu/channel-visibility-editor.tsx",
                                                lineNumber: 230,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/menu/channel-visibility-editor.tsx",
                                        lineNumber: 205,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex space-x-2 pt-2 border-t",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                size: "sm",
                                                variant: "outline",
                                                className: "text-xs",
                                                onClick: ()=>{
                                                    updateChannelVisibility(channel.id, {
                                                        availableFrom: '06:00',
                                                        availableTo: '22:00',
                                                        daysOfWeek: [
                                                            1,
                                                            2,
                                                            3,
                                                            4,
                                                            5
                                                        ]
                                                    });
                                                },
                                                children: "Business Hours"
                                            }, void 0, false, {
                                                fileName: "[project]/components/menu/channel-visibility-editor.tsx",
                                                lineNumber: 253,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                size: "sm",
                                                variant: "outline",
                                                className: "text-xs",
                                                onClick: ()=>{
                                                    updateChannelVisibility(channel.id, {
                                                        availableFrom: '17:00',
                                                        availableTo: '23:00',
                                                        daysOfWeek: undefined
                                                    });
                                                },
                                                children: "Dinner Only"
                                            }, void 0, false, {
                                                fileName: "[project]/components/menu/channel-visibility-editor.tsx",
                                                lineNumber: 268,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                size: "sm",
                                                variant: "outline",
                                                className: "text-xs",
                                                onClick: ()=>{
                                                    updateChannelVisibility(channel.id, {
                                                        availableFrom: undefined,
                                                        availableTo: undefined,
                                                        daysOfWeek: [
                                                            5,
                                                            6
                                                        ]
                                                    });
                                                },
                                                children: "Weekends"
                                            }, void 0, false, {
                                                fileName: "[project]/components/menu/channel-visibility-editor.tsx",
                                                lineNumber: 283,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                size: "sm",
                                                variant: "ghost",
                                                className: "text-xs text-red-600",
                                                onClick: ()=>{
                                                    updateChannelVisibility(channel.id, {
                                                        availableFrom: undefined,
                                                        availableTo: undefined,
                                                        daysOfWeek: undefined
                                                    });
                                                },
                                                children: "Reset"
                                            }, void 0, false, {
                                                fileName: "[project]/components/menu/channel-visibility-editor.tsx",
                                                lineNumber: 298,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/menu/channel-visibility-editor.tsx",
                                        lineNumber: 252,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/menu/channel-visibility-editor.tsx",
                                lineNumber: 161,
                                columnNumber: 17
                            }, this)
                        ]
                    }, channel.id, true, {
                        fileName: "[project]/components/menu/channel-visibility-editor.tsx",
                        lineNumber: 115,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/components/menu/channel-visibility-editor.tsx",
                lineNumber: 107,
                columnNumber: 7
            }, this),
            availableChannels.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center py-6 text-gray-500 border border-dashed border-gray-300 rounded-lg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm",
                        children: "No sales channels configured"
                    }, void 0, false, {
                        fileName: "[project]/components/menu/channel-visibility-editor.tsx",
                        lineNumber: 322,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-gray-400",
                        children: "Set up your sales channels to control visibility"
                    }, void 0, false, {
                        fileName: "[project]/components/menu/channel-visibility-editor.tsx",
                        lineNumber: 323,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/menu/channel-visibility-editor.tsx",
                lineNumber: 321,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/menu/channel-visibility-editor.tsx",
        lineNumber: 99,
        columnNumber: 5
    }, this);
}
_s(ChannelVisibilityEditor, "Nzsm+FCCDJzRyOmPTUbwZGbKjCc=");
_c = ChannelVisibilityEditor;
var _c;
__turbopack_context__.k.register(_c, "ChannelVisibilityEditor");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/menu/menu-item-editor.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MenuItemEditor",
    ()=>MenuItemEditor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/save.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/upload.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/info.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/dollar-sign.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/package.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/camera.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$switch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/switch.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/tabs.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$menu$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/menu/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$menu$2f$modifier$2d$group$2d$editor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/menu/modifier-group-editor.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$menu$2f$pricing$2d$strategy$2d$editor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/menu/pricing-strategy-editor.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$menu$2f$channel$2d$visibility$2d$editor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/menu/channel-visibility-editor.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
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
function MenuItemEditor(param) {
    let { item, isOpen, onClose, onSave, availableChannels = [], availableAllergens = [], availableGroups = [], loading = false, className } = param;
    var _formData_tags;
    _s();
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        name: '',
        description: '',
        basePrice: 0,
        sortOrder: 0,
        isActive: true,
        isAvailable: true,
        pricingStrategies: [],
        tags: [],
        allergens: [],
        dietaryRestrictions: [],
        media: [],
        channelVisibility: []
    });
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('basic');
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [isDirty, setIsDirty] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Initialize form data when item changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MenuItemEditor.useEffect": ()=>{
            if (item) {
                setFormData((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$menu$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deepClone"])(item));
            } else {
                setFormData({
                    name: '',
                    description: '',
                    basePrice: 0,
                    sortOrder: 0,
                    isActive: true,
                    isAvailable: true,
                    pricingStrategies: [],
                    tags: [],
                    allergens: [],
                    dietaryRestrictions: [],
                    media: [],
                    channelVisibility: []
                });
            }
            setIsDirty(false);
            setErrors({});
        }
    }["MenuItemEditor.useEffect"], [
        item
    ]);
    // Handle form field changes
    const handleChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MenuItemEditor.useCallback[handleChange]": (field, value)=>{
            setFormData({
                "MenuItemEditor.useCallback[handleChange]": (prev)=>({
                        ...prev,
                        [field]: value
                    })
            }["MenuItemEditor.useCallback[handleChange]"]);
            setIsDirty(true);
            // Clear field error when user starts typing
            if (errors[field]) {
                setErrors({
                    "MenuItemEditor.useCallback[handleChange]": (prev)=>{
                        const newErrors = {
                            ...prev
                        };
                        delete newErrors[field];
                        return newErrors;
                    }
                }["MenuItemEditor.useCallback[handleChange]"]);
            }
        }
    }["MenuItemEditor.useCallback[handleChange]"], [
        errors
    ]);
    // Validation
    const validate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MenuItemEditor.useCallback[validate]": ()=>{
            var _formData_name;
            const newErrors = {};
            if (!((_formData_name = formData.name) === null || _formData_name === void 0 ? void 0 : _formData_name.trim())) {
                newErrors.name = 'Name is required';
            }
            if (!formData.basePrice || formData.basePrice <= 0) {
                newErrors.basePrice = 'Price must be greater than 0';
            }
            setErrors(newErrors);
            return Object.keys(newErrors).length === 0;
        }
    }["MenuItemEditor.useCallback[validate]"], [
        formData
    ]);
    // Handle save
    const handleSave = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MenuItemEditor.useCallback[handleSave]": async ()=>{
            if (!validate()) return;
            try {
                await onSave(formData);
                setIsDirty(false);
            } catch (error) {
                console.error('Failed to save item:', error);
            }
        }
    }["MenuItemEditor.useCallback[handleSave]"], [
        formData,
        validate,
        onSave
    ]);
    // Handle close with confirmation
    const handleClose = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MenuItemEditor.useCallback[handleClose]": ()=>{
            if (isDirty) {
                const confirmed = window.confirm('You have unsaved changes. Are you sure you want to close?');
                if (!confirmed) return;
            }
            onClose();
        }
    }["MenuItemEditor.useCallback[handleClose]"], [
        isDirty,
        onClose
    ]);
    // Tag management
    const addTag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MenuItemEditor.useCallback[addTag]": (tag)=>{
            var _formData_tags;
            if (tag.trim() && !((_formData_tags = formData.tags) === null || _formData_tags === void 0 ? void 0 : _formData_tags.includes(tag.trim()))) {
                handleChange('tags', [
                    ...formData.tags || [],
                    tag.trim()
                ]);
            }
        }
    }["MenuItemEditor.useCallback[addTag]"], [
        formData.tags,
        handleChange
    ]);
    const removeTag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MenuItemEditor.useCallback[removeTag]": (tagToRemove)=>{
            var _formData_tags;
            handleChange('tags', ((_formData_tags = formData.tags) === null || _formData_tags === void 0 ? void 0 : _formData_tags.filter({
                "MenuItemEditor.useCallback[removeTag]": (tag)=>tag !== tagToRemove
            }["MenuItemEditor.useCallback[removeTag]"])) || []);
        }
    }["MenuItemEditor.useCallback[removeTag]"], [
        formData.tags,
        handleChange
    ]);
    // Allergen management
    const toggleAllergen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MenuItemEditor.useCallback[toggleAllergen]": (allergenId)=>{
            const allergens = formData.allergens || [];
            if (allergens.includes(allergenId)) {
                handleChange('allergens', allergens.filter({
                    "MenuItemEditor.useCallback[toggleAllergen]": (id)=>id !== allergenId
                }["MenuItemEditor.useCallback[toggleAllergen]"]));
            } else {
                handleChange('allergens', [
                    ...allergens,
                    allergenId
                ]);
            }
        }
    }["MenuItemEditor.useCallback[toggleAllergen]"], [
        formData.allergens,
        handleChange
    ]);
    // Dietary restrictions management
    const toggleDietaryRestriction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MenuItemEditor.useCallback[toggleDietaryRestriction]": (restriction)=>{
            const restrictions = formData.dietaryRestrictions || [];
            if (restrictions.includes(restriction)) {
                handleChange('dietaryRestrictions', restrictions.filter({
                    "MenuItemEditor.useCallback[toggleDietaryRestriction]": (r)=>r !== restriction
                }["MenuItemEditor.useCallback[toggleDietaryRestriction]"]));
            } else {
                handleChange('dietaryRestrictions', [
                    ...restrictions,
                    restriction
                ]);
            }
        }
    }["MenuItemEditor.useCallback[toggleDietaryRestriction]"], [
        formData.dietaryRestrictions,
        handleChange
    ]);
    if (!isOpen) return null;
    const tabs = [
        {
            id: 'basic',
            label: 'Basic Info',
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                className: "h-4 w-4"
            }, void 0, false, {
                fileName: "[project]/components/menu/menu-item-editor.tsx",
                lineNumber: 189,
                columnNumber: 47
            }, this)
        },
        {
            id: 'pricing',
            label: 'Pricing',
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                className: "h-4 w-4"
            }, void 0, false, {
                fileName: "[project]/components/menu/menu-item-editor.tsx",
                lineNumber: 190,
                columnNumber: 46
            }, this)
        },
        {
            id: 'availability',
            label: 'Availability',
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                className: "h-4 w-4"
            }, void 0, false, {
                fileName: "[project]/components/menu/menu-item-editor.tsx",
                lineNumber: 191,
                columnNumber: 56
            }, this)
        },
        {
            id: 'inventory',
            label: 'Inventory',
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                className: "h-4 w-4"
            }, void 0, false, {
                fileName: "[project]/components/menu/menu-item-editor.tsx",
                lineNumber: 192,
                columnNumber: 50
            }, this)
        },
        {
            id: 'modifiers',
            label: 'Modifiers',
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                className: "h-4 w-4"
            }, void 0, false, {
                fileName: "[project]/components/menu/menu-item-editor.tsx",
                lineNumber: 193,
                columnNumber: 50
            }, this)
        },
        {
            id: 'allergens',
            label: 'Allergens',
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                className: "h-4 w-4"
            }, void 0, false, {
                fileName: "[project]/components/menu/menu-item-editor.tsx",
                lineNumber: 194,
                columnNumber: 50
            }, this)
        },
        {
            id: 'media',
            label: 'Media',
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                className: "h-4 w-4"
            }, void 0, false, {
                fileName: "[project]/components/menu/menu-item-editor.tsx",
                lineNumber: 195,
                columnNumber: 42
            }, this)
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-black/50",
                onClick: handleClose
            }, void 0, false, {
                fileName: "[project]/components/menu/menu-item-editor.tsx",
                lineNumber: 201,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute right-0 top-0 h-full w-full max-w-2xl bg-white shadow-xl flex flex-col",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between px-6 py-4 border-b",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-xl font-semibold",
                                        children: item ? 'Edit Menu Item' : 'Create Menu Item'
                                    }, void 0, false, {
                                        fileName: "[project]/components/menu/menu-item-editor.tsx",
                                        lineNumber: 211,
                                        columnNumber: 13
                                    }, this),
                                    item && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-500 mt-1",
                                        children: [
                                            "ID: ",
                                            item.id
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/menu/menu-item-editor.tsx",
                                        lineNumber: 215,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/menu/menu-item-editor.tsx",
                                lineNumber: 210,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center space-x-2",
                                children: [
                                    isDirty && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                        variant: "secondary",
                                        className: "text-xs",
                                        children: "Unsaved changes"
                                    }, void 0, false, {
                                        fileName: "[project]/components/menu/menu-item-editor.tsx",
                                        lineNumber: 223,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        onClick: handleSave,
                                        disabled: loading,
                                        size: "sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                className: "h-4 w-4 mr-2"
                                            }, void 0, false, {
                                                fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                lineNumber: 232,
                                                columnNumber: 15
                                            }, this),
                                            "Save"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/menu/menu-item-editor.tsx",
                                        lineNumber: 227,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        onClick: handleClose,
                                        variant: "ghost",
                                        size: "sm",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            className: "h-4 w-4"
                                        }, void 0, false, {
                                            fileName: "[project]/components/menu/menu-item-editor.tsx",
                                            lineNumber: 240,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/menu/menu-item-editor.tsx",
                                        lineNumber: 235,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/menu/menu-item-editor.tsx",
                                lineNumber: 221,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/menu/menu-item-editor.tsx",
                        lineNumber: 209,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 flex flex-col overflow-hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tabs"], {
                                value: activeTab,
                                onValueChange: setActiveTab,
                                tabs: tabs,
                                className: "border-b"
                            }, void 0, false, {
                                fileName: "[project]/components/menu/menu-item-editor.tsx",
                                lineNumber: 248,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 overflow-y-auto p-6",
                                children: [
                                    activeTab === 'basic' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-sm font-medium mb-2",
                                                        children: "Item Name *"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                        lineNumber: 261,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                        value: formData.name || '',
                                                        onChange: (e)=>handleChange('name', e.target.value),
                                                        placeholder: "Enter item name",
                                                        error: errors.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                        lineNumber: 264,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                lineNumber: 260,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-sm font-medium mb-2",
                                                        children: "Description"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                        lineNumber: 274,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                        value: formData.description || '',
                                                        onChange: (e)=>handleChange('description', e.target.value),
                                                        placeholder: "Enter item description",
                                                        className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none",
                                                        rows: 3
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                        lineNumber: 277,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                lineNumber: 273,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-sm font-medium mb-2",
                                                        children: "Short Description"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                        lineNumber: 288,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                        value: formData.shortDescription || '',
                                                        onChange: (e)=>handleChange('shortDescription', e.target.value),
                                                        placeholder: "Brief description for POS/receipts"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                        lineNumber: 291,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                lineNumber: 287,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-2 gap-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium mb-2",
                                                                children: "SKU"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                                lineNumber: 301,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                                value: formData.sku || '',
                                                                onChange: (e)=>handleChange('sku', e.target.value),
                                                                placeholder: "Product SKU"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                                lineNumber: 304,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                        lineNumber: 300,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium mb-2",
                                                                children: "Barcode"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                                lineNumber: 311,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                                value: formData.barcode || '',
                                                                onChange: (e)=>handleChange('barcode', e.target.value),
                                                                placeholder: "Barcode"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                                lineNumber: 314,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                        lineNumber: 310,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                lineNumber: 299,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-sm font-medium mb-2",
                                                        children: "Menu Group"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                        lineNumber: 324,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        value: formData.menuGroupId || '',
                                                        onChange: (e)=>handleChange('menuGroupId', e.target.value),
                                                        className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "",
                                                                children: "Select a group"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                                lineNumber: 332,
                                                                columnNumber: 21
                                                            }, this),
                                                            availableGroups.map((group)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: group.id,
                                                                    children: group.name
                                                                }, group.id, false, {
                                                                    fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                                    lineNumber: 334,
                                                                    columnNumber: 23
                                                                }, this))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                        lineNumber: 327,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                lineNumber: 323,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-sm font-medium mb-2",
                                                        children: "Tags"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                        lineNumber: 343,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex flex-wrap gap-2 mb-2",
                                                        children: (_formData_tags = formData.tags) === null || _formData_tags === void 0 ? void 0 : _formData_tags.map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                variant: "secondary",
                                                                className: "px-2 py-1",
                                                                children: [
                                                                    tag,
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: ()=>removeTag(tag),
                                                                        className: "ml-1 text-gray-500 hover:text-gray-700",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                            className: "h-3 w-3"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                                            lineNumber: 358,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                                        lineNumber: 354,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, tag, true, {
                                                                fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                                lineNumber: 348,
                                                                columnNumber: 23
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                        lineNumber: 346,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex space-x-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                                placeholder: "Add tag",
                                                                onKeyDown: (e)=>{
                                                                    if (e.key === 'Enter') {
                                                                        addTag(e.currentTarget.value);
                                                                        e.currentTarget.value = '';
                                                                    }
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                                lineNumber: 364,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                size: "sm",
                                                                variant: "outline",
                                                                onClick: ()=>{
                                                                    const input = document.querySelector('input[placeholder="Add tag"]');
                                                                    if (input === null || input === void 0 ? void 0 : input.value) {
                                                                        addTag(input.value);
                                                                        input.value = '';
                                                                    }
                                                                },
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                    className: "h-3 w-3"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                                    lineNumber: 384,
                                                                    columnNumber: 23
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                                lineNumber: 373,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                        lineNumber: 363,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                lineNumber: 342,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-2 gap-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-between",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "text-sm font-medium",
                                                                children: "Active"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                                lineNumber: 392,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$switch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Switch"], {
                                                                checked: formData.isActive,
                                                                onCheckedChange: (checked)=>handleChange('isActive', checked)
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                                lineNumber: 393,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                        lineNumber: 391,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-between",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "text-sm font-medium",
                                                                children: "Available"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                                lineNumber: 399,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$switch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Switch"], {
                                                                checked: formData.isAvailable,
                                                                onCheckedChange: (checked)=>handleChange('isAvailable', checked)
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                                lineNumber: 400,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                        lineNumber: 398,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                lineNumber: 390,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/menu/menu-item-editor.tsx",
                                        lineNumber: 258,
                                        columnNumber: 15
                                    }, this),
                                    activeTab === 'pricing' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-sm font-medium mb-2",
                                                        children: "Base Price *"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                        lineNumber: 413,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "relative",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                                lineNumber: 417,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                                type: "number",
                                                                step: "0.01",
                                                                min: "0",
                                                                value: formData.basePrice || '',
                                                                onChange: (e)=>handleChange('basePrice', parseFloat(e.target.value) || 0),
                                                                placeholder: "0.00",
                                                                className: "pl-10",
                                                                error: errors.basePrice
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                                lineNumber: 418,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                        lineNumber: 416,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                lineNumber: 412,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-sm font-medium mb-2",
                                                        children: "Pricing Strategies"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                        lineNumber: 433,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$menu$2f$pricing$2d$strategy$2d$editor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PricingStrategyEditor"], {
                                                        strategies: formData.pricingStrategies || [],
                                                        onChange: (strategies)=>handleChange('pricingStrategies', strategies)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                        lineNumber: 436,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                lineNumber: 432,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-sm font-medium mb-2",
                                                        children: "Preparation Time (minutes)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                        lineNumber: 444,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "relative",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                                lineNumber: 448,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                                type: "number",
                                                                min: "0",
                                                                value: formData.preparationTime || '',
                                                                onChange: (e)=>handleChange('preparationTime', parseInt(e.target.value) || undefined),
                                                                placeholder: "15",
                                                                className: "pl-10"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                                lineNumber: 449,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                        lineNumber: 447,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                lineNumber: 443,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-sm font-medium mb-2",
                                                        children: "Cooking Instructions"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                        lineNumber: 462,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                        value: formData.cookingInstructions || '',
                                                        onChange: (e)=>handleChange('cookingInstructions', e.target.value),
                                                        placeholder: "Special cooking instructions",
                                                        className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none",
                                                        rows: 3
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                        lineNumber: 465,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                lineNumber: 461,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/menu/menu-item-editor.tsx",
                                        lineNumber: 410,
                                        columnNumber: 15
                                    }, this),
                                    activeTab === 'availability' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-6",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$menu$2f$channel$2d$visibility$2d$editor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChannelVisibilityEditor"], {
                                            channelVisibility: formData.channelVisibility || [],
                                            availableChannels: availableChannels,
                                            onChange: (visibility)=>handleChange('channelVisibility', visibility)
                                        }, void 0, false, {
                                            fileName: "[project]/components/menu/menu-item-editor.tsx",
                                            lineNumber: 478,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/menu/menu-item-editor.tsx",
                                        lineNumber: 477,
                                        columnNumber: 15
                                    }, this),
                                    activeTab === 'inventory' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "text-sm font-medium",
                                                                children: "Track Inventory"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                                lineNumber: 491,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-gray-500",
                                                                children: "Monitor stock levels for this item"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                                lineNumber: 492,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                        lineNumber: 490,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$switch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Switch"], {
                                                        checked: formData.trackInventory,
                                                        onCheckedChange: (checked)=>handleChange('trackInventory', checked)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                        lineNumber: 494,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                lineNumber: 489,
                                                columnNumber: 17
                                            }, this),
                                            formData.trackInventory && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium mb-2",
                                                                children: "Current Stock"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                                lineNumber: 504,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                                type: "number",
                                                                min: "0",
                                                                value: formData.stockQuantity || '',
                                                                onChange: (e)=>handleChange('stockQuantity', parseInt(e.target.value) || undefined),
                                                                placeholder: "0"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                                lineNumber: 507,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                        lineNumber: 503,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium mb-2",
                                                                children: "Low Stock Threshold"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                                lineNumber: 518,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                                type: "number",
                                                                min: "0",
                                                                value: formData.lowStockThreshold || '',
                                                                onChange: (e)=>handleChange('lowStockThreshold', parseInt(e.target.value) || undefined),
                                                                placeholder: "5"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                                lineNumber: 521,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-gray-500 mt-1",
                                                                children: "Get notified when stock falls below this level"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                                lineNumber: 528,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                        lineNumber: 517,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/menu/menu-item-editor.tsx",
                                        lineNumber: 487,
                                        columnNumber: 15
                                    }, this),
                                    activeTab === 'modifiers' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-6",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$menu$2f$modifier$2d$group$2d$editor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ModifierGroupEditor"], {
                                            modifierGroups: (item === null || item === void 0 ? void 0 : item.modifierGroups) || [],
                                            onChange: (groups)=>{
                                                // This would update the item's modifier groups
                                                // For now, just log as this requires more complex state management
                                                console.log('Modifier groups updated:', groups);
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/components/menu/menu-item-editor.tsx",
                                            lineNumber: 539,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/menu/menu-item-editor.tsx",
                                        lineNumber: 538,
                                        columnNumber: 15
                                    }, this),
                                    activeTab === 'allergens' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-sm font-medium mb-3",
                                                        children: "Allergens"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                        lineNumber: 554,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "grid grid-cols-2 gap-2",
                                                        children: availableAllergens.map((allergen)=>{
                                                            var _formData_allergens;
                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center space-x-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "checkbox",
                                                                        id: "allergen-".concat(allergen.id),
                                                                        checked: ((_formData_allergens = formData.allergens) === null || _formData_allergens === void 0 ? void 0 : _formData_allergens.includes(allergen.id)) || false,
                                                                        onChange: ()=>toggleAllergen(allergen.id),
                                                                        className: "rounded border-gray-300"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                                        lineNumber: 563,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        htmlFor: "allergen-".concat(allergen.id),
                                                                        className: "text-sm cursor-pointer",
                                                                        children: allergen.name
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                                        lineNumber: 570,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, allergen.id, true, {
                                                                fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                                lineNumber: 559,
                                                                columnNumber: 23
                                                            }, this);
                                                        })
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                        lineNumber: 557,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                lineNumber: 553,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-sm font-medium mb-3",
                                                        children: "Dietary Restrictions"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                        lineNumber: 583,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "grid grid-cols-2 gap-2",
                                                        children: [
                                                            'vegetarian',
                                                            'vegan',
                                                            'gluten-free',
                                                            'dairy-free',
                                                            'nut-free',
                                                            'keto',
                                                            'halal',
                                                            'kosher'
                                                        ].map((restriction)=>{
                                                            var _formData_dietaryRestrictions;
                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center space-x-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "checkbox",
                                                                        id: "restriction-".concat(restriction),
                                                                        checked: ((_formData_dietaryRestrictions = formData.dietaryRestrictions) === null || _formData_dietaryRestrictions === void 0 ? void 0 : _formData_dietaryRestrictions.includes(restriction)) || false,
                                                                        onChange: ()=>toggleDietaryRestriction(restriction),
                                                                        className: "rounded border-gray-300"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                                        lineNumber: 592,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        htmlFor: "restriction-".concat(restriction),
                                                                        className: "text-sm cursor-pointer capitalize",
                                                                        children: restriction.replace('-', ' ')
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                                        lineNumber: 599,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, restriction, true, {
                                                                fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                                lineNumber: 588,
                                                                columnNumber: 23
                                                            }, this);
                                                        })
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                        lineNumber: 586,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                lineNumber: 582,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-sm font-medium mb-2",
                                                        children: "Spice Level"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                        lineNumber: 612,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        value: formData.spiceLevel || '',
                                                        onChange: (e)=>handleChange('spiceLevel', e.target.value || undefined),
                                                        className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "",
                                                                children: "Not specified"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                                lineNumber: 620,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "none",
                                                                children: "No spice"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                                lineNumber: 621,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "mild",
                                                                children: "Mild"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                                lineNumber: 622,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "medium",
                                                                children: "Medium"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                                lineNumber: 623,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "hot",
                                                                children: "Hot"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                                lineNumber: 624,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "very_hot",
                                                                children: "Very Hot"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                                lineNumber: 625,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                        lineNumber: 615,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                lineNumber: 611,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/menu/menu-item-editor.tsx",
                                        lineNumber: 551,
                                        columnNumber: 15
                                    }, this),
                                    activeTab === 'media' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-6",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-sm font-medium mb-3",
                                                    children: "Item Images"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                    lineNumber: 634,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "border-2 border-dashed border-gray-300 rounded-lg p-8 text-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            className: "h-12 w-12 text-gray-400 mx-auto mb-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                            lineNumber: 640,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "text-lg font-medium text-gray-900 mb-2",
                                                            children: "Upload Images"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                            lineNumber: 641,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-gray-500 mb-4",
                                                            children: "Drag and drop images here, or click to select files"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                            lineNumber: 644,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                            variant: "outline",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                    className: "h-4 w-4 mr-2"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                                    lineNumber: 648,
                                                                    columnNumber: 23
                                                                }, this),
                                                                "Choose Files"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                            lineNumber: 647,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                    lineNumber: 639,
                                                    columnNumber: 19
                                                }, this),
                                                formData.media && formData.media.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-3 gap-4 mt-4",
                                                    children: formData.media.map((media, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "relative",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                    src: media.url,
                                                                    alt: media.alt,
                                                                    className: "w-full h-24 object-cover rounded border"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                                    lineNumber: 658,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                    size: "sm",
                                                                    variant: "destructive",
                                                                    className: "absolute top-1 right-1 h-6 w-6 p-0",
                                                                    onClick: ()=>{
                                                                        const newMedia = [
                                                                            ...formData.media
                                                                        ];
                                                                        newMedia.splice(index, 1);
                                                                        handleChange('media', newMedia);
                                                                    },
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                        className: "h-3 w-3"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                                        lineNumber: 673,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                                    lineNumber: 663,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, index, true, {
                                                            fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                            lineNumber: 657,
                                                            columnNumber: 25
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/components/menu/menu-item-editor.tsx",
                                                    lineNumber: 655,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/menu/menu-item-editor.tsx",
                                            lineNumber: 633,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/menu/menu-item-editor.tsx",
                                        lineNumber: 632,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/menu/menu-item-editor.tsx",
                                lineNumber: 256,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/menu/menu-item-editor.tsx",
                        lineNumber: 246,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/menu/menu-item-editor.tsx",
                lineNumber: 207,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/menu/menu-item-editor.tsx",
        lineNumber: 199,
        columnNumber: 5
    }, this);
}
_s(MenuItemEditor, "CqH1PwVJ+A/gspVPufoHl8iZ5uA=");
_c = MenuItemEditor;
var _c;
__turbopack_context__.k.register(_c, "MenuItemEditor");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/menu/data.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "bulkDeleteItems",
    ()=>bulkDeleteItems,
    "bulkUpdateItems",
    ()=>bulkUpdateItems,
    "createMenu",
    ()=>createMenu,
    "createMenuGroup",
    ()=>createMenuGroup,
    "createMenuItem",
    ()=>createMenuItem,
    "createModifierGroup",
    ()=>createModifierGroup,
    "createModifierOption",
    ()=>createModifierOption,
    "deleteMenu",
    ()=>deleteMenu,
    "deleteMenuGroup",
    ()=>deleteMenuGroup,
    "deleteMenuItem",
    ()=>deleteMenuItem,
    "deleteModifierGroup",
    ()=>deleteModifierGroup,
    "deleteModifierOption",
    ()=>deleteModifierOption,
    "getAllergens",
    ()=>getAllergens,
    "getMenu",
    ()=>getMenu,
    "getMenuGroup",
    ()=>getMenuGroup,
    "getMenuGroups",
    ()=>getMenuGroups,
    "getMenuItem",
    ()=>getMenuItem,
    "getMenuItems",
    ()=>getMenuItems,
    "getMenus",
    ()=>getMenus,
    "getModifierGroup",
    ()=>getModifierGroup,
    "getModifierGroups",
    ()=>getModifierGroups,
    "getSalesChannels",
    ()=>getSalesChannels,
    "moveItem",
    ()=>moveItem,
    "reorderGroups",
    ()=>reorderGroups,
    "reorderItems",
    ()=>reorderItems,
    "updateMenu",
    ()=>updateMenu,
    "updateMenuGroup",
    ()=>updateMenuGroup,
    "updateMenuItem",
    ()=>updateMenuItem,
    "updateModifierGroup",
    ()=>updateModifierGroup,
    "updateModifierOption",
    ()=>updateModifierOption
]);
// Mock data for development - replace with actual API calls
const delay = (ms)=>new Promise((resolve)=>setTimeout(resolve, ms));
// Sample data
const sampleAllergens = [
    {
        id: '1',
        name: 'Gluten',
        description: 'Contains gluten',
        severity: 'moderate'
    },
    {
        id: '2',
        name: 'Dairy',
        description: 'Contains dairy products',
        severity: 'moderate'
    },
    {
        id: '3',
        name: 'Nuts',
        description: 'Contains tree nuts',
        severity: 'severe'
    },
    {
        id: '4',
        name: 'Shellfish',
        description: 'Contains shellfish',
        severity: 'severe'
    },
    {
        id: '5',
        name: 'Eggs',
        description: 'Contains eggs',
        severity: 'mild'
    }
];
const sampleChannels = [
    {
        id: 'dine-in',
        name: 'Dine In',
        type: 'dine_in',
        isActive: true
    },
    {
        id: 'takeout',
        name: 'Takeout',
        type: 'takeout',
        isActive: true
    },
    {
        id: 'delivery',
        name: 'Delivery',
        type: 'delivery',
        isActive: true
    },
    {
        id: 'online',
        name: 'Online Ordering',
        type: 'online',
        isActive: true
    }
];
let mockMenus = [
    {
        id: '1',
        name: 'Main Menu',
        description: 'Our signature dishes and classics',
        type: 'main',
        sortOrder: 1,
        isActive: true,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-15'),
        media: [],
        channelVisibility: [
            {
                channelId: 'dine-in',
                isVisible: true
            },
            {
                channelId: 'takeout',
                isVisible: true
            }
        ],
        locationIds: [],
        groups: [
            {
                id: 'group-1',
                name: 'Appetizers',
                description: 'Start your meal right',
                sortOrder: 1,
                isActive: true,
                createdAt: new Date('2024-01-01'),
                updatedAt: new Date('2024-01-10'),
                media: [],
                channelVisibility: [],
                menuId: '1',
                items: [
                    {
                        id: 'item-1',
                        name: 'Buffalo Wings',
                        description: 'Crispy wings tossed in our signature buffalo sauce',
                        basePrice: 12.99,
                        sortOrder: 1,
                        isActive: true,
                        isAvailable: true,
                        createdAt: new Date('2024-01-01'),
                        updatedAt: new Date('2024-01-05'),
                        pricingStrategies: [],
                        tags: [
                            'spicy',
                            'popular'
                        ],
                        allergens: [],
                        dietaryRestrictions: [],
                        media: [],
                        channelVisibility: [],
                        modifierGroups: [
                            {
                                id: 'mod-group-1',
                                name: 'Sauce Options',
                                description: 'Choose your sauce',
                                isRequired: true,
                                minSelections: 1,
                                maxSelections: 1,
                                sortOrder: 1,
                                displayType: 'radio',
                                isActive: true,
                                createdAt: new Date('2024-01-01'),
                                updatedAt: new Date('2024-01-01'),
                                options: [
                                    {
                                        id: 'mod-opt-1',
                                        name: 'Buffalo',
                                        description: 'Classic buffalo sauce',
                                        price: 0,
                                        sortOrder: 1,
                                        isDefault: true,
                                        isActive: true,
                                        createdAt: new Date('2024-01-01'),
                                        updatedAt: new Date('2024-01-01'),
                                        pricingStrategies: [],
                                        allergens: [],
                                        media: []
                                    },
                                    {
                                        id: 'mod-opt-2',
                                        name: 'BBQ',
                                        description: 'Sweet and smoky BBQ sauce',
                                        price: 0,
                                        sortOrder: 2,
                                        isDefault: false,
                                        isActive: true,
                                        createdAt: new Date('2024-01-01'),
                                        updatedAt: new Date('2024-01-01'),
                                        pricingStrategies: [],
                                        allergens: [],
                                        media: []
                                    }
                                ]
                            }
                        ]
                    }
                ],
                subGroups: []
            }
        ]
    }
];
async function getMenus(params) {
    await delay(100);
    let filtered = [
        ...mockMenus
    ];
    // Apply filters
    if (params === null || params === void 0 ? void 0 : params.search) {
        const search = params.search.toLowerCase();
        filtered = filtered.filter((menu)=>{
            var _menu_description;
            return menu.name.toLowerCase().includes(search) || ((_menu_description = menu.description) === null || _menu_description === void 0 ? void 0 : _menu_description.toLowerCase().includes(search));
        });
    }
    if ((params === null || params === void 0 ? void 0 : params.isActive) !== undefined) {
        filtered = filtered.filter((menu)=>menu.isActive === params.isActive);
    }
    // Pagination
    const page = (params === null || params === void 0 ? void 0 : params.page) || 1;
    const limit = (params === null || params === void 0 ? void 0 : params.limit) || 10;
    const start = (page - 1) * limit;
    const end = start + limit;
    return {
        data: filtered.slice(start, end),
        total: filtered.length,
        page,
        limit
    };
}
async function getMenu(id) {
    await delay(100);
    return mockMenus.find((menu)=>menu.id === id) || null;
}
async function createMenu(data) {
    await delay(200);
    const newMenu = {
        ...data,
        id: "menu-".concat(Date.now()),
        createdAt: new Date(),
        updatedAt: new Date(),
        groups: []
    };
    mockMenus.push(newMenu);
    return newMenu;
}
async function updateMenu(id, data) {
    await delay(200);
    const index = mockMenus.findIndex((menu)=>menu.id === id);
    if (index === -1) return null;
    mockMenus[index] = {
        ...mockMenus[index],
        ...data,
        updatedAt: new Date()
    };
    return mockMenus[index];
}
async function deleteMenu(id) {
    await delay(200);
    const index = mockMenus.findIndex((menu)=>menu.id === id);
    if (index === -1) return false;
    mockMenus.splice(index, 1);
    return true;
}
async function getMenuGroups(menuId) {
    await delay(100);
    const menu = mockMenus.find((m)=>m.id === menuId);
    return (menu === null || menu === void 0 ? void 0 : menu.groups) || [];
}
async function getMenuGroup(id) {
    await delay(100);
    for (const menu of mockMenus){
        const group = findGroupRecursive(menu.groups, id);
        if (group) return group;
    }
    return null;
}
function findGroupRecursive(groups, id) {
    for (const group of groups){
        if (group.id === id) return group;
        const found = findGroupRecursive(group.subGroups, id);
        if (found) return found;
    }
    return null;
}
async function createMenuGroup(data) {
    await delay(200);
    const newGroup = {
        ...data,
        id: "group-".concat(Date.now()),
        createdAt: new Date(),
        updatedAt: new Date(),
        items: [],
        subGroups: []
    };
    // Add to appropriate menu
    const menu = mockMenus.find((m)=>m.id === data.menuId);
    if (menu) {
        if (data.parentGroupId) {
            const parentGroup = findGroupRecursive(menu.groups, data.parentGroupId);
            if (parentGroup) {
                parentGroup.subGroups.push(newGroup);
            }
        } else {
            menu.groups.push(newGroup);
        }
    }
    return newGroup;
}
async function updateMenuGroup(id, data) {
    await delay(200);
    for (const menu of mockMenus){
        const group = findGroupRecursive(menu.groups, id);
        if (group) {
            Object.assign(group, {
                ...data,
                updatedAt: new Date()
            });
            return group;
        }
    }
    return null;
}
async function deleteMenuGroup(id) {
    await delay(200);
    for (const menu of mockMenus){
        if (removeGroupRecursive(menu.groups, id)) {
            return true;
        }
    }
    return false;
}
function removeGroupRecursive(groups, id) {
    const index = groups.findIndex((group)=>group.id === id);
    if (index !== -1) {
        groups.splice(index, 1);
        return true;
    }
    for (const group of groups){
        if (removeGroupRecursive(group.subGroups, id)) {
            return true;
        }
    }
    return false;
}
async function getMenuItems(params) {
    await delay(100);
    let items = [];
    // Collect all items
    for (const menu of mockMenus){
        if ((params === null || params === void 0 ? void 0 : params.menuId) && menu.id !== params.menuId) continue;
        collectItemsRecursive(menu.groups, items, params === null || params === void 0 ? void 0 : params.groupId);
    }
    // Apply filters
    if (params === null || params === void 0 ? void 0 : params.filters) {
        items = applyMenuItemFilters(items, params.filters);
    }
    // Pagination
    const page = (params === null || params === void 0 ? void 0 : params.page) || 1;
    const limit = (params === null || params === void 0 ? void 0 : params.limit) || 20;
    const start = (page - 1) * limit;
    const end = start + limit;
    return {
        data: items.slice(start, end),
        total: items.length,
        page,
        limit
    };
}
function collectItemsRecursive(groups, items, targetGroupId) {
    for (const group of groups){
        if (!targetGroupId || group.id === targetGroupId) {
            items.push(...group.items);
        }
        if (!targetGroupId) {
            collectItemsRecursive(group.subGroups, items);
        }
    }
}
function applyMenuItemFilters(items, filters) {
    return items.filter((item)=>{
        var _filters_allergens, _filters_tags;
        if (filters.search) {
            var _item_description;
            const search = filters.search.toLowerCase();
            if (!item.name.toLowerCase().includes(search) && !((_item_description = item.description) === null || _item_description === void 0 ? void 0 : _item_description.toLowerCase().includes(search))) {
                return false;
            }
        }
        if (filters.isActive !== undefined && item.isActive !== filters.isActive) {
            return false;
        }
        if (filters.isAvailable !== undefined && item.isAvailable !== filters.isAvailable) {
            return false;
        }
        if (filters.priceRange) {
            if (item.basePrice < filters.priceRange[0] || item.basePrice > filters.priceRange[1]) {
                return false;
            }
        }
        if ((_filters_allergens = filters.allergens) === null || _filters_allergens === void 0 ? void 0 : _filters_allergens.length) {
            const hasAllergen = filters.allergens.some((allergen)=>item.allergens.includes(allergen));
            if (hasAllergen) return false;
        }
        if ((_filters_tags = filters.tags) === null || _filters_tags === void 0 ? void 0 : _filters_tags.length) {
            const hasTag = filters.tags.some((tag)=>item.tags.includes(tag));
            if (!hasTag) return false;
        }
        return true;
    });
}
async function getMenuItem(id) {
    await delay(100);
    for (const menu of mockMenus){
        const item = findItemRecursive(menu.groups, id);
        if (item) return item;
    }
    return null;
}
function findItemRecursive(groups, id) {
    for (const group of groups){
        const item = group.items.find((item)=>item.id === id);
        if (item) return item;
        const found = findItemRecursive(group.subGroups, id);
        if (found) return found;
    }
    return null;
}
async function createMenuItem(data) {
    await delay(200);
    const newItem = {
        ...data,
        id: "item-".concat(Date.now()),
        createdAt: new Date(),
        updatedAt: new Date(),
        modifierGroups: []
    };
    // Add to appropriate group
    if (data.menuGroupId) {
        for (const menu of mockMenus){
            const group = findGroupRecursive(menu.groups, data.menuGroupId);
            if (group) {
                group.items.push(newItem);
                break;
            }
        }
    }
    return newItem;
}
async function updateMenuItem(id, data) {
    await delay(200);
    for (const menu of mockMenus){
        const item = findItemRecursive(menu.groups, id);
        if (item) {
            Object.assign(item, {
                ...data,
                updatedAt: new Date()
            });
            return item;
        }
    }
    return null;
}
async function deleteMenuItem(id) {
    await delay(200);
    for (const menu of mockMenus){
        if (removeItemRecursive(menu.groups, id)) {
            return true;
        }
    }
    return false;
}
function removeItemRecursive(groups, id) {
    for (const group of groups){
        const index = group.items.findIndex((item)=>item.id === id);
        if (index !== -1) {
            group.items.splice(index, 1);
            return true;
        }
        if (removeItemRecursive(group.subGroups, id)) {
            return true;
        }
    }
    return false;
}
async function getModifierGroups(itemId) {
    await delay(100);
    const item = await getMenuItem(itemId);
    return (item === null || item === void 0 ? void 0 : item.modifierGroups) || [];
}
async function createModifierGroup(itemId, data) {
    await delay(200);
    const newGroup = {
        ...data,
        id: "mod-group-".concat(Date.now()),
        createdAt: new Date(),
        updatedAt: new Date(),
        options: []
    };
    // Add to item
    const item = await getMenuItem(itemId);
    if (item) {
        item.modifierGroups.push(newGroup);
    }
    return newGroup;
}
async function updateModifierGroup(id, data) {
    await delay(200);
    for (const menu of mockMenus){
        const group = findModifierGroupRecursive(menu.groups, id);
        if (group) {
            Object.assign(group, {
                ...data,
                updatedAt: new Date()
            });
            return group;
        }
    }
    return null;
}
function findModifierGroupRecursive(menuGroups, id) {
    for (const group of menuGroups){
        for (const item of group.items){
            const modGroup = item.modifierGroups.find((mg)=>mg.id === id);
            if (modGroup) return modGroup;
        }
        const found = findModifierGroupRecursive(group.subGroups, id);
        if (found) return found;
    }
    return null;
}
async function deleteModifierGroup(id) {
    await delay(200);
    for (const menu of mockMenus){
        if (removeModifierGroupRecursive(menu.groups, id)) {
            return true;
        }
    }
    return false;
}
function removeModifierGroupRecursive(menuGroups, id) {
    for (const group of menuGroups){
        for (const item of group.items){
            const index = item.modifierGroups.findIndex((mg)=>mg.id === id);
            if (index !== -1) {
                item.modifierGroups.splice(index, 1);
                return true;
            }
        }
        if (removeModifierGroupRecursive(group.subGroups, id)) {
            return true;
        }
    }
    return false;
}
async function createModifierOption(groupId, data) {
    await delay(200);
    const newOption = {
        ...data,
        id: "mod-opt-".concat(Date.now()),
        createdAt: new Date(),
        updatedAt: new Date()
    };
    // Add to group
    const group = await getModifierGroup(groupId);
    if (group) {
        group.options.push(newOption);
    }
    return newOption;
}
async function getModifierGroup(id) {
    await delay(100);
    for (const menu of mockMenus){
        const group = findModifierGroupRecursive(menu.groups, id);
        if (group) return group;
    }
    return null;
}
async function updateModifierOption(id, data) {
    await delay(200);
    for (const menu of mockMenus){
        const option = findModifierOptionRecursive(menu.groups, id);
        if (option) {
            Object.assign(option, {
                ...data,
                updatedAt: new Date()
            });
            return option;
        }
    }
    return null;
}
function findModifierOptionRecursive(menuGroups, id) {
    for (const group of menuGroups){
        for (const item of group.items){
            for (const modGroup of item.modifierGroups){
                const option = modGroup.options.find((opt)=>opt.id === id);
                if (option) return option;
            }
        }
        const found = findModifierOptionRecursive(group.subGroups, id);
        if (found) return found;
    }
    return null;
}
async function deleteModifierOption(id) {
    await delay(200);
    for (const menu of mockMenus){
        if (removeModifierOptionRecursive(menu.groups, id)) {
            return true;
        }
    }
    return false;
}
function removeModifierOptionRecursive(menuGroups, id) {
    for (const group of menuGroups){
        for (const item of group.items){
            for (const modGroup of item.modifierGroups){
                const index = modGroup.options.findIndex((opt)=>opt.id === id);
                if (index !== -1) {
                    modGroup.options.splice(index, 1);
                    return true;
                }
            }
        }
        if (removeModifierOptionRecursive(group.subGroups, id)) {
            return true;
        }
    }
    return false;
}
async function getSalesChannels() {
    await delay(50);
    return [
        ...sampleChannels
    ];
}
async function getAllergens() {
    await delay(50);
    return [
        ...sampleAllergens
    ];
}
async function reorderItems(groupId, itemIds) {
    await delay(200);
    const group = await getMenuGroup(groupId);
    if (!group) return false;
    // Update sort orders based on new position
    group.items.sort((a, b)=>{
        const aIndex = itemIds.indexOf(a.id);
        const bIndex = itemIds.indexOf(b.id);
        return aIndex - bIndex;
    });
    group.items.forEach((item, index)=>{
        item.sortOrder = index + 1;
        item.updatedAt = new Date();
    });
    return true;
}
async function reorderGroups(menuId, groupIds) {
    await delay(200);
    const menu = await getMenu(menuId);
    if (!menu) return false;
    // Update sort orders based on new position
    menu.groups.sort((a, b)=>{
        const aIndex = groupIds.indexOf(a.id);
        const bIndex = groupIds.indexOf(b.id);
        return aIndex - bIndex;
    });
    menu.groups.forEach((group, index)=>{
        group.sortOrder = index + 1;
        group.updatedAt = new Date();
    });
    return true;
}
async function moveItem(itemId, targetGroupId) {
    await delay(200);
    // Find and remove item from current location
    let item = null;
    for (const menu of mockMenus){
        if (removeItemRecursive(menu.groups, itemId)) {
            item = await getMenuItem(itemId);
            break;
        }
    }
    if (!item) return false;
    // Add to new group
    const targetGroup = await getMenuGroup(targetGroupId);
    if (!targetGroup) return false;
    item.menuGroupId = targetGroupId;
    item.updatedAt = new Date();
    targetGroup.items.push(item);
    return true;
}
async function bulkUpdateItems(itemIds, updates) {
    await delay(300);
    const updatedItems = [];
    for (const itemId of itemIds){
        const item = await updateMenuItem(itemId, updates);
        if (item) {
            updatedItems.push(item);
        }
    }
    return updatedItems;
}
async function bulkDeleteItems(itemIds) {
    await delay(300);
    let allDeleted = true;
    for (const itemId of itemIds){
        const deleted = await deleteMenuItem(itemId);
        if (!deleted) {
            allDeleted = false;
        }
    }
    return allDeleted;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/menu/menu-management-client.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MenuManagementClient",
    ()=>MenuManagementClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/alert.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$menu$2f$menu$2d$tree$2d$navigator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/menu/menu-tree-navigator.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$menu$2f$menu$2d$items$2d$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/menu/menu-items-table.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$menu$2f$menu$2d$item$2d$editor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/menu/menu-item-editor.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$menu$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/menu/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$menu$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/menu/data.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
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
function MenuManagementClient(param) {
    let { initialMenus, availableChannels, availableAllergens } = param;
    _s();
    // State
    const [menus, setMenus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialMenus);
    const [menuItems, setMenuItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedNode, setSelectedNode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedItems, setSelectedItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [expandedNodes, setExpandedNodes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialMenus.map({
        "MenuManagementClient.useState": (menu)=>menu.id
    }["MenuManagementClient.useState"]));
    const [filters, setFilters] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [currentChannel, setCurrentChannel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('dine-in');
    const [showItemEditor, setShowItemEditor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editingItem, setEditingItem] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isPending, startTransition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransition"])();
    // Build tree structure
    const menuTree = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MenuManagementClient.useMemo[menuTree]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$menu$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildMenuTree"])(menus)
    }["MenuManagementClient.useMemo[menuTree]"], [
        menus
    ]);
    // Get available menu groups for dropdown
    const availableGroups = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MenuManagementClient.useMemo[availableGroups]": ()=>{
            const groups = [];
            const collectGroups = {
                "MenuManagementClient.useMemo[availableGroups].collectGroups": (menuGroups, menuId)=>{
                    menuGroups.forEach({
                        "MenuManagementClient.useMemo[availableGroups].collectGroups": (group)=>{
                            groups.push({
                                id: group.id,
                                name: group.name,
                                menuId
                            });
                            collectGroups(group.subGroups, menuId);
                        }
                    }["MenuManagementClient.useMemo[availableGroups].collectGroups"]);
                }
            }["MenuManagementClient.useMemo[availableGroups].collectGroups"];
            menus.forEach({
                "MenuManagementClient.useMemo[availableGroups]": (menu)=>{
                    collectGroups(menu.groups, menu.id);
                }
            }["MenuManagementClient.useMemo[availableGroups]"]);
            return groups;
        }
    }["MenuManagementClient.useMemo[availableGroups]"], [
        menus
    ]);
    // Fetch menu items based on current selection and filters
    const fetchMenuItems = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MenuManagementClient.useCallback[fetchMenuItems]": async ()=>{
            setLoading(true);
            setError(null);
            try {
                const params = {
                    page: 1,
                    limit: 100,
                    filters
                };
                if (selectedNode) {
                    if (selectedNode.type === 'menu') {
                        params.menuId = selectedNode.id;
                    } else if (selectedNode.type === 'group') {
                        params.groupId = selectedNode.id;
                    }
                }
                const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$menu$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMenuItems"])(params);
                setMenuItems(result.data);
            } catch (error) {
                console.error('Failed to fetch menu items:', error);
                setError('Failed to load menu items. Please try again.');
            } finally{
                setLoading(false);
            }
        }
    }["MenuManagementClient.useCallback[fetchMenuItems]"], [
        selectedNode,
        filters
    ]);
    // Fetch menu items when selection or filters change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MenuManagementClient.useEffect": ()=>{
            fetchMenuItems();
        }
    }["MenuManagementClient.useEffect"], [
        fetchMenuItems
    ]);
    // Handle node selection in tree
    const handleNodeSelect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MenuManagementClient.useCallback[handleNodeSelect]": (node)=>{
            setSelectedNode(node);
            setSelectedItems([]);
        }
    }["MenuManagementClient.useCallback[handleNodeSelect]"], []);
    // Handle node expansion in tree
    const handleNodeExpand = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MenuManagementClient.useCallback[handleNodeExpand]": (id, expanded)=>{
            setExpandedNodes({
                "MenuManagementClient.useCallback[handleNodeExpand]": (prev)=>expanded ? [
                        ...prev,
                        id
                    ] : prev.filter({
                        "MenuManagementClient.useCallback[handleNodeExpand]": (nodeId)=>nodeId !== id
                    }["MenuManagementClient.useCallback[handleNodeExpand]"])
            }["MenuManagementClient.useCallback[handleNodeExpand]"]);
        }
    }["MenuManagementClient.useCallback[handleNodeExpand]"], []);
    // Handle creating new items
    const handleCreateItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MenuManagementClient.useCallback[handleCreateItem]": ()=>{
            setEditingItem(null);
            setShowItemEditor(true);
        }
    }["MenuManagementClient.useCallback[handleCreateItem]"], []);
    // Handle editing item
    const handleEditItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MenuManagementClient.useCallback[handleEditItem]": (item)=>{
            setEditingItem(item);
            setShowItemEditor(true);
        }
    }["MenuManagementClient.useCallback[handleEditItem]"], []);
    // Handle item click
    const handleItemClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MenuManagementClient.useCallback[handleItemClick]": (item)=>{
            handleEditItem(item);
        }
    }["MenuManagementClient.useCallback[handleItemClick]"], [
        handleEditItem
    ]);
    // Handle copying item
    const handleCopyItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MenuManagementClient.useCallback[handleCopyItem]": (item)=>{
            const copiedItem = {
                ...item,
                name: "".concat(item.name, " (Copy)"),
                id: undefined,
                createdAt: undefined,
                updatedAt: undefined
            };
            setEditingItem(copiedItem);
            setShowItemEditor(true);
        }
    }["MenuManagementClient.useCallback[handleCopyItem]"], []);
    // Handle deleting item
    const handleDeleteItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MenuManagementClient.useCallback[handleDeleteItem]": async (item)=>{
            if (!window.confirm('Are you sure you want to delete "'.concat(item.name, '"?'))) {
                return;
            }
            try {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$menu$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteMenuItem"])(item.id);
                await fetchMenuItems();
            } catch (error) {
                console.error('Failed to delete item:', error);
                setError('Failed to delete item. Please try again.');
            }
        }
    }["MenuManagementClient.useCallback[handleDeleteItem]"], [
        fetchMenuItems
    ]);
    // Handle toggling item visibility
    const handleToggleItemVisibility = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MenuManagementClient.useCallback[handleToggleItemVisibility]": async (item)=>{
            try {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$menu$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateMenuItem"])(item.id, {
                    isActive: !item.isActive
                });
                await fetchMenuItems();
            } catch (error) {
                console.error('Failed to update item visibility:', error);
                setError('Failed to update item visibility. Please try again.');
            }
        }
    }["MenuManagementClient.useCallback[handleToggleItemVisibility]"], [
        fetchMenuItems
    ]);
    // Handle saving item
    const handleSaveItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MenuManagementClient.useCallback[handleSaveItem]": async (data)=>{
            try {
                if (editingItem) {
                    // Update existing item
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$menu$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateMenuItem"])(editingItem.id, data);
                } else {
                    // Create new item
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$menu$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createMenuItem"])(data);
                }
                setShowItemEditor(false);
                setEditingItem(null);
                await fetchMenuItems();
            } catch (error) {
                console.error('Failed to save item:', error);
                throw new Error('Failed to save item. Please try again.');
            }
        }
    }["MenuManagementClient.useCallback[handleSaveItem]"], [
        editingItem,
        fetchMenuItems
    ]);
    // Handle selection change
    const handleSelectionChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MenuManagementClient.useCallback[handleSelectionChange]": (selectedIds)=>{
            setSelectedItems(selectedIds);
        }
    }["MenuManagementClient.useCallback[handleSelectionChange]"], []);
    // Handle bulk actions
    const handleBulkShow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MenuManagementClient.useCallback[handleBulkShow]": async ()=>{
            if (selectedItems.length === 0) return;
            try {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$menu$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bulkUpdateItems"])(selectedItems, {
                    isActive: true
                });
                await fetchMenuItems();
                setSelectedItems([]);
            } catch (error) {
                console.error('Failed to bulk update items:', error);
                setError('Failed to update items. Please try again.');
            }
        }
    }["MenuManagementClient.useCallback[handleBulkShow]"], [
        selectedItems,
        fetchMenuItems
    ]);
    const handleBulkHide = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MenuManagementClient.useCallback[handleBulkHide]": async ()=>{
            if (selectedItems.length === 0) return;
            try {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$menu$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bulkUpdateItems"])(selectedItems, {
                    isActive: false
                });
                await fetchMenuItems();
                setSelectedItems([]);
            } catch (error) {
                console.error('Failed to bulk update items:', error);
                setError('Failed to update items. Please try again.');
            }
        }
    }["MenuManagementClient.useCallback[handleBulkHide]"], [
        selectedItems,
        fetchMenuItems
    ]);
    const handleBulkDelete = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MenuManagementClient.useCallback[handleBulkDelete]": async ()=>{
            if (selectedItems.length === 0) return;
            const confirmed = window.confirm("Are you sure you want to delete ".concat(selectedItems.length, " item").concat(selectedItems.length !== 1 ? 's' : '', "?"));
            if (!confirmed) return;
            try {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$menu$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bulkDeleteItems"])(selectedItems);
                await fetchMenuItems();
                setSelectedItems([]);
            } catch (error) {
                console.error('Failed to bulk delete items:', error);
                setError('Failed to delete items. Please try again.');
            }
        }
    }["MenuManagementClient.useCallback[handleBulkDelete]"], [
        selectedItems,
        fetchMenuItems
    ]);
    // Handle refresh
    const handleRefresh = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MenuManagementClient.useCallback[handleRefresh]": async ()=>{
            setLoading(true);
            try {
                const [menusResult] = await Promise.all([
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$menu$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMenus"])({
                        page: 1,
                        limit: 50
                    }),
                    fetchMenuItems()
                ]);
                setMenus(menusResult.data);
            } catch (error) {
                console.error('Failed to refresh data:', error);
                setError('Failed to refresh data. Please try again.');
            } finally{
                setLoading(false);
            }
        }
    }["MenuManagementClient.useCallback[handleRefresh]"], [
        fetchMenuItems
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Alert"], {
                variant: "destructive",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/components/menu/menu-management-client.tsx",
                            lineNumber: 294,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "ghost",
                            size: "sm",
                            onClick: ()=>setError(null),
                            children: "Dismiss"
                        }, void 0, false, {
                            fileName: "[project]/components/menu/menu-management-client.tsx",
                            lineNumber: 295,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/menu/menu-management-client.tsx",
                    lineNumber: 293,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/menu/menu-management-client.tsx",
                lineNumber: 292,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center space-x-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center space-x-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-sm font-medium",
                                        children: "Channel:"
                                    }, void 0, false, {
                                        fileName: "[project]/components/menu/menu-management-client.tsx",
                                        lineNumber: 311,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: currentChannel,
                                        onChange: (e)=>setCurrentChannel(e.target.value),
                                        className: "px-3 py-1 border border-gray-300 rounded-md text-sm",
                                        children: availableChannels.map((channel)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: channel.id,
                                                children: channel.name
                                            }, channel.id, false, {
                                                fileName: "[project]/components/menu/menu-management-client.tsx",
                                                lineNumber: 318,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/menu/menu-management-client.tsx",
                                        lineNumber: 312,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/menu/menu-management-client.tsx",
                                lineNumber: 310,
                                columnNumber: 11
                            }, this),
                            Object.keys(filters).length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center space-x-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                        variant: "secondary",
                                        children: [
                                            Object.keys(filters).length,
                                            " filter",
                                            Object.keys(filters).length !== 1 ? 's' : ''
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/menu/menu-management-client.tsx",
                                        lineNumber: 328,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        size: "sm",
                                        variant: "ghost",
                                        onClick: ()=>setFilters({}),
                                        children: "Clear"
                                    }, void 0, false, {
                                        fileName: "[project]/components/menu/menu-management-client.tsx",
                                        lineNumber: 331,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/menu/menu-management-client.tsx",
                                lineNumber: 327,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/menu/menu-management-client.tsx",
                        lineNumber: 308,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center space-x-2",
                        children: [
                            selectedItems.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                        variant: "secondary",
                                        children: [
                                            selectedItems.length,
                                            " selected"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/menu/menu-management-client.tsx",
                                        lineNumber: 346,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        size: "sm",
                                        variant: "outline",
                                        onClick: handleBulkShow,
                                        children: "Show"
                                    }, void 0, false, {
                                        fileName: "[project]/components/menu/menu-management-client.tsx",
                                        lineNumber: 349,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        size: "sm",
                                        variant: "outline",
                                        onClick: handleBulkHide,
                                        children: "Hide"
                                    }, void 0, false, {
                                        fileName: "[project]/components/menu/menu-management-client.tsx",
                                        lineNumber: 352,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        size: "sm",
                                        variant: "outline",
                                        className: "text-red-600",
                                        onClick: handleBulkDelete,
                                        children: "Delete"
                                    }, void 0, false, {
                                        fileName: "[project]/components/menu/menu-management-client.tsx",
                                        lineNumber: 355,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                size: "sm",
                                variant: "outline",
                                onClick: handleRefresh,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        className: "h-4 w-4 mr-2"
                                    }, void 0, false, {
                                        fileName: "[project]/components/menu/menu-management-client.tsx",
                                        lineNumber: 367,
                                        columnNumber: 13
                                    }, this),
                                    "Refresh"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/menu/menu-management-client.tsx",
                                lineNumber: 366,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                size: "sm",
                                onClick: handleCreateItem,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        className: "h-4 w-4 mr-2"
                                    }, void 0, false, {
                                        fileName: "[project]/components/menu/menu-management-client.tsx",
                                        lineNumber: 372,
                                        columnNumber: 13
                                    }, this),
                                    "Add Item"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/menu/menu-management-client.tsx",
                                lineNumber: 371,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/menu/menu-management-client.tsx",
                        lineNumber: 342,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/menu/menu-management-client.tsx",
                lineNumber: 307,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 lg:grid-cols-4 gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:col-span-1",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$menu$2f$menu$2d$tree$2d$navigator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MenuTreeNavigator"], {
                            data: menuTree,
                            selectedId: selectedNode === null || selectedNode === void 0 ? void 0 : selectedNode.id,
                            expandedIds: expandedNodes,
                            onSelect: handleNodeSelect,
                            onExpand: handleNodeExpand,
                            searchable: true,
                            showActions: true,
                            className: "sticky top-6"
                        }, void 0, false, {
                            fileName: "[project]/components/menu/menu-management-client.tsx",
                            lineNumber: 382,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/menu/menu-management-client.tsx",
                        lineNumber: 381,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:col-span-3",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$menu$2f$menu$2d$items$2d$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MenuItemsTable"], {
                            data: menuItems,
                            loading: loading,
                            selectedIds: selectedItems,
                            filters: filters,
                            onItemClick: handleItemClick,
                            onEdit: handleEditItem,
                            onCopy: handleCopyItem,
                            onDelete: handleDeleteItem,
                            onToggleVisibility: handleToggleItemVisibility,
                            onSelectionChange: handleSelectionChange,
                            onFiltersChange: setFilters,
                            onCreate: handleCreateItem,
                            channel: currentChannel,
                            showBulkActions: true
                        }, void 0, false, {
                            fileName: "[project]/components/menu/menu-management-client.tsx",
                            lineNumber: 396,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/menu/menu-management-client.tsx",
                        lineNumber: 395,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/menu/menu-management-client.tsx",
                lineNumber: 379,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$menu$2f$menu$2d$item$2d$editor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MenuItemEditor"], {
                item: editingItem,
                isOpen: showItemEditor,
                onClose: ()=>{
                    setShowItemEditor(false);
                    setEditingItem(null);
                },
                onSave: handleSaveItem,
                availableChannels: availableChannels,
                availableAllergens: availableAllergens,
                availableGroups: availableGroups,
                loading: isPending
            }, void 0, false, {
                fileName: "[project]/components/menu/menu-management-client.tsx",
                lineNumber: 416,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/menu/menu-management-client.tsx",
        lineNumber: 289,
        columnNumber: 5
    }, this);
}
_s(MenuManagementClient, "L/n/HKn2+KnwA5q1R/iaHflCmfM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransition"]
    ];
});
_c = MenuManagementClient;
var _c;
__turbopack_context__.k.register(_c, "MenuManagementClient");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_0d92d193._.js.map