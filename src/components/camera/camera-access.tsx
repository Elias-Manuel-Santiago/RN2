import { useCameraPermissions } from 'expo-camera';
import { useEffect, type PropsWithChildren } from 'react';
import { AppState } from 'react-native';

import { PermissionGate } from '@/components/permissions/permission-gate';

/** Actualiza el permiso al regresar desde Ajustes, sin solicitarlo automáticamente. */
export function CameraAccess({ children }: PropsWithChildren) {
  const [permission, request, getPermission] = useCameraPermissions();
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') void getPermission().catch(() => undefined);
    });
    return () => subscription.remove();
  }, [getPermission]);
  return (
    <PermissionGate permission={permission} request={request} label="cámara">
      {children}
    </PermissionGate>
  );
}
