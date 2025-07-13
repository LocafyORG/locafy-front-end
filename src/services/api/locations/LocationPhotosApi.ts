import { getAuthToken } from "@api/auth/authTokenApi";

export interface LocationPhotoUpload {
  file: File;
  isPrimary?: boolean;
  description?: string;
  keywords?: string[];
}

export interface LocationPhotoResponse {
  fileId: string;
  fileName: string;
  filePath: string;
  fileType: string;
  fileSize: number;
  locationId: string;
  resolution?: string;
  keywords?: string[];
  description?: string;
  isPrimary: boolean;
  exifData?: string;
  uploadedAt: string;
  lastUpdatedAt: string;
}

export interface UploadProgress {
  current: number;
  total: number;
  percentage: number;
  fileName?: string;
  status: 'uploading' | 'processing' | 'completed' | 'error';
}

// Upload a single photo for a location
export const uploadLocationPhoto = async (
  locationId: string,
  photoUpload: LocationPhotoUpload,
  onProgress?: (progress: UploadProgress) => void
): Promise<LocationPhotoResponse> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error("No authentication token found. Please log in.");
  }

  // Check file size before uploading (50MB limit)
  const maxFileSize = 50 * 1024 * 1024; // 50MB in bytes
  if (photoUpload.file.size > maxFileSize) {
    throw new Error(`File "${photoUpload.file.name}" is too large (${(photoUpload.file.size / 1024 / 1024).toFixed(1)}MB). Maximum file size is 50MB.`);
  }

  const formData = new FormData();
  formData.append("file", photoUpload.file);
  formData.append("isPrimary", photoUpload.isPrimary?.toString() || "false");
  
  if (photoUpload.description) {
    formData.append("description", photoUpload.description);
  }
  
  if (photoUpload.keywords && photoUpload.keywords.length > 0) {
    photoUpload.keywords.forEach(keyword => {
      formData.append("keywords", keyword);
    });
  }

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    
    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable && onProgress) {
        const percentage = Math.round((event.loaded / event.total) * 100);
        onProgress({
          current: event.loaded,
          total: event.total,
          percentage,
          fileName: photoUpload.file.name,
          status: 'uploading'
        });
      }
    });

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          if (onProgress) {
            onProgress({
              current: 100,
              total: 100,
              percentage: 100,
              fileName: photoUpload.file.name,
              status: 'completed'
            });
          }
          resolve(response);
        } catch {
          reject(new Error('Failed to parse response'));
        }
      } else {
        if (onProgress) {
          onProgress({
            current: 0,
            total: 100,
            percentage: 0,
            fileName: photoUpload.file.name,
            status: 'error'
          });
        }
        
        // Handle specific error cases
        let errorMessage = `Failed to upload photo: ${xhr.statusText}`;
        
        if (xhr.status === 413) {
          errorMessage = `File "${photoUpload.file.name}" is too large. Maximum file size is 50MB.`;
        } else if (xhr.status === 401) {
          errorMessage = 'Authentication failed. Please log in again.';
        } else if (xhr.status === 403) {
          errorMessage = 'You do not have permission to upload photos to this location.';
        } else if (xhr.status === 500) {
          errorMessage = 'Server error occurred while uploading. Please try again.';
        }
        
        reject(new Error(errorMessage));
      }
    });

    xhr.addEventListener('readystatechange', () => {
      // When upload is complete but response is still being processed
      if (xhr.readyState === 3 && onProgress) {
        onProgress({
          current: 100,
          total: 100,
          percentage: 100,
          fileName: photoUpload.file.name,
          status: 'processing' // Server is processing the uploaded file
        });
      }
    });

    xhr.addEventListener('error', () => {
      if (onProgress) {
        onProgress({
          current: 0,
          total: 100,
          percentage: 0,
          fileName: photoUpload.file.name,
          status: 'error'
        });
      }
      reject(new Error('Network error occurred'));
    });

    xhr.open('POST', `/api/v1/location-photos/${locationId}/upload`);
    xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    xhr.send(formData);
  });
};

// Upload multiple photos for a location sequentially (fallback)
export const uploadLocationPhotos = async (
  locationId: string,
  photoUploads: LocationPhotoUpload[],
  onProgress?: (progress: UploadProgress) => void
): Promise<LocationPhotoResponse[]> => {
  const results: LocationPhotoResponse[] = [];
  
  // Upload files sequentially to avoid overwhelming the server
  for (let i = 0; i < photoUploads.length; i++) {
    const upload = photoUploads[i];
    try {
      const result = await uploadLocationPhoto(locationId, upload, onProgress);
      results.push(result);
    } catch (error) {
      console.error(`Failed to upload photo: ${upload.file.name}`, error);
      // Continue with other uploads even if one fails
    }
  }
  
  return results;
};

// Upload multiple photos for a location using bulk endpoint
export const uploadLocationPhotosBulk = async (
  locationId: string,
  photoUploads: LocationPhotoUpload[]
): Promise<LocationPhotoResponse[]> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error("No authentication token found. Please log in.");
  }

  const formData = new FormData();
  
  // Add all files
  photoUploads.forEach((upload) => {
    formData.append("files", upload.file);
  });
  
  // Add metadata (using the first upload's metadata for all files)
  if (photoUploads.length > 0) {
    const firstUpload = photoUploads[0];
    formData.append("isPrimary", firstUpload.isPrimary?.toString() || "false");
    
    if (firstUpload.description) {
      formData.append("description", firstUpload.description);
    }
    
    if (firstUpload.keywords && firstUpload.keywords.length > 0) {
      firstUpload.keywords.forEach(keyword => {
        formData.append("keywords", keyword);
      });
    }
  }

  const response = await fetch(`/api/v1/location-photos/${locationId}/upload-bulk`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Failed to upload photos: ${response.statusText}`);
  }

  return response.json();
};

// Get all photos for a location
export const getLocationPhotos = async (
  locationId: string
): Promise<LocationPhotoResponse[]> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error("No authentication token found. Please log in.");
  }

  const response = await fetch(`/api/v1/location-photos/location/${locationId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch photos: ${response.statusText}`);
  }

  return response.json();
};

// Delete a photo
export const deleteLocationPhoto = async (photoId: string): Promise<void> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error("No authentication token found. Please log in.");
  }

  const response = await fetch(`/api/v1/location-photos/${photoId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to delete photo: ${response.statusText}`);
  }
};

// Update photo metadata
export const updateLocationPhoto = async (
  photoId: string,
  updates: {
    fileName?: string;
    description?: string;
    keywords?: string[];
    isPrimary?: boolean;
  }
): Promise<LocationPhotoResponse> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error("No authentication token found. Please log in.");
  }

  const response = await fetch(`/api/v1/location-photos/${photoId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    throw new Error(`Failed to update photo: ${response.statusText}`);
  }

  return response.json();
}; 