import Home from "./component/AHome";

// Define API endpoints
const ENDPOINTS = {
  homeDetail: "navbar/getAll",
  sliders: "herosection/getAll",
  services: "services/getAll",
  workmethod: "workmethod/get",
  section: "project-section/getAll",
  allproject: "projects/getAll",
  contact: "contact-section/getAll",
  footer: "footer/get",
  seo: "metadata/get",


};

// Fetch function
async function fetchData(endpoint) {
  const serverUrl = process.env.NEXT_PUBLIC_DJANGO_URLS;
  if (!serverUrl) {
    throw new Error("Server URL is not defined in environment variables.");
  }

  
  try {
    const response = await fetch(`${serverUrl}${endpoint}`, {
 revalidate: 66 ,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${endpoint}: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return null; // Handle errors gracefully
  }
}

// Fetch all data in parallel
async function fetchInitialDetails() {
  const data = await Promise.all(
    Object.values(ENDPOINTS).map((endpoint) => fetchData(endpoint))
  );

  return Object.keys(ENDPOINTS).reduce((acc, key, index) => {
    acc[key] = data[index];
    return acc;
  }, {});
}

// ✅ Server Component that fetches data
export default async function Page() {
  const initialData = await fetchInitialDetails();

  if (!initialData) {
    return <div>Error loading data. Please try again later.</div>;
  }

  return <Home homeDetail={initialData} />;
}