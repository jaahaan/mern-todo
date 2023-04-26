import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };
  return (
    <nav className="navbar justify-content-between">
      <Link to="/" className="navbar-brand">
       What 2Do!!
      </Link>
      {user && (
        <div className="item">
          {/* <span>{user.user.email}</span> */}
          <button onClick={handleClick}>LOGOUT</button>
        </div>
      )}
      {!user && (
        <div className="item">
          <Link to="/login">Login</Link>
          <Link to="/register">Signup</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
