import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaRegEdit } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Logout from '../Auth/Logout'
import AddReimbursement from '../components/TambahReimbursement'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

type Reimbursement = {
  id: number
  tanggal: string
  kategori: string
  deskripsi: string | null
  jumlah: number
  status: string
  tanggal_approval: string | null
  approvalBy: {
    name: string | null
  }
  user: {
    name: string
  }
}

const ReimbursementList: React.FC = () => {
  const [reimbursements, setReimbursements] = useState<Reimbursement[]>([])
  const [, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string>('');
  const token = Cookies.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
        navigate('/');
    }
}, [navigate]);

  const formatRupiah = (angka: number): string => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
    }).format(angka);
  };

  useEffect(() => {
    const fetchReimbursements = async () => {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await axios.get('http://127.0.0.1:8000/api/reimbursement', {
          withCredentials: true,
        });
      setReimbursements(response.data.data)
      const userResponse = await axios.get('http://127.0.0.1:8000/api/user', {
        withCredentials: true,
      });
      setUser(userResponse.data);
      setRole(userResponse.data.role);
    }
    fetchReimbursements()
  }, [token])

  return (
    <div className="p-10 w-full">
      <div className='flex justify-between m-2'>
      <AddReimbursement />
      <Logout />
      </div>
      <div className="overflow-x-auto">
      <table className="bg-gray-100 w-full border-2 rounded-2xl border-separate">
        <thead>
          <tr className="w-full">
            <th className="p-4">Nama</th>
            <th className="p-4">Tanggal</th>
            <th className="p-4">Kategori</th>
            <th className="p-4">Deskripsi</th>
            <th className="p-4">Jumlah</th>
            <th className="p-4">Status</th>
            <th className="p-4">Tanggal Approval</th>
            <th className="p-4">Approval By</th>
            {role === 'admin' && (
              <th className="p-4">Action</th>
            )}
          </tr>
        </thead>
        <tbody>
          {reimbursements.map((reimbursement) => (
            <tr key={reimbursement.id} className="text-center">
              <td className="p-2">{reimbursement.user.name}</td>
              <td className="p-2">{reimbursement.tanggal}</td>
              <td className="p-2">{reimbursement.kategori}</td>
              <td className="p-2">{reimbursement.deskripsi || 'Tidak Ada Deskripsi'}</td>
              <td className="p-2">{formatRupiah(reimbursement.jumlah)}</td>
              <td className="p-2">{reimbursement.status}</td>
              <td className="p-2">{reimbursement.tanggal_approval || 'Belum Di Approve'}</td>
              <td className="p-2">{reimbursement.approvalBy?.name || "Belum Di Approve"}</td>
              <td>
                {role === 'admin' && (
                  <Link to={`/reimbursement/${reimbursement.id}`}>
                    <button className="bg-orange-500 text-white rounded-md py-2 px-4 hover:bg-orange-700">
                      <FaRegEdit />
                    </button>
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default ReimbursementList;
