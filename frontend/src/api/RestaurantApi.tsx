import { useQuery } from "@tanstack/react-query";
import type { Restaurant, RestaurantSearchResponse } from "@/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetRestaurant = (restaurantId?: string) => {
  const getRestaurantByIdRequest = async (): Promise<Restaurant> => {
    if (!restaurantId) {
      throw new Error("Restaurant ID is required");
    }

    const response = await fetch(`${API_BASE_URL}/api/restaurant/${restaurantId}`);

    if (!response.ok) {
      throw new Error("Failed to get restaurant");
    }

    return response.json();
  };

  const { data: restaurant, isLoading } = useQuery({
    queryKey: ["fetchRestaurant", restaurantId], 
    queryFn: getRestaurantByIdRequest,
    enabled: !!restaurantId, 
  });

  return { restaurant, isLoading };
};



export const useSearchRestaurants = (
  city: string | undefined,
  searchQuery: string,
  page: number,
  selectedCuisines: string[],
  sortOption: string
) => {
  const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
    if (!city) {
      throw new Error("City is required");
    }

    const params = new URLSearchParams();
    if (searchQuery) {
      params.set("searchQuery", searchQuery);
    }
    params.set("page", page.toString());

    if (selectedCuisines.length > 0) {
      params.set("selectedCuisines", selectedCuisines.join(","));
    }

    params.set("sortOption", sortOption);

    const response = await fetch(
      `${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error("Failed to get restaurants");
    }

    return response.json();
  };

  const { data: results, isLoading } = useQuery({
    queryKey: [
      "searchRestaurants",
      city,
      searchQuery,
      page,
      selectedCuisines,
      sortOption,  // ✅ added here
    ],
    queryFn: createSearchRequest,
    enabled: !!city,
  });

  return { results, isLoading };
};
