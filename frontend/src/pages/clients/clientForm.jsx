import React, { useState, useEffect } from 'react';
import { createClient, updateClient, getClientById } from '../../services/clientService';
import { useNavigate, useParams } from 'react-router-dom';
import './clientForm.css';

const ClientForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        status: 'new',
    });

    useEffect(() => {
        if (id) {
            const fetchClient = async () => {
                try {
                    const data = await getClientById(id);
                    setFormData(data);
                } catch (error) {
                    console.error('Error fetching client:', error);
                }
            };
            fetchClient();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await updateClient(id, formData);
            } else {
                await createClient(formData);
            }
            navigate('/clients')
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    }
    return (
        <form className='client-form' onSubmit={handleSubmit}>
            <h3>{id ? 'Edit Client' : 'Add Client'}</h3>
            <div className='form-group'>
                <label>Name:</label>
                <input name="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className='form-group'>
                <label>Email:</label>
                <input name="email" value={formData.email} onChange={handleChange} />
            </div>

            <div className="form-group">
                <label>Phone:</label>
                <input name="phone" value={formData.phone} onChange={handleChange} />
            </div>

            <div className="form-group">
                <label>Address:</label>
                <input name="address" value={formData.address} onChange={handleChange} />
            </div>

            <div className='form-group'>
                <label>Status:</label>
                <select name='status' value={formData.status} onChange={handleChange}>
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="contacted">Interested</option>
                    <option value="contacted">Closed</option>\
                </select>
            </div>

            <button type='submit' className='submit-btn'>
                {id ? 'Update' : 'Add'}
            </button>
        </form>
    )
}
export default ClientForm;