import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar';


function TenantDashboard() {
  const [profile, setProfile] = useState({});
  const [bills, setBills] = useState([]);

  useEffect(() => {
    // Fetch Tenant Profile
    axios.get('/api/tenants/profile')
      .then(response => setProfile(response.data))
      .catch(error => console.error('Error fetching profile:', error));

    // Fetch Bills
    axios.get('/api/bills')
      .then(response => setBills(response.data))
      .catch(error => console.error('Error fetching bills:', error));
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar role="tenant" />
      <div className="main-content container-fluid">
        <h1 className="my-4">Tenant Dashboard</h1>

        {/* Personal Information */}
        <h3 className="mb-4">My Profile</h3>
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Room:</strong> {profile.room}</p>
            <p><strong>Branch:</strong> {profile.branch}</p>
          </div>
        </div>

        {/* Bills Section */}
        <h3 className="mb-4">My Bills</h3>
        <div className="table-responsive">
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
        </div>
      </div>
    </div>
  );
}

export default TenantDashboard;
