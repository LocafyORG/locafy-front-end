import { useQuery } from "@tanstack/react-query";
import { CSpinner } from "@coreui/react";
import { DashboardPageHeader } from "@layouts/DashboardLayout";
import { UserProfile } from "@api/interfaces/UserDTO";
import { getProfile } from "@api/auth/authenticationAPI";
import { getAuthToken } from "@api/auth/authTokenApi";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaIdCard,
  FaEdit,
  FaClock,
  FaCreditCard,
  FaExclamationTriangle,
} from "react-icons/fa";

export default function UserProfilePage() {
  const userId = getAuthToken();

  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => getProfile(),
    queryKey: ["userProfile", { userId }],
  });

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <CSpinner />
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full h-full flex justify-center items-center min-h-screen">
        <div className="text-center">
          <FaExclamationTriangle className="text-red-500 text-4xl mx-auto mb-4" />
          <h1 className="text-xl font-semibold text-red-600">
            Error loading profile
          </h1>
          <p className="text-gray-600 mt-2">{(error as Error)?.message}</p>
        </div>
      </div>
    );
  }

  const profile = data as UserProfile;

  return (
    <>
      <DashboardPageHeader
        title={`${profile?.firstName} ${profile?.lastName}`}
        buttons={[
          {
            children: (
              <span className="flex items-center gap-2">
                <FaEdit /> EDIT PROFILE
              </span>
            ),
            onClick: () => {},
            className:
              "flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition shadow",
          },
        ]}
      />

      <div className="flex flex-wrap gap-6 max-w-6xl mx-auto mt-8">
        {/* Left Tall Card - User Information */}
        <div className="flex-1 bg-white shadow-xl rounded-xl p-8 h-auto md:h-[600px] border border-gray-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <FaUser className="text-white text-2xl" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">
                User Information
              </h3>
              <p className="text-gray-500">Account details and preferences</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <FaUser className="text-blue-500 text-xl" />
              <div className="flex-1">
                <p className="text-sm text-gray-500 font-medium">Full Name</p>
                <p className="text-lg font-semibold text-gray-900">
                  {profile?.firstName} {profile?.lastName}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <FaEnvelope className="text-green-500 text-xl" />
              <div className="flex-1">
                <p className="text-sm text-gray-500 font-medium">Email</p>
                <p className="text-lg font-semibold text-gray-900">
                  {profile?.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <FaPhone className="text-orange-500 text-xl" />
              <div className="flex-1">
                <p className="text-sm text-gray-500 font-medium">Phone</p>
                <p className="text-lg font-semibold text-gray-900">
                  {profile?.phone || "Not provided"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <FaIdCard className="text-purple-500 text-xl" />
              <div className="flex-1">
                <p className="text-sm text-gray-500 font-medium">User ID</p>
                <p className="text-lg font-semibold text-gray-900 font-mono">
                  {profile?.userId}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Stacked Cards */}
        <div className="flex flex-col gap-6 flex-1">
          {/* Top Right Card - Recent Activity */}
          <div className="bg-white shadow-xl rounded-xl p-6 h-[380px] border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <FaClock className="text-blue-500 text-xl" />
              <h3 className="text-xl font-bold text-gray-800">
                Recent Activity
              </h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Profile updated
                  </p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    New contact added
                  </p>
                  <p className="text-xs text-gray-500">Yesterday</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Location shared
                  </p>
                  <p className="text-xs text-gray-500">3 days ago</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Right Card - Incoming Bills */}
          <div className="bg-white shadow-xl rounded-xl p-6 h-[380px] border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <FaCreditCard className="text-red-500 text-xl" />
              <h3 className="text-xl font-bold text-gray-800">
                Incoming Bills
              </h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Monthly membership
                  </p>
                  <p className="text-xs text-gray-500">Due: Jan 30, 2025</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-red-600">$120.00</p>
                  <p className="text-xs text-red-500">Overdue</p>
                </div>
              </div>

              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Monthly membership
                  </p>
                  <p className="text-xs text-gray-500">Due: Feb 5, 2025</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-yellow-600">$120.00</p>
                  <p className="text-xs text-yellow-500">Due soon</p>
                </div>
              </div>

              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border-l-4 border-gray-400">
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Extra users
                  </p>
                  <p className="text-xs text-gray-500">Due: Feb 10, 2025</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-600">$50.00</p>
                  <p className="text-xs text-gray-500">Upcoming</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
