import { AccelerometerTool } from '@/components/tools/accelerometer-tool';
import { ToolSession } from '@/components/ui/tool-session';

/** La ruta solo compone la vista; los recursos viven en su componente. */
export default function AccelerometerToolScreen() {
  return (
    <ToolSession>
      <AccelerometerTool />
    </ToolSession>
  );
}
