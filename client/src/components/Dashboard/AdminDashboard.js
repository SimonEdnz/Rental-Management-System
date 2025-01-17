import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar';


function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [branches, setBranches] = useState([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);

  useEffect(() => {
    // Fetch Users
    axios.get('/api/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));

    // Fetch Branches
    axios.get('/api/branches')
      .then(response => setBranches(response.data))
      .catch(error => console.error('Error fetching branches:', error));

    // Fetch Revenue
    axios.get('/api/revenue/summary')
      .then(response => setMonthlyRevenue(response.data.monthlyRevenue))
      .catch(error => console.error('Error fetching revenue:', error));
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar role="admin" />
      <div className="main-content container-fluid">
        <h1 className="my-4">Admin Dashboard</h1>
        <div className="row">
          {/* Summary Cards */}
          <div className="col-md-4 mb-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5>Total Users</h5>
                <p className="text-primary fs-2">{users.length}</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5>Total Branches</h5>
                <p className="text-success fs-2">{branches.length}</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5>Monthly Revenue</h5>
                <p className="text-danger fs-2">${monthlyRevenue}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Table for User Management */}
        <h3 className="my-4">User Management</h3>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button className="btn btn-warning btn-sm me-2">Edit</button>
                    <button className="btn btn-danger btn-sm">Delete</button>
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

export default AdminDashboard;
