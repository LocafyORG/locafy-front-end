import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Location } from "@api/interfaces/LocationDTO";

import icon from "leaflet/dist/images/marker-icon.png";
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
import shadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetina,
  iconUrl: icon,
  shadowUrl: shadow,
});

interface MapViewProps {
  lat?: number;
  lng?: number;
  zoom?: number;
  locations?: Location[];
}

export const MapView: React.FC<MapViewProps> = ({
  lat = 43.65,
  lng = -79.4,
  zoom = 13,
  locations = [],
}) => {
  const position: [number, number] = [lat, lng];

  // Get all locations with coordinates
  const locationsWithCoords = locations.filter((location) => {
    const addresses = Object.values(location.addresses);
    return addresses.some((addr) => addr.latitude && addr.longitude);
  });

  return (
    <MapContainer
      center={position}
      zoom={zoom}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Single marker for basic map view */}
      {locations.length === 0 && (
        <Marker position={position}>
          <Popup>
            {lat.toFixed(4)}, {lng.toFixed(4)}
          </Popup>
        </Marker>
      )}

      {/* Multiple markers for locations */}
      {locationsWithCoords.map((location) => {
        const addresses = Object.values(location.addresses);
        const addressWithCoords = addresses.find(
          (addr) => addr.latitude && addr.longitude,
        );

        if (!addressWithCoords) return null;

        return (
          <Marker
            key={location.locationId}
            position={[addressWithCoords.latitude, addressWithCoords.longitude]}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold text-gray-800 mb-1">
                  {location.name || "Unnamed Location"}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {addressWithCoords.addressLine1}
                  {addressWithCoords.city && `, ${addressWithCoords.city}`}
                  {addressWithCoords.stateProvinceRegion &&
                    `, ${addressWithCoords.stateProvinceRegion}`}
                </p>
                {location.locationType && (
                  <p className="text-xs text-gray-500">
                    Type: {location.locationType}
                  </p>
                )}
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};
