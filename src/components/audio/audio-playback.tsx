import {
  setAudioModeAsync,
  useAudioPlayer,
  useAudioPlayerStatus,
} from 'expo-audio';
import { ActionButton } from '@/components/ui/action-button';
import { StatusText } from '@/components/ui/status-text';
import { useAlive } from '@/hooks/use-alive';
import { useAsyncAction } from '@/hooks/use-async-action';

/** El hook libera el reproductor al iniciar otra grabación o cerrar la pestaña. */
export function AudioPlayback({ uri }: { uri: string }) {
  const player = useAudioPlayer(uri);
  const status = useAudioPlayerStatus(player);
  const alive = useAlive();
  const { busy, error, run } = useAsyncAction();
  async function toggle() {
    if (status.playing) {
      player.pause();
      return;
    }
    await setAudioModeAsync({
      allowsRecording: false,
      playsInSilentMode: true,
      shouldPlayInBackground: false,
    });
    if (!alive.current) return;
    if (status.didJustFinish || player.currentTime >= player.duration)
      await player.seekTo(0);
    if (alive.current) player.play();
  }
  return (
    <>
      <ActionButton
        secondary
        label={status.playing ? 'Pausar' : 'Reproducir grabación'}
        disabled={!status.isLoaded}
        busy={busy}
        onPress={() => void run(toggle)}
      />
      <StatusText error>{error}</StatusText>
    </>
  );
}
