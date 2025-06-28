import { useCallback, useMemo, useState, useEffect } from "react";
import { ListPane2, ListPaneRow } from "@components/ui/ListPane";
import { CFormSwitch, CImage } from "@coreui/react";
import fallbackImage from "@assets/img/under-development.webp";
import FilterForm, { FilterFormValues } from "@components/ui/FilterForm";
import { Row } from "@components/Container";
import CIcon from "@coreui/icons-react";
import { cilGrid, cilList } from "@coreui/icons";
import { DashboardPageHeader } from "@layouts/DashboardLayout";
import { getAllLocations, deleteLocation } from "@api/locations/LocationsApi";
import { Location } from "@api/interfaces/LocationDTO";
import { useNavigate } from "react-router";
import { DASHBOARD } from "@constants/Routes";
import { handleSignOut } from "@api/auth/authenticationAPI";

export function Locations() {
  const navigate = useNavigate();

  const [localLocations, setLocalLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch locations
  const fetchLocations = async () => {
    try {
      setLoading(true);
      const locations = await getAllLocations();
      setLocalLocations(locations);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to load locations");
      if (err === "Unauthorized") {
        handleSignOut(navigate);
      }
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchLocations();
  }, []);

  // Delete handler
  const handleDelete = async (index: number) => {
    const location = localLocations[index];
    if (!location || !location.locationId) return;

    try {
      await deleteLocation(location.locationId);
      // After deletion, re-fetch locations
      fetchLocations();
    } catch (err) {
      console.error("Failed to delete location:", err);
      setError("Failed to delete location");
    }
  };

  const rows = useMemo<ListPaneRow[]>(() => {
    return localLocations.map((loc) => ({
      id: loc.locationId,
      thumbnail: (
        <CImage
          src={fallbackImage}
          width={120}
          height={80}
          rounded
          alt="Location thumbnail"
        />
      ),
      name: loc.name || "Unnamed",
      address: "Probably Jupiter, IDK",
      tags: loc.keywords.map((word, idx) => (
        <span
          key={idx}
          className="mr-1 inline-block bg-gray-200 px-2 py-1 rounded"
        >
          {word}
        </span>
      )),
      scout: loc.name,
    }));
  }, [localLocations]);

  const onSearchTermChange = useCallback((searchTerm: string) => {
    console.log("Search term: ", searchTerm);
  }, []);

  const onActiveTagsChange = useCallback((tags: string[]) => {
    console.log("Active tags: ", tags);
  }, []);

  if (loading) return <p>Loading locations...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <DashboardPageHeader
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

      {/* Top bar options */}
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
          <CIcon icon={cilGrid} className="ml-2" />
          <CIcon icon={cilList} className="ml-2" />
        </Row>
      </Row>

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
            const id = rows[index]?.id;
            if (id !== undefined) {
              navigate(`${DASHBOARD.EDIT_LOCATION}/${String(id)}`);
            }
          },
          Delete: handleDelete,
        }}
        onRowClick={(index) => {
          const id = rows[index]?.id;
          if (id !== undefined) {
            navigate(String(id));
          }
        }}
      />
    </>
  );
}
