import { NavLink } from "react-router-dom";
export default function Header() {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <NavLink to="/" className="btn btn-ghost text-xl">
          Event Scheduler
        </NavLink>
      </div>
      <div className="flex gap-8 mr-8">
        <NavLink to="/events" className="btn btn-ghost">
          event
        </NavLink>
        <NavLink
          to="/login"
          tabIndex={0}
          role="button"
          className="btn btn-ghost"
        >
          {/* <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            />
          </div> */}
          login
        </NavLink>
        <NavLink to="/register" className="btn btn-ghost">
          register
        </NavLink>
      </div>
    </div>
  );
}
