import { useEffect, useState } from "react";
import API from "../services/api";
import QRCode from "qrcode.react";

const DISPLAY_DOMAIN = "ls.ly";
const BACKEND_DOMAIN = "https://url-shortner-backend-x55x.onrender.com";

export default function Dashboard() {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    API.get("/url/user/urls").then((res) => {
      setUrls(res.data);
    });
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Your Links</h1>

      {urls.length === 0 && <p>No links yet.</p>}

      {urls.map((u) => {
        const displayUrl = `${DISPLAY_DOMAIN}/${u.shortId}`;
        const realUrl = `${BACKEND_DOMAIN}/url/${u.shortId}`;

        return (
          <div
            key={u._id}
            className="bg-white p-4 rounded shadow mb-4 flex justify-between"
          >
            <div>
              <p className="font-semibold">{displayUrl}</p>
              <p className="text-sm text-gray-500 truncate">
                {u.redirectUrl}
              </p>
              <p className="text-xs text-gray-400">
                Clicks: {u.visitHistory.length}
              </p>
            </div>

            <QRCode value={realUrl} size={64} />
          </div>
        );
      })}
    </div>
  );
}
