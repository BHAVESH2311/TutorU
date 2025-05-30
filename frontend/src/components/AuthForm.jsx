import { useState } from "react";

const AuthForm = ({ isLogin, onSubmit }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="container mt-4 p-4 border rounded shadow"
      style={{ maxWidth: "500px" }}
    >
      <h2 className="mb-4 text-center">
        {isLogin ? "Login" : "Sign Up"} to TutorU
      </h2>

      {!isLogin && (
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
      )}

      <div className="mb-3">
        <label className="form-label">Email address</label>
        <input
          type="email"
          name="email"
          className="form-control"
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          type="password"
          name="password"
          className="form-control"
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-4">
        <label className="form-label">Role</label>
        <select name="role" className="form-select" onChange={handleChange}>
          <option value="user">User</option>
          <option value="teacher">Teacher</option>
        </select>
      </div>

      <button type="submit" className="btn btn-primary w-100">
        {isLogin ? "Login" : "Sign Up"}
      </button>
    </form>
  );
};

export default AuthForm;
