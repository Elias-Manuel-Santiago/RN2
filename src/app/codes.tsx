import { CodeScannerTool } from '@/components/tools/code-scanner-tool';
import { ToolSession } from '@/components/ui/tool-session';

/** La ruta solo compone la vista; los recursos viven en su componente. */
export default function CodeScannerToolScreen() {
  return (
    <ToolSession>
      <CodeScannerTool />
    </ToolSession>
  );
}
