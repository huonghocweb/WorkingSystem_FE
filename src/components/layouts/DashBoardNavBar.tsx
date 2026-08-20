"use client";

import { useUserStore } from "@/src/store/userStore";
import { showToast } from "@/src/utils/notification";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DashBoardNavBar() {
  const router = useRouter();
  const handleLogout = async () => {
    const response = await axios.post("/api/auth/logout");
    if (response) {
      router.push("/");
      router.refresh();
    } else {
      showToast("error", "logout failed");
    }
  };
  const user = useUserStore((state) => state.user);
  //  console.log(user);
  return (
    <>
      {/* Top Navigation */}
      <nav className="top-nav">
        <div className="nav-container">
          <div className="nav-left">
            <Link href={`/dashboard/workspaces/${user?.userId}`} className="logo">
              <div className="logo-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              DayNight
            </Link>
            <div className="nav-menu">
              <div className="nav-item">
                <Link href={`/dashboard/workspaces/${user?.userId}`} className="nav-link active">
                  <i className="fa-solid fa-table"></i>
                  Dashboard
                </Link>
              </div>
              <div className="nav-item">
                <Link href={"/workspaces"} className="nav-link">
                  <i className="fa-solid fa-folder"></i>
                  WorkSpaces
                </Link>
              </div>
              <div className="nav-item">
                <Link href="/users" className="nav-link">
                  <i className="fa-solid fa-envelope"></i>
                  Inbox
                </Link>
              </div>
              <div className="nav-item">
                <Link href="/users" className="nav-link">
                  <i className="fa-solid fa-users-gear"></i>
                  Users
                </Link>
              </div>
              <div className="nav-item">
                <a href="settings.html" className="nav-link">
                  <i className="fa-solid fa-gear"></i>
                  Settings
                </a>
              </div>
            </div>
          </div>
          <div className="nav-right">
            <div className="theme-toggle">
              <button className="theme-btn theme-btn-snow active" title="Snow Edition">
                <i className="fa-solid fa-sun"></i>
              </button>
              <button className="theme-btn theme-btn-carbon" title="Carbon Edition">
                <i className="fa-solid fa-moon"></i>
              </button>
            </div>
            <button
              className="d-flex align-items-center border border-light-subtle bg-white p-2 rounded shadow-sm text-start"
              style={{
                height: "60px",
                width: "200px",
              }}
            >
              <div
                className="d-flex align-items-center justify-content-center fw-bold text-white bg-primary rounded-circle me-2"
                style={{ width: "38px", height: "38px", minWidth: "38px", fontSize: "15px" }}
              >
                {user?.username ? user.username.charAt(0).toUpperCase() : "?"}
              </div>

              {/* Khối chữ Tên + Role */}
              <div className="d-flex flex-column me-2">
                <span className="fw-bold text-dark text-truncate" style={{ fontSize: "15px" }}>
                  {user?.username || "Guest"}
                </span>
                <span className="text-muted" style={{ fontSize: "11px" }}>
                  {user?.authorities && user.authorities.length > 0
                    ? user.authorities.map((au) => au.authority.replace("ROLE_", "")).join(", ")
                    : ""}
                </span>
              </div>
            </button>
            <button onClick={() => handleLogout()} className="btn-logout" title="Logout">
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
            </button>
            {/* <button className="mobile-menu-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button> */}
          </div>
        </div>
      </nav>
    </>
  );
}
