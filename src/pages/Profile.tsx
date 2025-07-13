import { useQuery } from "@tanstack/react-query";
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
import { LoadingSpinner, ErrorState, InfoCard, InfoRow, ActivityItem, BillItem, GridLayout } from "@components/ui";

export default function UserProfilePage() {
  const userId = getAuthToken();

  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => getProfile(),
    queryKey: ["userProfile", { userId }],
  });

  if (isLoading) {
    return <LoadingSpinner message="Loading profile..." />;
  }

  if (isError) {
    return (
      <ErrorState
        icon={<FaExclamationTriangle className="text-red-500 text-4xl" />}
        title="Error loading profile"
        error={(error as Error)?.message}
      />
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

      <GridLayout columns={2} gap="lg" className="max-w-6xl mx-auto mt-8">
        {/* Left Tall Card - User Information */}
        <InfoCard
          icon={<FaUser className="text-white text-2xl" />}
          title="User Information"
          subtitle="Account details and preferences"
          className="h-auto md:h-[600px]"
        >
          <InfoRow
            icon={<FaUser />}
            label="Full Name"
            value={`${profile?.firstName} ${profile?.lastName}`}
            iconColor="text-blue-500"
          />
          <InfoRow
            icon={<FaEnvelope />}
            label="Email"
            value={profile?.email || "Not provided"}
            iconColor="text-green-500"
          />
          <InfoRow
            icon={<FaPhone />}
            label="Phone"
            value={profile?.phone || "Not provided"}
            iconColor="text-orange-500"
          />
          <InfoRow
            icon={<FaIdCard />}
            label="User ID"
            value={profile?.userId || "Not provided"}
            iconColor="text-purple-500"
          />
        </InfoCard>

        {/* Right Stacked Cards */}
        <div className="flex flex-col gap-6">
          {/* Top Right Card - Recent Activity */}
          <InfoCard
            icon={<FaClock />}
            title="Recent Activity"
            className="h-[380px]"
          >
            <ActivityItem
              title="Profile updated"
              description="Your profile information was updated"
              timeAgo="2 hours ago"
              status="info"
            />
            <ActivityItem
              title="New contact added"
              description="A new contact was added to your account"
              timeAgo="Yesterday"
              status="success"
            />
            <ActivityItem
              title="Location shared"
              description="A location was shared with you"
              timeAgo="3 days ago"
              status="warning"
            />
          </InfoCard>

          {/* Bottom Right Card - Incoming Bills */}
          <InfoCard
            icon={<FaCreditCard />}
            title="Incoming Bills"
            className="h-[380px]"
          >
            <BillItem
              title="Monthly membership"
              dueDate="Jan 30, 2025"
              amount="$120.00"
              status="overdue"
            />
            <BillItem
              title="Monthly membership"
              dueDate="Feb 5, 2025"
              amount="$120.00"
              status="due-soon"
            />
            <BillItem
              title="Extra users"
              dueDate="Feb 10, 2025"
              amount="$50.00"
              status="upcoming"
            />
          </InfoCard>
        </div>
      </GridLayout>
    </>
  );
}
