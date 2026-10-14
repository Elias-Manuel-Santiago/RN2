import { ActionButton } from '@/components/ui/action-button';
import { Metric } from '@/components/ui/metric';
import { StatusText } from '@/components/ui/status-text';
import { ToolScreen } from '@/components/ui/tool-screen';
import { usePosition } from '@/hooks/use-position';
import { formatNumber } from '@/utils/format';

export function LocationTool() {
  const { position, running, busy, blocked, error, toggle, openSettings } =
    usePosition();
  const coords = position?.coords;
  return (
    <ToolScreen title="Ubicación y GPS">
      <Metric label="Latitud" value={formatNumber(coords?.latitude, 6, '°')} />
      <Metric
        label="Longitud"
        value={formatNumber(coords?.longitude, 6, '°')}
      />
      <Metric
        label="Precisión"
        value={formatNumber(coords?.accuracy, 1, 'm')}
      />
      <Metric label="Altitud" value={formatNumber(coords?.altitude, 1, 'm')} />
      <Metric
        label="Velocidad"
        value={formatNumber(
          coords?.speed != null && coords.speed >= 0
            ? coords.speed * 3.6
            : null,
          1,
          'km/h',
        )}
      />
      <StatusText>
        {running
          ? position
            ? 'Ubicación en vivo'
            : 'Buscando señal…'
          : 'Detenido'}
      </StatusText>
      <ActionButton
        label={running ? 'Detener' : 'Iniciar GPS'}
        busy={busy}
        onPress={toggle}
      />
      {blocked && (
        <ActionButton secondary label="Abrir ajustes" onPress={openSettings} />
      )}
      <StatusText error>{error}</StatusText>
    </ToolScreen>
  );
}
