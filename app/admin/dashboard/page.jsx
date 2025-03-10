'use client';
import React, { useState, useEffect } from "react";
import {
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaHome,
  FaHeading,
  FaTools,
  FaBlog,
  FaProjectDiagram,
  FaAlignJustify,
  FaEnvelope,
} from "react-icons/fa";
import { TbLayoutNavbarInactive } from "react-icons/tb";
import { IoCodeWorking } from "react-icons/io5";
import { BsCardHeading } from "react-icons/bs";
import { MdContactMail, MdOutlineBorderBottom } from "react-icons/md";
import { MdDataSaverOff } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { GoProjectSymlink } from "react-icons/go";
import { FaLaptopFile } from "react-icons/fa6";
import { AiOutlineWechatWork } from "react-icons/ai";
import { GrContact } from "react-icons/gr";
import { FcCollaboration } from "react-icons/fc";
import { useRouter } from "next/navigation";

import NavbarPage from "../NavbarPage";
import HeroAndAbout from "../HeroAndAbout";
import Services from "../Services";
import WordMethod from "../WordMethod";
import ProjectsHeader from "../ProjectsHeader";
import ProjectLists from "./ProjectLists";
import Footer from "./Footer";
import ContactSection from "../ContactSection";
import Requests from "./Requests";
import MetaData from "../MetaData";
import SMTPSetup from "../SMTPSettings";
import Workingwith from "../Workingwith";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState("Welcome");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const router = useRouter();

  // Check authentication on component mount
  useEffect(() => {
    const token = localStorage.getItem("token"); // Check for token in localStorage
    if (!token) {
      setIsLoggedIn(false); // User is not logged in
    } else {
      setIsLoggedIn(true); // User is logged in
    }
  }, []);

  const handleLogout = () => {
    // Remove token or session data
    localStorage.removeItem("token"); // Example: Clearing authentication token
    sessionStorage.removeItem("user");

    // Redirect to login page
    router.push("/admin/login"); // Change according to your route
  };

  // Menu items with icons
  const menuItems = [
    { name: "Navbar", icon: <TbLayoutNavbarInactive /> },
    { name: "Hero & About", icon: <FaHeading /> },
    { name: "My Services", icon: <FaLaptopFile /> },
    { name: "Work Method", icon: <AiOutlineWechatWork /> },
    { name: "Project Section", icon: <BsCardHeading /> },
    { name: "Projects", icon: <GoProjectSymlink /> },
    { name: "Footer", icon: <MdOutlineBorderBottom /> },
    { name: "Certified", icon: <FcCollaboration /> },
        { name: "Contact", icon: <MdContactMail /> },
    { name: "Requests", icon: <GrContact /> },
    { name: "SEO", icon: <MdDataSaverOff /> },
    { name: "SMTP Setup", icon: <IoMdSettings /> },
  ];

  // Content for each menu item
  const pageContent = {
    Navbar: <NavbarPage />,
    "Hero & About": <HeroAndAbout />,
    "My Services": <Services />,
    "Work Method": <WordMethod />,
    "Project Section": <ProjectsHeader />,
    Contact: <ContactSection />,
    Projects: <ProjectLists />,
    Footer: <Footer />,
    Certified: <Workingwith />,
        Requests: <Requests />,
    SEO: <MetaData />,
    "SMTP Setup": <SMTPSetup />,
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar (Drawer) */}
      {isLoggedIn && (
        <div
          className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white transition-transform transform ${
            isOpen ? "translate-x-0" : "-translate-x-64"
          } md:relative md:translate-x-0 z-50`}
        >
          <div className="p-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold">Dashboard</h2>
            <button className="md:hidden" onClick={() => setIsOpen(false)}>
              <FaTimes size={20} />
            </button>
          </div>
          <nav className="mt-4">
            <ul>
              {menuItems.map((item) => (
                <li
                  key={item.name}
                  className={`flex items-center gap-3 p-3 cursor-pointer ${
                    selectedPage === item.name
                      ? "bg-blue-600 font-bold"
                      : "hover:bg-gray-700"
                  }`}
                  onClick={() => {
                    setSelectedPage(item.name);
                    setIsOpen(false);
                  }}
                >
                  {item.icon} {item.name}
                </li>
              ))}
              <li
                className="flex items-center gap-3 p-3 hover:bg-red-600 text-white cursor-pointer transition-all duration-300"
                onClick={handleLogout}
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </li>
            </ul>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        {isLoggedIn && (
          <header className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
            <button
              className="md:hidden text-white"
              onClick={() => setIsOpen(true)}
            >
              <FaBars size={20} />
            </button>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <div className="flex items-center gap-4">
              <img
                src="https://icons.veryicon.com/png/o/miscellaneous/user-avatar/user-avatar-male-5.png"
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
              <h1>Admin</h1>
            </div>
          </header>
        )}

        {/* Show "You are not logged in" message if not authenticated */}
        {!isLoggedIn && (
          <div className="flex-1 flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                You are not logged in.
              </h1>
              <p className="text-gray-600">
                Please <a href="/admin/login" className="text-blue-500">login</a> to access the dashboard.
              </p>
            </div>
          </div>
        )}

        {/* Show dashboard content if authenticated */}
        {isLoggedIn && (
          <>
            {/* Welcome Message */}
            {selectedPage === "Welcome" && (
              <div className="flex-1 flex items-center justify-center bg-gray-100">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-800 mb-4">
                    Welcome to Dashboard
                  </h1>
                  <p className="text-gray-600">
                    Select a section from the sidebar to get started.
                  </p>
                </div>
              </div>
            )}

            {/* Dynamic Content Rendering */}
            {selectedPage !== "Welcome" && (
              <main className="flex-1 p-6 overflow-y-auto bg-gray-100">
                {pageContent[selectedPage]}
              </main>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;