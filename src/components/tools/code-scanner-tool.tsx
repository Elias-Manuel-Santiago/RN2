import type { BarcodeScanningResult } from 'expo-camera';
import { useRef, useState } from 'react';

import { CameraAccess } from '@/components/camera/camera-access';
import { CameraPreview } from '@/components/camera/camera-preview';
import { ActionButton } from '@/components/ui/action-button';
import { Metric } from '@/components/ui/metric';
import { StatusText } from '@/components/ui/status-text';
import { ToolScreen } from '@/components/ui/tool-screen';

export function CodeScannerTool() {
  const locked = useRef(false);
  const [result, setResult] = useState<BarcodeScanningResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  /** El bloqueo inmediato impide procesar varias veces el mismo fotograma. */
  function scan(value: BarcodeScanningResult) {
    if (locked.current) return;
    locked.current = true;
    setResult(value);
  }

  return (
    <ToolScreen title="Lector de códigos">
      <CameraAccess>
        {!result && (
          <CameraPreview
            facing="back"
            onBarcodeScanned={scan}
            barcodeScannerSettings={{
              barcodeTypes: [
                'qr',
                'ean13',
                'ean8',
                'code128',
                'code39',
                'code93',
                'upc_a',
                'upc_e',
                'pdf417',
                'aztec',
                'datamatrix',
                'itf14',
                'codabar',
              ],
            }}
            onMountError={() => setError('No se pudo iniciar el lector.')}
          />
        )}
        {result && (
          <>
            <Metric label="Tipo" value={result.type} />
            <Metric label="Contenido" value={result.data} />
            <ActionButton
              label="Escanear otro"
              onPress={() => {
                locked.current = false;
                setResult(null);
                setError(null);
              }}
            />
          </>
        )}
        <StatusText error>{error}</StatusText>
      </CameraAccess>
    </ToolScreen>
  );
}
