import type { PermissionResponse } from 'expo';
import {
  getRecordingPermissionsAsync,
  requestRecordingPermissionsAsync,
} from 'expo-audio';
import { useEffect, useState, type PropsWithChildren } from 'react';

import { PermissionGate } from '@/components/permissions/permission-gate';
import { StatusText } from '@/components/ui/status-text';
import { useAlive } from '@/hooks/use-alive';

export function MicrophoneAccess({ children }: PropsWithChildren) {
  const alive = useAlive();
  const [permission, setPermission] = useState<PermissionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    let cancelled = false;
    void getRecordingPermissionsAsync()
      .then((value) => {
        if (!cancelled) setPermission(value);
      })
      .catch(() => {
        if (!cancelled) setError('Micrófono no disponible.');
      });
    return () => {
      cancelled = true;
    };
  }, []);
  async function request() {
    const value = await requestRecordingPermissionsAsync();
    if (alive.current) setPermission(value);
    return value;
  }
  if (error) return <StatusText error>{error}</StatusText>;
  return (
    <PermissionGate permission={permission} request={request} label="micrófono">
      {children}
    </PermissionGate>
  );
}
