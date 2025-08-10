import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi";
import UserProfileForm, { type UserFormData } from "@/forms/user-profile-form/UserProfileForm";

const UserProfilePage = () => {
  const { currentUser, isLoading: isGetLoading } = useGetMyUser();
  const { updateUser, isPending: isUpdateLoading } = useUpdateMyUser();

  if (isGetLoading) {
    return <span>Loading...</span>;
  }

  if (!currentUser) {
    return <span>Unable to load user profile</span>;
  }

  const handleSave = (data: UserFormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("addressLine1", data.addressLine1);
    formData.append("city", data.city);
    formData.append("country", data.country);

    if (data.email) {
      formData.append("email", data.email);
    }

    updateUser(formData);
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
