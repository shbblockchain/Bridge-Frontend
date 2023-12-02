export const fetchInfo = async () => {
  const response = await fetch(import.meta.env.VITE_API_URL + "/get-info");

  return response.json();
};
