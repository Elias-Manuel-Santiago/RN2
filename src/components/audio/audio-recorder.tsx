import {
  RecordingPresets,
  setAudioModeAsync,
  useAudioRecorder,
  useAudioRecorderState,
} from 'expo-audio';
import { useState } from 'react';
import { Platform } from 'react-native';
import { ActionButton } from '@/components/ui/action-button';
import { Metric } from '@/components/ui/metric';
import { StatusText } from '@/components/ui/status-text';
import { useAlive } from '@/hooks/use-alive';
import { useAsyncAction } from '@/hooks/use-async-action';
import { formatDuration, formatNumber } from '@/utils/format';
import { AudioPlayback } from './audio-playback';

const options = { ...RecordingPresets.HIGH_QUALITY, isMeteringEnabled: true };

/** Grabación temporal con nivel en dBFS; Expo libera el grabador al desmontarlo. */
export function AudioRecorder() {
  const alive = useAlive();
  const [uri, setUri] = useState<string | null>(null);
  const [duration, setDuration] = useState(0);
  const [recordingError, setRecordingError] = useState<string | null>(null);
  const recorder = useAudioRecorder(options, (status) => {
    if (!alive.current) return;
    if (status.hasError) {
      setUri(null);
      setRecordingError('La grabación fue interrumpida.');
    } else if (status.isFinished && status.url) setUri(status.url);
  });
  const state = useAudioRecorderState(recorder, 250);
  const { busy, error, run } = useAsyncAction();

  async function toggle() {
    setRecordingError(null);
    if (recorder.isRecording) {
      const recordedDuration = recorder.getStatus().durationMillis;
      await recorder.stop();
      if (alive.current) setDuration(recordedDuration);
      // Android confirma el archivo mediante el evento de finalización (también informa errores).
      if (Platform.OS !== 'android' && alive.current) setUri(recorder.uri);
      return;
    }
    // Desmontar el reproductor evita que el micrófono capture la reproducción anterior.
    setUri(null);
    setDuration(0);
    await setAudioModeAsync({
      allowsRecording: true,
      playsInSilentMode: true,
      shouldPlayInBackground: false,
      allowsBackgroundRecording: false,
    });
    if (!alive.current) return;
    await recorder.prepareToRecordAsync();
    if (!alive.current) return;
    recorder.record();
  }

  return (
    <>
      <Metric
        label="Duración"
        value={formatDuration(
          state.isRecording ? state.durationMillis : duration,
        )}
      />
      <Metric
        label="Nivel"
        value={formatNumber(
          state.isRecording ? state.metering : null,
          1,
          'dBFS',
        )}
      />
      <StatusText>
        {state.isRecording ? 'Grabando' : uri ? 'Grabación lista' : 'Detenido'}
      </StatusText>
      <ActionButton
        label={state.isRecording ? 'Detener grabación' : 'Grabar'}
        busy={busy}
        onPress={() => void run(toggle)}
      />
      {uri && !state.isRecording && <AudioPlayback key={uri} uri={uri} />}
      <StatusText error>{error ?? recordingError}</StatusText>
    </>
  );
}
