import { Paper } from "@components/Container";
import { CSpinner } from "@coreui/react";
import { DashboardPageHeader } from "@layouts/DashboardLayout";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router";
import { getProductionById } from "@api/productions/ProductionsApi";
import Cheems from "@assets/img/under-development.webp";

export function Production() {
  const { productionId } = useParams<{ productionId: string }>();
  const navigate = useNavigate();

  const {
    data: production,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getProductionById(productionId || ""),
    queryKey: ["production", { productionId }],
  });

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <CSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-600">Error loading production data.</p>;
  }

  return (
    <>
      <DashboardPageHeader
        title={production?.title || "Production Details"}
        leftButtons={[
          {
            children: "BACK",
            onClick: () => navigate('/dashboard/productions'),
          },
        ]}
        buttons={[
          {
            children: "SHARE",
            onClick: () => {
              // Implement share logic here
            },
          },
          {
            children: "EDIT PRODUCTION",
            onClick: () => {
              if (production?.productionId) {
                navigate(`/productions/edit/${production.productionId}`);
              }
            },
          },
        ]}
      />

      <Paper className="p-4 max-w-4xl mx-auto">
        <img
          src={Cheems}
          alt={production?.title || "Production Image"}
          className="w-full max-h-72 object-cover rounded"
        />

        <h2 className="text-2xl font-bold mt-4">{production?.title}</h2>

        {production?.description && (
          <p className="mt-2">{production.description}</p>
        )}

        {/* Add more production details as needed */}
      </Paper>
    </>
  );
}
