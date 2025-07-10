import { useCallback, useMemo, useState, useEffect } from "react";
import { ListPane2, ListPaneRow } from "@components/ui/ListPane";
import { CFormSwitch, CImage } from "@coreui/react";
import fallbackImage from "@assets/img/under-development.webp";
import FilterForm, { FilterFormValues } from "@components/ui/FilterForm";
import { DashboardPageHeader } from "@layouts/DashboardLayout";
import { getAllLocations, deleteLocation } from "@api/locations/LocationsApi";
import { Location } from "@api/interfaces/LocationDTO";
import { useNavigate } from "react-router";
import { DASHBOARD } from "@constants/Routes";
import { handleSignOut } from "@api/auth/authenticationAPI";
import { FaMapMarkerAlt, FaPlus, FaFilter, FaEdit, FaTrash, FaSearch, FaTh, FaBars, FaCalendarAlt, FaTag } from "react-icons/fa";
import { MapView } from "@components/mapView";

type ViewMode = 'list' | 'grid';
type LocationFilter = 'all' | 'my' | 'shared';

export function Locations() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [locationFilter, setLocationFilter] = useState<LocationFilter>('all');
  const [showMap, setShowMap] = useState(false);

  const [localLocations, setLocalLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
  }, [navigate]);

  // Initial load
  useEffect(() => {
    fetchLocations();
  }, [fetchLocations]);

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
        // Filter for locations owned by current user (you'll need to implement this logic)
        return localLocations.filter(loc => loc.uploadedById === 'current-user-id');
      case 'shared':
        // Filter for locations shared with current user (you'll need to implement this logic)
        return localLocations.filter(loc => loc.uploadedById !== 'current-user-id');
      default:
        return localLocations;
    }
  }, [localLocations, locationFilter]);

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

  // Helper function to format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Not specified";
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(dateString));
  };

  const rows = useMemo<ListPaneRow[]>(() => {
    return filteredLocations.map((loc) => ({
      id: loc.locationId,
      thumbnail: (
        <CImage
          src={fallbackImage}
          width={120}
          height={80}
          rounded
          alt="Location thumbnail"
        />
      ),
      name: loc.name || "Unnamed Location",
      address: formatAddress(loc),
      tags: loc.keywords.map((word, idx) => (
        <span
          key={idx}
          className="mr-1 inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium"
        >
          {word}
        </span>
      )),
      scout: getLocationTypeDisplay(loc),
    }));
  }, [filteredLocations]);

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
      <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <FaMap className="text-blue-500 text-xl" />
            <h3 className="text-lg font-semibold text-gray-800">Location Map</h3>
            <span className="text-sm text-gray-500">
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
        <div
          key={location.locationId}
          className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
          onClick={() => navigate(String(location.locationId))}
        >
          <div className="relative">
            <CImage
              src={fallbackImage}
              width="100%"
              height={160}
              className="object-cover"
              alt="Location thumbnail"
            />
            <div className="absolute top-2 right-2 flex gap-1">
              <button
                className="p-1 bg-white/80 hover:bg-white rounded transition"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`${DASHBOARD.EDIT_LOCATION}/${location.locationId}`);
                }}
              >
                <FaEdit className="text-gray-600 text-sm" />
              </button>
              <button
                className="p-1 bg-white/80 hover:bg-white rounded transition"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(filteredLocations.indexOf(location));
                }}
              >
                <FaTrash className="text-red-600 text-sm" />
              </button>
            </div>
          </div>
          
          <div className="p-4">
            <h3 className="font-semibold text-gray-800 mb-2">{location.name || "Unnamed Location"}</h3>
            <p className="text-sm text-gray-600 mb-3 flex items-center gap-1">
              <FaMapMarkerAlt className="text-gray-400" />
              {formatAddress(location)}
            </p>
            
            <div className="flex items-center gap-2 mb-3">
              <FaTag className="text-gray-400 text-xs" />
              <span className="text-xs text-gray-500">{getLocationTypeDisplay(location)}</span>
            </div>
            
            <div className="flex flex-wrap gap-1 mb-3">
              {location.keywords.map((word, idx) => (
                <span
                  key={idx}
                  className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium"
                >
                  {word}
                </span>
              ))}
            </div>
            
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <FaCalendarAlt className="text-gray-400" />
                {formatDate(location.uploadedAt)}
              </span>
              <FaMapMarkerAlt className="text-gray-400" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="text-gray-600">Loading locations...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="w-full h-full flex justify-center items-center min-h-screen">
        <div className="text-center">
          <FaMapMarkerAlt className="text-red-500 text-4xl mx-auto mb-4" />
          <h1 className="text-xl font-semibold text-red-600">Error loading locations</h1>
          <p className="text-gray-600 mt-2">{error}</p>
        </div>
      </div>
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
      <div className="bg-white shadow-lg rounded-xl p-6 mb-6 border border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <FaFilter className="text-blue-500 text-xl" />
          <h3 className="text-lg font-semibold text-gray-800">Filter & Search</h3>
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
      <div className="bg-white shadow-lg rounded-xl p-4 mb-6 border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          {/* Results and Filters */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <FaSearch className="text-gray-400" />
              <span className="text-sm text-gray-600">
                {filteredLocations.length} Results
              </span>
            </div>
            
            <div className="flex items-center gap-4 text-sm">
              <button 
                className={`px-3 py-1 rounded-lg font-medium transition ${
                  locationFilter === 'all' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => setLocationFilter('all')}
              >
                All
              </button>
              <button 
                className={`px-3 py-1 rounded-lg font-medium transition ${
                  locationFilter === 'my' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => setLocationFilter('my')}
              >
                My Locations
              </button>
              <button 
                className={`px-3 py-1 rounded-lg font-medium transition ${
                  locationFilter === 'shared' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => setLocationFilter('shared')}
              >
                Shared with me
              </button>
            </div>
          </div>

          {/* View Controls */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Map View:</span>
              <CFormSwitch 
                checked={showMap}
                onChange={(e) => setShowMap(e.target.checked)}
                className="scale-90" 
              />
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                className={`p-2 rounded-lg transition ${
                  viewMode === 'grid' 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                }`}
                onClick={() => setViewMode('grid')}
              >
                <FaTh className="text-sm" />
              </button>
              <button 
                className={`p-2 rounded-lg transition ${
                  viewMode === 'list' 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                }`}
                onClick={() => setViewMode('list')}
              >
                <FaBars className="text-sm" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content View */}
      {showMap ? (
        <MapViewComponent />
      ) : viewMode === 'grid' ? (
        <GridView />
      ) : (
        <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
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
        <div className="flex flex-col items-center justify-center py-12">
          <FaMapMarkerAlt className="text-gray-300 text-6xl mb-4" />
          <h3 className="text-xl font-semibold text-gray-500 mb-2">
            {locationFilter === 'all' 
              ? 'No locations found' 
              : locationFilter === 'my' 
                ? 'No locations owned by you' 
                : 'No locations shared with you'
            }
          </h3>
          <p className="text-gray-400 text-center max-w-md">
            {locationFilter === 'all' 
              ? 'Get started by adding your first location. Click "ADD NEW LOCATION" to begin.'
              : 'Try switching to a different filter or add new locations.'
            }
          </p>
        </div>
      )}
    </>
  );
}
