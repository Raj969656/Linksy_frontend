import { useState } from "react";
import API from "../services/api";
import { FiExternalLink, FiCopy } from "react-icons/fi";

const DISPLAY_DOMAIN =
  "https://url-shortner-backend-x55x.onrender.com/url";

export default function UrlForm() {
  const [url, setUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [shortId, setShortId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit() {
    setError("");
    setShortId("");
    setLoading(true);

    try {
      const res = await API.post("/url", {
        url,
        customAlias: alias || undefined,
      });

      setShortId(res.data.shortId);
    } catch (err) {
      console.error(err);
      setError("Failed to shorten URL");
    } finally {
      setLoading(false);
    }
  }

  const displayUrl = shortId
    ? `${DISPLAY_DOMAIN}/${shortId}`
    : "";

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://example.com"
        className="border w-full mb-4 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <input
        value={alias}
        onChange={(e) => setAlias(e.target.value)}
        placeholder="Custom alias (optional)"
        className="border w-full mb-4 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <button
        onClick={submit}
        disabled={loading}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg w-full flex justify-center items-center transition-all duration-300 disabled:opacity-70"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : (
          "Shorten"
        )}
      </button>

      {error && (
        <p className="text-red-500 mt-4 text-sm">
          {error}
        </p>
      )}

      {shortId && (
        <div className="mt-6 flex justify-between items-center bg-gray-100 p-4 rounded-lg">
          <span className="break-all text-sm md:text-base">
            {displayUrl}
          </span>

          <div className="flex gap-4 ml-4">
            <a
              href={displayUrl}
              target="_blank"
              rel="noreferrer"
              className="text-indigo-600 hover:text-indigo-800 transition"
            >
              <FiExternalLink size={20} />
            </a>

            <button
              onClick={() =>
                navigator.clipboard.writeText(displayUrl)
              }
              className="text-indigo-600 hover:text-indigo-800 transition"
            >
              <FiCopy size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
