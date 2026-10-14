import { BiometricsTool } from '@/components/tools/biometrics-tool';
import { ToolSession } from '@/components/ui/tool-session';

/** La ruta solo compone la vista; los recursos viven en su componente. */
export default function BiometricsToolScreen() {
  return (
    <ToolSession>
      <BiometricsTool />
    </ToolSession>
  );
}
