// UserProfilePage.tsx
import { useAuth0 } from "@auth0/auth0-react";
import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi";
import UserProfileForm, { type UserFormData } from "@/forms/user-profile-form/UserProfileForm";

const UserProfilePage = () => {
  const { user } = useAuth0();
  const email = user?.email;

  const { currentUser, isLoading: isGetLoading } = useGetMyUser(email);
  const { updateUser, isPending: isUpdateLoading } = useUpdateMyUser();

  if (isGetLoading) {
    return <span>Loading...</span>;
  }

  if (!currentUser) {
    return <span>Unable to load user profile</span>;
  }

  const handleSave = (data: UserFormData) => {
    // ✅ Just send the object directly
    updateUser(data);
  };

  return (
    <UserProfileForm
      currentUser={currentUser}
      onSave={handleSave}
      isLoading={isUpdateLoading}
    />
  );
};

export default UserProfilePage;
