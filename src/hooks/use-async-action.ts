import { useRef, useState } from 'react';
import { useAlive } from './use-alive';

/** Serializa acciones y presenta errores sin promesas rechazadas sin manejar. */
export function useAsyncAction() {
  const alive = useAlive();
  const locked = useRef(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  async function run(action: () => Promise<void>) {
    if (locked.current) return;
    locked.current = true;
    setBusy(true);
    setError(null);
    try {
      await action();
    } catch (reason) {
      if (alive.current)
        setError(
          reason instanceof Error
            ? reason.message
            : 'No se pudo completar la prueba.',
        );
    } finally {
      locked.current = false;
      if (alive.current) setBusy(false);
    }
  }
  return { busy, error, run };
}
