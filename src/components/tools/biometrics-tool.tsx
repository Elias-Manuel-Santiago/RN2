import * as LocalAuthentication from 'expo-local-authentication';
import { useEffect, useState } from 'react';
import { Linking, Platform } from 'react-native';
import { ActionButton } from '@/components/ui/action-button';
import { Metric } from '@/components/ui/metric';
import { StatusText } from '@/components/ui/status-text';
import { ToolScreen } from '@/components/ui/tool-screen';
import { useAlive } from '@/hooks/use-alive';
import { useAsyncAction } from '@/hooks/use-async-action';
import { biometricError } from '@/utils/biometric-errors';

const names: Record<number, string> = { 1: 'Huella', 2: 'Rostro', 3: 'Iris' };

/** Prueba el sensor biométrico; no acepta PIN como resultado biométrico exitoso. */
export function BiometricsTool() {
  const alive = useAlive();
  const [types, setTypes] = useState<string>('—');
  const [enrolled, setEnrolled] = useState<boolean | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const { busy, error, run } = useAsyncAction();

  useEffect(
    () => () => {
      if (Platform.OS === 'android')
        void LocalAuthentication.cancelAuthenticate().catch(() => undefined);
    },
    [],
  );

  async function authenticate() {
    if (Platform.OS === 'web')
      throw new Error('Biometría disponible en Android o iOS.');
    const [hardware, registered, supported] = await Promise.all([
      LocalAuthentication.hasHardwareAsync(),
      LocalAuthentication.isEnrolledAsync(),
      LocalAuthentication.supportedAuthenticationTypesAsync(),
    ]);
    if (!alive.current) return;
    setResult(null);
    setEnrolled(registered);
    setTypes(
      supported.map((type) => names[type] ?? 'Otro').join(', ') ||
        'No disponible',
    );
    if (!hardware)
      throw new Error('Este dispositivo no tiene sensor biométrico.');
    if (!registered)
      throw new Error('Registra una huella o rostro en Ajustes.');
    const response = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Probar biometría',
      cancelLabel: 'Cancelar',
      disableDeviceFallback: true,
      fallbackLabel: '',
    });
    if (!alive.current) return;
    setResult(
      response.success
        ? 'Biometría verificada'
        : biometricError(response.error),
    );
  }

  return (
    <ToolScreen title="Biometría">
      <Metric label="Métodos" value={types} />
      <Metric
        label="Biometría registrada"
        value={enrolled == null ? '—' : enrolled ? 'Sí' : 'No'}
      />
      <ActionButton
        label="Probar biometría"
        busy={busy}
        onPress={() => void run(authenticate)}
      />
      {enrolled === false && (
        <ActionButton
          secondary
          label="Abrir ajustes"
          onPress={() => void run(() => Linking.openSettings())}
        />
      )}
      <StatusText>{result}</StatusText>
      <StatusText error>{error}</StatusText>
    </ToolScreen>
  );
}
