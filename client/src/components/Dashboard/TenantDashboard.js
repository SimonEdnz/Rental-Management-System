import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TenantSidebar from '../TenantSidebar';  // Use TenantSidebar instead of AdminSidebar
import './TenantDashboard.css';

function TenantDashboard() {
  const [profile, setProfile] = useState({});
  const [bills, setBills] = useState([]);
  const [menuItems, setMenuItems] = useState([]);  // Add state for sidebar menu
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingBills, setLoadingBills] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch Tenant Profile
    axios.get('/api/tenants/profile')
      .then(response => {
        setProfile(response.data);
        setLoadingProfile(false);
      })
      .catch(error => {
        setError('Error fetching profile');
        setLoadingProfile(false);
      });

    // Fetch Bills
    axios.get('/api/bills')
      .then(response => {
        setBills(response.data);
        setLoadingBills(false);
      })
      .catch(error => {
        setError('Error fetching bills');
        setLoadingBills(false);
      });

    // Example: Fetch sidebar menu items (if needed)
    axios.get('/api/tenant/menu')
      .then(response => {
        setMenuItems(response.data);
      })
      .catch(error => {
        console.log('Error fetching menu items', error);
      });
  }, []);

  return (
    <div className="dashboard-container">
      <TenantSidebar menuItems={menuItems} />  {/* Pass menuItems to TenantSidebar */}
      <div className="main-content container-fluid">
        <h1 className="my-4">Tenant Dashboard</h1>

        {/* Error Message */}
        {error && <div className="alert alert-danger">{error}</div>}

        {/* Personal Information */}
        <h3 className="mb-4">My Profile</h3>
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            {loadingProfile ? (
              <p>Loading profile...</p>
            ) : (
              <>
                <p><strong>Name:</strong> {profile.name}</p>
                <p><strong>Email:</strong> {profile.email}</p>
                <p><strong>Room:</strong> {profile.room}</p>
                <p><strong>Branch:</strong> {profile.branch}</p>
              </>
            )}
          </div>
        </div>

        {/* Bills Section */}
        <h3 className="mb-4">My Bills</h3>
        <div className="table-responsive">
          {loadingBills ? (
            <p>Loading bills...</p>
          ) : (
            <table className="table table-striped">
              <thead className="thead-dark">
                <tr>
                  <th>#</th>
                  <th>Bill ID</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Due Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bills.map((bill, index) => (
                  <tr key={bill.id}>
                    <td>{index + 1}</td>
                    <td>{bill.id}</td>
                    <td>${bill.amount}</td>
                    <td>{bill.status}</td>
                    <td>{bill.due_date}</td>
                    <td>
                      <button className="btn btn-info btn-sm">View Invoice</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default TenantDashboard;
