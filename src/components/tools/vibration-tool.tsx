import { useEffect, useRef, useState } from 'react';
import { Platform, Vibration } from 'react-native';
import { ActionButton } from '@/components/ui/action-button';
import { StatusText } from '@/components/ui/status-text';
import { ToolScreen } from '@/components/ui/tool-screen';

const ANDROID_PATTERN = [0, 900, 300, 200, 300, 600];

const IOS_PATTERN = [0, 1000, 1000];
const IOS_PULSE_DURATION = 400;

/** Cada prueba reemplaza la anterior y se cancela al salir de la herramienta. */
export function VibrationTool() {
  const [vibrating, setVibrating] = useState(false);
  const finishTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (finishTimer.current !== null) {
        clearTimeout(finishTimer.current);
      }
      if (Platform.OS !== 'web') {
        Vibration.cancel();
      }
    };
  }, []);

  function stopVibration() {
    if (finishTimer.current !== null) {
      clearTimeout(finishTimer.current);
      finishTimer.current = null;
    }
    Vibration.cancel();
    setVibrating(false);
  }

  function finishAfter(duration: number) {
    finishTimer.current = setTimeout(() => {
      finishTimer.current = null;
      setVibrating(false);
    }, duration);
  }

  function vibrateOnce(duration: number) {
    stopVibration();
    // Usa la misma ruta nativa de los patrones también para un solo pulso.
    Vibration.vibrate(Platform.OS === 'android' ? [0, duration] : duration);
    finishAfter(Platform.OS === 'android' ? duration : IOS_PULSE_DURATION);
  }

  function playPattern(repeat = false) {
    stopVibration();
    const pattern =
      Platform.OS === 'android'
        ? repeat
          ? [...ANDROID_PATTERN, 700]
          : ANDROID_PATTERN
        : repeat
          ? [1000, 1000, 1000]
          : IOS_PATTERN;
    Vibration.vibrate(pattern, repeat);
    if (repeat) {
      setVibrating(true);
    }
    if (!repeat) {
      const duration = pattern.reduce((total, interval) => total + interval, 0);
      finishAfter(duration + (Platform.OS === 'ios' ? IOS_PULSE_DURATION : 0));
    }
  }

  return (
    <ToolScreen title="Vibración">
      {Platform.OS === 'web' ? (
        <StatusText>Prueba disponible en Android o iOS.</StatusText>
      ) : (
        <>
          <ActionButton
            label={Platform.OS === 'android' ? 'Vibración corta' : 'Vibrar'}
            onPress={() => vibrateOnce(200)}
          />
          {Platform.OS === 'android' && (
            <ActionButton
              label="Vibración larga"
              onPress={() => vibrateOnce(1000)}
            />
          )}
          <ActionButton
            label="Patrón (3 vibraciones)"
            onPress={() => playPattern()}
          />
          <ActionButton
            label="Repetir patrón"
            onPress={() => playPattern(true)}
          />
          {vibrating && (
            <ActionButton secondary label="Detener" onPress={stopVibration} />
          )}
        </>
      )}
    </ToolScreen>
  );
}
