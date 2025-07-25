import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export function SuccessAnimation() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg shadow-lg bg-green-100 text-green-900"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <CheckCircle size={64} strokeWidth={1.5} className="text-green-600" />
      <h3 className="text-xl font-semibold">¡Tarea Exitosa!</h3>
      <p className="text-sm text-center max-w-xs">
        La acción fue completada correctamente.
      </p>
    </motion.div>
  );
}
