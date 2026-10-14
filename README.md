# RN2 · Herramientas del dispositivo

Aplicación React Native con Expo SDK 57, TypeScript y Expo Router. Interfaz en español, pestañas desplazables y botón flotante de tema claro/oscuro arriba a la izquierda.

## Herramientas

| Pestaña      | Prueba                                            | Módulo                          |
| ------------ | ------------------------------------------------- | ------------------------------- |
| Cámara       | Foto, vista previa y cámara frontal/trasera       | `expo-camera`                   |
| Códigos      | QR y códigos de barras; contenido seleccionable   | `expo-camera`                   |
| GPS          | Latitud, longitud, precisión, altitud y velocidad | `expo-location`                 |
| Acelerómetro | Ejes X/Y/Z, gravedad incluida, en g               | `expo-sensors`                  |
| Giroscopio   | Ejes X/Y/Z en rad/s                               | `expo-sensors`                  |
| Biometría    | Métodos disponibles, registro y prueba sin PIN    | `expo-local-authentication`     |
| Micrófono    | Grabación, duración, nivel en dBFS y reproducción | `expo-audio`                    |
| Linterna     | Encender/apagar el flash trasero                  | `expo-camera`                   |
| Vibración    | Pulsos, patrón y cancelación                      | React Native `Vibration`        |
| Luz          | Iluminancia en lux                                | `expo-sensors` (Android)        |
| Brújula      | Campo magnético en µT y rumbo magnético nativo    | `expo-sensors`, `expo-location` |

## Ejecutar

Requiere Node.js 22.13 o superior y un teléfono Android para las pruebas de hardware.

```bash
npm ci
npx expo start --go
```

Abrir el proyecto en Expo Go compatible con SDK 57. El proyecto ya incluye `expo-dev-client`; para un cliente de desarrollo instalado, usar `npx expo start --dev-client`.

Los permisos nativos se declaran mediante plugins en `app.json`. Si se modifica esa configuración, reconstruir el cliente de desarrollo. Para compilar en EAS, configurar el proyecto con `npx eas-cli@latest build:configure` y ejecutar `npx eas-cli@latest build --platform android --profile development`. No editar carpetas nativas generadas.

## Organización

```text
src/
  app/                    # Rutas: solo componen cada pantalla
  components/
    tools/                # Un componente por herramienta
    audio/                # Grabador y reproductor separados
    camera/               # Permisos y vista previa de cámara
    navigation/           # Tabs y barra desplazable
    permissions/          # Permisos y acceso a Ajustes
    sensors/              # Ejes, controles y lectura de brújula
    theme/                # Botón flotante
    ui/                   # Controles pequeños reutilizables
  hooks/                  # Suscripciones y acciones asíncronas
  theme/                  # Paletas y contexto
  utils/                  # Formato y mensajes de biometría
```

`ToolSession` desmonta cada herramienta cuando pierde foco o la aplicación pasa a segundo plano. Esto libera cámara, linterna, micrófono, reproducción y suscripciones, y cancela patrones de vibración. Los resultados se reinician al abrir otra sesión. Las suscripciones asíncronas que terminan después de salir se eliminan inmediatamente.

Los sensores actualizan a 4 Hz; el GPS solicita actualizaciones a intervalos de un segundo en Android. Las mediciones no disponibles aparecen como `—`, nunca como valores inventados. La brújula requiere permiso de ubicación para iniciar el observador nativo de rumbo de Expo en Android e iOS. Utiliza norte geográfico cuando está disponible y norte magnético en caso contrario, e indica la referencia en pantalla. La aguja gira por el camino más corto al cruzar el norte.

Fotos y grabaciones se almacenan en caché para pruebas temporales, sin guardarlas en la galería ni enviarlas a un servidor. El tema manual dura durante la sesión; al iniciar se sigue el tema del sistema.

## Verificar el código

```bash
npm run format
npm run format:check
npx expo lint
npx tsc --noEmit
npx expo export --platform android --output-dir dist/android
```

Prettier usa comillas simples, indentación de dos espacios y líneas de 80 columnas. Los comentarios documentan las unidades, los permisos y el ciclo de vida de los recursos.

## Verificar en Android físico

1. Denegar y conceder permisos de cámara, micrófono y ubicación. Cuando estén bloqueados, abrir Ajustes y concederlos; volver a la app y repetir la prueba.
2. Tomar fotos con ambas cámaras. Leer un QR y un código EAN; comprobar que el lector se detiene tras cada resultado y permite escanear otro.
3. Iniciar el GPS, comprobar coordenadas y precisión; detenerlo. Desactivar ubicación en el sistema y comprobar el mensaje de error.
4. Iniciar cada sensor, mover el teléfono o cubrir el sensor de luz y comprobar cambios. Detenerlo y confirmar que las cifras dejan de actualizarse.
5. Probar biometría con y sin una huella/rostro registrado; cancelar y repetir. El PIN no cuenta como prueba biométrica.
6. Grabar varios segundos, detener y escuchar la grabación. Repetir después de reproducir para comprobar que el reproductor anterior se libera.
7. Encender la linterna, cambiar de pestaña y bloquear el teléfono; confirmar que el flash se apaga. Requiere cámara trasera con flash: Expo Camera no expone una consulta pública de disponibilidad del flash.
8. Probar vibraciones y detenerlas. Cambiar de pestaña durante el patrón y comprobar su cancelación.
9. Iniciar la brújula y aceptar el permiso de ubicación. Comprobar el rumbo con el teléfono plano, incluido el cruce de 359° a 0°, y detener/reiniciar la lectura. Si solicita calibración, mover el dispositivo en forma de ocho, lejos de imanes. Probar también permiso denegado y un dispositivo sin magnetómetro.
10. Cambiar el tema desde varias pestañas y comprobar contraste, botón flotante y áreas seguras del sistema.

La disponibilidad depende del hardware. Un emulador no sustituye la validación de flash, sensores o biometría. La vista web permite revisar navegación y tema, pero las herramientas exclusivas del dispositivo muestran su disponibilidad real. En iOS las vibraciones tienen una duración fija y el sensor de luz no está expuesto por Expo; Face ID requiere un cliente de desarrollo.

## Documentación utilizada

- [Referencia Expo SDK 57](https://docs.expo.dev/versions/v57.0.0/)
- [Pestañas en Expo Router](https://docs.expo.dev/router/advanced/tabs/)
- [Cámara](https://docs.expo.dev/versions/v57.0.0/sdk/camera/)
- [Audio](https://docs.expo.dev/versions/v57.0.0/sdk/audio/)
- [Ubicación](https://docs.expo.dev/versions/v57.0.0/sdk/location/)
- [Sensores](https://docs.expo.dev/versions/v57.0.0/sdk/sensors/)
- [Biometría](https://docs.expo.dev/versions/v57.0.0/sdk/local-authentication/)
