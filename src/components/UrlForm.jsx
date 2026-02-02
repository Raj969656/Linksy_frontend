import { useState } from "react";
import API from "../services/api";
import { FiExternalLink, FiCopy } from "react-icons/fi";

const DISPLAY_DOMAIN = "ls.ly"; // 👈 FAKE SHORT DOMAIN (UI ONLY)
const BACKEND_DOMAIN = "https://url-shortner-backend-x55x.onrender.com";

export default function UrlForm() {
  const [url, setUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [shortId, setShortId] = useState("");
  const [error, setError] = useState("");

  async function submit() {
    setError("");
    try {
      const res = await API.post("/url", {
        url,
        customAlias: alias || undefined,
      });

      setShortId(res.data.shortId);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  }

  const realUrl = shortId
    ? `${BACKEND_DOMAIN}/url/${shortId}`
    : "";

  const displayUrl = shortId
    ? `${DISPLAY_DOMAIN}/${shortId}`
    : "";

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex flex-col gap-3">
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          className="border rounded px-4 py-2"
        />

        <input
          value={alias}
          onChange={(e) => setAlias(e.target.value)}
          placeholder="Custom alias (optional)"
          className="border rounded px-4 py-2"
        />

        <button
          onClick={submit}
          className="bg-indigo-600 text-white px-6 py-2 rounded font-semibold"
        >
          Shorten
        </button>
      </div>

      {error && (
        <p className="text-red-500 text-sm mt-3">{error}</p>
      )}

      {shortId && (
        <div className="mt-4 flex justify-between items-center bg-gray-100 p-3 rounded">
          {/* 👇 USER SEEN SHORT URL */}
          <span className="text-indigo-600 truncate">
            {displayUrl}
          </span>

          <div className="flex gap-3">
            {/* 👇 REAL BACKEND URL OPENS */}
            <a href={realUrl} target="_blank" rel="noreferrer">
              <FiExternalLink />
            </a>

            {/* 👇 COPY REAL URL (BEST PRACTICE) */}
            <button
              onClick={() => navigator.clipboard.writeText(realUrl)}
              title="Copy real link"
            >
              <FiCopy />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
