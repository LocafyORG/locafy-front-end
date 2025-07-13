import React from 'react';
import { UploadProgress } from '../../services/api/locations/LocationPhotosApi';

interface UploadProgressBarProps {
  progress: UploadProgress | null;
  totalFiles: number;
  currentFileIndex: number;
  uploadedFiles: string[];
  failedFiles: string[];
  isUploading: boolean;
}

export const UploadProgressBar: React.FC<UploadProgressBarProps> = ({
  progress,
  totalFiles,
  currentFileIndex,
  uploadedFiles,
  failedFiles,
  isUploading,
}) => {
  if (!isUploading) return null;

  const overallProgress = totalFiles > 0 ? (currentFileIndex / totalFiles) * 100 : 0;

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg shadow-lg p-4 w-80 z-50">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-900">Uploading Photos</h3>
        <span className="text-xs text-gray-500">
          {currentFileIndex}/{totalFiles}
        </span>
      </div>
      
      {/* Overall progress */}
      <div className="mb-3">
        <div className="flex justify-between text-xs text-gray-600 mb-1">
          <span>Overall Progress</span>
          <span>{Math.round(overallProgress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>

      {/* Current file progress */}
      {progress && (
        <div className="mb-3">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span className="truncate">{progress.fileName}</span>
            <span>{progress.percentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                progress.status === 'error' ? 'bg-red-500' : 
                progress.status === 'processing' ? 'bg-yellow-500' : 'bg-green-500'
              }`}
              style={{ width: `${progress.percentage}%` }}
            />
          </div>
          {progress.status === 'error' && (
            <p className="text-xs text-red-500 mt-1">Upload failed</p>
          )}
          {progress.status === 'processing' && (
            <p className="text-xs text-yellow-600 mt-1">Processing file...</p>
          )}
        </div>
      )}

      {/* Status summary */}
      <div className="text-xs text-gray-500 space-y-1">
        {uploadedFiles.length > 0 && (
          <div className="flex items-center">
            <span className="text-green-500 mr-1">✓</span>
            <span>{uploadedFiles.length} uploaded</span>
          </div>
        )}
        {failedFiles.length > 0 && (
          <div className="flex items-center">
            <span className="text-red-500 mr-1">✗</span>
            <span>{failedFiles.length} failed</span>
          </div>
        )}
      </div>
    </div>
  );
}; 