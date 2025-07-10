import { Address } from "@api/interfaces/AddressDTO";
import { Location } from "@api/interfaces/LocationDTO";
import { createLocation } from "@api/locations/LocationsApi";
import { Col, Paper } from "@components/Container";
import { MultiItemInput, TextInput } from "@components/Form";
import { LocationSearchInput } from "@components/LocationSearchInput";
import { MapView } from "@components/mapView";
import { cilXCircle } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import useSubmitState, { SubmitState } from "@hooks/useSubmitState";
import { DashboardPageHeader } from "@layouts/DashboardLayout";
import { FormEvent, useCallback, useMemo, useState } from "react";

export function AddLocation() {
  const [submitState, switchState] = useSubmitState();
  const [submissionInfo, setSubmissionInfo] = useState("");
  const [coords, setCoords] = useState<Record<number, { lat: number; lng: number }>>({});

  const submissionModal = useMemo(() => {
    switch (submitState) {
      case SubmitState.Success:
        return <h1>Success: {submissionInfo}</h1>;
      case SubmitState.Fail:
        return <h1>Error: {submissionInfo}</h1>;
      default:
        return null;
    }
  }, [submitState, submissionInfo]);

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

  const onAddressesChange = useCallback((addresses: Address[]) => {
    const newMap = new Map();
    addresses.forEach((address, i) => {
      newMap.set(i, address);
    });
    setData((prev) => ({
      ...prev,
      addresses: Object.fromEntries(newMap),
    }));
  }, []);

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

  const handleAddressLine1Select = useCallback(
    (index: number) =>
      (lat: number, lon: number, displayName: string) => {
        setCoords((prev) => ({
          ...prev,
          [index]: { lat, lng: lon },
        }));

        setData((prev) => {
          const updated = { ...prev };
          const current = updated.addresses[index] || {};
          updated.addresses[index] = {
            ...current,
            addressLine1: displayName,
            latitude: lat,
            longitude: lon,
          };
          return updated;
        });
      },
    []
  );

  const handleAddressLine2Select = useCallback(
    (index: number) =>
      (_: number, __: number, displayName: string) => {
        setData((prev) => {
          const updated = { ...prev };
          const current = updated.addresses[index] || {};
          updated.addresses[index] = {
            ...current,
            addressLine2: displayName,
          };
          return updated;
        });
      },
    []
  );

  return (
    <>
      <DashboardPageHeader title="Add New Location" />
      <Paper>
        <form>
          <Col>
            <TextInput
              name="name"
              onChange={onTextChange}
              placeholder="Location name"
            />
            <TextInput
              name="notes"
              onChange={onTextChange}
              placeholder="Add a description"
            />

            <MultiItemInput<Address>
              label="Address"
              max={4}
              itemRenderer={(handleInputChange, removeCallback, index) => (
                <Col key={index} className="gap-2 my-2 border border-gray-300 rounded p-3 bg-gray-50">
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

                  {/* Address Line 1 with coordinates */}
                  <LocationSearchInput
                    placeholder="Address Line 1"
                    onSelect={handleAddressLine1Select(index)}
                  />

                  {/* Address Line 2 with only text */}
                  <LocationSearchInput
                    placeholder="Address Line 2"
                    disableCoords
                    onSelect={handleAddressLine2Select(index)}
                  />

                  {coords[index] && (
                    <div className="mt-4 h-[300px]">
                      <MapView lat={coords[index].lat} lng={coords[index].lng} />
                    </div>
                  )}

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
                </Col>
              )}
              onDataChange={onAddressesChange}
            />

            {submissionModal}
            <input
              type="submit"
              value="Add New Location"
              onClick={handleSubmit}
            />
          </Col>
        </form>
      </Paper>
    </>
  );
}
