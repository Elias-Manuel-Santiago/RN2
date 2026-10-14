import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { Linking } from 'react-native';
import { useAlive } from './use-alive';
import { useAsyncAction } from './use-async-action';

/** Solo usa ubicación en primer plano; elimina incluso suscripciones que llegan tarde. */
export function usePosition() {
  const alive = useAlive();
  const { busy, error, run } = useAsyncAction();
  const [running, setRunning] = useState(false);
  const [position, setPosition] = useState<Location.LocationObject | null>(
    null,
  );
  const [watchError, setWatchError] = useState<string | null>(null);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    if (!running) return;
    let cancelled = false;
    let subscription: Location.LocationSubscription | undefined;
    void Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 1000,
        distanceInterval: 0,
      },
      (value) => {
        if (!cancelled) setPosition(value);
      },
      () => {
        if (!cancelled) {
          setWatchError('No se pudo obtener la ubicación.');
          setRunning(false);
        }
      },
    )
      .then((value) => {
        if (cancelled) value.remove();
        else subscription = value;
      })
      .catch(() => {
        if (!cancelled) {
          setWatchError('No se pudo iniciar el GPS.');
          setRunning(false);
        }
      });
    return () => {
      cancelled = true;
      subscription?.remove();
    };
  }, [running]);

  function toggle() {
    if (running) {
      setRunning(false);
      return;
    }
    void run(async () => {
      setWatchError(null);
      const permission = await Location.requestForegroundPermissionsAsync();
      if (!alive.current) return;
      setBlocked(!permission.granted && !permission.canAskAgain);
      if (!permission.granted)
        throw new Error('Permiso de ubicación denegado.');
      const enabled = await Location.hasServicesEnabledAsync();
      if (!alive.current) return;
      if (!enabled)
        throw new Error('Activa la ubicación en los ajustes del dispositivo.');
      setPosition(null);
      setRunning(true);
    });
  }
  return {
    position,
    running,
    busy,
    blocked,
    error: error ?? watchError,
    toggle,
    openSettings: () => void run(() => Linking.openSettings()),
  };
}
