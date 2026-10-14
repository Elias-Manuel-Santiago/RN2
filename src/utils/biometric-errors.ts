const messages: Record<string, string> = {
  user_cancel: 'Prueba cancelada.',
  app_cancel: 'Prueba cancelada.',
  system_cancel: 'Prueba interrumpida.',
  not_available: 'Biometría no disponible.',
  not_enrolled: 'Registra una huella o rostro en Ajustes.',
  lockout: 'Biometría bloqueada temporalmente.',
  authentication_failed: 'Biometría no reconocida.',
  timeout: 'Tiempo de espera agotado.',
  user_fallback: 'Prueba biométrica cancelada.',
  passcode_not_set: 'Configura un bloqueo de pantalla en Ajustes.',
  unable_to_process: 'No se pudo leer la biometría.',
  no_space: 'Sin espacio para la prueba biométrica.',
  invalid_context: 'Prueba interrumpida.',
  missing_usage_description:
    'Falta el permiso de Face ID en la app instalada (missing_usage_description). Face ID no funciona en Expo Go; compila e instala una app propia con el permiso configurado.',
};

export function biometricError(code: string) {
  return messages[code] ?? code;
}
