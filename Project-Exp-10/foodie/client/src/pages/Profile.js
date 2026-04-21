import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import './Profile.css';

export default function Profile() {
  const { user, login } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    street: user?.address?.street || '',
    city: user?.address?.city || '',
    zip: user?.address?.zip || '',
    password: '',
    newPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        name: form.name,
        phone: form.phone,
        address: { street: form.street, city: form.city, zip: form.zip },
      };
      if (form.newPassword) payload.password = form.newPassword;

      const { data } = await axios.put('/api/auth/profile', payload);
      login({ ...user, name: data.name, phone: data.phone, address: data.address });
      toast.success('Profile updated!');
      setForm(f => ({ ...f, password: '', newPassword: '' }));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-page container">
      <h1>My Profile</h1>

      <div className="profile-layout">
        <div className="profile-avatar-card">
          <div className="avatar-big">{user?.name?.[0]?.toUpperCase()}</div>
          <h3>{user?.name}</h3>
          <p>{user?.email}</p>
          <span className={`role-badge ${user?.role}`}>{user?.role}</span>
        </div>

        <form className="profile-form" onSubmit={handleSubmit}>
          <section className="form-section">
            <h3>Personal Information</h3>
            <div className="form-group">
              <label>Full Name</label>
              <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" />
            </div>
            <div className="form-group">
              <label>Email (cannot change)</label>
              <input value={user?.email} disabled style={{ opacity: 0.6, cursor: 'not-allowed' }} />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input name="phone" value={form.phone} onChange={handleChange} placeholder="+1 234 567 8900" />
            </div>
          </section>

          <section className="form-section">
            <h3>Delivery Address</h3>
            <div className="form-group">
              <label>Street Address</label>
              <input name="street" value={form.street} onChange={handleChange} placeholder="123 Main St" />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input name="city" value={form.city} onChange={handleChange} placeholder="New York" />
              </div>
              <div className="form-group">
                <label>ZIP Code</label>
                <input name="zip" value={form.zip} onChange={handleChange} placeholder="10001" />
              </div>
            </div>
          </section>

          <section className="form-section">
            <h3>Change Password</h3>
            <div className="form-group">
              <label>New Password</label>
              <input type="password" name="newPassword" value={form.newPassword} onChange={handleChange} placeholder="Leave blank to keep current" />
            </div>
          </section>

          <button type="submit" className="btn btn-primary" style={{ padding: '14px 36px', fontSize: 16 }} disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
}
