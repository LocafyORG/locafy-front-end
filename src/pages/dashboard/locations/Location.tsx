import { getLocationById } from "@api/locations/LocationsApi";
import { Paper } from "@components/Container";
import { CSpinner } from "@coreui/react";
import { DashboardPageHeader } from "@layouts/DashboardLayout";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { MapView } from "@components/mapView";

export function Location() {
  const { locationId } = useParams();

  const { data: location, isLoading } = useQuery({
    queryFn: () => getLocationById(locationId || ""),
    queryKey: ["location", { locationId }],
  });

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <CSpinner />
      </div>
    );
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }).format(new Date(dateString));
  };

  const addresses = location
    ? Object.values(location.addresses).filter(
        (addr) => addr.latitude && addr.longitude
      )
    : [];

  const firstAddress = addresses[0];
  const mapCoords = firstAddress
    ? { lat: firstAddress.latitude, lng: firstAddress.longitude }
    : { lat: 43.65, lng: -79.4 };

  return (
    <>
      <DashboardPageHeader
        title={location?.name || "Unknown Location"}
        leftButtons={[
          {
            children: "BACK",
            onClick: () => {},
          },
        ]}
        buttons={[
          {
            children: "SHARE",
            onClick: () => {},
          },
          {
            children: "EDIT LOCATION",
            onClick: () => {},
          },
        ]}
      />

      <Paper className="p-4 space-y-4">
        {location?.notes && (
          <p>
            <strong>Notes:</strong> {location.notes}
          </p>
        )}
        {location?.name && (
          <p>
            <strong>Name:</strong> {location.name}
          </p>
        )}
        {location?.locationType && (
          <p>
            <strong>Type:</strong> {location.locationType}
          </p>
        )}
        {location?.uploadedAt && (
          <p>
            <strong>Uploaded At:</strong> {formatDate(location.uploadedAt)}
          </p>
        )}
        {location?.lastUpdated && (
          <p>
            <strong>Last Updated:</strong> {formatDate(location.lastUpdated)}
          </p>
        )}

        <div> {/* TODO: USE ADDRESSCARD COMPONENT*/}
          <h2 className="text-lg font-semibold mb-2">Addresses</h2>
          {addresses.length === 0 && <p>No addresses available.</p>}

          {addresses.map((address, idx) => (
            <div key={idx} className="border rounded shadow p-4 mb-4 bg-white">
              {address.addressLine1 && (
                <div className="mb-3">
                  <h3 className="font-semibold mb-1">Address Line 1</h3>
                  <p>{address.addressLine1}</p>
                  <p>
                    <strong>Latitude:</strong> {address.latitude}
                  </p>
                  <p>
                    <strong>Longitude:</strong> {address.longitude}
                  </p>
                </div>
              )}

              {address.addressLine2 && (
                <div>
                  <h3 className="font-semibold mb-1">Address Line 2</h3>
                  <p>{address.addressLine2}</p>
                  <p>
                    <strong>Latitude:</strong> {address.latitude}
                  </p>
                  <p>
                    <strong>Longitude:</strong> {address.longitude}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </Paper>

      <div className="overflow-hidden rounded w-full h-[600px]">
        <MapView lat={mapCoords.lat} lng={mapCoords.lng} zoom={15} />
      </div>
    </>
  );
}
