export default function StatsCard({ title, value }) {
  return (
    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg hover:scale-[1.02] transition">
      <p className="text-sm opacity-80">{title}</p>
      <h2 className="text-3xl font-bold mt-1">{value}</h2>
    </div>
  );
}
