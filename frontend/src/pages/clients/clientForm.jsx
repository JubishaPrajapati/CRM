import { useState, useEffect } from 'react';
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
        status: '',
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
        <div className="clientform-container">
            <h2 className="clientform-title">{id ? 'Edit Client' : 'Add Client'}</h2>
            <form className="clientform" onSubmit={handleSubmit}>
                <div className="clientform-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="clientform-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="clientform-group">
                    <label>Phone:</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="clientform-group">
                    <label>Address:</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="clientform-group">
                    <label>Status:</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className={formData.status === '' ? 'placeholder' : ''}
                    >
                        <option value="" disabled hidden>Select status</option>
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="interested">Interested</option>
                        <option value="closed">Closed</option>
                    </select>
                </div>

                <div className="clientsubmit-btn">
                    <button type="submit" >
                        {id ? 'Update Client' : 'Add Client'}
                    </button>
                </div>

            </form>
        </div>
    );
};

export default ClientForm;