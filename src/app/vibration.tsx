import { VibrationTool } from '@/components/tools/vibration-tool';
import { ToolSession } from '@/components/ui/tool-session';

/** La ruta solo compone la vista; los recursos viven en su componente. */
export default function VibrationToolScreen() {
  return (
    <ToolSession>
      <VibrationTool />
    </ToolSession>
  );
}
