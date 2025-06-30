import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { DashboardPageHeader } from "@layouts/DashboardLayout";
import { Paper, Col } from "@components/Container";
import { TextInput, MultiItemInput } from "@components/Form";
import { cilXCircle } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { Address } from "@api/interfaces/AddressDTO";
import { getLocationById, updateLocation } from "@api/locations/LocationsApi";
import { Location } from "@api/interfaces/LocationDTO";
import { DASHBOARD } from "@constants/Routes";
import { CSpinner } from "@coreui/react";

export function EditLocation() {
  const { locationId } = useParams<{ locationId: string }>();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: Location = await getLocationById(locationId || "");
        setName(data.name || "");
        setNotes(data.notes || "");
        const addressArray = Object.values(data.addresses || {});
        setAddresses(addressArray);
      } catch (err) {
        console.error("Error fetching location:", err);
        setError("Failed to load location data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [locationId]);

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    try {
      const addressMap = new Map<number, Address>();
      addresses.forEach((addr, i) => addressMap.set(i, addr));
      const updatedData: Location = {
        locationId,
        name,
        notes,
        locationType: "",
        keywords: [],
        candidateIds: [],
        contactIds: [],
        locationPhotoIds: [],
        addresses: Object.fromEntries(addressMap),
      };
      await updateLocation(locationId || "", updatedData);
      navigate(DASHBOARD.LOCATIONS);
    } catch (err) {
      console.error("Error updating location:", err);
      setError("Failed to save changes.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <CSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-600 text-center mt-6">{error}</p>;
  }

  return (
    <>
      <DashboardPageHeader
        title="Edit Location"
        leftButtons={[
          {
            children: "CANCEL",
            onClick: () => navigate(DASHBOARD.LOCATIONS),
          },
        ]}
        buttons={[
          {
            children: isSaving ? "SAVING..." : "SAVE",
            onClick: handleSave,
          },
        ]}
      />

      <Paper className="p-4 max-w-3xl mx-auto space-y-4">
        <TextInput
          name="name"
          onChange={(val) => setName(val)}
          placeholder="Location name"
        />

        <TextInput
          name="notes"
          onChange={(val) => setNotes(val)}
          placeholder="Description"
        />

        <MultiItemInput<Address>
          label="Address"
          max={4}
          itemRenderer={(handleInputChange, removeCallback) => (
            <Col className="gap-2 my-2 border-1 border-gray-300 rounded p-3 bg-gray-50">
              <span className="flex justify-end">
                <CIcon
                  className="hover:cursor-pointer"
                  icon={cilXCircle}
                  onClick={removeCallback}
                />
              </span>
              <input
                type="text"
                name="postalCode"
                onChange={handleInputChange}
                placeholder="Postal Code"
              />
              <input
                type="text"
                name="addressLine1"
                onChange={handleInputChange}
                placeholder="Address Line 1"
              />
              <input
                type="text"
                name="addressLine2"
                onChange={handleInputChange}
                placeholder="Address Line 2"
              />
              <input
                type="text"
                name="stateProvinceRegion"
                onChange={handleInputChange}
                placeholder="Province or State"
              />
              <input
                type="text"
                name="city"
                onChange={handleInputChange}
                placeholder="City"
              />
              <input
                type="text"
                name="country"
                onChange={handleInputChange}
                placeholder="Country"
              />
              <input
                type="hidden"
                name="longitude"
                onChange={handleInputChange}
              />
              <input
                type="hidden"
                name="latitude"
                onChange={handleInputChange}
              />
            </Col>
          )}
          onDataChange={setAddresses}
        />
      </Paper>
    </>
  );
}
