import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { DashboardPageHeader } from "@layouts/DashboardLayout";
import { Paper } from "@components/Container";
import { CSpinner } from "@coreui/react";
import {
  getProductionById,
  updateProduction,
} from "@api/productions/ProductionsApi";
import { DASHBOARD } from "@constants/Routes";

export function EditProduction() {
  const { productionId } = useParams<{ productionId: string }>();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProductionById(productionId || "");
        setTitle(data.title || "");
        setDescription(data.description || "");
      } catch (err) {
        console.error("Error fetching production:", err);
        setError("Failed to load production data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [productionId]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateProduction(productionId || "", { title, description });
      navigate(DASHBOARD.PRODUCTIONS);
    } catch (err) {
      console.error("Error updating production:", err);
      setError("Failed to save changes.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <CSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-600 text-center mt-6">{error}</p>;
  }

  return (
    <>
      <DashboardPageHeader
        title="Edit Production"
        leftButtons={[
          {
            children: "CANCEL",
            onClick: () => navigate(DASHBOARD.PRODUCTIONS),
          },
        ]}
        buttons={[
          {
            children: isSaving ? "SAVING..." : "SAVE",
            onClick: handleSave,
            disabled: isSaving,
          },
        ]}
      />

      <Paper className="p-4 max-w-3xl mx-auto space-y-4">
        <input
          type="text"
          placeholder="Production Title"
          className="w-full p-2 border border-gray-300 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          className="w-full p-2 border border-gray-300 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Paper>
    </>
  );
}
