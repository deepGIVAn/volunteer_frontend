import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export async function loader() {
  const databaseUrl = process.env.DATABASE_URL;
  
  // Return server data using Remix's json helper
  return json({ 
    databaseUrl: databaseUrl || "Not configured",
    serverTimestamp: new Date().toISOString()
  });
}

export default function AdminPage() {
  const { databaseUrl, serverTimestamp } = useLoaderData();
  
  // Client-side environment variables
  const apiUrl = import.meta.env.VITE_API_URL;
  const appName = import.meta.env.VITE_APP_NAME;
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      
      <div className="space-y-4">
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="font-semibold">Client Environment</h2>
          <p><strong>App Name:</strong> {appName || "Not configured"}</p>
          <p><strong>API URL:</strong> {apiUrl || "Not configured"}</p>
        </div>
        
        <div className="bg-blue-100 p-4 rounded">
          <h2 className="font-semibold">Server Environment</h2>
          <p><strong>Database URL:</strong> {databaseUrl}</p>
          <p><strong>Server Time:</strong> {serverTimestamp}</p>
        </div>
      </div>
    </div>
  );
}