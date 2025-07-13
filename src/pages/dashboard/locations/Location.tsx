import { getLocationById } from "@api/locations/LocationsApi";
import { uploadLocationPhotos, LocationPhotoUpload } from "@api/locations/LocationPhotosApi";
import { Paper } from "@components/Container";
import { CSpinner } from "@coreui/react";
import { DashboardPageHeader } from "@layouts/DashboardLayout";
import { PhotoFileSystem } from "@components/PhotoFileSystem";
import { BulkPhotoUpload } from "@components/BulkPhotoUpload";
import { UploadProgressBar } from "@components/ui/UploadProgressBar";
import { useUploadProgress } from "@hooks/useUploadProgress";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router";
import { MapView } from "@components/mapView";
import { useState, useCallback } from "react";
import {
  FaMapMarkerAlt,
  FaEdit,
  FaShareAlt,
  FaArrowLeft,
  FaCalendarAlt,
  FaTag,
  FaInfoCircle,
  FaMap,
  FaClock,
  FaStickyNote,
  FaBuilding,
  FaCity,
  FaGlobe,
  FaImages,
  FaCamera,
  FaTimes,
} from "react-icons/fa";
import { DASHBOARD } from "@constants/Routes";

export function Location() {
  const { locationId } = useParams();
  const navigate = useNavigate();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState<LocationPhotoUpload[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [existingPhotos, setExistingPhotos] = useState<Array<{ fileName: string; fileSize: number }>>([]);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const { uploadState, startUpload, updateProgress, finishUpload } = useUploadProgress();

  const {
    data: location,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getLocationById(locationId || ""),
    queryKey: ["location", { locationId }],
  });

  const scrollToMap = () => {
    const mapSection = document.getElementById("map-section");
    if (mapSection) {
      mapSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleUploadPhotos = useCallback(async () => {
    if (selectedPhotos.length === 0 || !location?.locationId) return;
    
    setIsUploading(true);
    startUpload(selectedPhotos.length);
    
    try {
      await uploadLocationPhotos(location.locationId, selectedPhotos, updateProgress);
      setSelectedPhotos([]);
      setShowUploadModal(false);
      
      // Update existing photos list with newly uploaded photos
      const newExistingPhotos = selectedPhotos.map(photo => ({
        fileName: photo.file.name,
        fileSize: photo.file.size
      }));
      setExistingPhotos(prev => [...prev, ...newExistingPhotos]);
      
      // Refresh the page or refetch data to show new photos
      window.location.reload();
    } catch (error) {
      console.error('Error uploading photos:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to upload photos. Please try again.';
      setUploadError(errorMessage);
    } finally {
      setIsUploading(false);
      finishUpload();
    }
  }, [selectedPhotos, location?.locationId, startUpload, updateProgress, finishUpload]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <CSpinner />
          <p className="text-gray-600">Loading location details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex justify-center items-center min-h-screen">
        <div className="text-center">
          <FaMapMarkerAlt className="text-red-500 text-4xl mx-auto mb-4" />
          <h1 className="text-xl font-semibold text-red-600">
            Error loading location
          </h1>
          <p className="text-gray-600 mt-2">Failed to load location data.</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Not specified";
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(new Date(dateString));
  };

  const addresses = location ? Object.values(location.addresses) : [];

  // Debug logging to understand the data structure
  console.log('Location data:', location);
  console.log('Addresses:', addresses);

  // Filter out addresses that have no meaningful data
  const validAddresses = addresses.filter(address => 
    address.addressLine1 || 
    address.city || 
    address.stateProvinceRegion || 
    address.postalCode || 
    address.country
  );

  console.log('Valid addresses:', validAddresses);

  const firstAddressWithCoords = addresses.find(
    (addr) => addr.latitude && addr.longitude,
  );
  const mapCoords = firstAddressWithCoords
    ? {
        lat: firstAddressWithCoords.latitude,
        lng: firstAddressWithCoords.longitude,
      }
    : { lat: 43.65, lng: -79.4 };

  // Helper function to format full address
  const formatFullAddress = (address: { 
    addressLine1?: string; 
    addressLine2?: string; 
    city?: string; 
    stateProvinceRegion?: string; 
    postalCode?: string; 
    country?: string; 
  }) => {
    const parts = [
      address.addressLine1,
      address.addressLine2,
      address.city,
      address.stateProvinceRegion,
      address.postalCode,
      address.country
    ].filter(Boolean);
    
    return parts.join(", ") || "Address not specified";
  };

  return (
    <>
      <DashboardPageHeader
        title={location?.name || "Unknown Location"}
        leftButtons={[
          {
            children: (
              <span className="flex items-center gap-2">
                <FaArrowLeft /> BACK
              </span>
            ),
            onClick: () => navigate("/dashboard/locations"),
            className:
              "flex items-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded transition",
          },
        ]}
        buttons={[
          {
            children: (
              <span className="flex items-center gap-2">
                <FaShareAlt /> SHARE
              </span>
            ),
            onClick: () => {},
            className:
              "flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded transition",
          },
          {
            children: (
              <span className="flex items-center gap-2">
                <FaEdit /> EDIT LOCATION
              </span>
            ),
            onClick: () => {
              if (location?.locationId) {
                navigate(`${DASHBOARD.EDIT_LOCATION}/${location.locationId}`);
              }
            },
            className:
              "flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition",
          },
        ]}
      />

      <div className="max-w-6xl mx-auto mt-8">
        {/* Location Information */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Details */}
            <Paper className="p-6 bg-white shadow-xl rounded-xl border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <FaMapMarkerAlt className="text-blue-500 text-xl" />
                <h2 className="text-2xl font-bold text-gray-800">
                  Location Details
                </h2>
              </div>

              <div className="space-y-4">
                {location?.name && (
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <FaInfoCircle className="text-blue-500 text-xl" />
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Name</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {location.name}
                      </p>
                    </div>
                  </div>
                )}

                {location?.locationType && (
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <FaTag className="text-green-500 text-xl" />
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Type</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {location.locationType}
                      </p>
                    </div>
                  </div>
                )}

                {location?.notes && (
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <FaStickyNote className="text-yellow-500 text-xl" />
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Notes</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {location.notes}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </Paper>

            {/* Addresses */}
            <Paper className="p-6 bg-white shadow-xl rounded-xl border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <FaMap className="text-purple-500 text-xl" />
                <h2 className="text-2xl font-bold text-gray-800">Addresses</h2>
              </div>

              {validAddresses.length === 0 ? (
                <div className="text-center py-8">
                  <FaMapMarkerAlt className="text-gray-300 text-4xl mx-auto mb-4" />
                  <p className="text-gray-500">No addresses available.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {validAddresses.map((address, idx) => (
                    <div
                      key={idx}
                      className="border border-gray-200 rounded-lg p-6 bg-gray-50"
                    >
                      <div className="mb-4">
                        <h3 className="font-semibold text-gray-800 mb-2">
                          Address {idx + 1}
                        </h3>
                      </div>

                      {/* Full Address String */}
                      <div className="mb-4 p-4 bg-white rounded-lg border border-gray-200">
                        <div className="flex items-center gap-2 mb-2">
                          <FaMapMarkerAlt className="text-blue-500" />
                          <span className="text-sm font-medium text-gray-600">
                            Full Address
                          </span>
                        </div>
                        <p className="text-gray-800 font-medium">
                          {formatFullAddress(address)}
                        </p>
                      </div>

                      {/* Parsed Address Components */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {address.city && (
                          <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                            <FaCity className="text-green-500" />
                            <div>
                              <p className="text-xs text-gray-500 font-medium">
                                City
                              </p>
                              <p className="text-sm font-semibold text-gray-900">
                                {address.city}
                              </p>
                            </div>
                          </div>
                        )}

                        {address.stateProvinceRegion && (
                          <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                            <FaBuilding className="text-orange-500" />
                            <div>
                              <p className="text-xs text-gray-500 font-medium">
                                State/Province
                              </p>
                              <p className="text-sm font-semibold text-gray-900">
                                {address.stateProvinceRegion}
                              </p>
                            </div>
                          </div>
                        )}

                        {address.postalCode && (
                          <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                            <FaTag className="text-purple-500" />
                            <div>
                              <p className="text-xs text-gray-500 font-medium">
                                Postal Code
                              </p>
                              <p className="text-sm font-semibold text-gray-900">
                                {address.postalCode}
                              </p>
                            </div>
                          </div>
                        )}

                        {address.country && (
                          <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                            <FaGlobe className="text-blue-500" />
                            <div>
                              <p className="text-xs text-gray-500 font-medium">
                                Country
                              </p>
                              <p className="text-sm font-semibold text-gray-900">
                                {address.country}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Show a message if no address components are available */}
                      {!address.city && !address.stateProvinceRegion && !address.postalCode && !address.country && (
                        <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="flex items-center gap-2">
                            <FaMapMarkerAlt className="text-gray-400" />
                            <span className="text-sm font-medium text-gray-600">
                              No detailed address components available
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Coordinates */}
                      {address.latitude && address.longitude ? (
                        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="flex items-center gap-2 mb-2">
                            <FaMap className="text-blue-500" />
                            <span className="text-sm font-medium text-blue-700">
                              Coordinates
                            </span>
                          </div>
                          <div className="flex gap-4 text-sm">
                            <span className="text-blue-600">
                              <strong>Lat:</strong> {address.latitude}
                            </span>
                            <span className="text-blue-600">
                              <strong>Lng:</strong> {address.longitude}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                          <div className="flex items-center gap-2">
                            <FaMap className="text-yellow-500" />
                            <span className="text-sm font-medium text-yellow-700">
                              No coordinates available
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </Paper>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Metadata */}
            <Paper className="p-6 bg-white shadow-xl rounded-xl border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Metadata</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <FaCalendarAlt className="text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">
                      Uploaded
                    </p>
                    <p className="text-sm font-semibold text-gray-900">
                      {formatDate(location?.uploadedAt)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <FaClock className="text-green-500" />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">
                      Last Updated
                    </p>
                    <p className="text-sm font-semibold text-gray-900">
                      {formatDate(location?.lastUpdated)}
                    </p>
                  </div>
                </div>
              </div>
            </Paper>

            {/* Quick Actions */}
            <Paper className="p-6 bg-white shadow-xl rounded-xl border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button
                  className="w-full flex items-center gap-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition"
                  onClick={scrollToMap}
                >
                  <FaMap className="text-blue-500" />
                  <span className="font-medium text-gray-700">View on Map</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 bg-green-50 hover:bg-green-100 rounded-lg transition">
                  <FaShareAlt className="text-green-500" />
                  <span className="font-medium text-gray-700">
                    Share Location
                  </span>
                </button>
                <button
                  className="w-full flex items-center gap-3 p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition"
                  onClick={() => {
                    if (location?.locationId) {
                      navigate(
                        `${DASHBOARD.EDIT_LOCATION}/${location.locationId}`,
                      );
                    }
                  }}
                >
                  <FaEdit className="text-purple-500" />
                  <span className="font-medium text-gray-700">
                    Edit Details
                  </span>
                </button>
                <button
                  className="w-full flex items-center gap-3 p-3 bg-orange-50 hover:bg-orange-100 rounded-lg transition"
                  onClick={() => setShowUploadModal(true)}
                >
                  <FaCamera className="text-orange-500" />
                  <span className="font-medium text-gray-700">
                    Upload Photos
                  </span>
                </button>
              </div>
            </Paper>
          </div>
        </div>

        {/* Photo Library Section */}
        <div className="mb-8">
          <Paper className="p-6 bg-white shadow-xl rounded-xl border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <FaImages className="text-purple-500 text-xl" />
              <h2 className="text-xl font-bold text-gray-800">Photo Library</h2>
            </div>
            {location?.locationId && (
              <PhotoFileSystem 
                locationId={location.locationId}
                onPhotoDelete={(photoId) => {
                  console.log('Photo deleted:', photoId);
                }}
                onPhotoUpdate={(photoId, updates) => {
                  console.log('Photo updated:', photoId, updates);
                }}
                onPhotosLoaded={(photos) => {
                  setExistingPhotos(photos.map(photo => ({
                    fileName: photo.fileName,
                    fileSize: photo.fileSize
                  })));
                }}
              />
            )}
          </Paper>
        </div>

        {/* Map Section */}
        <div id="map-section">
          <Paper className="p-6 bg-white shadow-xl rounded-xl border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <FaMap className="text-blue-500 text-xl" />
              <h2 className="text-xl font-bold text-gray-800">Location Map</h2>
            </div>
            <div className="overflow-hidden rounded-lg w-full h-[500px] border border-gray-200">
              <MapView
                lat={mapCoords.lat}
                lng={mapCoords.lng}
                zoom={15}
                locations={location ? [location] : []}
              />
            </div>
          </Paper>
        </div>
      </div>

      {/* Upload Photos Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-semibold">Upload Photos</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                <FaTimes />
              </button>
            </div>
            
            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {uploadError && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  <div className="flex justify-between items-center">
                    <span>{uploadError}</span>
                    <button
                      onClick={() => setUploadError(null)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </div>
                </div>
              )}
              <BulkPhotoUpload
                onPhotosSelected={setSelectedPhotos}
                maxFiles={20}
                maxFileSize={50}
                existingPhotos={existingPhotos}
              />
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t bg-gray-50">
              <div className="text-sm text-gray-600">
                {selectedPhotos.length} photo(s) selected
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUploadPhotos}
                  disabled={selectedPhotos.length === 0 || isUploading}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {isUploading ? (
                    <>
                      <CSpinner size="sm" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <FaCamera />
                      Upload Photos
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Upload Progress Bar */}
      <UploadProgressBar
        progress={uploadState.progress}
        totalFiles={uploadState.totalFiles}
        currentFileIndex={uploadState.currentFileIndex}
        uploadedFiles={uploadState.uploadedFiles}
        failedFiles={uploadState.failedFiles}
        isUploading={uploadState.isUploading}
      />
    </>
  );
}
