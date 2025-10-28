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
        <div key={toast.id} className="rounded-md border bg-background p-4 shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold">{toast.title}</p>
              {toast.description ? <p className="text-xs text-muted-foreground">{toast.description}</p> : null}
            </div>
            <button
              type="button"
              className="rounded p-1 text-muted-foreground hover:text-foreground"
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
