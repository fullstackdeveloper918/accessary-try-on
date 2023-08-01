export const callApi = (
  endpoint: string = "",
  options?: {
    method: "GET" | "POST" | "DELTE" | "PUT" | "PATCH";
    body?: string;
  }
) => {
  const baseUrl = "https://clickthemart.com/api/";
  const headers = {
    method: "GET",
    ...options,
  };
  return fetch(`${baseUrl}${endpoint}`, headers);
};
