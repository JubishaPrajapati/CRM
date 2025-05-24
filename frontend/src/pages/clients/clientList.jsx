import { useState, useEffect } from 'react';
import { getAllClients, deleteClient } from '../../services/clientService';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { exportToExcel } from '../../utils/exportToExcel';
import './clientList.css';

const ClientList = () => {
    const [clients, setClients] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const fetchClients = async () => {
        try {
            const data = await getAllClients();
            setClients(data);
        } catch (error) {
            console.error('Error fetching all clients', error);
        }
    }

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this client?')) {
            try {
                await deleteClient(id);
                fetchClients();
            } catch (error) {
                console.error('Error deleting client:', error);
            }
        }
    }

    useEffect(() => {
        fetchClients();
    }, []);

    return (
        <div className='client-container'>
            <h2 className='client-header'>Clients</h2>
            <div className='btn-and-search'>
                <div className="btn-group">
                    <button onClick={() => navigate('/clients/new')}>
                        Add Client
                    </button>
                    <button onClick={() => {
                        const filteredClients = clients.map(client => ({
                            Name: client.name,
                            Email: client.email,
                            Phone: client.phone,
                            Address: client.address,
                            Status: client.status,
                        }));
                        exportToExcel(filteredClients, 'Client_List');
                    }}>
                        Export to Excel
                    </button>
                </div>
                <div className="search-container">
                    <input
                        type='text'
                        placeholder='Search by client name'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className='search-input'
                    />
                    <FaSearch className="search-icon" />
                </div>
            </div>
            <table className='client-table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.filter(client =>
                        client.name.toLowerCase().includes(searchTerm.toLowerCase())
                    ).map((client => (
                        <tr key={client._id}>
                            <td>{client.name}</td>
                            <td>{client.email}</td>
                            <td>{client.phone}</td>
                            <td>{client.address}</td>
                            <td>{client.status}</td>
                            <td className='clientaction-btns'>
                                <button onClick={() => navigate(`/clients/${client._id}`)} className="clientview-btn">View Details</button>
                                <button onClick={() => navigate(`/clients/edit/${client._id}`)} className="clientedit-btn">Edit</button>
                                <button onClick={() => handleDelete(client._id)} className="clientdelete-btn">Delete</button>
                            </td>
                        </tr>
                    )))}
                    {clients.length === 0 && (
                        <tr>
                            <td colSpan="6" className='no-data'>No clients found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
export default ClientList;