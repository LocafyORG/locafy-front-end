import { getLocationById } from "@api/locations/LocationsApi";
import { Paper } from "@components/Container";
import { CSpinner } from "@coreui/react";
import { DashboardPageHeader } from "@layouts/DashboardLayout";
import { useQuery } from "@tanstack/react-query";
import { Map, useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router";

export function Location() {
  const { locationId } = useParams();

  const { data: location, isLoading } = useQuery({
    queryFn: () => getLocationById(locationId || ""),
    queryKey: ["location", { locationId }],
  });

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center align-center">
        <CSpinner className="" />
      </div>
    );
  }

  return (
    <>
      <DashboardPageHeader
        title={location?.name || "God knows"}
        buttons={[
          {
            children: "SHARE",
            onClick: () => {},
          },
          {
            children: "EDIT LOCATION",
            onClick: () => {},
          },
        ]}
      />
      <Paper>
        <p>{location?.notes}</p>
      </Paper>

      <div className="overflow-hidden rounded w-full h-[600px]">
        <Map
          disableDefaultUI={true}
          defaultZoom={9}
          defaultCenter={{ lng: 35.34, lat: 0 }}
        >
          <Heatmap radius={50} opacity={0.5} />
        </Map>
      </div>
    </>
  );
}

interface HeatmapProps {
  radius: number;
  opacity: number;
}

function Heatmap({ radius, opacity }: HeatmapProps) {
  const map = useMap();
  const visualization = useMapsLibrary("visualization");

  // Initialize the heatmap layer
  const heatmap = useMemo(() => {
    if (!visualization || !map) return null;

    return new google.maps.visualization.HeatmapLayer({
      map: map,
      radius: radius,
      opacity: opacity,
    });
  }, [visualization, map, radius, opacity]);

  // Set the heatmap data
  useEffect(() => {
    if (!heatmap) return;

    heatmap.setData([
      { location: new google.maps.LatLng(0, 35.34), weight: 0.1 },
      { location: new google.maps.LatLng(0, 35.3401), weight: 1.5 },
      { location: new google.maps.LatLng(0, 35.3402), weight: 0.5 },
      { location: new google.maps.LatLng(0, 35.3403), weight: 0.1 },
      { location: new google.maps.LatLng(0, 35.3404), weight: 1.1 },
    ]);
  }, [heatmap]);

  // Clean up the heatmap layer
  useEffect(() => {
    return () => {
      if (heatmap) {
        heatmap.setMap(null);
      }
    };
  }, [heatmap]);

  return null;
}
