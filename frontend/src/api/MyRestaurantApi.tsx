
import type { Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// ✅ GET restaurant
export const useGetMyRestaurant = () => {
  const { getAccessTokenSilently,user } = useAuth0();

  const getMyRestaurantRequest = async (): Promise<Restaurant> => {
     if (!user?.email) {
    throw new Error("User email is missing");
  }

    const accessToken = await getAccessTokenSilently();
  

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant?email=${encodeURIComponent(user.email)}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get restaurant");
    }
    return response.json();
  };

  const { data: restaurant, isLoading } = useQuery({
    queryKey: ["fetchMyRestaurant"],
    queryFn: getMyRestaurantRequest,
    enabled: !!user?.email,
  });

  return { restaurant, isLoading };
};

// ✅ CREATE restaurant
export const useCreateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });

    if (!response.ok) {
      throw new Error("Failed to create restaurant");
    }

    return response.json();
  };

  const { mutate: createRestaurant, isPending } = useMutation({
    mutationFn: createMyRestaurantRequest,
    onSuccess: () => toast.success("Restaurant created!"),
    onError: () => toast.error("Unable to create restaurant"),
  });

  return { createRestaurant, isPending };
};

// ✅ UPDATE restaurant
export const useUpdateMyRestaurant = () => {
  const { getAccessTokenSilently, user } = useAuth0();

  const updateRestaurantRequest = async (restaurantFormData: FormData) => {
    if (!user?.email) {
      throw new Error("User email is missing");
    }

    const accessToken = await getAccessTokenSilently();

    const response = await fetch(
      `${API_BASE_URL}/api/my/restaurant?email=${encodeURIComponent(user.email)}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`, // No Content-Type for FormData
        },
        body: restaurantFormData,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update restaurant");
    }

    return response.json();
  };

  const { mutate: updateRestaurant, isPending } = useMutation({
    mutationFn: updateRestaurantRequest,
    onSuccess: () => toast.success("Restaurant updated!"),
    onError: () => toast.error("Unable to update restaurant"),
  });

  return { updateRestaurant, isPending };
};
