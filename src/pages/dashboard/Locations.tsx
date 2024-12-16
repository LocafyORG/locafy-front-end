import { useCallback, useEffect, useMemo, useState } from "react";
import { ListPane2, ListPaneRow } from "@components/ui/ListPane";
import { CFormSwitch, CImage } from "@coreui/react";
import fallbackImage from "@assets/img/under-development.webp";
import FilterForm, { FilterFormValues } from "@components/ui/FilterForm";
import { Row } from "@components/Container";
import CIcon from "@coreui/icons-react";
import { cilGrid, cilList } from "@coreui/icons";
import { DasboardPageHeader } from "@layouts/DashboardLayout";
import { getAllLocations } from "@api/locations/LocationsApi";
import { Location } from "@api/interfaces/Location";
import { HttpError } from "@utils/httpClient";

function Locations() {
  const [locations, setLocations] = useState<Location[]>([]);
  const rows = useMemo<ListPaneRow[]>(() => {
    // Memoize table rows, only transform locations when its value changes.
    return locations.map(
      ({ name, keywords }) =>
        ({
          thumbnail: (
            <CImage src={fallbackImage} width={120} height={80} rounded />
          ),
          name: name || "Unnamed",
          address: "Probably Jupiter, IDK",
          tags: keywords.map((word) => <span>{word}</span>),
          scout: name,
        }) as ListPaneRow,
    );
  }, [locations]);
  const [errorMsg, setErrorMsg] = useState<string | undefined>();

  const onSearchTermChange = useCallback((searchTerm: string) => {
    console.log("Search term: ", searchTerm);
  }, []);

  const onActiveTagsChange = useCallback((tags: string[]) => {
    console.log("Active tags: ", tags);
  }, []);

  useEffect(() => {
    getAllLocations()
      .then((data) => setLocations(data))
      .catch((error) => {
        if (error instanceof HttpError) {
          console.log("Code: ", error.code);
        } else {
          console.log("Error: ", error.name);
        }
        setErrorMsg(error.name);
      });
  }, []);

  return (
    <>
      <DasboardPageHeader
        title="Locations"
        buttons={[{ children: "ADD NEW LOCATION" }]}
      />

      <FilterForm
        initialValues={{
          ...new FilterFormValues(),
          tags: ["Foo", "Bar", "Baz", "Zoo"],
        }}
        onSearchTermChange={onSearchTermChange}
        onActiveTagsChange={onActiveTagsChange}
      />

      {/* Options */}
      <Row className="py-4 px-3 justify-between">
        <Row>
          <span>Results</span>
          <span>|</span>
          <span>All</span>
          <span>My Locations</span>
          <span>Shared with me</span>
        </Row>

        <Row>
          Toggle Map: <CFormSwitch />
          <CIcon icon={cilGrid} />
          <CIcon icon={cilList} />
        </Row>
      </Row>

      {errorMsg ? (
        <h1>Error: {errorMsg}</h1>
      ) : (
        <ListPane2
          columnNames={{
            thumbnail: "THUMBNAIL",
            name: "NAME",
            address: "ADDRESS",
            tags: "TAGS",
            scout: "SCOUT",
          }}
          data={rows}
          actions={{
            Edit: (index: number) => {
              console.log("Locations: Editting ", locations[index].name);
            },
          }}
        />
      )}
    </>
  );
}

export default Locations;
