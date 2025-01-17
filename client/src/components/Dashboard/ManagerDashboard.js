import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar';


function ManagerDashboard() {
  const [rooms, setRooms] = useState([]);
  const [branchRevenue, setBranchRevenue] = useState(0);

  useEffect(() => {
    // Fetch Rooms
    axios.get('/api/rooms')
      .then(response => setRooms(response.data))
      .catch(error => console.error('Error fetching rooms:', error));

    // Fetch Branch Revenue
    axios.get('/api/revenue/branch')
      .then(response => setBranchRevenue(response.data.branchRevenue))
      .catch(error => console.error('Error fetching branch revenue:', error));
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar role="manager" />
      <div className="main-content container-fluid">
        <h1 className="my-4">Manager Dashboard</h1>
        <div className="row">
          {/* Summary Cards */}
          <div className="col-md-6 mb-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5>Total Rooms</h5>
                <p className="text-primary fs-2">{rooms.length}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5>Branch Revenue</h5>
                <p className="text-success fs-2">${branchRevenue}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Room Management */}
        <h3 className="my-4">Room Management</h3>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th>#</th>
                <th>Room Number</th>
                <th>Capacity</th>
                <th>Partitioned</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room, index) => (
                <tr key={room.id}>
                  <td>{index + 1}</td>
                  <td>{room.room_number}</td>
                  <td>{room.capacity}</td>
                  <td>{room.is_partitioned ? 'Yes' : 'No'}</td>
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

export default ManagerDashboard;
