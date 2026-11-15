import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import { useLibrary } from "@/lib/library-storage";

export function LibraryToast() {
  const { toast, dismissToast } = useLibrary();
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          role="status"
          aria-live="polite"
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.2 }}
          className="fixed bottom-5 left-4 z-50 flex max-w-sm items-start gap-3 rounded-lg border border-border bg-card px-4 py-3 text-card-foreground shadow-xl sm:left-6"
        >
          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
            <Sparkles size={14} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-editorial text-base leading-tight text-foreground">{toast.title}</p>
            <p className="mt-0.5 text-xs leading-snug text-muted-foreground">{toast.body}</p>
          </div>
          <button
            type="button"
            onClick={dismissToast}
            aria-label="Dismiss notification"
            className="text-muted-foreground hover:text-foreground"
          >
            <X size={14} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
