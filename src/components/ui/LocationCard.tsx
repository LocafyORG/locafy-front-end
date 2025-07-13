import React from 'react';
import { CImage } from '@coreui/react';
import { FaMapMarkerAlt, FaEdit, FaTrash, FaTag, FaCalendarAlt, FaImage } from 'react-icons/fa';

interface Address {
  addressLine1?: string;
  city?: string;
  stateProvinceRegion?: string;
  postalCode?: string;
  country?: string;
}

export interface LocationCardProps {
  location: {
    locationId?: string;
    name?: string;
    locationType?: string;
    keywords?: string[];
    uploadedAt?: string;
    addresses?: Record<string, Address>;
  };
  thumbnailUrl?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  onClick?: () => void;
  className?: string;
}

export const LocationCard: React.FC<LocationCardProps> = ({
  location,
  thumbnailUrl,
  onEdit,
  onDelete,
  onClick,
  className = ""
}) => {
  const formatAddress = (location: { addresses?: Record<string, Address> }) => {
    const addresses = Object.values(location.addresses || {});
    if (addresses.length === 0) return "No address available";
    
    const firstAddress = addresses[0] as Address;
    const parts = [
      firstAddress.addressLine1,
      firstAddress.city,
      firstAddress.stateProvinceRegion,
      firstAddress.postalCode,
      firstAddress.country
    ].filter(Boolean);
    
    return parts.join(", ") || "Address not specified";
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Not specified";
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(dateString));
  };

  return (
    <div
      className={`ui-location-card bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow cursor-pointer ${className}`}
      onClick={onClick}
    >
      <div className="relative">
        {thumbnailUrl ? (
          <CImage
            src={thumbnailUrl}
            width="100%"
            height={160}
            className="object-cover"
            alt="Location thumbnail"
          />
        ) : (
          <div className="w-full h-[160px] bg-gray-100 flex items-center justify-center">
            <FaImage className="text-gray-400 text-4xl" />
          </div>
        )}
        
        {(onEdit || onDelete) && (
          <div className="absolute top-2 right-2 flex gap-1">
            {onEdit && (
              <button
                className="p-1 bg-white/80 hover:bg-white rounded transition"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit();
                }}
              >
                <FaEdit className="text-gray-600 text-sm" />
              </button>
            )}
            {onDelete && (
              <button
                className="p-1 bg-white/80 hover:bg-white rounded transition"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
              >
                <FaTrash className="text-red-600 text-sm" />
              </button>
            )}
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2">
          {location.name || "Unnamed Location"}
        </h3>
        
        <p className="text-sm text-gray-600 mb-3 flex items-center gap-1">
          <FaMapMarkerAlt className="text-gray-400" />
          {formatAddress(location)}
        </p>
        
        <div className="flex items-center gap-2 mb-3">
          <FaTag className="text-gray-400 text-xs" />
          <span className="text-xs text-gray-500">
            {location.locationType || "Not specified"}
          </span>
        </div>
        
        {location.keywords && location.keywords.length > 0 && (
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
        )}
        
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <FaCalendarAlt className="text-gray-400" />
            {formatDate(location.uploadedAt)}
          </span>
          <FaMapMarkerAlt className="text-gray-400" />
        </div>
      </div>
    </div>
  );
}; 