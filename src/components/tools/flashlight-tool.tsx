import { useState } from 'react';
import { Platform } from 'react-native';

import { CameraAccess } from '@/components/camera/camera-access';
import { CameraPreview } from '@/components/camera/camera-preview';
import { ActionButton } from '@/components/ui/action-button';
import { StatusText } from '@/components/ui/status-text';
import { ToolScreen } from '@/components/ui/tool-screen';

/** La linterna se apaga al desmontar la sesión de cámara. Requiere flash trasero. */
export function FlashlightTool() {
  const [on, setOn] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  return (
    <ToolScreen title="Linterna">
      {Platform.OS === 'web' ? (
        <StatusText>Prueba disponible en Android o iOS con flash.</StatusText>
      ) : (
        <CameraAccess>
          <CameraPreview
            facing="back"
            enableTorch={on}
            onCameraReady={() => setReady(true)}
            onMountError={() => {
              setOn(false);
              setReady(false);
              setError('Cámara o flash no disponibles.');
            }}
          />
          <ActionButton
            label={on ? 'Apagar' : 'Encender'}
            disabled={!ready}
            onPress={() => setOn(!on)}
          />
          <StatusText error>{error}</StatusText>
        </CameraAccess>
      )}
    </ToolScreen>
  );
}
