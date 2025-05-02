
/**
 * API service for handling YouTube audio downloads
 */

interface DownloadItem {
  id: string;
  url: string;
  format: string;
}

/**
 * Download audio from YouTube URL(s)
 */
export const downloadMedia = async (items: DownloadItem[]): Promise<{ blob: Blob, filename: string }> => {
  try {
    console.log("Sending download request for items:", items);
    
    // Prepare request body based on number of items
    let requestBody;
    
    // Direct to /download endpoint as configured in nginx
    const endpoint = '/download';
    
    if (items.length === 1) {
      // For single items, use a simpler format
      requestBody = { url: items[0].url, format: items[0].format };
    } else {
      // For multiple items, use the items array format
      requestBody = { items };
    }
    
    console.log(`Sending POST request to ${endpoint} with body:`, requestBody);
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Download API error response:", errorText);
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
  downloadMedia
};
