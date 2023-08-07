export const sitesListLoader = async () => {
  const res = await fetch(`${process.env.REACT_APP_BASE_URL}/sites`);
  if (!res.ok) {
    throw Error("Could not fetch data, check if server is running !");
  }
  return res.json();
};
