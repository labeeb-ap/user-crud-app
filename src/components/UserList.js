import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [mode, setMode] = useState(""); // create | edit | view
  const [selectedUser, setSelectedUser] = useState({ name: "", phone: "", email: "", location: "" });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const res = await axios.get("http://localhost:5000/users");
    setUsers(res.data);
  };

  const openModal = (mode, user = null) => {
    setMode(mode);
    if (user) setSelectedUser(user);
    else setSelectedUser({ name: "", phone: "", email: "", location: "" });

    let modal = new window.bootstrap.Modal(document.getElementById("userModal"));
    modal.show();
  };

  const handleChange = (e) => {
    setSelectedUser({ ...selectedUser, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (mode === "create") {
      await axios.post("http://localhost:5000/users", selectedUser);
    } else if (mode === "edit") {
      await axios.put(`http://localhost:5000/users/${selectedUser.id}`, selectedUser);
    }
    loadUsers();
    window.bootstrap.Modal.getInstance(document.getElementById("userModal")).hide();
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:5000/users/${id}`);
    loadUsers();
  };

  return (
    <div className="container mt-4">
      <h2>CRUD - Table View</h2>
      <button
        className="btn btn-primary mb-3"
        onClick={() => openModal("create")}
      >
        Create CRUD
      </button>

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.phone}</td>
              <td>{user.email}</td>
              <td>{user.location}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => openModal("view", user)}
                >
                  View
                </button>
                <button
                  className="btn btn-success btn-sm me-2"
                  onClick={() => openModal("edit", user)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteUser(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Bootstrap Modal */}
      <div className="modal fade" id="userModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {mode === "create" && "Create User"}
                {mode === "edit" && "Edit User"}
                {mode === "view" && "View User"}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              {mode === "view" ? (
                <div>
                  <p><b>Name:</b> {selectedUser.name}</p>
                  <p><b>Phone:</b> {selectedUser.phone}</p>
                  <p><b>Email:</b> {selectedUser.email}</p>
                  <p><b>Location:</b> {selectedUser.location}</p>
                </div>
              ) : (
                <form>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={selectedUser.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      value={selectedUser.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={selectedUser.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Location</label>
                    <input
                      type="text"
                      className="form-control"
                      name="location"
                      value={selectedUser.location}
                      onChange={handleChange}
                    />
                  </div>
                </form>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              {mode !== "view" && (
                <button type="button" className="btn btn-primary" onClick={handleSave}>
                  Save
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
