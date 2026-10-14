import type { PermissionResponse } from 'expo';
import type { PropsWithChildren } from 'react';
import { ActivityIndicator, Linking } from 'react-native';

import { ActionButton } from '@/components/ui/action-button';
import { StatusText } from '@/components/ui/status-text';
import { useAsyncAction } from '@/hooks/use-async-action';
import { useTheme } from '@/theme/theme-provider';

type Props = PropsWithChildren<{
  permission: PermissionResponse | null;
  request: () => Promise<PermissionResponse>;
  label: string;
}>;

/** Cuando Android bloquea nuevas solicitudes, permite abrir Ajustes. */
export function PermissionGate({
  permission,
  request,
  label,
  children,
}: Props) {
  const { colors } = useTheme();
  const { busy, error, run } = useAsyncAction();
  if (!permission) return <ActivityIndicator color={colors.primary} />;
  if (permission.granted) return children;
  return (
    <>
      <StatusText>
        {permission.canAskAgain
          ? `Permiso de ${label} pendiente.`
          : `Permiso de ${label} bloqueado.`}
      </StatusText>
      <ActionButton
        label={permission.canAskAgain ? 'Dar permiso' : 'Abrir ajustes'}
        busy={busy}
        onPress={() =>
          void run(async () => {
            if (permission.canAskAgain) await request();
            else await Linking.openSettings();
          })
        }
      />
      <StatusText error>{error}</StatusText>
    </>
  );
}
