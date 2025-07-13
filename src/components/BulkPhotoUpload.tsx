import React, { useState, useCallback, useRef } from 'react';
import { FaCamera, FaUpload, FaTrash, FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa';

interface PhotoFile {
  file: File;
  id: string;
  preview: string;
  isPrimary: boolean;
  description: string;
  keywords: string[];
  isUploading: boolean;
  uploadProgress: number;
}

import { LocationPhotoUpload } from "@api/locations/LocationPhotosApi";

interface BulkPhotoUploadProps {
  onPhotosSelected: (photos: LocationPhotoUpload[]) => void;
  maxFiles?: number;
  acceptedFileTypes?: string[];
  maxFileSize?: number; // in MB
  existingPhotos?: Array<{ fileName: string; fileSize: number }>; // Add existing photos prop
}

export const BulkPhotoUpload: React.FC<BulkPhotoUploadProps> = ({
  onPhotosSelected,
  maxFiles = 20,
  acceptedFileTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  maxFileSize = 50, // 50MB
  existingPhotos = [], // Default to empty array
}) => {
  const [photos, setPhotos] = useState<PhotoFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    if (!acceptedFileTypes.includes(file.type)) {
      return `File type ${file.type} is not supported. Please upload: ${acceptedFileTypes.join(', ')}`;
    }
    
    if (file.size > maxFileSize * 1024 * 1024) {
      return `File size ${(file.size / 1024 / 1024).toFixed(2)}MB exceeds maximum size of ${maxFileSize}MB`;
    }
    
    // Check for duplicate files
    const isDuplicate = existingPhotos.some(existing => 
      existing.fileName === file.name && existing.fileSize === file.size
    );
    
    if (isDuplicate) {
      return `File "${file.name}" has already been uploaded`;
    }
    
    // Check for duplicates within current selection
    const isDuplicateInSelection = photos.some(photo => 
      photo.file.name === file.name && photo.file.size === file.size
    );
    
    if (isDuplicateInSelection) {
      return `File "${file.name}" is already selected`;
    }
    
    return null;
  };

  const createPhotoFile = (file: File): PhotoFile => ({
    file,
    id: Math.random().toString(36).substr(2, 9),
    preview: URL.createObjectURL(file),
    isPrimary: false,
    description: '',
    keywords: [],
    isUploading: false,
    uploadProgress: 0,
  });

  const handleFiles = useCallback((files: FileList) => {
    const newPhotos: PhotoFile[] = [];
    const errors: string[] = [];

    Array.from(files).forEach((file) => {
      const error = validateFile(file);
      if (error) {
        errors.push(`${file.name}: ${error}`);
        return;
      }

      if (photos.length + newPhotos.length >= maxFiles) {
        errors.push(`Maximum ${maxFiles} files allowed`);
        return;
      }

      newPhotos.push(createPhotoFile(file));
    });

    if (errors.length > 0) {
      alert('Upload errors:\n' + errors.join('\n'));
    }

    if (newPhotos.length > 0) {
      const updatedPhotos = [...photos, ...newPhotos];
      setPhotos(updatedPhotos);
      
      // Convert PhotoFile to LocationPhotoUpload
      const locationPhotoUploads: LocationPhotoUpload[] = updatedPhotos.map(photo => ({
        file: photo.file,
        isPrimary: photo.isPrimary,
        description: photo.description,
        keywords: photo.keywords,
      }));
      
      onPhotosSelected(locationPhotoUploads);
    }
  }, [photos, maxFiles, acceptedFileTypes, maxFileSize, onPhotosSelected]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    handleFiles(files);
  }, [handleFiles]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      handleFiles(files);
    }
  }, [handleFiles]);

  const removePhoto = useCallback((id: string) => {
    setPhotos(prev => {
      const updated = prev.filter(photo => photo.id !== id);
      
      // Convert PhotoFile to LocationPhotoUpload
      const locationPhotoUploads: LocationPhotoUpload[] = updated.map(photo => ({
        file: photo.file,
        isPrimary: photo.isPrimary,
        description: photo.description,
        keywords: photo.keywords,
      }));
      
      onPhotosSelected(locationPhotoUploads);
      return updated;
    });
  }, [onPhotosSelected]);

  const togglePrimary = useCallback((id: string) => {
    setPhotos(prev => {
      const updated = prev.map(photo => ({
        ...photo,
        isPrimary: photo.id === id ? !photo.isPrimary : false
      }));
      
      // Convert PhotoFile to LocationPhotoUpload
      const locationPhotoUploads: LocationPhotoUpload[] = updated.map(photo => ({
        file: photo.file,
        isPrimary: photo.isPrimary,
        description: photo.description,
        keywords: photo.keywords,
      }));
      
      onPhotosSelected(locationPhotoUploads);
      return updated;
    });
  }, [onPhotosSelected]);

  const updatePhotoMetadata = useCallback((id: string, updates: Partial<PhotoFile>) => {
    setPhotos(prev => {
      const updated = prev.map(photo => 
        photo.id === id ? { ...photo, ...updates } : photo
      );
      
      // Convert PhotoFile to LocationPhotoUpload
      const locationPhotoUploads: LocationPhotoUpload[] = updated.map(photo => ({
        file: photo.file,
        isPrimary: photo.isPrimary,
        description: photo.description,
        keywords: photo.keywords,
      }));
      
      onPhotosSelected(locationPhotoUploads);
      return updated;
    });
  }, [onPhotosSelected]);

  const triggerFileInput = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragOver
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <FaCamera className="mx-auto text-4xl text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Upload Location Photos
        </h3>
        <p className="text-gray-500 mb-4">
          Drag and drop photos here, or click to browse
        </p>
        <button
          type="button"
          onClick={triggerFileInput}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          <FaUpload />
          Choose Files
        </button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedFileTypes.join(',')}
          onChange={handleFileInput}
          className="hidden"
        />
        <p className="text-sm text-gray-400 mt-2">
          Max {maxFiles} files, {maxFileSize}MB each. Supported: {acceptedFileTypes.join(', ')}
        </p>
      </div>

      {/* Photo Grid */}
      {photos.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-800">
            Selected Photos ({photos.length})
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm"
              >
                {/* Photo Preview */}
                <div className="relative aspect-square bg-gray-100">
                  <img
                    src={photo.preview}
                    alt={photo.file.name}
                    className="w-full h-full object-cover"
                  />
                  {photo.isUploading && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <FaSpinner className="text-white text-2xl animate-spin" />
                    </div>
                  )}
                  {photo.isPrimary && (
                    <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium">
                      Primary
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => removePhoto(photo.id)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition"
                  >
                    <FaTrash className="text-xs" />
                  </button>
                </div>

                {/* Photo Info */}
                <div className="p-3 space-y-2">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {photo.file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(photo.file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  
                  {/* Primary Toggle */}
                  <button
                    type="button"
                    onClick={() => togglePrimary(photo.id)}
                    className={`flex items-center gap-1 text-xs px-2 py-1 rounded transition ${
                      photo.isPrimary
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {photo.isPrimary ? <FaEye /> : <FaEyeSlash />}
                    {photo.isPrimary ? 'Primary' : 'Set Primary'}
                  </button>

                  {/* Description Input */}
                  <input
                    type="text"
                    placeholder="Description (optional)"
                    value={photo.description}
                    onChange={(e) => updatePhotoMetadata(photo.id, { description: e.target.value })}
                    className="w-full text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />

                  {/* Keywords Input */}
                  <input
                    type="text"
                    placeholder="Keywords (comma separated)"
                    value={photo.keywords.join(', ')}
                    onChange={(e) => updatePhotoMetadata(photo.id, { 
                      keywords: e.target.value.split(',').map(k => k.trim()).filter(k => k)
                    })}
                    className="w-full text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}; 