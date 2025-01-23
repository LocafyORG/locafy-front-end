import { useQuery } from "@tanstack/react-query";
import { Paper } from "@components/Container";
import { CSpinner } from "@coreui/react";
import { DasboardPageHeader } from "@layouts/DashboardLayout";
import { UserProfile } from "@api/interfaces/User";
import { getProfile } from "@api/auth/authenticationAPI";
import { getAuthToken } from "@api/auth/AuthTokenApi";

export default function UserProfilePage() {
  const userId = getAuthToken();

  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => getProfile(userId || ""),
    queryKey: ["userProfile", { userId }],
  });

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center align-center">
        <CSpinner />
      </div>
    );
  }

  if (isError) {
    return <h1>Error: {(error as Error)?.message}</h1>;
  }

  // Type guard to ensure `data` is of type `UserProfile`
  const profile = data as UserProfile;

  return (
    <>
      <DasboardPageHeader
        title={`${profile?.firstName} ${profile?.lastName}`}
        buttons={[{ children: "EDIT PROFILE", onClick: () => {} }]}
      />
      <Paper>
        <h3>User Information</h3>
        <p><strong>Full Name:</strong> {profile?.firstName} {profile?.lastName}</p>
        <p><strong>Email:</strong> {profile?.email}</p>
        <p><strong>Phone:</strong> {profile?.phone}</p>
      </Paper>
    </>
  );
}
