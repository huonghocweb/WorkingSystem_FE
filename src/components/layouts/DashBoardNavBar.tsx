'use client'

import { showWToast } from "@/src/utils/notification";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation"

export default function DashBoardNavBar() {  
  const router = useRouter();
  const handleLogout = async() => {
    console.log('logouthandle')
      const response = await axios.post("/api/auth/logout");
      console.log('response  lougout:' , response);
      if(response){
        router.push('/');
        router.refresh();
      }else  { 
        showWToast("error", "logout failed");
      }
  }
    return (
        <>
             {/* Top Navigation */}
        <nav className="top-nav">
          <div className="nav-container">
            <div className="nav-left">
              <a href="/dashboard" className="logo">
                <div className="logo-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </div>
                DayNight
              </a>
              <div className="nav-menu">
                <div className="nav-item">
                  <a href="/dashboard" className="nav-link active">
                   <i className="fa-solid fa-table"></i>
                    Dashboard
                  </a>
                </div>
                <div className="nav-item">
                  <a href="/projects" className="nav-link">
                    <i className="fa-solid fa-folder"></i>
                    Projects
                  </a>
                </div>
                <div className="nav-item">
                  <a href="/users" className="nav-link">
                    <i className="fa-solid fa-envelope"></i>
                    Inbox
                  </a>
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
              <button className="user-menu">
                <div className="user-avatar">A</div>
                <span className="user-name">Alex</span>
              </button>
              <button onClick={()=> handleLogout()} className="btn-logout" title="Logout">
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
    )
}