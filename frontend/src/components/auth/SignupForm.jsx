import React, { useState } from "react";

const SignupForm = ({ onSubmit, loading }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Full name</label>
        <input
          name="name"
          value={form.name}
          onChange={change}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          name="email"
          value={form.email}
          onChange={change}
          required
          type="email"
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Phone</label>
        <input
          name="phone"
          value={form.phone}
          onChange={change}
          placeholder="+91xxxxxxxxxx"
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          name="password"
          value={form.password}
          onChange={change}
          required
          type="password"
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <button type="submit" className="btn-primary" disabled={loading}>
        {loading ? "Creating..." : "Create account"}
      </button>
    </form>
  );
};

export default SignupForm;
