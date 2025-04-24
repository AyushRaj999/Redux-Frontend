import { useState } from "react";
import { useDispatch } from "react-redux";
// import { setUserDetails } from './reduxStore/slice/user/userSlice.jsx';
import { setUserDetails } from "../reduxStore/slice/user/userSlice.jsx";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

function App() {
  const [formData, setFormData] = useState({ name: "", mobile: "", email: "" });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.mobile.trim()) newErrors.mobile = "Mobile number is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    return newErrors;
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await axios.post("https://redux-backend-vmxx.onrender.com/postapi/postData",formData);
  //     setFormData(res)
  //     const newErrors = validateForm();
  //     if (Object.keys(newErrors).length === 0) {
  //       dispatch(setUserDetails(formData));
  //       navigate("/details");
  //     } else {
  //       setErrors(newErrors);
  //     }
  //   } catch (error) {}
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      try {
        const res = await axios.post("https://redux-backend-vmxx.onrender.com/postapi/postData", formData);
        dispatch(setUserDetails(formData)); // or res.data if you're returning user data
        navigate("/details");
        // Optionally reset form
        setFormData({ name: "", mobile: "", email: "" });
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    } else {
      setErrors(newErrors);
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 pointer-events-none"></div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-100 rounded-full blur-3xl opacity-30"></div>

        <div className="relative">
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            User Registration
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mobile Number
              </label>
              <input
                type="number"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter your mobile number"
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.mobile ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200`}
              />
              {errors.mobile && (
                <p className="mt-1 text-sm text-red-500">{errors.mobile}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:opacity-90 transform hover:scale-[1.01] transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl"
            >
              Register
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            By registering, you agree to our{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
