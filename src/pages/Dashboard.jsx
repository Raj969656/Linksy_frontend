import { useEffect, useState } from "react";
import API from "../services/api";
import QRCode from "react-qr-code";

export default function Dashboard() {
  const [urls, setUrls] = useState([]);

  const BACKEND = "https://url-shortner-backend-x55x.onrender.com";
  const DISPLAY = "ls.ly";

  useEffect(() => {
    API.get("/url/user/urls")
      .then((res) => setUrls(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {urls.length === 0 && (
        <p className="text-gray-500">No links created yet.</p>
      )}

      <div className="space-y-6">
        {urls.map((u) => {
          const realUrl = `${BACKEND}/url/${u.shortId}`;
          const displayUrl = `${DISPLAY}/${u.shortId}`;

          return (
            <div
              key={u._id}
              className="bg-white p-5 rounded-xl shadow flex justify-between items-center"
            >
              <div>
                <p className="font-semibold text-indigo-600">
                  {displayUrl}
                </p>
                <p className="text-sm text-gray-500 break-all">
                  {u.redirectUrl}
                </p>
                <p className="text-sm mt-1">
                  Clicks:{" "}
                  <span className="font-semibold">
                    {u.visitHistory.length}
                  </span>
                </p>

                <a
                  href={realUrl}
                  target="_blank"
                  className="text-indigo-600 text-sm underline"
                >
                  Open →
                </a>
              </div>

              <QRCode value={realUrl} size={80} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
