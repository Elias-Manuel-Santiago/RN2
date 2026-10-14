/** No presenta valores nulos o no finitos como mediciones válidas. */
export function formatNumber(
  value: number | null | undefined,
  digits = 2,
  unit = '',
) {
  return value == null || !Number.isFinite(value)
    ? '—'
    : `${value.toFixed(digits)}${unit ? ` ${unit}` : ''}`;
}
export function formatDuration(milliseconds: number) {
  const seconds = Math.floor(milliseconds / 1000);
  return `${Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
}
