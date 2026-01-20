import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../hooks/useAuth";

const Login = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(form.password, form.username);
    if (!form.username || !form.password) {
      setError("email dan password wajib di isi");
      return;
    }

    if (form.password.length < 6) {
      setError("password minimal 6 karakter");
      return;
    }
    const success = login(form.username, form.password);
    if (!success) {
      setError("email atau password salah");
      return;
    }
    navigate("/dashboard");
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 gap-4">
      <h1 className="text-2xl text-center font-bold max-w-50">
        Login Ke Akun Anda
      </h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-lg px-5 py-8 flex flex-col gap-6 scale-100 shadow-md"
      >
        <div className="">
          <label htmlFor="" className="block text-lg font-medium ">
            Username
          </label>
          <input
            name="username"
            onChange={handleOnChange}
            value={form.username}
            type="text"
            className="w-full rounded-lg border px-4 py-3"
            placeholder="example : example@gmail.com"
          />
        </div>
        <div>
          <label htmlFor="" className="block text-lg font-medium ">
            Password
          </label>
          <input
            onChange={handleOnChange}
            name="password"
            value={form.password}
            placeholder="example : password123"
            type="password"
            className="w-full rounded-lg border px-4 py-3"
          />
          <p className="text-[0.8rem] text-red-500">{error}</p>
        </div>
        <div className="flex gap-2 items-center">
          <input type="checkbox" name="" id="" />

          <p>Remember Me</p>
        </div>
        <button
          type="submit"
          className="bg-[#0753b9] text-white py-3 rounded-lg hover:bg-blue-800 active:bg-blue-800 focus:to-blue-800 transition-colors duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
