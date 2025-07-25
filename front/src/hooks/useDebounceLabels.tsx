import { useEffect, useState } from "react";

/**
 * Retorna un valor debounced, útil para inputs de búsqueda.
 * @param value El valor a debounciar
 * @param delay Tiempo en ms (default 500)
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
}
