import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdmissionPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedCollege, setSelectedCollege] = useState("");
  const [formData, setFormData] = useState({
    candidateName: "",
    subject: "",
    email: "",
    phone: "",
    address: "",
    dob: "",
    image: null,
    imagePreview: null,
  });

  const collegeList = [
    "Harvard University",
    "MIT",
    "Stanford University",
    "Yale University",
  ];

  useEffect(() => {
    if (!user) {
      navigate("/auth/login");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          image: file,
          imagePreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    // const userId = user._id;
    // formDataToSend.append("userId", userId);
    formDataToSend.append("collegeName", selectedCollege);
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://collage-booking-app-server.vercel.app/api/admissions",
        {
          method: "POST",
          body: formDataToSend,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(formDataToSend);

      if (response.ok) {
        alert("Admission successful!");
        navigate("/my-college");
        console.log(response.json());
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      alert("An error occurred while submitting the admission.");
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-6 min-h-[60vh]">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Select a College for Admission
      </h1>
      <div className="flex flex-wrap justify-center items-center gap-4 mb-4">
        {collegeList.map((college) => (
          <button
            key={college}
            onClick={() => setSelectedCollege(college)}
            className={`p-2 border border-gray-300 hover:bg-blue-500 hover:text-white cursor-pointer rounded ${
              selectedCollege === college ? "bg-blue-500 text-white" : ""
            }`}
          >
            {college}
          </button>
        ))}
      </div>

      {selectedCollege && (
        <>
          <h2 className="text-xl font-bold mt-12 mb-4 text-center">
            Admission Form for {selectedCollege}
          </h2>
          <form onSubmit={handleSubmit} className="grid gap-4 md:w-1/2 mx-auto">
            {/* Candidate Name */}
            <div>
              <label
                htmlFor="candidateName"
                className="block text-sm text-gray-500"
              >
                Candidate Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="candidateName"
                placeholder="Enter your name"
                value={formData.candidateName}
                onChange={handleChange}
                className="block mt-2 w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                required
              />
            </div>

            {/* Subject */}
            <div>
              <label htmlFor="subject" className="block text-sm text-gray-500">
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="subject"
                placeholder="Enter your subject"
                value={formData.subject}
                onChange={handleChange}
                className="block mt-2 w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                required
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm text-gray-500">
                  Candidate Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block mt-2 w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                  required
                />
              </div>

              {/* Phone Number */}
              <div>
                <label htmlFor="phone" className="block text-sm text-gray-500">
                  Candidate Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="block mt-2 w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                  required
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-sm text-gray-500">
                Address <span className="text-red-500">*</span>
              </label>
              <textarea
                name="address"
                placeholder="Enter your address"
                value={formData.address}
                onChange={handleChange}
                className="block mt-2 w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                required
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label htmlFor="dob" className="block text-sm text-gray-500">
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="block mt-2 w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                required
              />
            </div>

            {/* Image Upload */}
            <div>
              <label htmlFor="image" className="block text-sm text-gray-500">
                Upload Image <span className="text-red-500">*</span>
              </label>
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center w-full p-5 mx-auto mt-2 text-center bg-white border-2 border-gray-300 border-dashed cursor-pointer rounded-xl"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-8 h-8 text-gray-500 "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                  />
                </svg>

                <h2 className="mt-1 font-medium tracking-wide text-gray-700 ">
                  Upload Image
                </h2>

                <p className="mt-2 text-xs tracking-wide text-gray-500 ">
                  Upload or drag & drop your file (SVG, PNG, JPG, or GIF).
                </p>

                <input
                  id="dropzone-file"
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                  className="hidden"
                  required
                />
              </label>
              {formData.imagePreview && (
                <div className="mt-4 text-center">
                  <img
                    src={formData.imagePreview}
                    alt="Selected"
                    className="inline-block w-32 h-32 rounded-full"
                  />
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-green-500 text-white p-2 rounded mt-4"
            >
              Submit
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default AdmissionPage;
