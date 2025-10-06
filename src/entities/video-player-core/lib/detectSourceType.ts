import type { SourceType } from '@entities/video-player-core/model';

export const detectSourceType = async (url: string): Promise<SourceType> => {
  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 3000);
    const res = await fetch(url, { method: 'HEAD', signal: controller.signal });
    clearTimeout(id);
    const ct = res.headers.get('Content-Type')?.toLowerCase() ?? '';
    if (ct.includes('mpegurl') || ct.includes('application/vnd.apple.mpegurl') || ct.includes('vnd.apple.mpegurl')) {
      return 'hls';
    }
    if (ct.startsWith('video/')) return 'progressive';
  } catch {
    //...
  }

  if (url.includes('.m3u8')) return 'hls';
  if (url.match(/\.(mp4|webm|ogg)(\?.*)?$/)) return 'progressive';
  return 'unknown';
};
