import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddReimbursement: React.FC = () => {
    const [tanggal, setTanggal] = useState<string>('');
    const [kategori, setKategori] = useState<string>('');
    const [deskripsi, setDeskripsi] = useState<string>('');
    const [jumlah, setJumlah] = useState<number>();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleAddReimbursement = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
    
        try {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('You need to log in first.');
            return;
        }

        const response = await axios.post(
            'http://127.0.0.1:8000/api/reimbursement', 
            {
            tanggal,
            kategori,
            deskripsi,
            jumlah,
            },
            {headers: {Authorization: `Bearer ${token}`,},}
        );
        
        console.log('Reimbursement added successfully:', response.data);
        navigate('/reimbursement');
        } catch (err) {
        setError('Failed to add reimbursement.');
        console.error(err);
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center mb-6">Add Reimbursement</h2>
            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
            <form onSubmit={handleAddReimbursement}>
            <div className="mb-4">
                <label htmlFor="tanggal" className="block text-sm font-semibold text-gray-600">Tanggal</label>
                <input
                type="date"
                id="tanggal"
                value={tanggal}
                onChange={(e) => setTanggal(e.target.value)}
                className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="kategori" className="block text-sm font-semibold text-gray-600">Kategori</label>
                <div className='items-center rounded-md'>
                <select
                    id="kategori"
                    value={kategori}
                    onChange={(e) => setKategori(e.target.value)}
                    required
                    className='w-full p-2 bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 items-center'
                    >
                        <option value="">Pilih Kategori</option>
                        <option value="transportasi">Transportasi</option>
                        <option value="akomodasi">Akomodasi</option>
                        <option value="makan">Makan</option>
                        <option value="peralatan_kantor">Peralatan Kantor</option>
                        <option value="internet_komunikasi">Internet dan Komunikasi</option>
                        <option value="biaya_medis">Biaya Medis</option>
                        <option value="pelatihan_seminar">Pelatihan Seminar</option>
                        <option value="hiburan_klien">Hiburan Klien</option>
                        <option value="pengiriman_logistik">Pengiriman Logistik</option>
                        <option value="lain_lain">Lain-lain</option>
                </select>
                </div>
            </div>
            <div className="mb-4">
                <label htmlFor="deskripsi" className="block text-sm font-semibold text-gray-600">Deskripsi</label>
                <textarea
                id="deskripsi"
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
                className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="jumlah" className="block text-sm font-semibold text-gray-600">Jumlah</label>
                <input
                type="number"
                id="jumlah"
                value={jumlah}
                onChange={(e) => setJumlah(Number(e.target.value))}
                className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
                />
            </div>
            <button
                type="submit"
                className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                disabled={loading}
            >
                {loading ? 'Submitting...' : 'Submit'}
            </button>
            </form>
        </div>
        </div>
    );
};

export default AddReimbursement;
