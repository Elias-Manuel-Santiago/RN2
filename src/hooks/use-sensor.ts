import type { PermissionResponse } from 'expo';
import { useEffect, useRef, useState } from 'react';
import { Linking, Platform } from 'react-native';

import { useAlive } from './use-alive';
import { useAsyncAction } from './use-async-action';

type Sensor<T> = {
  isAvailableAsync: () => Promise<boolean>;
  requestPermissionsAsync: () => Promise<PermissionResponse>;
  setUpdateInterval: (milliseconds: number) => void;
  addListener: (callback: (value: T) => void) => { remove: () => void };
};

/** Comparte permisos y limpieza; actualiza a 4 Hz para evitar renders excesivos. */
export function useSensor<T>(sensor: Sensor<T>, androidOnly = false) {
  const alive = useAlive();
  const { busy, error, run } = useAsyncAction();
  const [running, setRunning] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [blocked, setBlocked] = useState(false);
  const subscription = useRef<{ remove: () => void } | null>(null);

  useEffect(() => {
    return () => {
      subscription.current?.remove();
      subscription.current = null;
    };
  }, []);

  function toggle() {
    if (running) {
      subscription.current?.remove();
      subscription.current = null;
      setRunning(false);
      return;
    }
    void run(async () => {
      if (androidOnly && Platform.OS !== 'android')
        throw new Error('Sensor disponible solo en Android.');

      const permission = await sensor.requestPermissionsAsync();
      if (!alive.current) return;
      setBlocked(!permission.granted && !permission.canAskAgain);
      if (!permission.granted) throw new Error('Permiso del sensor denegado.');
      const available = await sensor.isAvailableAsync();
      if (!alive.current) return;
      if (!available)
        throw new Error('Sensor no disponible en este dispositivo.');
      setData(null);
      sensor.setUpdateInterval(100);
      subscription.current = sensor.addListener((value) => {
        if (alive.current) setData(value);
      });
      setRunning(true);
    });
  }

  return {
    data,
    running,
    busy,
    error,
    blocked,
    toggle,
    openSettings: () => void run(() => Linking.openSettings()),
  };
}
