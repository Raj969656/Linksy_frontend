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

  // 🔥 QR DOWNLOAD FUNCTION
  function downloadQR(shortId) {
    const svg = document.getElementById(`qr-${shortId}`);
    const serializer = new XMLSerializer();
    const svgStr = serializer.serializeToString(svg);

    const canvas = document.createElement("canvas");
    canvas.width = 200;
    canvas.height = 200;
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      const png = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = png;
      link.download = `qr-${shortId}.png`;
      link.click();
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgStr);
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
      <p className="text-gray-500 mb-6">
        Manage your shortened links, QR codes, and analytics
      </p>

      {urls.length === 0 && (
        <p className="text-gray-500">No links created yet.</p>
      )}

      <div className="grid gap-6">
        {urls.map((u) => {
          const realUrl = `${BACKEND}/url/${u.shortId}`;
          const displayUrl = `${DISPLAY}/${u.shortId}`;

          return (
            <div
              key={u._id}
              className="bg-white p-5 rounded-xl shadow flex justify-between items-center"
            >
              {/* LEFT INFO */}
              <div className="space-y-1">
                <p className="font-semibold text-indigo-600">
                  {displayUrl}
                </p>
                <p className="text-sm text-gray-500 break-all">
                  {u.redirectUrl}
                </p>
                <p className="text-sm">
                  Clicks:{" "}
                  <span className="font-semibold">
                    {u.visitHistory.length}
                  </span>
                </p>

                <div className="flex gap-3 mt-2">
                  <a
                    href={realUrl}
                    target="_blank"
                    className="text-indigo-600 text-sm underline"
                  >
                    Open
                  </a>

                  <button
                    onClick={() =>
                      navigator.clipboard.writeText(displayUrl)
                    }
                    className="text-sm text-gray-600 underline"
                  >
                    Copy
                  </button>
                </div>
              </div>

              {/* RIGHT QR */}
              <div className="flex flex-col items-center gap-2">
                <QRCode
                  id={`qr-${u.shortId}`}
                  value={realUrl}
                  size={90}
                />

                <button
                  onClick={() => downloadQR(u.shortId)}
                  className="text-xs bg-indigo-600 text-white px-3 py-1 rounded"
                >
                  Download QR
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
