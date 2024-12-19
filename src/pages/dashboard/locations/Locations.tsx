import { useCallback, useMemo } from "react";
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
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";

export function Locations() {
  const navigate = useNavigate();
  const {
    data: locations,
    isError,
    error,
  } = useQuery<Location[]>({
    queryFn: getAllLocations,
    queryKey: ["all-locations"],
  });

  const rows = useMemo<ListPaneRow[]>(() => {
    if (!locations) return [];
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

  const onSearchTermChange = useCallback((searchTerm: string) => {
    console.log("Search term: ", searchTerm);
  }, []);

  const onActiveTagsChange = useCallback((tags: string[]) => {
    console.log("Active tags: ", tags);
  }, []);

  return (
    <>
      <DasboardPageHeader
        title="Locations"
        buttons={[
          {
            children: "ADD NEW LOCATION",
            onClick: () => {
              navigate("add");
            },
          },
        ]}
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

      {isError || !locations ? (
        <h1>Error: {error?.message}</h1>
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
          onRowClick={(index) => {
            const id = locations[index].locationId;
            if (id) {
              navigate(id);
            }
          }}
        />
      )}
    </>
  );
}
