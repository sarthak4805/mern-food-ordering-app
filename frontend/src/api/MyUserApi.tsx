// src/api/UserApi.tsx

/*import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Type definition for your user (customize as needed)
export type MyUser = {
  _id: string;
  auth0Id: string;
  email: string;
  name: string;
addressLine1: string;
  city: string;
  country: string;
};

export const useGetMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const fetchMyUser = async (): Promise<MyUser> => {
    const accessToken = await getAccessTokenSilently();

    const res = await fetch(`${API_BASE_URL}/api/my/user`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch user");
    }

    return res.json();
  };

  const { data: currentUser, isLoading } = useQuery({
    queryKey: ["fetchMyUser"],
    queryFn: fetchMyUser,
  });

  return { currentUser, isLoading };
};

export const useUpdateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMyUser = async (userFormData: FormData): Promise<MyUser> => {
    const accessToken = await getAccessTokenSilently();

    const res = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: userFormData,
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to update user");
    }

    return res.json();
  };

  const { mutateAsync: updateUser, isPending } = useMutation({
    mutationFn: updateMyUser,
    onSuccess: () => toast.success("Profile updated"),
    onError: (error: any) => toast.error(error.message || "Update failed"),
  });

  return { updateUser, isPending };
};
type CreateUserRequest = {
  auth0Id: string;
  email: string;
};

export const useCreateMyUser = () => {
  const createUserRequest = async (user: CreateUserRequest): Promise<MyUser> => {
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create user");
    }

    return response.json();
  };

  const { mutate: createUser, isPending } = useMutation({
    mutationFn: createUserRequest,
    onSuccess: () => toast.success("User created"),
    onError: (error: any) => toast.error(error.message || "Create user failed"),
  });

  return { createUser, isPending };
};*/
// src/api/UserApi.tsx
/*import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Type definition for your user (customize as needed)
export type MyUser = {
  _id: string;
  auth0Id: string;
  email: string;
  name: string;
addressLine1: string;
  city: string;
  country: string;
};

export const useGetMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const fetchMyUser = async (): Promise<MyUser> => {
    const accessToken = await getAccessTokenSilently();

    const res = await fetch(`${API_BASE_URL}/api/my/user`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch user");
    }

    return res.json();
  };

  const { data: currentUser, isLoading } = useQuery({
    queryKey: ["fetchMyUser"],
    queryFn: fetchMyUser,
  });

  return { currentUser, isLoading };
};

export const useUpdateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMyUser = async (userFormData: FormData): Promise<MyUser> => {
    const accessToken = await getAccessTokenSilently();

    const res = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: userFormData,
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to update user");
    }

    return res.json();
  };

  const { mutateAsync: updateUser, isPending } = useMutation({
    mutationFn: updateMyUser,
    onSuccess: () => toast.success("Profile updated"),
    onError: (error: any) => toast.error(error.message || "Update failed"),
  });

  return { updateUser, isPending };
};
type CreateUserRequest = {
  auth0Id: string;
  email: string;
};

export const useCreateMyUser = () => {
  const createUserRequest = async (user: CreateUserRequest): Promise<MyUser> => {
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create user");
    }

    return response.json();
  };

  const { mutate: createUser, isPending } = useMutation({
    mutationFn: createUserRequest,
    onSuccess: () => toast.success("User created"),
    onError: (error: any) => toast.error(error.message || "Create user failed"),
  });

  return { createUser, isPending };
};*/
import type { User } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// -----------------------------
// GET My User
// -----------------------------
export const useGetMyUser = (email?: string) => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyUserRequest = async (): Promise<User> => {
    const accessToken = await getAccessTokenSilently();
        
    if (!email) {
  throw new Error("Email is required to fetch user");
}

    const response = await fetch(
      `${API_BASE_URL}/api/my/user?email=${encodeURIComponent(email)}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    return response.json();
  };

  const {
    data: currentUser,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["fetchCurrentUser"],
    queryFn: getMyUserRequest,
  });

  if (error) {
    toast.error((error as Error).message);
  }

  return { currentUser, isLoading };
};

// -----------------------------
// CREATE My User
// -----------------------------
type CreateUserRequest = {
  auth0Id: string;
  email: string;
};

export const useCreateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyUserRequest = async (user: CreateUserRequest) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Failed to create user");
    }

    return response.json();
  };

  const {
    mutateAsync: createUser,
    isPending,
    isError,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: createMyUserRequest,
    onSuccess: () => toast.success("User created successfully"),
    onError: (err: unknown) => toast.error((err as Error).message),
  });

  return { createUser, isPending, isError, isSuccess, error };
};

// -----------------------------
// UPDATE My User (FormData)
// -----------------------------
export const useUpdateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMyUserRequest = async (formData: FormData) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        // No Content-Type here; browser sets it for FormData
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to update user");
    }

    return response.json();
  };

  const {
    mutateAsync: updateUser,
    isPending,
    isSuccess,
    error,
    reset,
  } = useMutation({
    mutationFn: updateMyUserRequest,
    onSuccess: () => toast.success("User profile updated!"),
    onError: (err: unknown) => {
      toast.error((err as Error).message);
      reset();
    },
  });

  return { updateUser, isPending, isSuccess, error };
};
