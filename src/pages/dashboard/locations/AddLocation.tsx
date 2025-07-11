import { Address } from "@api/interfaces/AddressDTO";
import { Location } from "@api/interfaces/LocationDTO";
import { createLocation } from "@api/locations/LocationsApi";
import { Paper } from "@components/Container";
import { TextInput } from "@components/Form";
import { LocationSearchInput } from "@components/LocationSearchInput";
import useSubmitState, { SubmitState } from "@hooks/useSubmitState";
import { DashboardPageHeader } from "@layouts/DashboardLayout";
import { FormEvent, useCallback, useMemo, useState, useRef } from "react";
import { FaMapMarkerAlt, FaSave, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router";

// Helper function to parse address components
const parseAddressComponents = (displayName: string) => {
  const parts = displayName.split(',').map(part => part.trim());
  
  // Try to extract components based on common patterns
  const addressLine1 = parts[0] || '';
  const city = parts[1] || '';
  const stateProvince = parts[2] || '';
  const postalCode = parts[3] || '';
  const country = parts[4] || '';
  
  return {
    addressLine1,
    city,
    stateProvinceRegion: stateProvince,
    postalCode,
    country
  };
};

// Premade tags for selection
const PREMADE_TAGS = [
  "Indoors",
  "Outdoors",
  "Stdio",
  "Large",
  "Small",
  "Remote",
  "Onsite",
  "Offsite",
  "Free",
];

// TagsInput component
function TagsInput({ value, onChange }: { value: string[]; onChange: (tags: string[]) => void }) {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Add tag if not duplicate and not empty
  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
    }
    setInput("");
    if (inputRef.current) inputRef.current.focus();
  };

  // Remove tag by index
  const removeTag = (idx: number) => {
    onChange(value.filter((_, i) => i !== idx));
  };

  // Handle Enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      e.preventDefault();
      addTag(input);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-2">
        {value.map((tag, idx) => (
          <span key={tag} className="inline-flex items-center bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
            {tag}
            <button
              type="button"
              className="ml-2 text-white hover:text-white focus:outline-none bg-purple-500 rounded-full px-2"
              onClick={() => removeTag(idx)}
              aria-label={`Remove tag ${tag}`}
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2 mb-2 flex-wrap">
        {PREMADE_TAGS.map((tag) => (
          <button
            type="button"
            key={tag}
            className={`px-3 py-1 rounded-full border text-sm transition ${value.includes(tag) ? 'bg-purple-500 text-white border-purple-500' : 'bg-white text-purple-700 border-purple-300 hover:bg-purple-100'}`}
            onClick={() => addTag(tag)}
            disabled={value.includes(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          placeholder="Add custom tag and press Enter"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          type="button"
          className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
          onClick={() => addTag(input)}
          disabled={!input.trim()}
        >
          Add
        </button>
      </div>
    </div>
  );
}

export function AddLocation() {
  const navigate = useNavigate();
  const [submitState, switchState] = useSubmitState();
  const [submissionInfo, setSubmissionInfo] = useState("");

  const submissionModal = useMemo(() => {
    switch (submitState) {
      case SubmitState.Success:
        return (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaMapMarkerAlt className="text-green-600 text-2xl" />
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">Location Created!</h2>
                <p className="text-gray-600 mb-4">Your location has been successfully added.</p>
                <button
                  onClick={() => navigate("/dashboard/locations")}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition"
                >
                  Back to Locations
                </button>
              </div>
            </div>
          </div>
        );
      case SubmitState.Fail:
        return (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaMapMarkerAlt className="text-red-600 text-2xl" />
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">Error</h2>
                <p className="text-gray-600 mb-4">{submissionInfo}</p>
                <button
                  onClick={() => switchState(SubmitState.Success)}
                  className="w-full bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  }, [submitState, submissionInfo, navigate, switchState]);

  const [data, setData] = useState<Location>({
    addresses: {},
    name: "",
    locationType: "",
    notes: "",
    keywords: [],
    candidateIds: [],
    contactIds: [],
    locationPhotoIds: [],
  });

  const onTextChange = useCallback(
    (value: string, name: string) => {
      setData((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  const handleAddressLine1Select = useCallback(
    (index: number) =>
      (lat: number, lon: number, displayName: string) => {
        const parsedComponents = parseAddressComponents(displayName);

        setData((prev) => {
          const updated = { ...prev };
          const current = updated.addresses[index] || {};
          updated.addresses[index] = {
            ...current,
            ...parsedComponents,
            latitude: lat,
            longitude: lon,
          };
          return updated;
        });
      },
    []
  );

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      e.preventDefault();
      if (submitState !== SubmitState.Loading) {
        switchState(SubmitState.Loading);
        createLocation(data)
          .then((loc) => {
            setSubmissionInfo(loc.locationId || "Location ID is empty for some reason.");
            switchState(SubmitState.Success);
          })
          .catch((e) => {
            setSubmissionInfo(e.name);
            switchState(SubmitState.Fail);
          });
      }
    },
    [data, switchState, submitState]
  );

  return (
    <>
      <DashboardPageHeader 
        title="Add New Location"
        leftButtons={[
          {
            children: (
              <span className="flex items-center gap-2">
                <FaArrowLeft /> BACK
              </span>
            ),
            onClick: () => navigate("/dashboard/locations"),
            className: "flex items-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded transition"
          },
        ]}
      />

      <div className="max-w-4xl mx-auto mt-8">
        <Paper className="p-8 bg-white shadow-xl rounded-xl border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <FaMapMarkerAlt className="text-blue-500 text-xl" />
            <h2 className="text-2xl font-bold text-gray-800">Location Information</h2>
          </div>

          <form>
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location Name *
                  </label>
                  <TextInput
                    name="name"
                    onChange={onTextChange}
                    placeholder="Enter location name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location Type
                  </label>
                  <TextInput
                    name="locationType"
                    onChange={onTextChange}
                    placeholder="e.g., Office, Studio, Outdoor"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <TextInput
                    name="notes"
                    onChange={onTextChange}
                    placeholder="Add a description or notes about this location"
                  />
                </div>

                {/* Tags Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags
                  </label>
                  <TagsInput
                    value={data.keywords}
                    onChange={(newTags) => setData(prev => ({ ...prev, keywords: newTags }))}
                  />
                </div>
              </div>

              {/* Addresses */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <FaMapMarkerAlt className="text-purple-500 text-xl" />
                  <h3 className="text-lg font-semibold text-gray-800">Addresses</h3>
                </div>

                <div className="space-y-4">
                  {Object.entries(data.addresses).map(([index, address], idx) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-gray-800">Address {idx + 1}</h4>
                        <button
                          type="button"
                          onClick={() => {
                            setData(prev => {
                              const newAddresses = { ...prev.addresses };
                              delete newAddresses[index];
                              return { ...prev, addresses: newAddresses };
                            });
                          }}
                          className="text-white hover:text-white font-medium text-sm transition bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                        >
                          Remove
                        </button>
                      </div>

                      <div className="space-y-4">
                        {/* Single Address Input */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Address *
                          </label>
                          <LocationSearchInput
                            placeholder="Search for address..."
                            onSelect={handleAddressLine1Select(parseInt(index))}
                          />
                        </div>

                        {/* Show selected address info */}
                        {address.addressLine1 && (
                          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                            <div className="flex items-center gap-2 mb-2">
                              <FaMapMarkerAlt className="text-green-500" />
                              <span className="text-sm font-medium text-green-700">Selected Address</span>
                            </div>
                            <p className="text-sm text-green-800">
                              {address.addressLine1}
                              {address.city && `, ${address.city}`}
                              {address.stateProvinceRegion && `, ${address.stateProvinceRegion}`}
                              {address.postalCode && `, ${address.postalCode}`}
                              {address.country && `, ${address.country}`}
                            </p>
                            {address.latitude && address.longitude && (
                              <p className="text-xs text-green-600 mt-1">
                                Coordinates: {address.latitude.toFixed(4)}, {address.longitude.toFixed(4)}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Add Address Button */}
                  <button
                    type="button"
                    onClick={() => {
                      const newIndex = Object.keys(data.addresses).length;
                      setData(prev => ({
                        ...prev,
                        addresses: {
                          ...prev.addresses,
                          [newIndex]: {}
                        }
                      }));
                    }}
                    className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors bg-purple-500"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <FaMapMarkerAlt className="text-gray-200" />
                      <span className="text-white">Add Another Address</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-8 border-t border-gray-200">
                <button
                  type="submit"
                  onClick={(e) => {
                    console.log('Submitting data:', data);
                    handleSubmit(e as unknown as FormEvent<HTMLInputElement>);
                  }}
                  disabled={submitState === SubmitState.Loading}
                  className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
                >
                  {submitState === SubmitState.Loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Creating Location...
                    </>
                  ) : (
                    <>
                      <FaSave className="text-lg" />
                      <span className="text-lg font-semibold">Create Location</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </Paper>
      </div>

      {submissionModal}
    </>
  );
}
