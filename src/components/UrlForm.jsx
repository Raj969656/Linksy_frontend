import { useState } from "react";
import API from "../services/api";
import { FiExternalLink, FiCopy } from "react-icons/fi";

const DISPLAY_DOMAIN = "ls.ly";
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
      setError("Failed to shorten URL");
    }
  }

  const displayUrl = shortId ? `${DISPLAY_DOMAIN}/${shortId}` : "";
  const realUrl = shortId
    ? `${BACKEND_DOMAIN}/url/${shortId}`
    : "";

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://example.com"
        className="border w-full mb-2 px-4 py-2 rounded"
      />

      <input
        value={alias}
        onChange={(e) => setAlias(e.target.value)}
        placeholder="Custom alias (optional)"
        className="border w-full mb-2 px-4 py-2 rounded"
      />

      <button
        onClick={submit}
        className="bg-indigo-600 text-white px-6 py-2 rounded w-full"
      >
        Shorten
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {shortId && (
        <div className="mt-4 flex justify-between items-center bg-gray-100 p-3 rounded">
          <span>{displayUrl}</span>
          <div className="flex gap-3">
            <a href={realUrl} target="_blank" rel="noreferrer">
              <FiExternalLink />
            </a>
            <button
              onClick={() => navigator.clipboard.writeText(displayUrl)}
            >
              <FiCopy />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
