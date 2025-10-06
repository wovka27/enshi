export const formatDuration = (seconds: number): string => {
  if (!Number.isFinite(seconds) || seconds < 0) return '00:00';

  const totalSeconds = Math.floor(seconds);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  // Intl для двухзначного форматирования
  const twoDigits = new Intl.NumberFormat(undefined, {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  return hours > 0
    ? `${twoDigits.format(hours)}:${twoDigits.format(minutes)}:${twoDigits.format(secs)}`
    : `${twoDigits.format(minutes)}:${twoDigits.format(secs)}`;
};
