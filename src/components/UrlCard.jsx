import { useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { toPng } from "html-to-image";
import API from "../services/api";

export default function UrlCard({ data }) {
  const qrRef = useRef(null);
  const [downloading, setDownloading] = useState(false);

  const shortUrl = `http://localhost:8001/url/${
    data.customAlias || data.shortId
  }`;

  async function toggle() {
    await API.patch(`/${data._id}/toggle`);
    window.location.reload();
  }

  async function downloadQR() {
    if (!qrRef.current) return;
    setDownloading(true);

    try {
      const dataUrl = await toPng(qrRef.current);
      const link = document.createElement("a");
      link.download = `${data.customAlias || data.shortId}-qr.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("QR download failed", err);
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className="bg-white p-5 rounded-xl shadow flex flex-col md:flex-row justify-between gap-6">

      {/* LEFT */}
      <div className="flex-1">
        <p className="font-semibold text-lg">
          {data.customAlias || data.shortId}
        </p>

        <a
          href={shortUrl}
          target="_blank"
          rel="noreferrer"
          className="text-indigo-600 text-sm break-all"
        >
          {shortUrl}
        </a>

        <p className="text-sm mt-1 text-gray-500">
          Status:{" "}
          <span
            className={
              data.isActive ? "text-green-600" : "text-red-500"
            }
          >
            {data.isActive ? "Active" : "Disabled"}
          </span>
        </p>

        <button
          onClick={toggle}
          className={`mt-3 px-4 py-1 rounded text-white ${
            data.isActive
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {data.isActive ? "Disable" : "Enable"}
        </button>
      </div>

      {/* RIGHT (QR) */}
      <div className="flex flex-col items-center gap-3">
        <div ref={qrRef} className="p-2 bg-white">
          <QRCodeCanvas value={shortUrl} size={120} />
        </div>

        <button
          onClick={downloadQR}
          disabled={downloading}
          className="text-sm bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700 disabled:opacity-50"
        >
          {downloading ? "Downloading..." : "Download QR"}
        </button>
      </div>
    </div>
  );
}
