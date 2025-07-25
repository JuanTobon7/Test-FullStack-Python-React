import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

export function NotFoundAnimation() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg shadow-lg bg-yellow-100 text-yellow-900"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }} 
    >
      <AlertTriangle size={64} strokeWidth={2} className="text-yellow-600" />
      <h3 className="text-xl font-semibold">Recurso No Encontrado</h3>
      <p className="text-sm text-center max-w-xs">
        No pudimos encontrar el contenido solicitado.
      </p>
    </motion.div>
  );
}
