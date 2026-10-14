import { AudioRecorder } from '@/components/audio/audio-recorder';
import { MicrophoneAccess } from '@/components/permissions/microphone-access';
import { ToolScreen } from '@/components/ui/tool-screen';

export function MicrophoneTool() {
  return (
    <ToolScreen title="Micrófono">
      <MicrophoneAccess>
        <AudioRecorder />
      </MicrophoneAccess>
    </ToolScreen>
  );
}
