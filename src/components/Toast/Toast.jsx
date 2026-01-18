import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

const Toast = ({ id, message, type, onClose }) => {
    const icons = {
        success: 'check_circle',
        error: 'error',
        warning: 'warning',
        info: 'info'
    };

    const colors = {
        success: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white',
        error: 'bg-gradient-to-r from-red-500 to-rose-500 text-white',
        warning: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white',
        info: 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
    };

    const iconBg = {
        success: 'bg-white/20',
        error: 'bg-white/20',
        warning: 'bg-white/20',
        info: 'bg-white/20'
    };

    return (
        <div
            className={`
                ${colors[type]} 
                flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg
                animate-slide-in backdrop-blur-sm
                min-w-[320px] max-w-md
            `}
            style={{
                animation: 'slideIn 0.3s ease-out forwards'
            }}
        >
            <div className={`${iconBg[type]} p-2 rounded-lg`}>
                <span className="material-symbols-outlined text-[24px]">
                    {icons[type]}
                </span>
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium leading-5">{message}</p>
            </div>
            <button
                onClick={() => onClose(id)}
                className="p-1 hover:bg-white/20 rounded-lg transition-colors flex-shrink-0"
            >
                <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
        </div>
    );
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = 'info', duration = 3000) => {
        const id = Date.now() + Math.random();

        setToasts(prev => [...prev, { id, message, type }]);

        if (duration > 0) {
            setTimeout(() => {
                removeToast(id);
            }, duration);
        }

        return id;
    }, []);

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    }, []);

    const success = useCallback((message, duration) => {
        return addToast(message, 'success', duration);
    }, [addToast]);

    const error = useCallback((message, duration) => {
        return addToast(message, 'error', duration);
    }, [addToast]);

    const warning = useCallback((message, duration) => {
        return addToast(message, 'warning', duration);
    }, [addToast]);

    const info = useCallback((message, duration) => {
        return addToast(message, 'info', duration);
    }, [addToast]);

    return (
        <ToastContext.Provider value={{ addToast, removeToast, success, error, warning, info }}>
            {children}

            {/* Toast Container */}
            <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-3">
                {toasts.map(toast => (
                    <Toast
                        key={toast.id}
                        id={toast.id}
                        message={toast.message}
                        type={toast.type}
                        onClose={removeToast}
                    />
                ))}
            </div>

            {/* Animation Styles */}
            <style>{`
                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translateX(100%);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
            `}</style>
        </ToastContext.Provider>
    );
};

export default ToastProvider;
