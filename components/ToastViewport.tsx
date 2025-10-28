'use client';

import { useToastStore } from '@/lib/use-toast';
import { useEffect } from 'react';
import { X } from 'lucide-react';

export function ToastViewport() {
  const { toasts, removeToast } = useToastStore();
  useEffect(() => {
    const timers = toasts.map((toast) => setTimeout(() => removeToast(toast.id), 4000));
    return () => {
      timers.forEach(clearTimeout);
    };
  }, [toasts, removeToast]);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex w-80 flex-col space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="rounded-2xl border border-white/60 bg-white/80 p-4 shadow-xl backdrop-blur transition hover:shadow-2xl"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-slate-900">{toast.title}</p>
              {toast.description ? <p className="text-xs text-slate-600">{toast.description}</p> : null}
            </div>
            <button
              type="button"
              className="rounded-full bg-white/70 p-1 text-slate-500 transition hover:bg-white/90 hover:text-slate-900"
              onClick={() => removeToast(toast.id)}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
