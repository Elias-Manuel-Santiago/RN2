import { Gyroscope } from 'expo-sensors';
import { AxisReadings } from '@/components/sensors/axis-readings';
import { SensorControls } from '@/components/sensors/sensor-controls';
import { ToolScreen } from '@/components/ui/tool-screen';
import { useSensor } from '@/hooks/use-sensor';

/** Velocidad angular por eje en radianes por segundo. */
export function GyroscopeTool() {
  const sensor = useSensor(Gyroscope);
  return (
    <ToolScreen title="Giroscopio">
      <AxisReadings data={sensor.data} unit="rad/s" />
      <SensorControls {...sensor} />
    </ToolScreen>
  );
}
