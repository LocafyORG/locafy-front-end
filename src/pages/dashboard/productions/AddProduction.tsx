import { useState } from "react";
import { useNavigate } from "react-router";
import { DashboardPageHeader } from "@layouts/DashboardLayout";
import { Paper } from "@components/Container";
import { DASHBOARD } from "@constants/Routes";
import { createProduction } from "@api/productions/ProductionsApi";

export function AddProduction() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

const handleSubmit = async () => {
  try {
    await createProduction({ title, description });
    navigate(DASHBOARD.PRODUCTIONS);
  } catch (error) {
    console.error("Failed to create production:", error);
  }
};

  return (
    <>
      <DashboardPageHeader
        title="Add New Production"
        leftButtons={[
          {
            children: "CANCEL",
            onClick: () => navigate(DASHBOARD.PRODUCTIONS),
          },
        ]}
        buttons={[
          {
            children: "SAVE",
            onClick: handleSubmit,
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
