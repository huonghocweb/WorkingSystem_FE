export function formatDuration(seconds: number): string {
  if (seconds < 0 || !Number.isFinite(seconds)) {
    return "0s";
  }
  const totalSeconds = Math.floor(seconds);
  const s = totalSeconds % 60;
  const m = Math.floor(totalSeconds / 60) % 60;
  const h = Math.floor(totalSeconds / 3600) % 24;
  const d = Math.floor(totalSeconds / (3600 * 24)) % 30;
  const mo = Math.floor((totalSeconds / (3600 * 24 * 30)) % 12);
  const y = Math.floor(totalSeconds / (3600 * 24 * 30 * 12));
  if (y > 0) {
    return mo > 0 ? `${y}y ${mo}mo` : `${y}y`;
  }
  if (mo > 0) {
    return d > 0 ? `${mo}mo ${d}d` : `${mo}mo`;
  }
  if (d > 0) {
    return h > 0 ? `${d}d ${h}h` : `${d}d`;
  }
  if (h > 0) {
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
  }
  if (m > 0) {
    return s > 0 ? `${m}m ${s}s` : `${m}m`;
  }
  return `${s}s`;
}
