import React, { useState, useEffect, useCallback } from 'react';
import { 
  FaFolder, 
  FaFolderOpen, 
  FaImage, 
  FaTrash, 
  FaPlus, 
  FaChevronRight, 
  FaChevronDown,
  FaStar,
  FaRegStar
} from 'react-icons/fa';
import { getLocationPhotos, deleteLocationPhoto, updateLocationPhoto } from '@api/locations/LocationPhotosApi';

interface PhotoFile {
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

interface Folder {
  id: string;
  name: string;
  photos: PhotoFile[];
  isExpanded: boolean;
}

interface PhotoFileSystemProps {
  locationId: string;
  onPhotoDelete?: (photoId: string) => void;
  onPhotoUpdate?: (photoId: string, updates: Partial<PhotoFile>) => void;
  onPhotosLoaded?: (photos: PhotoFile[]) => void;
}

export const PhotoFileSystem: React.FC<PhotoFileSystemProps> = ({
  locationId,
  onPhotoDelete,
  onPhotoUpdate,
  onPhotosLoaded,
}) => {
  const [photos, setPhotos] = useState<PhotoFile[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoFile | null>(null);
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [editForm, setEditForm] = useState<{ description: string; keywords: string }>({
    description: '',
    keywords: ''
  });
  const [hasLoadedInitialData, setHasLoadedInitialData] = useState(false);

  // Load photos from API only once
  const loadPhotos = useCallback(async () => {
    if (hasLoadedInitialData) return; // Don't reload if we already have data
    
    try {
      setLoading(true);
      const photoData = await getLocationPhotos(locationId);
      setPhotos(photoData);
      
      // Auto-organize photos into folders based on keywords or create default folders
      organizePhotosIntoFolders(photoData);
      setHasLoadedInitialData(true);
      
      // Notify parent component about loaded photos
      onPhotosLoaded?.(photoData);
    } catch (err) {
      setError('Failed to load photos');
      console.error('Error loading photos:', err);
    } finally {
      setLoading(false);
    }
  }, [locationId, hasLoadedInitialData, onPhotosLoaded]);

  // Organize photos into folders
  const organizePhotosIntoFolders = useCallback((photoData: PhotoFile[]) => {
    const defaultFolders: Folder[] = [
      { id: 'primary', name: 'Primary Photos', photos: [], isExpanded: true },
      { id: 'exterior', name: 'Exterior', photos: [], isExpanded: false },
      { id: 'interior', name: 'Interior', photos: [], isExpanded: false },
      { id: 'details', name: 'Details', photos: [], isExpanded: false },
      { id: 'other', name: 'Other', photos: [], isExpanded: false },
    ];

    // Categorize photos based on keywords or description
    photoData.forEach(photo => {
      const keywords = photo.keywords?.map(k => k.toLowerCase()) || [];
      const description = photo.description?.toLowerCase() || '';
      
      if (photo.isPrimary) {
        defaultFolders[0].photos.push(photo);
      } else if (keywords.some(k => ['exterior', 'outside', 'building', 'facade'].includes(k)) ||
                 description.includes('exterior') || description.includes('outside')) {
        defaultFolders[1].photos.push(photo);
      } else if (keywords.some(k => ['interior', 'inside', 'room', 'space'].includes(k)) ||
                 description.includes('interior') || description.includes('inside')) {
        defaultFolders[2].photos.push(photo);
      } else if (keywords.some(k => ['detail', 'closeup', 'feature'].includes(k)) ||
                 description.includes('detail') || description.includes('closeup')) {
        defaultFolders[3].photos.push(photo);
      } else {
        defaultFolders[4].photos.push(photo);
      }
    });

    setFolders(defaultFolders);
  }, []);

  // Create new folder
  const createFolder = useCallback(() => {
    if (!newFolderName.trim()) return;
    
    const newFolder: Folder = {
      id: `folder-${Date.now()}`,
      name: newFolderName.trim(),
      photos: [],
      isExpanded: true,
    };
    
    setFolders(prev => [...prev, newFolder]);
    setNewFolderName('');
    setShowCreateFolder(false);
  }, [newFolderName]);

  // Toggle folder expansion
  const toggleFolder = useCallback((folderId: string) => {
    setFolders(prev => 
      prev.map(folder => 
        folder.id === folderId 
          ? { ...folder, isExpanded: !folder.isExpanded }
          : folder
      )
    );
  }, []);

  // Move photo to folder
  const movePhotoToFolder = useCallback((photoId: string, targetFolderId: string) => {
    setFolders(prev => {
      const newFolders = [...prev];
      
      // Find the photo in all folders
      let photoToMove: PhotoFile | null = null;
      let sourceFolderIndex = -1;
      
      newFolders.forEach((folder, folderIndex) => {
        const photoIndex = folder.photos.findIndex(p => p.fileId === photoId);
        if (photoIndex !== -1) {
          photoToMove = folder.photos[photoIndex];
          sourceFolderIndex = folderIndex;
        }
      });
      
      if (photoToMove && sourceFolderIndex !== -1) {
        // Remove from source folder
        newFolders[sourceFolderIndex].photos = newFolders[sourceFolderIndex].photos.filter(p => p.fileId !== photoId);
        
        // Add to target folder
        const targetFolderIndex = newFolders.findIndex(f => f.id === targetFolderId);
        if (targetFolderIndex !== -1) {
          newFolders[targetFolderIndex].photos.push(photoToMove);
        }
      }
      
      return newFolders;
    });
  }, []);

  // Update form when photo is selected
  const handlePhotoSelect = useCallback((photo: PhotoFile) => {
    console.log('Photo selected:', photo.fileId); // Debug log
    console.log('Photo data:', {
      description: photo.description,
      keywords: photo.keywords,
      fileName: photo.fileName
    });
    
    setSelectedPhoto(photo);
    const newEditForm = {
      description: photo.description || '',
      keywords: photo.keywords?.join(', ') || ''
    };
    
    console.log('Setting edit form to:', newEditForm);
    setEditForm(newEditForm);
  }, []);

  // Delete photo
  const handleDeletePhoto = useCallback(async (photoId: string) => {
    console.log('Delete photo called for:', photoId); // Debug log
    try {
      await deleteLocationPhoto(photoId);
      setPhotos(prev => prev.filter(p => p.fileId !== photoId));
      setFolders(prev => 
        prev.map(folder => ({
          ...folder,
          photos: folder.photos.filter(p => p.fileId !== photoId)
        }))
      );
      if (selectedPhoto?.fileId === photoId) {
        setSelectedPhoto(null);
      }
      onPhotoDelete?.(photoId);
    } catch (err) {
      console.error('Error deleting photo:', err);
    }
  }, [onPhotoDelete, selectedPhoto]);

  // Update photo metadata
  const handleUpdatePhoto = useCallback(async (photoId: string, updates: Partial<PhotoFile>) => {
    console.log('handleUpdatePhoto called with:', photoId, updates); // Debug log
    try {
      const updatedPhoto = await updateLocationPhoto(photoId, updates);
      setPhotos(prev => 
        prev.map(p => p.fileId === photoId ? updatedPhoto : p)
      );
      setFolders(prev => 
        prev.map(folder => ({
          ...folder,
          photos: folder.photos.map(p => p.fileId === photoId ? updatedPhoto : p)
        }))
      );
      onPhotoUpdate?.(photoId, updates);
    } catch (err) {
      console.error('Error updating photo:', err);
    }
  }, [onPhotoUpdate]);

  // Toggle primary photo
  const togglePrimary = useCallback(async (photoId: string) => {
    console.log('togglePrimary called for:', photoId); // Debug log
    const photo = photos.find(p => p.fileId === photoId);
    if (!photo) return;
    
    // Check if this photo is already the primary one
    const isCurrentlyPrimary = photo.isPrimary;
    if (isCurrentlyPrimary) {
      console.log('Photo is already primary, no need to toggle'); // Debug log
      return;
    }
    
    await handleUpdatePhoto(photoId, { isPrimary: !photo.isPrimary });
  }, [photos, handleUpdatePhoto]);

  // Save photo changes
  const handleSaveChanges = useCallback(async () => {
    if (!selectedPhoto) {
      console.log('No selected photo, cannot save changes');
      return;
    }
    
    // Check if there are actual changes to save
    const originalDescription = selectedPhoto.description || '';
    const originalKeywords = selectedPhoto.keywords?.join(', ') || '';
    const newDescription = editForm.description;
    const newKeywords = editForm.keywords;
    
    console.log('Save changes check:', {
      selectedPhotoId: selectedPhoto.fileId,
      originalDescription,
      newDescription,
      originalKeywords,
      newKeywords,
      hasChanges: originalDescription !== newDescription || originalKeywords !== newKeywords
    });
    
    if (originalDescription === newDescription && originalKeywords === newKeywords) {
      console.log('No changes detected, skipping save'); // Debug log
      return;
    }
    
    console.log('handleSaveChanges called for:', selectedPhoto.fileId); // Debug log
    try {
      const updates = {
        description: editForm.description,
        keywords: editForm.keywords.split(',').map(k => k.trim()).filter(k => k)
      };
      
      console.log('Sending updates:', updates);
      await handleUpdatePhoto(selectedPhoto.fileId, updates);
      console.log('Save changes completed successfully');
    } catch (err) {
      console.error('Error saving photo changes:', err);
    }
  }, [selectedPhoto, editForm, handleUpdatePhoto]);

  // Get authenticated image URL
  const getImageUrl = useCallback((photoId: string) => {
    return `/api/v1/location-photos/public/${photoId}/image`;
  }, []);

  // Load photos on mount
  useEffect(() => {
    loadPhotos();
  }, [loadPhotos]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="ml-3 text-gray-600">Loading photos...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <FaImage className="text-red-500 text-4xl mx-auto mb-4" />
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">Photo Library</h3>
        <button
          onClick={() => setShowCreateFolder(true)}
          className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          <FaPlus />
          New Folder
        </button>
      </div>

      {/* Create Folder Modal */}
      {showCreateFolder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Create New Folder</h3>
            <input
              type="text"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder="Folder name"
              className="w-full p-2 border border-gray-300 rounded mb-4"
              onKeyPress={(e) => e.key === 'Enter' && createFolder()}
            />
            <div className="flex gap-2">
              <button
                onClick={createFolder}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Create
              </button>
              <button
                onClick={() => setShowCreateFolder(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Folder Tree */}
      <div className="space-y-2">
        {folders.map(folder => (
          <div key={folder.id} className="border border-gray-200 rounded-lg">
            {/* Folder Header */}
            <div 
              className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 cursor-pointer"
              onClick={() => toggleFolder(folder.id)}
            >
              <div className="flex items-center gap-2">
                {folder.isExpanded ? <FaChevronDown /> : <FaChevronRight />}
                {folder.isExpanded ? <FaFolderOpen className="text-yellow-500" /> : <FaFolder className="text-yellow-500" />}
                <span className="font-medium">{folder.name}</span>
                <span className="text-sm text-gray-500">({folder.photos.length})</span>
              </div>
            </div>

            {/* Folder Content */}
            {folder.isExpanded && (
              <div className="p-4">
                {folder.photos.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No photos in this folder</p>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {folder.photos.map(photo => (
                      <div
                        key={photo.fileId}
                        className={`relative group border rounded-lg overflow-hidden cursor-pointer transition-all ${
                          selectedPhoto?.fileId === photo.fileId 
                            ? 'ring-2 ring-blue-500' 
                            : 'hover:shadow-lg'
                        }`}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          console.log('Photo container clicked:', photo.fileId); // Debug log
                          handlePhotoSelect(photo);
                        }}
                      >
                        {/* Photo Preview */}
                        <div className="aspect-square bg-gray-100 relative">
                          <img
                            src={getImageUrl(photo.fileId)}
                            alt={photo.fileName}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                            }}
                          />
                          
                          {/* Overlay Actions */}
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <div className="flex gap-2">
                              <button
                                type="button"
                                className="p-2 bg-white rounded-full hover:bg-gray-100"
                                onMouseDown={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                }}
                                onMouseUp={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                }}
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  console.log('Toggle primary clicked for:', photo.fileId); // Debug log
                                  togglePrimary(photo.fileId);
                                }}
                              >
                                {photo.isPrimary ? <FaStar className="text-yellow-500" /> : <FaRegStar />}
                              </button>
                              <button
                                type="button"
                                className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                                onMouseDown={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                }}
                                onMouseUp={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                }}
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  console.log('Delete button clicked for:', photo.fileId); // Debug log
                                  handleDeletePhoto(photo.fileId);
                                }}
                              >
                                <FaTrash className="text-xs" />
                              </button>
                            </div>
                          </div>

                          {/* Primary Badge */}
                          {photo.isPrimary && (
                            <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-medium">
                              Primary
                            </div>
                          )}
                        </div>

                        {/* Photo Info */}
                        <div className="p-2">
                          <p className="text-sm font-medium truncate">{photo.fileName}</p>
                          <p className="text-xs text-gray-500">
                            {(photo.fileSize / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Photo Details Panel */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-semibold">Photo Details</h3>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Photo Preview */}
                <div className="flex-shrink-0">
                  <img
                    src={getImageUrl(selectedPhoto.fileId)}
                    alt={selectedPhoto.fileName}
                    className="w-full rounded-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>

                {/* Photo Info */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      File Name
                    </label>
                    <p className="text-sm text-gray-900">{selectedPhoto.fileName}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <input
                      type="text"
                      value={editForm.description}
                      onChange={(e) => {
                        console.log('Description changed to:', e.target.value);
                        setEditForm(prev => ({ ...prev, description: e.target.value }));
                      }}
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="Add description..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Keywords
                    </label>
                    <input
                      type="text"
                      value={editForm.keywords}
                      onChange={(e) => {
                        console.log('Keywords changed to:', e.target.value);
                        setEditForm(prev => ({ ...prev, keywords: e.target.value }));
                      }}
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="Add keywords (comma separated)..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Move to Folder
                    </label>
                    <select
                      onChange={(e) => movePhotoToFolder(selectedPhoto.fileId, e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                    >
                      {folders.map(folder => (
                        <option key={folder.id} value={folder.id}>
                          {folder.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer with Actions */}
            <div className="flex items-center justify-between p-6 border-t bg-gray-50">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Save Changes button clicked');
                    handleSaveChanges();
                  }}
                  disabled={!selectedPhoto}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Save Changes
                </button>
              </div>
              
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('Modal delete button clicked for:', selectedPhoto.fileId); // Debug log
                  handleDeletePhoto(selectedPhoto.fileId);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                <FaTrash />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 