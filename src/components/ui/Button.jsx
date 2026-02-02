export default function Button({ children, ...props }) {
  return (
    <button
      {...props}
      className="bg-indigo-600 hover:bg-indigo-700 active:scale-95 transition text-white px-6 py-3 rounded-xl font-semibold shadow"
    >
      {children}
    </button>
  );
}
