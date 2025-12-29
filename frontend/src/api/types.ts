/**
 * Consolidated type definitions for the application API.
 * This file serves as the single source of truth for data structures.
 */

// -----------------------------------------------------------------------------
// # PLATFORMS
// -----------------------------------------------------------------------------

/**
 * A constant object mapping platform keys to their display names.
 * This is useful for UI components that need to display platform information.
 */
export const PLATFORMS = {
  youtube: "YouTube",
  instagram: "Instagram",
  tiktok: "TikTok",
  reddit: "Reddit",
  twitter: "Twitter/X",
  "youtube-shorts": "YouTube Shorts",
} as const;

/**
 * A union type of all valid platform keys.
 * e.g., "youtube", "instagram", etc.
 */
export type PlatformKey = keyof typeof PLATFORMS;

/**
 * A union type of all valid platform display names.
 * e.g., "YouTube", "Instagram", etc.
 */
export type Platform = (typeof PLATFORMS)[PlatformKey];


// -----------------------------------------------------------------------------
// # MEDIA & JOBS
// -----------------------------------------------------------------------------

/**
 * Represents the type of a media file.
 */
export type MediaType = "video" | "image" | "audio";

/**
 * Represents the status of a download job.
 * - `completed`: The download finished successfully.
 * - `downloading`: The file is currently being downloaded.
 * - `failed`: The download failed.
 * - `queued`: The download is waiting to start.
 * - `paused`: The download is paused.
 */
export type JobStatus = "completed" | "downloading" | "failed" | "queued" | "paused";

/**
 * Base interface for any media content.
 * This is the canonical representation of a media object within the system,
 * whether it's from a live feed or stored locally.
 */
export interface MediaItem {
  id: string;
  type: MediaType;
  title: string;
  
  platform: Platform;
  
  // URLs
  thumbUrl: string; // URL for the thumbnail image (for previews).
  sourceUrl?: string; // Direct URL to the media file for playback or full resolution.
  originUrl?: string; // URL of the original post on the source platform (e.g., tweet, video page).
  
  // Metadata
  author?: string;
  createdAt: string; // ISO 8601 date string.
  tags?: string[];
  
  // State
  isStored: boolean; // `true` if the media is saved in the user's library.
  isInaccessible?: boolean; // `true` if the local file is missing or corrupted.
}

/**
 * Represents an item in the live feed. It's a `MediaItem` that is not yet stored.
 */
export type FeedItem = MediaItem & { isStored: false };

/**
 * Represents a download job in the system.
 */
export interface Job {
  id: string;
  status: JobStatus;
  
  title: string;
  platform: Platform;
  
  progress?: number; // Download progress percentage (0-100).
  size?: string; // Formatted file size string (e.g., "1.2 GB").
  
  createdAt: string; // ISO 8601 date string for when the job was created.
  
  error?: string; // Error message if the job failed.
  
  // The ID of the resulting media item once the download is complete.
  mediaId?: string;
}
