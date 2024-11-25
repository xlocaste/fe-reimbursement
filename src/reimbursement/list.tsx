import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaRegEdit } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Logout from '../Auth/Logout'
import AddReimbursement from '../components/TambahReimbursement'

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
  const [role, setRole] = useState<string>('');

  useEffect(() => {
    const fetchReimbursements = async () => {
      const token = localStorage.getItem('token');
        if (!token) {
          return
        }
        const response = await axios.get('http://127.0.0.1:8000/api/reimbursement', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setRole(response.data.role)
      setReimbursements(response.data.data)
    }
    fetchReimbursements()
  }, [])

  return (
    <div className="p-10 w-full">
      <div className='flex justify-between m-2'>
      <AddReimbursement />
      <Logout />
      </div>
      <table className="bg-gray-100 w-full border-2 rounded-2xl border-separate">
        <thead>
          <tr>
            <th className="p-4">Nama</th>
            <th>Tanggal</th>
            <th>Kategori</th>
            <th>Deskripsi</th>
            <th>Jumlah</th>
            <th>Status</th>
            <th>Tanggal Approval</th>
            <th>Approval By</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {reimbursements.map((reimbursement) => (
            <tr key={reimbursement.id} className="text-center">
              <td className="p-2">{reimbursement.user.name}</td>
              <td className="p-2">{reimbursement.tanggal}</td>
              <td className="p-2">{reimbursement.kategori}</td>
              <td className="p-2">{reimbursement.deskripsi || 'Tidak Ada Deskripsi'}</td>
              <td className="p-2">{reimbursement.jumlah}</td>
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
  );
};

export default ReimbursementList;
