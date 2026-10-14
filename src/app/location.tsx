import { LocationTool } from '@/components/tools/location-tool';
import { ToolSession } from '@/components/ui/tool-session';

/** La ruta solo compone la vista; los recursos viven en su componente. */
export default function LocationToolScreen() {
  return (
    <ToolSession>
      <LocationTool />
    </ToolSession>
  );
}
