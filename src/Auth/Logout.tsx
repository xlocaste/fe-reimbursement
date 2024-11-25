import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TbLogout } from "react-icons/tb";

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    
    navigate('/');
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-gray-200 text-black rounded-md py-2 px-4 hover:bg-gray-300"
    >
      <TbLogout />
    </button>
  );
};

export default LogoutButton;
