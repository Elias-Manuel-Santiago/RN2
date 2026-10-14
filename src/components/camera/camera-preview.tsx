import { CameraView, type CameraViewProps } from 'expo-camera';
import type { Ref } from 'react';
import { StyleSheet, View } from 'react-native';

type Props = CameraViewProps & { cameraRef?: Ref<CameraView> };

/** Conserva una vista previa visible para cámara, lector y linterna. */
export function CameraPreview({ cameraRef, ...props }: Props) {
  return (
    <View style={styles.frame}>
      <CameraView ref={cameraRef} style={StyleSheet.absoluteFill} {...props} />
    </View>
  );
}
const styles = StyleSheet.create({
  frame: {
    width: '100%',
    aspectRatio: 3 / 4,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#000000',
  },
});
