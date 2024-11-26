import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TbLogout } from "react-icons/tb";
import Cookies from "js-cookie";

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('role');
    navigate('/');
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-gray-200 text-black rounded-md md:py-2 md:px-4 px-2 hover:bg-gray-300 flex items-center"
    >
      <TbLogout />
    </button>
  );
};

export default LogoutButton;
