import { Address } from "@api/interfaces/Address";
import { Location } from "@api/interfaces/Location";
import { createLocation } from "@api/locations/LocationsApi";
import { Col, Paper } from "@components/Container";
import { MultiItemInput, TextInput } from "@components/Form";
import { cilXCircle } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import useSubmitState, { SubmitState } from "@hooks/useSubmitState";
import { DashboardPageHeader } from "@layouts/DashboardLayout";
import { FormEvent, useCallback, useMemo, useState } from "react";

export function AddLocation() {
  const [submitState, switchState] = useSubmitState();
  const [submissionInfo, setSubmissionInfo] = useState("");
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
      setData((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    },
    [setData],
  );
  const onAddressesChange = useCallback((addresses: Address[]) => {
    setData((prev) => {
      const newMap = new Map();
      addresses.forEach((address, i) => {
        newMap.set(i, address);
      });
      return { ...prev, addresses: Object.fromEntries(newMap) };
    });
  }, []);
  const handleSubmit = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      e.preventDefault();
      if (submitState !== SubmitState.Loading) {
        switchState(SubmitState.Loading);
        createLocation(data)
          .then((loc) => {
            setSubmissionInfo(
              loc.locationId || "Location ID is empty for some reason.",
            );
            switchState(SubmitState.Success);
          })
          .catch((e) => {
            setSubmissionInfo(e.name);
            switchState(SubmitState.Fail);
          });
      }
    },
    [data, switchState, submitState],
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

            {/* This is crazy, chat. */}
            <MultiItemInput<Address>
              label="Address"
              max={4}
              itemRenderer={useCallback(
                (handleInputChange, removeCallback) => (
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
                      placeholder="Longitude"
                    />
                    <input
                      type="hidden"
                      name="Latitude"
                      onChange={handleInputChange}
                      placeholder="Add a description"
                    />
                  </Col>
                ),
                [],
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
