import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="border-b border-slate-200 bg-white px-4 py-4 md:px-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-slate-500">Welcome back</p>
          <h2 className="text-2xl font-bold text-slate-900">
            {user?.name || "User"}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden rounded-2xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 md:block">
            Personal Workspace
          </div>

          <button
            onClick={handleLogout}
            className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}