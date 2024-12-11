import { useCallback, useEffect, useState } from "react";
import { ListPane2, ListPaneRow } from "@components/ui/ListPane";
import { CFormSwitch, CImage } from "@coreui/react";
import fallbackImage from "@assets/img/under-development.webp";
import FilterForm, { FilterFormValues } from "@components/ui/FilterForm";
import { Row } from "@components/Container";
import CIcon from "@coreui/icons-react";
import { cilGrid, cilList } from "@coreui/icons";
import { DasboardPageHeader } from "@layouts/DashboardLayout";

interface LocationViewModel {
  thumbnail: string[]; // TODO: Ideally, a list of image URLs
  name: string;
  address: string[]; // TODO: To be changed to a map later on.
  tags: string[];
  scout: string; // uploadedBy: Name of the uploader
}

const testData: LocationViewModel[] = [
  {
    thumbnail: ["/src/assets/img/under-development.webp"],
    name: "Paris, France",
    address: ["113 Bellhaven Road, Toronto, ON"],
    tags: ["Small Townhouse", "Mid - Century"],
    scout: "Jon Snow",
  },
  {
    thumbnail: ["/src/assets/img/under-development.webp"],
    name: "Paris, France",
    address: [],
    tags: ["Small Townhouse", "Mid - Century"],
    scout: "Jon Snow",
  },
];

function Locations() {
  const [data, setData] = useState<ListPaneRow[]>([]);
  const [errorMsg] = useState<string | undefined>();

  const onSearchTermChange = useCallback((searchTerm: string) => {
    console.log("Search term: ", searchTerm);
  }, []);

  const onActiveTagsChange = useCallback((tags: string[]) => {
    console.log("Active tags: ", tags);
  }, []);

  useEffect(() => {
    setData(
      testData.map(({ thumbnail, name, address, tags, scout }) => {
        return {
          thumbnail: (
            <CImage
              rounded
              src={thumbnail[0] || fallbackImage}
              width={120}
              height={80}
            />
          ),
          name: name || "Unnamed",
          address: address[0] || "Probably Jupiter, IDK",
          tags: tags,
          scout: scout,
        } as ListPaneRow;
      }),
    );
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
        <h1>{errorMsg}</h1>
      ) : (
        <ListPane2
          columnNames={{
            thumbnail: "THUMBNAIL",
            name: "NAME",
            address: "ADDRESS",
            tags: "TAGS",
            scout: "SCOUT",
          }}
          data={data}
          actions={{
            Edit: (index: number) => {
              console.log("Locations: Editting ", data[index].name);
            },
          }}
        />
      )}
    </>
  );
}

export default Locations;
