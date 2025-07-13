import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Card from "@components/ui/Card";
import Cheems from "@assets/img/under-development.webp";
import { fetchProductions } from "@api/productions/ProductionsApi.ts";
import { Production } from "@api/interfaces/ProductionDTO.ts";
import "@styles/pages/dashboard/Productions.scss";
import { DashboardPageHeader } from "@layouts/DashboardLayout";
import { handleSignOut } from "@api/auth/authenticationAPI";
import { LoadingSpinner, ErrorState, GridLayout } from "@components/ui";

export function Productions() {
  const [data, setData] = useState<Production[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getProductions = async () => {
      try {
        const productions = await fetchProductions();
        setData(productions);
      } catch (err) {
        setError((err as Error).message);
        if (err === "Unauthorized") {
          handleSignOut(navigate);
        }
      } finally {
        setIsLoading(false);
      }
    };

    getProductions();
  }, []);

  if (isLoading) return <LoadingSpinner message="Loading productions..." />;
  if (error) return <ErrorState title="Error loading productions" error={error} />;

  return (
    <>
      <DashboardPageHeader
        title="Productions"
        buttons={[
          {
            children: "CREATE NEW PRODUCTION",
            onClick: () => navigate("add"),
          },
        ]}
      />

      <GridLayout columns={4} gap="md" className="card-container">
        {data.map((item) => (
          <Card
            key={item.productionId}
            image={Cheems}
            title={item.title}
            description={item.description}
            onClick={() => {
              navigate(`${item.productionId}`);
            }}
          />
        ))}
      </GridLayout>
    </>
  );
}
