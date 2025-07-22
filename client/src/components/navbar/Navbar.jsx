// import React, { useContext, useState } from "react";
// import "./navbar.scss";
// import { Link, useLocation } from "react-router-dom";
// import { AuthContext } from "../../context/AuthContext";
// import { useNotificationStore } from "../../lib/notificationStore";

// function Navbar() {
//   const [open, setOpen] = useState(false);
//   const { currentUser } = useContext(AuthContext);
//   const fetch = useNotificationStore((state) => state.fetch);
//   const number = useNotificationStore((state) => state.number);
//   const location = useLocation();

//   if (currentUser) fetch();

//   const isActive = (path) => location.pathname === path;

//   return (
//     <nav>
//       <div className="left">
//         <Link to="/" className="logo">
//           <img src="avanlogo.png" alt="logo" />
//           <span>avan props</span>
//         </Link>
//         <Link to="/" className={isActive("/") ? "active" : ""}>Home</Link>
//         <Link to="/about" className={isActive("/about") ? "active" : ""}>About Website</Link>
//         <Link to="/contact" className={isActive("/contact") ? "active" : ""}>Contact Me</Link>
//       </div>
//       <div className="right">
//         {currentUser ? (
//           <div className="user">
//             <img src={currentUser.avatar || "/noavatar.jpg"} alt="avatar" />
//             <span>{currentUser.username}</span>
//             <Link to="/profile" className="profile">
//               {number > 0 && <div className="notification">{number}</div>}
//               <span>Profile</span>
//             </Link>
//           </div>
//         ) : (
//           <>
//             <Link to="/login">Sign in</Link>
//             <Link to="/register" className="register">Sign up</Link>
//           </>
//         )}
//         <div className="menuIcon" onClick={() => setOpen((prev) => !prev)}>
//           <img src="/menu.png" alt="menu" />
//         </div>
//         <div className={open ? "menu active" : "menu"}>
//           <Link to="/">Home</Link>
//           <Link to="/about">About Website</Link>
//           <Link to="/contact">Contact Me</Link>
//           {!currentUser && (
//             <>
//               <Link to="/login">Sign in</Link>
//               <Link to="/register">Sign up</Link>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;








import React, { useContext, useState } from "react";
import "./navbar.scss";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useNotificationStore } from "../../lib/notificationStore";

function Navbar() {
  const [open, setOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const fetch = useNotificationStore((state) => state.fetch);
  const number = useNotificationStore((state) => state.number);
  const location = useLocation();

  if (currentUser) fetch();

  const isActive = (path) => location.pathname === path;

  return (
    <nav>
      <div className="wrapper">
        {/* Left: Logo + Links */}
        <div className="left">
          <Link to="/" className="logo">
            <img src="/avanlogo.png" alt="logo" />
            <span>Avan Props</span>
          </Link>
          <div className="links">
            <Link to="/" className={isActive("/") ? "active" : ""}>Home</Link>
            <Link to="/about" className={isActive("/about") ? "active" : ""}>About Website</Link>
            <Link to="/contact" className={isActive("/contact") ? "active" : ""}>Contact Me</Link>
          </div>
        </div>

        {/* Right: Auth Buttons */}
        <div className="right">
          {currentUser ? (
            <div className="user">
              <img src={currentUser.avatar || "/noavatar.jpg"} alt="avatar" />
              <span>{currentUser.username}</span>
              <Link to="/profile" className="profile">
                {number > 0 && <div className="notification">{number}</div>}
                <span>Profile</span>
              </Link>
            </div>
          ) : (
            <>
              <Link to="/login">Sign in</Link>
              <Link to="/register" className="register">Sign up</Link>
            </>
          )}
        </div>

        {/* Hamburger for mobile */}
        <div
          className={`hamburger ${open ? "active" : ""}`}
          onClick={() => setOpen(!open)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* Sidebar for mobile */}
      <div className={`sidebar ${open ? "show" : ""}`}>
        <Link to="/" onClick={() => setOpen(false)}>Home</Link>
        <Link to="/about" onClick={() => setOpen(false)}>About Website</Link>
        <Link to="/contact" onClick={() => setOpen(false)}>Contact Me</Link>
        {!currentUser ? (
          <>
            <Link to="/login" onClick={() => setOpen(false)}>Sign in</Link>
            <Link to="/register" onClick={() => setOpen(false)}>Sign up</Link>
          </>
        ) : (
          <Link to="/profile" onClick={() => setOpen(false)}>Profile</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
