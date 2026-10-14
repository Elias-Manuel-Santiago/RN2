import { CameraTool } from '@/components/tools/camera-tool';
import { ToolSession } from '@/components/ui/tool-session';

export default function CameraScreen() {
  return (
    <ToolSession>
      <CameraTool />
    </ToolSession>
  );
}
