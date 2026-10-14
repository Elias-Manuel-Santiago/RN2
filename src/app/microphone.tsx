import { MicrophoneTool } from '@/components/tools/microphone-tool';
import { ToolSession } from '@/components/ui/tool-session';

/** La ruta solo compone la vista; los recursos viven en su componente. */
export default function MicrophoneToolScreen() {
  return (
    <ToolSession>
      <MicrophoneTool />
    </ToolSession>
  );
}
