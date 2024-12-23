import { getAuthToken } from "@api/auth/AuthTokenApi";
import { UserProfile } from "@api/interfaces/User";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const ProfilePage = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch user data from the API
    const fetchUserData = async () => {
      try {
        const token = getAuthToken(); // Get the auth token
        const response = await fetch(`http://localhost:8080/api/v1/users/all`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Send the token in the Authorization header
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data: UserProfile = await response.json();
        setUserData(data);
      } catch (e) {
        setError(`Error: ${(e as Error).message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!userData) {
    return <div>No user data available</div>;
  }

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      <div className="profile-info">
        <h2>{`${userData.firstName} ${userData.lastName}`}</h2>
        <p>Email: {userData.email}</p>
        <p>Phone: {userData.phone}</p>
        <p>Role: {userData.role}</p>
        <p>Status: {userData.enabled ? "Active" : "Inactive"}</p>
      </div>

      <div className="production-info">
        <h3>Production Memberships</h3>
        <ul>
          {userData.productionMemberships.map((membership, index) => (
            <li key={index}>
              <h4>Production ID: {membership.productionId}</h4>
              <p>Role: {membership.role}</p>
              <p>Job Title: {membership.jobTitle}</p>
              <p>Authority: {membership.authority}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="location-info">
        <h3>Location IDs</h3>
        <ul>
          {userData.locationIds.map((locationId, index) => (
            <li key={index}>{locationId}</li>
          ))}
        </ul>
      </div>

      <div className="contact-info">
        <h3>Contact IDs</h3>
        <ul>
          {userData.contactIds.map((contactId, index) => (
            <li key={index}>{contactId}</li>
          ))}
        </ul>
      </div>

      <div className="created-productions">
        <h3>Created Productions</h3>
        <ul>
          {userData.createdProductionIds.map((productionId, index) => (
            <li key={index}>{productionId}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfilePage;
