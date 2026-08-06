// FILE: src/components/Toast.tsx
import { useEffect, useState, useCallback, createContext, useContext, useRef } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

type ToastType = 'success' | 'error';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue>({ showToast: () => {} });

export const useToast = () => useContext(ToastContext);

let toastId = 0;

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = ++toastId;
    setToasts(prev => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
};

const ToastContainer = ({ toasts, onRemove }: { toasts: Toast[]; onRemove: (id: number) => void }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-24 right-4 z-[100] flex flex-col gap-3 pointer-events-none" style={{ maxWidth: '400px', width: 'calc(100% - 2rem)' }}>
      {toasts.map(toast => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
};

export const ToastItem = ({ toast, onRemove }: { toast: Toast; onRemove: (id: number) => void }) => {
  const [isExiting, setIsExiting] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      handleClose();
    }, 5000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => onRemove(toast.id), 300);
  };

  const isSuccess = toast.type === 'success';

  return (
    <div
      role={isSuccess ? 'status' : 'alert'}
      aria-live={isSuccess ? 'polite' : 'assertive'}
      aria-atomic="true"
      className={`pointer-events-auto flex items-start gap-3 px-5 py-4 rounded-2xl shadow-2xl border backdrop-blur-xl transition-all duration-300 ${
        isExiting
          ? 'opacity-0 translate-x-8 scale-95'
          : 'opacity-100 translate-x-0 scale-100 animate-toast-in'
      } ${
        isSuccess
          ? 'bg-green-50/95 border-green-200 text-green-900'
          : 'bg-red-50/95 border-red-200 text-red-900'
      }`}
    >
      <div className={`flex-shrink-0 mt-0.5 ${isSuccess ? 'text-green-600' : 'text-red-500'}`}>
        {isSuccess ? <CheckCircle size={22} /> : <XCircle size={22} />}
      </div>
      <p className="flex-1 text-sm font-medium leading-relaxed">{toast.message}</p>
      <button
        type="button"
        aria-label="Закрыть уведомление"
        onClick={handleClose}
        className={`flex-shrink-0 p-1 rounded-lg hover:bg-black/5 transition-colors cursor-pointer ${
          isSuccess ? 'text-green-400 hover:text-green-600' : 'text-red-400 hover:text-red-600'
        }`}
      >
        <X size={16} />
      </button>
    </div>
  );
};
