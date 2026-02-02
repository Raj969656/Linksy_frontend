import { useState } from "react";
import API from "../services/api";
import { FiExternalLink, FiCopy } from "react-icons/fi";

export default function UrlForm() {
  const [url, setUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  async function submit() {
    setError("");
    try {
      // ✅ CORRECT ENDPOINT
      const res = await API.post("/url", {
        url,
        customAlias: alias || undefined,
      });

      // ✅ PRODUCTION SAFE SHORT URL
      const backendBase = "https://url-shortner-backend-x55x.onrender.com";

      setShortUrl(`${backendBase}/url/${res.data.shortId}`);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  }

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

      {shortUrl && (
        <div className="mt-4 flex justify-between items-center bg-gray-100 p-3 rounded">
          <span className="text-indigo-600 truncate">{shortUrl}</span>

          <div className="flex gap-3">
            <a href={shortUrl} target="_blank" rel="noreferrer">
              <FiExternalLink />
            </a>
            <button onClick={() => navigator.clipboard.writeText(shortUrl)}>
              <FiCopy />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
