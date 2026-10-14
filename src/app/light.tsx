import { LightSensorTool } from '@/components/tools/light-sensor-tool';
import { ToolSession } from '@/components/ui/tool-session';

/** La ruta solo compone la vista; los recursos viven en su componente. */
export default function LightSensorToolScreen() {
  return (
    <ToolSession>
      <LightSensorTool />
    </ToolSession>
  );
}
