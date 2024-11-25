import React from 'react';
import { Link } from 'react-router-dom';

const AddReimbursementButton: React.FC = () => {
  return (
    <Link to="/reimbursement/add">
      <button className="bg-blue-500 text-white font-bold rounded-md py-2 px-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
        + Tambah Reimbursement
      </button>
    </Link>
  );
};

export default AddReimbursementButton;
