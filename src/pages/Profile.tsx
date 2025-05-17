import { useQuery } from "@tanstack/react-query";
import { CSpinner } from "@coreui/react";
import { DashboardPageHeader } from "@layouts/DashboardLayout";
import { UserProfile } from "@api/interfaces/UserDTO";
import { getProfile } from "@api/auth/authenticationAPI";
import { getAuthToken } from "@api/auth/authTokenApi";

export default function UserProfilePage() {
  const userId = getAuthToken();

  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => getProfile(),
    queryKey: ["userProfile", { userId }],
  });

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center align-center top-50 left-0 fixed bg-white bg-opacity-50 z-50">
        <CSpinner />
      </div>
    );
  }

  if (isError) {
    return <h1>Error: {(error as Error)?.message}</h1>;
  }

  const profile = data as UserProfile;

  return (
    <>
      <DashboardPageHeader
        title={`${profile?.firstName} ${profile?.lastName}`}
        buttons={[{ children: "EDIT PROFILE", onClick: () => {} }]}
      />
      <div className="flex flex-wrap gap-6 max-w-5xl mx-auto mt-10">
        {/* Left Tall Card */}
        <div className="flex-1 bg-white shadow-lg rounded-lg p-6 h-auto md:h-[500px]">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            User Information
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="text-lg font-medium text-gray-900">
                {profile?.firstName} {profile?.lastName}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-lg font-medium text-gray-900">
                {profile?.email}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="text-lg font-medium text-gray-900">
                {profile?.phone}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">ID</p>
              <p className="text-lg font-medium text-gray-900">
                {profile?.userId}
              </p>
            </div>
          </div>
        </div>

        {/* Right Stacked Cards */}
        <div className="flex flex-col gap-6 flex-1">
          {/* Top Right Card */}
          <div className="bg-white shadow-lg rounded-lg p-6 h-[240px]">
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Recent Activity
            </h3>
            <p className="text-sm text-gray-600">No recent activity yet.</p>
          </div>

          {/* Bottom Right Card */}
          <div className="bg-white shadow-lg rounded-lg p-6 h-[240px]">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Incoming Bills
            </h3>
            <ul className="space-y-3">
              {/* Example Bill Items */}
              <li className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Monthly membership
                  </p>
                  <p className="text-xs text-gray-500">Due: Jan 30, 2025</p>
                </div>
                <p className="text-sm font-semibold text-red-600">$120.00</p>
              </li>
              <li className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Montly membership
                  </p>
                  <p className="text-xs text-gray-500">Due: Feb 5, 2025</p>
                </div>
                <p className="text-sm font-semibold text-red-600">$120.00</p>
              </li>
              <li className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Extra users
                  </p>
                  <p className="text-xs text-gray-500">Due: Feb 10, 2025</p>
                </div>
                <p className="text-sm font-semibold text-red-600">$50.00</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
