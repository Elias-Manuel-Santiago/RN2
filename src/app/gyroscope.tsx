import { GyroscopeTool } from '@/components/tools/gyroscope-tool';
import { ToolSession } from '@/components/ui/tool-session';

/** La ruta solo compone la vista; los recursos viven en su componente. */
export default function GyroscopeToolScreen() {
  return (
    <ToolSession>
      <GyroscopeTool />
    </ToolSession>
  );
}
