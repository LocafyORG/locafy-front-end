import React from "react";

interface AddressCardProps {
  address: {
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    stateProvinceRegion?: string;
    country?: string;
    postalCode?: string;
    latitude?: number;
    longitude?: number;
  };
}

export const AddressCard: React.FC<AddressCardProps> = ({ address }) => {
  return (
    <div className="border rounded shadow p-4 mb-4 bg-white">
      <p>
        <strong>Address Line 1:</strong> {address.addressLine1 || "-"}
      </p>
      <p>
        <strong>Address Line 2:</strong> {address.addressLine2 || "-"}
      </p>
      <p>
        <strong>City:</strong> {address.city || "-"}
      </p>
      <p>
        <strong>Province/State:</strong> {address.stateProvinceRegion || "-"}
      </p>
      <p>
        <strong>Country:</strong> {address.country || "-"}
      </p>
      <p>
        <strong>Postal Code:</strong> {address.postalCode || "-"}
      </p>
      <p>
        <strong>Latitude:</strong> {address.latitude}
      </p>
      <p>
        <strong>Longitude:</strong> {address.longitude}
      </p>
    </div>
  );
};
