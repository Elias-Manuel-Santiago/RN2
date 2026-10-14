import { ActionButton } from '@/components/ui/action-button';
import { StatusText } from '@/components/ui/status-text';

type Props = {
  running: boolean;
  busy: boolean;
  error: string | null;
  blocked: boolean;
  toggle: () => void;
  openSettings: () => void;
};

export function SensorControls({
  running,
  busy,
  error,
  blocked,
  toggle,
  openSettings,
}: Props) {
  return (
    <>
      <StatusText>{running ? 'Midiendo' : 'Detenido'}</StatusText>
      <ActionButton
        label={running ? 'Detener' : 'Iniciar'}
        busy={busy}
        onPress={toggle}
      />
      {blocked && (
        <ActionButton secondary label="Abrir ajustes" onPress={openSettings} />
      )}
      <StatusText error>{error}</StatusText>
    </>
  );
}
