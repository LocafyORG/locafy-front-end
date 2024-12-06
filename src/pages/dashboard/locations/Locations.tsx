import Filter from '@components/Filter/Filter.tsx';
import { useEffect, useState } from 'react';
import { ListPane2, ListPaneRow } from '@/components/ListPane/ListPane';
import { CImage } from '@coreui/react';
import fallbackImage from '@/assets/img/under-development.webp'

interface LocationViewModel {
  thumbnail: string[],    // TODO: Ideally, a list of image URLs
  name: string,
  address: string[],      // TODO: To be changed to a map later on.
  tags: string[],
  scout: string,          // uploadedBy: Name of the uploader
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

  useEffect(() => {
    setData(testData.map(({ thumbnail, name, address, tags, scout }) => {
      return {
        thumbnail: (<CImage rounded src={thumbnail[0] || fallbackImage} width={120} height={80}/>),
        name: name || "Unnamed",
        address: address[0] || "Probably Jupiter, IDK",
        tags: tags,
        scout: scout,
      } as ListPaneRow;
    }));
  }, []);

  return <>
    <button>help</button>
		<Filter />
    {errorMsg ? 
      <h1>{errorMsg}</h1>
      : 
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
          "Edit": (index: number) => {
            console.log("Locations: Editting ", data[index].name);
          }
        }}
      />
    }
	</>
}

export default Locations;
