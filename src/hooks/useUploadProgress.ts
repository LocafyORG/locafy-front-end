import { useState, useCallback } from 'react';
import { UploadProgress } from '../services/api/locations/LocationPhotosApi';

export interface UploadState {
  isUploading: boolean;
  progress: UploadProgress | null;
  uploadedFiles: string[];
  failedFiles: string[];
  totalFiles: number;
  currentFileIndex: number;
}

export const useUploadProgress = () => {
  const [uploadState, setUploadState] = useState<UploadState>({
    isUploading: false,
    progress: null,
    uploadedFiles: [],
    failedFiles: [],
    totalFiles: 0,
    currentFileIndex: 0,
  });

  const startUpload = useCallback((totalFiles: number) => {
    setUploadState({
      isUploading: true,
      progress: null,
      uploadedFiles: [],
      failedFiles: [],
      totalFiles,
      currentFileIndex: 0,
    });
  }, []);

  const updateProgress = useCallback((progress: UploadProgress) => {
    setUploadState(prev => {
      const newState = { ...prev, progress };
      
      if (progress.status === 'completed') {
        newState.uploadedFiles = [...prev.uploadedFiles, progress.fileName || ''];
        newState.currentFileIndex = prev.currentFileIndex + 1;
      } else if (progress.status === 'error') {
        newState.failedFiles = [...prev.failedFiles, progress.fileName || ''];
        newState.currentFileIndex = prev.currentFileIndex + 1;
      }
      
      return newState;
    });
  }, []);

  const finishUpload = useCallback(() => {
    setUploadState(prev => ({
      ...prev,
      isUploading: false,
    }));
  }, []);

  const resetUpload = useCallback(() => {
    setUploadState({
      isUploading: false,
      progress: null,
      uploadedFiles: [],
      failedFiles: [],
      totalFiles: 0,
      currentFileIndex: 0,
    });
  }, []);

  return {
    uploadState,
    startUpload,
    updateProgress,
    finishUpload,
    resetUpload,
  };
}; 