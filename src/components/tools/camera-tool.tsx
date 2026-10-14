import { CameraView, type CameraType } from 'expo-camera';
import { useRef, useState } from 'react';
import { Image, StyleSheet } from 'react-native';

import { CameraAccess } from '@/components/camera/camera-access';
import { CameraPreview } from '@/components/camera/camera-preview';
import { ActionButton } from '@/components/ui/action-button';
import { StatusText } from '@/components/ui/status-text';
import { ToolScreen } from '@/components/ui/tool-screen';
import { useAlive } from '@/hooks/use-alive';
import { useAsyncAction } from '@/hooks/use-async-action';

/** La foto se guarda temporalmente en caché y se muestra para verificar la captura. */
export function CameraTool() {
  const camera = useRef<CameraView>(null);
  const alive = useAlive();
  const [facing, setFacing] = useState<CameraType>('back');
  const [ready, setReady] = useState(false);
  const [mountError, setMountError] = useState<string | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const { busy, error, run } = useAsyncAction();

  async function capture() {
    if (!camera.current || !ready) return;
    const result = await camera.current.takePictureAsync({ quality: 0.7 });
    if (alive.current && result) setPhoto(result.uri);
  }

  return (
    <ToolScreen title="Cámara">
      <CameraAccess>
        {photo ? (
          <Image
            accessibilityLabel="Foto capturada"
            source={{ uri: photo }}
            style={styles.photo}
            resizeMode="contain"
          />
        ) : (
          <CameraPreview
            key={facing}
            cameraRef={camera}
            facing={facing}
            onCameraReady={() => setReady(true)}
            onMountError={() => {
              setReady(false);
              setMountError('No se pudo iniciar la cámara.');
            }}
          />
        )}
        <ActionButton
          label={photo ? 'Nueva foto' : 'Tomar foto'}
          disabled={!photo && !ready}
          busy={busy}
          onPress={() => {
            if (photo) {
              setReady(false);
              setPhoto(null);
            } else void run(capture);
          }}
        />
        {!photo && (
          <ActionButton
            secondary
            label={
              facing === 'back' ? 'Usar cámara frontal' : 'Usar cámara trasera'
            }
            disabled={busy}
            onPress={() => {
              setReady(false);
              setMountError(null);
              setFacing(facing === 'back' ? 'front' : 'back');
            }}
          />
        )}
        <StatusText error>{mountError ?? error}</StatusText>
      </CameraAccess>
    </ToolScreen>
  );
}
const styles = StyleSheet.create({
  photo: {
    width: '100%',
    aspectRatio: 3 / 4,
    borderRadius: 16,
    backgroundColor: '#000000',
  },
});
