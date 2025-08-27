import apiCountries from "@/app/services/api/apiCountries";

interface CityParams {
  country: string;
}

interface CityResponse {
  error: boolean;
  msg: string;
  data: string[];
}


export const getCitiesByCountry = async (
  params: CityParams,
): Promise<CityResponse> => {
  try {
    const response = await apiCountries.post<CityResponse>(
      "/countries/cities",
      params,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching cities:", error);
    throw error; 
  }
};
