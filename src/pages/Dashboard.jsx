import { useEffect, useState } from "react";
import API from "../services/api";
import UrlForm from "../components/UrlForm";
import UrlCard from "../components/UrlCard";

export default function Dashboard() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadData() {
    try {
      const res = await API.get("/user/urls");
      setUrls(res.data.urls || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        {/* URL SHORTENER */}
        <div className="mb-8">
          <UrlForm />
        </div>

        {/* LINKS */}
        {loading ? (
          <p className="text-gray-500">Loading links...</p>
        ) : urls.length === 0 ? (
          <p className="text-gray-500">No links created yet.</p>
        ) : (
          <div className="space-y-4">
            {urls.map((u) => (
              <UrlCard key={u._id} data={u} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
