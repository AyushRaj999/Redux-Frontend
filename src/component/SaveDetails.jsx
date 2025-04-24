import { useSelector } from "react-redux";
import axios from "axios";
import { useState, useEffect } from "react";

function Details() {
  const user = useSelector((state) => state.user);
  const [Ismodel, setismodel] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const [EditModel, seteditModel] = useState(false);
  const [Editform, seteditForm] = useState({ name: "", mobile: "", email: "" });
  const [currentId, setCurrentId] = useState();

  const fetchData = async () => {
    const res = await axios.get("http://localhost:3000/postapi/getData");
    setShowModel(true);
    setismodel(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    seteditForm({ ...Editform, [e.target.name]: e.target.value });
    console.log("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Updated Data:", Editform);
      const res = await axios.put(
        `http://localhost:3000/postapi/update/${currentId}`,
        Editform
      );
      console.log("res", res);
      // Add update API call here
      seteditModel(false); // Close modal after submit
      fetchData();
      alert("Data updated successfully")
    } catch (error) {}
  };

  const handleDelete = async(id) =>{
   try {
    const res = await axios.delete(`http://localhost:3000/postapi/delete/${id}`)
    fetchData()
    alert("Data deleted successfully?")
    
   } catch (error) {
    
   }
  }

  return (
    <>
      {/* Header Section */}
      <div className="text-center pt-5 bg-gradient-to-br from-blue-50 to-gray-100">
        <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          User Profile Details
        </h2>
        <div className="mt-4 h-1 w-24 mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
      </div>

      {showModel &&
        Ismodel.map((data, index) => (
          <div
            key={index}
            className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8"
          >
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden relative">
                <div className="absolute top-0 right-0 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-100 rounded-full blur-3xl opacity-30 translate-y-1/2 -translate-x-1/2"></div>

                <div className="relative p-8">
                  <div className="flex justify-center mb-8">
                    <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                      {data.name ? data.name[0].toUpperCase() : "?"}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 rounded-xl p-6 transform hover:scale-105 transition-transform duration-300">
                      <div className="flex items-center space-x-3">
                        <svg
                          className="w-6 h-6 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        <h3 className="text-gray-500 text-sm font-medium">
                          Name
                        </h3>
                      </div>
                      <p className="mt-2 text-xl font-semibold text-gray-800">
                        {data.name || "Not provided"}
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6 transform hover:scale-105 transition-transform duration-300">
                      <div className="flex items-center space-x-3">
                        <svg
                          className="w-6 h-6 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        <h3 className="text-gray-500 text-sm font-medium">
                          Mobile Number
                        </h3>
                      </div>
                      <p className="mt-2 text-xl font-semibold text-gray-800">
                        {data.mobile || "Not provided"}
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6 md:col-span-2 transform hover:scale-105 transition-transform duration-300">
                      <div className="flex items-center space-x-3">
                        <svg
                          className="w-6 h-6 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        <h3 className="text-gray-500 text-sm font-medium">
                          Email Address
                        </h3>
                      </div>
                      <p className="mt-2 text-xl font-semibold text-gray-800 break-all">
                        {data.email || "Not provided"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-center space-x-4">
                    <button
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transform hover:scale-105 transition-all duration-200 flex items-center space-x-2"
                      onClick={() => {
                        seteditForm({
                          name: data.name,
                          mobile: data.mobile,
                          email: data.email,
                        });
                        seteditModel(true);
                        setCurrentId(data._id);
                      }}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                      <span>Edit Profile</span>
                    </button>

                    <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transform hover:scale-105 transition-all duration-200 flex items-center space-x-2" onClick={()=>handleDelete(data._id)}>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>

                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center space-x-3 text-blue-600">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="font-medium">Account Status</h3>
                </div>
                <p className="mt-2 text-gray-600">
                  Your account is currently active and verified. You have full
                  access to all features.
                </p>
              </div>
            </div>
          </div>
        ))}

      {/* Edit Modal - outside the map */}
      {EditModel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={Editform.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile Number
                </label>
                <input
                  type="number"
                  name="mobile"
                  value={Editform.mobile}
                  onChange={handleChange}
                  placeholder="Enter your mobile number"
                  className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={Editform.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:opacity-90 transform hover:scale-[1.01] transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl"
              >
                Update
              </button>
              <button
                type="button"
                onClick={() => seteditModel(false)}
                className="w-full text-sm mt-2 text-red-600 hover:underline text-center"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Details;
