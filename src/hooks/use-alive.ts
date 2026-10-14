import { useEffect, useRef } from 'react';

/** Evita aplicar resultados de operaciones pendientes después de cerrar una vista. */
export function useAlive() {
  const alive = useRef(true);
  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
    };
  }, []);
  return alive;
}
