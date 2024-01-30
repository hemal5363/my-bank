export const getDashboardData = async () => {
  const jsonData = await fetch(`/api/dashboard`);

  const data = await jsonData.json();

  return data;
};
