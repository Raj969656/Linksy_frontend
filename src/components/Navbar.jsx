import { useNavigate, useLocation } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  function goToSection(id) {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2"
        >
          <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center font-extrabold text-indigo-600">
            LS
          </div>
          <span className="text-white font-semibold text-lg hidden sm:block">
            LinkSy
          </span>
        </button>

        {/* NAV LINKS */}
        <div className="flex items-center gap-6 text-white font-medium">

          <button onClick={() => navigate("/")} className="hover:text-indigo-200">
            Home
          </button>

          <button onClick={() => goToSection("about")} className="hover:text-indigo-200">
            About
          </button>

          <button onClick={() => goToSection("features")} className="hover:text-indigo-200">
            Features
          </button>

          <SignedIn>
            <button
              onClick={() => navigate("/dashboard")}
              className="hover:text-indigo-200"
            >
              Dashboard
            </button>
          </SignedIn>

        
          <SignedOut>
            <button
              onClick={() => window.Clerk.openSignIn()}
              className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-indigo-50 transition"
            >
              Login
            </button>
          </SignedOut>

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}
