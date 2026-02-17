import { useCallback, useMemo, useState, useEffect } from "react";
import { ListPane2, ListPaneRow } from "@components/ui/ListPane";
import FilterForm, { FilterFormValues } from "@components/ui/FilterForm";
import { DashboardPageHeader } from "@layouts/DashboardLayout";
import { getAllLocations, deleteLocation } from "@api/locations/LocationsApi";
import { getLocationPhotos, LocationPhotoResponse } from "@api/locations/LocationPhotosApi";
import { Location } from "@api/interfaces/LocationDTO";
import { useNavigate } from "react-router";
import { DASHBOARD } from "@constants/Routes";
import { getProfile, handleSignOut } from "@api/auth/authenticationAPI";
import { FaMapMarkerAlt, FaPlus, FaFilter, FaMap } from "react-icons/fa";
import { MapView } from "@components/mapView";
import { ThumbnailImage } from "@components/ui/ThumbnailImage";
import { EmptyState } from "@components/ui/EmptyState";
import { LoadingSpinner } from "@components/ui/LoadingSpinner";
import { ErrorState } from "@components/ui/ErrorState";
import { LocationCard } from "@components/ui/LocationCard";
import { ResultsHeader } from "@components/ui/ResultsHeader";

type LocationFilter = 'all' | 'my' | 'shared';

export function Locations() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [locationFilter, setLocationFilter] = useState<LocationFilter>('all');
  const [showMap, setShowMap] = useState(false);

  const [localLocations, setLocalLocations] = useState<Location[]>([]);
  const [locationPhotos, setLocationPhotos] = useState<Record<string, LocationPhotoResponse[]>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  // Fetch photos for a location
  const fetchLocationPhotos = useCallback(async (locationId: string) => {
    try {
      const photos = await getLocationPhotos(locationId);
      setLocationPhotos(prev => ({
        ...prev,
        [locationId]: photos
      }));
    } catch (err) {
      console.warn(`Failed to fetch photos for location ${locationId}:`, err);
      // Don't set error state for photo fetch failures
    }
  }, []);

  // Fetch locations
  const fetchLocations = useCallback(async () => {
    try {
      setLoading(true);
      const locations = await getAllLocations();
      console.log('Locations page - fetched locations:', locations); // Debug log
      console.log('Locations page - count:', locations.length); // Debug log
      
      // Log any potential duplicates
      const locationIds = locations.map(l => l.locationId);
      const duplicateIds = locationIds.filter((id, index) => locationIds.indexOf(id) !== index);
      if (duplicateIds.length > 0) {
        console.warn('Found duplicate location IDs:', duplicateIds);
      }
      
      // Deduplicate locations based on locationId
      const uniqueLocations = locations.filter((location, index, self) => 
        index === self.findIndex(l => l.locationId === location.locationId)
      );
      
      console.log('Locations page - unique locations:', uniqueLocations); // Debug log
      console.log('Locations page - unique count:', uniqueLocations.length); // Debug log
      setLocalLocations(uniqueLocations);
      
      // Fetch photos for each location
      uniqueLocations.forEach(location => {
        if (location.locationId) {
          fetchLocationPhotos(location.locationId);
        }
      });
      
      setError(null);
    } catch (err) {
      setError("Failed to load locations");
      console.warn(err);
     if (String(err).includes("Unauthorized")) {
        handleSignOut(navigate);
      }
    } finally {
      setLoading(false);
    }
  }, [navigate, fetchLocationPhotos]);

  // Initial load
  useEffect(() => {
    fetchLocations();
  }, [fetchLocations]);

  // Resolve current user for accurate "My Locations" vs "Shared with me" filters.
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const profile = await getProfile();
        if (profile && typeof profile === "object" && "userId" in profile) {
          setCurrentUserId((profile as { userId: string }).userId);
        }
      } catch (err) {
        console.warn("Failed to resolve current user profile:", err);
      }
    };

    fetchCurrentUser();
  }, []);

  // Delete handler
  const handleDelete = async (index: number) => {
    const location = localLocations[index];
    if (!location || !location.locationId) return;

    try {
      await deleteLocation(location.locationId);
      // After deletion, re-fetch locations
      fetchLocations();
    } catch (err) {
      console.error("Failed to delete location:", err);
      setError("Failed to delete location");
    }
  };

  // Filter locations based on current filter
  const filteredLocations = useMemo(() => {
    switch (locationFilter) {
      case 'my':
        // Treat missing owner as "my" to avoid misclassifying newly created locations.
        return localLocations.filter(
          (loc) => !loc.uploadedById || !currentUserId || loc.uploadedById === currentUserId
        );
      case 'shared':
        // Shared only when there is an explicit owner that is not the current user.
        return localLocations.filter(
          (loc) => !!loc.uploadedById && !!currentUserId && loc.uploadedById !== currentUserId
        );
      default:
        return localLocations;
    }
  }, [localLocations, locationFilter, currentUserId]);

  // Helper function to get the first address with coordinates
  const getFirstAddressWithCoords = (location: Location) => {
    const addresses = Object.values(location.addresses);
    return addresses.find(addr => addr.latitude && addr.longitude);
  };

  // Helper function to format address
  const formatAddress = (location: Location) => {
    const addresses = Object.values(location.addresses);
    if (addresses.length === 0) return "No address available";
    
    const firstAddress = addresses[0];
    const parts = [
      firstAddress.addressLine1,
      firstAddress.city,
      firstAddress.stateProvinceRegion,
      firstAddress.postalCode,
      firstAddress.country
    ].filter(Boolean);
    
    return parts.join(", ") || "Address not specified";
  };

  // Helper function to get location type display
  const getLocationTypeDisplay = (location: Location) => {
    return location.locationType || "Not specified";
  };



  // Helper function to get location thumbnail
  const getLocationThumbnail = useCallback((location: Location) => {
    const photos = locationPhotos[location.locationId || ''] || [];
    const firstPhoto = photos.find(photo => photo.isPrimary) || photos[0];
    
    if (firstPhoto) {
      // Request thumbnail-sized image when backend supports resizing params.
      return `/api/v1/location-photos/public/${firstPhoto.fileId}/image?width=220&height=140&quality=50`;
    }
    
    // Return undefined for fallback icon
    return undefined;
  }, [locationPhotos]);

  // Thumbnail component
  const LocationThumbnail = useCallback(({ location }: { location: Location }) => {
    const photoUrl = getLocationThumbnail(location);
    
    return (
      <ThumbnailImage
        src={photoUrl}
        alt="Location thumbnail"
        width={120}
        height={80}
      />
    );
  }, [getLocationThumbnail]);

  const rows = useMemo<ListPaneRow[]>(() => {
    return filteredLocations.map((loc) => ({
      id: loc.locationId,
      thumbnail: (
        <LocationThumbnail location={loc} />
      ),
      name: loc.name || "Unnamed Location",
      address: formatAddress(loc),
      tags: loc.keywords.map((word, idx) => (
        <span
          key={idx}
          className="mr-1 inline-block bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded text-xs font-medium"
        >
          {word}
        </span>
      )),
      scout: getLocationTypeDisplay(loc),
    }));
  }, [filteredLocations, LocationThumbnail]);

  const onSearchTermChange = useCallback((searchTerm: string) => {
    console.log("Search term: ", searchTerm);
  }, []);

  const onActiveTagsChange = useCallback((tags: string[]) => {
    console.log("Active tags: ", tags);
  }, []);

  // Map view component
  const MapViewComponent = () => {
    // Get all locations with coordinates for map pins
    const locationsWithCoords = filteredLocations.filter(loc => {
      const addressWithCoords = getFirstAddressWithCoords(loc);
      return addressWithCoords && addressWithCoords.latitude && addressWithCoords.longitude;
    });

    // Calculate center point for map
    const centerLat = locationsWithCoords.length > 0 
      ? locationsWithCoords.reduce((sum, loc) => {
          const addr = getFirstAddressWithCoords(loc);
          return sum + (addr?.latitude || 0);
        }, 0) / locationsWithCoords.length
      : 43.65;
    
    const centerLng = locationsWithCoords.length > 0 
      ? locationsWithCoords.reduce((sum, loc) => {
          const addr = getFirstAddressWithCoords(loc);
          return sum + (addr?.longitude || 0);
        }, 0) / locationsWithCoords.length
      : -79.4;

    return (
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <FaMap className="text-blue-500 text-xl" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Location Map</h3>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {locationsWithCoords.length} locations with coordinates
            </span>
          </div>
        </div>
        <div className="h-[600px] relative">
          <MapView lat={centerLat} lng={centerLng} zoom={10} locations={filteredLocations} />
        </div>
      </div>
    );
  };

  // Grid view component
  const GridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredLocations.map((location) => (
        <LocationCard
          key={location.locationId}
          location={location}
          thumbnailUrl={getLocationThumbnail(location)}
          onEdit={() => navigate(`${DASHBOARD.EDIT_LOCATION}/${location.locationId}`)}
          onDelete={() => handleDelete(filteredLocations.indexOf(location))}
          onClick={() => navigate(String(location.locationId))}
        />
      ))}
    </div>
  );

  if (loading) {
    return <LoadingSpinner message="Loading locations..." />;
  }
  
  if (error) {
    return (
      <ErrorState
        icon={<FaMapMarkerAlt className="text-red-500 text-4xl" />}
        title="Error loading locations"
        error={error}
        onRetry={fetchLocations}
      />
    );
  }

  return (
    <>
      <DashboardPageHeader
        title="Locations"
        buttons={[
          {
            children: (
              <span className="flex items-center gap-2">
                <FaPlus /> ADD NEW LOCATION
              </span>
            ),
            onClick: () => {
              navigate("add");
            },
            className: "flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition shadow"
          },
        ]}
      />

      {/* Enhanced Filter Section */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 mb-6 border border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-4">
          <FaFilter className="text-blue-500 text-xl" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Filter & Search</h3>
        </div>
        <FilterForm
          initialValues={{
            ...new FilterFormValues(),
            tags: ["Foo", "Bar", "Baz", "Zoo"],
          }}
          onSearchTermChange={onSearchTermChange}
          onActiveTagsChange={onActiveTagsChange}
        />
      </div>

      {/* Enhanced Top Bar */}
      <ResultsHeader
        resultCount={filteredLocations.length}
        viewMode={viewMode}
        onViewModeChange={(mode) => setViewMode(mode as 'list' | 'grid')}
        filterOptions={[
          { key: 'all', label: 'All' },
          { key: 'my', label: 'My Locations' },
          { key: 'shared', label: 'Shared with me' }
        ]}
        activeFilter={locationFilter}
        onFilterChange={(filter) => setLocationFilter(filter as LocationFilter)}
        showMapToggle={true}
        mapEnabled={showMap}
        onMapToggle={setShowMap}
      />

      {/* Content View */}
      {showMap ? (
        <MapViewComponent />
      ) : viewMode === 'grid' ? (
        <GridView />
      ) : (
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700">
          <ListPane2
            columnNames={{
              thumbnail: "THUMBNAIL",
              name: "NAME",
              address: "ADDRESS",
              tags: "TAGS",
              scout: "TYPE",
            }}
            data={rows}
            actions={{
              Edit: (index: number) => {
                const id = rows[index]?.id;
                if (id !== undefined) {
                  navigate(`${DASHBOARD.EDIT_LOCATION}/${String(id)}`);
                }
              },
              Delete: handleDelete,
            }}
            onRowClick={(index) => {
              const id = rows[index]?.id;
              if (id !== undefined) {
                navigate(String(id));
              }
            }}
          />
        </div>
      )}

      {/* Empty State */}
      {filteredLocations.length === 0 && !loading && (
        <EmptyState
          icon={<FaMapMarkerAlt className="text-gray-300 text-6xl" />}
          title={
            locationFilter === 'all' 
              ? 'No locations found' 
              : locationFilter === 'my' 
                ? 'No locations owned by you' 
                : 'No locations shared with you'
          }
          description={
            locationFilter === 'all' 
              ? 'Get started by adding your first location. Click "ADD NEW LOCATION" to begin.'
              : 'Try switching to a different filter or add new locations.'
          }
        />
      )}
    </>
  );
}
