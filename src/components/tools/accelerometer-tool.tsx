import { Accelerometer } from 'expo-sensors';
import { AxisReadings } from '@/components/sensors/axis-readings';
import { SensorControls } from '@/components/sensors/sensor-controls';
import { ToolScreen } from '@/components/ui/tool-screen';
import { useSensor } from '@/hooks/use-sensor';

/** Expo entrega aceleración con gravedad incluida, en unidades g. */
export function AccelerometerTool() {
  const sensor = useSensor(Accelerometer);
  return (
    <ToolScreen title="Acelerómetro">
      <AxisReadings data={sensor.data} unit="g" />
      <SensorControls {...sensor} />
    </ToolScreen>
  );
}
