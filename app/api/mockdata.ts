export const apiCall = async () => {
  const response = await fetch(
    "https://697d2eee97386252a267b7c7.mockapi.io/users",
  );

  if (!response.ok) {
    throw new Error("failed to fetch data");
  }

  return response.json();
};
