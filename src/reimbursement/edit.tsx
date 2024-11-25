import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditStatus: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [status, setStatus] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getReimbursement = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
          return;
        }
        const response = await axios.get(`http://127.0.0.1:8000/api/reimbursement/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        setStatus(response.data.status);
    };
    getReimbursement();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!status) {
      setError('Status harus dipilih');
      setLoading(false);
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }

    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/reimbursement/${id}`,
        {
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        navigate('/reimbursement');
      }
    } catch (error) {
      setError('Gagal mengupdate status');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Edit Status</h2>
        <form onSubmit={handleUpdate}>
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
          <div className="mb-4">
            <label htmlFor="status" className="block text-sm font-semibold text-gray-600">Status</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="menunggu">Pilih Status</option> 
              <option value="disetujui">Setujui</option>
              <option value="ditolak">Tolak</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={loading}
          >
            {loading ? 'Memperbarui...' : 'Update Status'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditStatus;
