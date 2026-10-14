import type { PropsWithChildren } from 'react';
import { useToolActive } from '@/hooks/use-tool-active';

/** Desmonta recursos nativos al cambiar de pestaña o pasar al segundo plano. */
export function ToolSession({ children }: PropsWithChildren) {
  return useToolActive() ? children : null;
}
