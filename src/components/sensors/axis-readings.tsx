import { Metric } from '@/components/ui/metric';
import { formatNumber } from '@/utils/format';

type Vector = { x: number; y: number; z: number };

export function AxisReadings({
  data,
  unit,
}: {
  data: Vector | null;
  unit: string;
}) {
  return (
    <>
      {(['x', 'y', 'z'] as const).map((axis) => (
        <Metric
          key={axis}
          label={`Eje ${axis.toUpperCase()}`}
          value={formatNumber(data?.[axis], 3, unit)}
        />
      ))}
    </>
  );
}
