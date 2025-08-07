// import React, { useState, useEffect } from 'react';
// import axios from '.../utils/axiosInstance';
// import './Profile.css';
// import { useNavigate } from 'react-router-dom';


// export default function Profile() {
//   const navigate = useNavigate();

//   // Get logged-in user from localStorage
//   const user = JSON.parse(localStorage.getItem('user'));

//   if (!user) {
//     return <p style={{ textAlign: "center", marginTop: "40px" }}>Please sign in to view your profile.</p>;
//   }

//   const orders = [
//     {
//       id: 1,
//       name: 'BTS Lightstick',
//       color: 'Black',
//       price: 14,
//       status: 'DELIVERED',
//       date: '12/2/2025',
//       imageUrl: '/images/lightstick.png',
//     },
//     {
//       id: 2,
//       name: 'BT21 Mug',
//       color: 'White',
//       price: 10,
//       status: 'DELIVERED',
//       date: '11/18/2025',
//       imageUrl: '/images/mug.png',
//     }
//   ];

//   const handleLogout = () => {
//     const email = user.email;

//     // Remove auth info
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");

//     // Optional: Clear user's cart too
//     localStorage.removeItem(`cart-${email}`);

//     navigate("/authform"); // Redirect to sign in page
//   };

//   return (
//     <div className="profile-container">
//       <h2 className="section-title">My Profile</h2>

//       {/* User Info */}
//       <section className="user-info">
//         <img src="/default-avatar.png" alt="Profile" />
//         <div>
//           <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
//           <p><strong>Email:</strong> {user.email}</p>
//           <button className="edit-btn">Edit Profile</button>
//         </div>
//       </section>

//       {/* Order History */}
//       <h3 className="section-title">My Orders</h3>
//       {orders.map((item) => (
//         <div className="order-card" key={item.id}>
//           <div className="order-left">
//             <img src={item.imageUrl} alt={item.name} className="order-image" />
//           </div>

//           <div className="order-center">
//             <p className="product-name">{item.name}</p>
//             <p className="product-color">Color: {item.color}</p>
//             <button className="details-btn">View Order Details</button>
//           </div>

//           <div className="order-center">
//             <p className="price">${item.price}</p>
//             <button className="invoice-btn">Invoice</button>
//           </div>

//           <div className="order-right">
//             <p className="status">{item.status}</p>
//             <p className="date">{item.date}</p>
//             <p className="review-link">RATE AND REVIEW</p>
//           </div>
//         </div>
//       ))}

//       {/* Address Section */}
//       <section className="addresses">
//         <h3 className="section-title">Saved Addresses</h3>
//         <p>No addresses saved.</p>
//         <button className="add-btn">Add Address</button>
//       </section>

//       {/* Wishlist Section */}
//       <section className="wishlist">
//         <h3 className="section-title">Wishlist</h3>
//         <p>Your wishlist is empty.</p>
//       </section>

//       {/* Password Section */}
//       <section className="security">
//         <h3 className="section-title">Change Password</h3>

//         <label>Old Password</label>
//         <input type="password" placeholder="Old Password" />

//         <label>New Password</label>
//         <input type="password" placeholder="New Password" />

//         <button className="update-btn">Update Password</button>
//       </section>

//       <button className="logout-btn" onClick={handleLogout}>Logout</button>
//     </div>
//   );
// }
import React, { useState, useEffect } from 'react';
import axios from '../components/utils/axiosInstance';
import './Profile.css';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ firstName: '', lastName: '' });
  const [passwords, setPasswords] = useState({ oldPassword: '', newPassword: '' });
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({ street: '', city: '', state: '', zip: '' });

  useEffect(() => {
    fetchProfile();
    fetchOrders();
    fetchAddresses();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get('/user/profile');
      setUser(res.data);
      setFormData({ firstName: res.data.firstName, lastName: res.data.lastName });
    } catch (err) {
      console.error('Error fetching profile:', err);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get('/orders/my-orders');
      setOrders(res.data);
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };
  const fetchAddresses = async () => {
    try {
      const res = await axios.get('/user/addresses');
      setAddresses(res.data);
    } catch (err) {
      console.error("Error fetching addresses:", err);
    }
  };

  const addAddress = async () => {
    try {
      const res = await axios.post('/user/addresses', newAddress);
      setAddresses(res.data);
      setNewAddress({ street: '', city: '', state: '', zip: '' });
    } catch (err) {
      alert("❌ Failed to add address");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/authform");
  };

  const updateProfile = async () => {
    try {
      const res = await axios.put('/user/profile', formData);
      setUser(res.data);
      setEditMode(false);
      alert('✅ Profile updated');
    } catch (err) {
      alert('❌ Failed to update');
    }
  };
  const inputStyle = {
    padding: "10px",
    border: "1px solid #5E1675",
    borderRadius: "6px",
    width: "100%",
    backgroundColor: "#fff4f1",
  };


  const changePassword = async () => {
    try {
      await axios.put('/user/change-password', passwords);
      alert('✅ Password changed');
      setPasswords({ oldPassword: '', newPassword: '' });
    } catch (err) {
      alert('❌ Password change failed');
    }
  };

  // ✅ This part was misplaced inside changePassword
  if (!user) {
    return <p style={{ textAlign: "center", marginTop: "40px" }}>Loading profile...</p>;
  }

  return (
    <div className="profile-container">
      <h2 className="section-title">My Profile</h2>

      <section className="user-info">
        <img src="./idol.png" alt="Profile" />
        <div>
          {editMode ? (
            <>
              <input
                name="firstName"
                value={formData.firstName}
                placeholder="First Name"
                style={{
                  padding: "10px",
                  margin: "5px 0",
                  border: "1px solid #5e1675",
                  borderRadius: "6px",
                  width: "100%",
                  maxWidth: "300px"
                }}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
              <input
                name="lastName"
                value={formData.lastName}
                placeholder="Last Name"
                style={{
                  padding: "10px",
                  margin: "5px 0",
                  border: "1px solid #5e1675",
                  borderRadius: "6px",
                  width: "100%",
                  maxWidth: "300px"
                }}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />

              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <button
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#5E1675",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "500"
                  }}
                  onClick={updateProfile}
                >
                  Save
                </button>

                <button
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#aaa",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "500"
                  }}
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </button>
              </div>
            </>

          ) : (
            <>
              <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <button
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#5E1675",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "500",
                  marginTop: "10px"
                }}
                onClick={() => setEditMode(true)}
              >
                Edit Profile
              </button>
            </>
          )}
        </div>
      </section>

      <h3 className="section-title">My Orders</h3>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : orders.map((item) => (
        <div className="order-card" key={item._id}>
          <div className="order-left">
            <img src={item.imageUrl} alt={item.name} className="order-image" />
          </div>
          <div className="order-center">
            <p className="product-name">{item.name}</p>
            <p className="product-color">Color: {item.color}</p>
            <p className="price">${item.price}</p>
          </div>
          <div className="order-right">
            <p className="status">{item.status}</p>
            <p className="date">{item.date}</p>
          </div>
        </div>
      ))}
      <section className="addresses">
        <h3 className="section-title">Saved Addresses</h3>

        {addresses.length === 0 ? (
          <p>No addresses saved.</p>
        ) : (
          addresses.map((addr, index) => (
            <div key={index} style={{
              padding: "10px",
              border: "1px solid #5e1675",
              borderRadius: "6px",
              marginBottom: "10px",
              backgroundColor: "#fff4f1"
            }}>
              <p>{addr.street}, {addr.city}, {addr.state} - {addr.zip}</p>
            </div>
          ))
        )}

        <h4 style={{ marginTop: "20px" }}>Add New Address</h4>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: "300px", gap: "10px" }}>
          <input
            placeholder="Street"
            value={newAddress.street}
            onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
            style={inputStyle}
          />
          <input
            placeholder="City"
            value={newAddress.city}
            onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
            style={inputStyle}
          />
          <input
            placeholder="State"
            value={newAddress.state}
            onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
            style={inputStyle}
          />
          <input
            placeholder="ZIP"
            value={newAddress.zip}
            onChange={(e) => setNewAddress({ ...newAddress, zip: e.target.value })}
            style={inputStyle}
          />

          <button
            onClick={addAddress}
            style={{
              padding: "10px 16px",
              backgroundColor: "#5E1675",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "500",
              marginTop: "10px"
            }}
          >
            ➕ Add Address
          </button>
        </div>
      </section>



      <section className="security">
        <h3 className="section-title">Change Password</h3>
        <label>Old Password</label>
        <input
          type="password"
          value={passwords.oldPassword}
          onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })}
        />

        <label>New Password</label>
        <input
          type="password"
          value={passwords.newPassword}
          onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
        />

        <button style={{
              padding: "10px 16px",
              backgroundColor: "#5E1675",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "500",
              marginTop: "10px",
              width: "50%"
            }}onClick={changePassword}>Update Password</button>
      </section>

      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </div>
  );
}

