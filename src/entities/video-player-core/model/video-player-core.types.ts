import { type Level, type LoaderStats, type LevelDetails } from 'hls.js';

export interface IVideoPlayerState {
  isPlaying: boolean;
  isBuffering: boolean;
  isFullscreen: boolean;
  muted: boolean;
  volume: number;
  quality: number | 'auto';
}

export interface IVideoPlayerProgressData {
  duration: number;
  currentTime: number;
  buffered: number;
}

export type SourceType = 'hls' | 'progressive' | 'unknown';

export type BaseVideoPlayerErrorCode =
  // HLS
  | 'HLS.NETWORK_ERROR'
  | 'HLS.MEDIA_ERROR'
  | 'HLS.MANIFEST_ERROR'
  | 'HLS.WARNING'
  | 'HLS.UNKNOWN'
  | 'HLS.LOADING_SOURCE'

  // Native <video>
  | 'VIDEO.NOT_SUPPORTED'
  | 'VIDEO.SRC_ERROR'
  | 'VIDEO.MEDIA_ERR_ABORTED'
  | 'VIDEO.MEDIA_ERR_NETWORK'
  | 'VIDEO.MEDIA_ERR_DECODE'
  | 'VIDEO.MEDIA_ERR_SRC_NOT_SUPPORTED'
  | 'VIDEO.MEDIA_UNKNOWN'
  // Generic
  | 'UNKNOWN'
  // Storage API
  | 'STORAGE.SAVE_ERROR'
  | 'STORAGE.READ_ERROR'
  | 'STORAGE.REMOVE_ERROR'

  // Video lifecycle
  | 'VIDEO.AUTOPLAY_ERROR'
  | 'VIDEO.DESTROY_ERROR'
  | 'VIDEO.FULLSCREEN_ERROR';

export interface BaseVideoPlayerError {
  codeError: BaseVideoPlayerErrorCode;
  error: Error | string | Event;
}

export interface ManifestParsedData {
  levels: Level[];
  audioTracks: MediaPlaylist[];
  subtitleTracks: MediaPlaylist[];
  sessionData: Record<string, unknown> | null;
  sessionKeys: unknown[] | null;
  firstLevel: number;
  stats: LoaderStats;
  audio: boolean;
  video: boolean;
  altAudio: boolean;
}

export interface MediaPlaylist {
  attrs: MediaAttributes;
  audioCodec?: string;
  autoselect: boolean;
  bitrate: number;
  channels?: string;
  characteristics?: string;
  details?: LevelDetails;
  height?: number;
  default: boolean;
  forced: boolean;
  groupId: string;
  id: number;
  instreamId?: string;
  lang?: string;
  assocLang?: string;
  name: string;
  textCodec?: string;
  unknownCodecs?: string[];
  type: MediaPlaylistType | 'main';
  url: string;
  videoCodec?: string;
  width?: number;
}

export interface MediaPlaylist {
  attrs: MediaAttributes;
  audioCodec?: string;
  autoselect: boolean;
  bitrate: number;
  channels?: string;
  characteristics?: string;
  details?: LevelDetails;
  height?: number;
  default: boolean;
  forced: boolean;
  groupId: string;
  id: number;
  instreamId?: string;
  lang?: string;
  assocLang?: string;
  name: string;
  textCodec?: string;
  unknownCodecs?: string[];
  type: MediaPlaylistType | 'main';
  url: string;
  videoCodec?: string;
  width?: number;
}

export type MediaPlaylistType = MainPlaylistType | SubtitlePlaylistType;

export type SubtitlePlaylistType = 'SUBTITLES' | 'CLOSED-CAPTIONS';

export type MainPlaylistType = AudioPlaylistType | 'VIDEO';

export type AudioPlaylistType = 'AUDIO';

export interface MediaAttributes {
  'ASSOC-LANGUAGE'?: string;
  AUTOSELECT?: 'YES' | 'NO';
  CHANNELS?: string;
  CHARACTERISTICS?: string;
  DEFAULT?: 'YES' | 'NO';
  FORCED?: 'YES' | 'NO';
  'GROUP-ID': string;
  'INSTREAM-ID'?: string;
  LANGUAGE?: string;
  NAME: string;
  'PATHWAY-ID'?: string;
  'STABLE-RENDITION-ID'?: string;
  TYPE?: MediaPlaylistType;
  URI?: string;
}
