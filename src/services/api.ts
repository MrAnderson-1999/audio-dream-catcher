
/**
 * API service for handling YouTube audio downloads
 */

interface DownloadItem {
  id: string;
  url: string;
  format: string;
}

interface PlaylistEntry {
  id: string;
  title: string;
  thumbnail: string;
  formats: string[];
}

interface VideoMetadata {
  type: 'video' | 'playlist';
  title: string;
  thumbnail: string;
  formats: string[];
  entries?: PlaylistEntry[];
}

/**
 * Fetch metadata for a YouTube URL (video or playlist)
 */
export const fetchMetadata = async (url: string): Promise<VideoMetadata> => {
  try {
    // Make sure we're using the correct HTTP method (POST) and properly formatted JSON
    const response = await fetch('/info', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: url.trim() })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || response.statusText);
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

/**
 * Download audio from YouTube URL(s)
 */
export const downloadMedia = async (items: DownloadItem[]): Promise<{ blob: Blob, filename: string }> => {
  try {
    // For single items, use legacy format if it's just one URL (compatibility with original code)
    let requestBody;
    let endpoint = '/download';
    
    if (items.length === 1 && items[0].format === 'wav') {
      // Legacy format - just the URL directly
      requestBody = { url: items[0].url };
    } else {
      // New format - array of items with formats
      requestBody = { items };
    }
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || response.statusText);
    }

    // Extract filename from Content-Disposition header
    const dispo = response.headers.get('Content-Disposition') || '';
    let filename;
    
    const rfc5987 = dispo.match(/filename\*\=UTF-8''([^;]+)/);
    if (rfc5987) {
      filename = decodeURIComponent(rfc5987[1]);
    } else {
      const regular = dispo.match(/filename=\"?([^\";]+)\"?/);
      filename = regular ? regular[1] : `download.zip`;
    }

    const blob = await response.blob();
    return { blob, filename };
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export default {
  fetchMetadata,
  downloadMedia
};
