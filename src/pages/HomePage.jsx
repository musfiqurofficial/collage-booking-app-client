import { useState } from "react";
import { Link } from "react-router-dom";
import { useAdmissions } from "../context/AdmissionContext";
import collegeData from "../data/collegeData";
import Carousel from "../components/Carousel";

function HomePage() {
  const { reviews } = useAdmissions();
  const [searchQuery, setSearchQuery] = useState("");

  // Filter colleges based on the search query
  const filteredColleges = collegeData.filter((college) =>
    college.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-row-reverse justify-between items-center">

      {/* Search Section */}
      <section className="my-6">
        <label htmlFor="search">Search colleges: </label>
        <input
          type="text"
          placeholder="Search for a college"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 p-2 rounded w-[350px] focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
      </section>

      {/* College Cards Section */}
      <h3 className="text-2xl font-bold mb-4">Top Colleges</h3>
      </div>
      {filteredColleges.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {filteredColleges.map((college) => (
            <div
              key={college.id}
              className="border border-gray-300 p-4 rounded shadow-2xs hover:shadow-xl group hover:scale-[101%] transition duration-600 ease-in-out"
            >
              <Link to={`/colleges/${college.id}`} className="cursor-pointer">
                <img
                  src={college.image}
                  alt={college.name}
                  className="w-full rounded mb-2 h-full max-h-[220px] object-cover hover:scale-105 transition duration-600 ease-in-out"
                />
                <div className="flex justify-between items-center">
                  <h2 className="text-[22px] font-semibold my-1">
                    {college.name}
                  </h2>
                  <p className="text-[14px]">Rating: {college.rating} ⭐</p>
                </div>
                <p>Admission Dates: {college.admissionDate}</p>
                <div className="flex justify-between items-center ">
                  <p>Research Publications: {college.researchCount}</p>
                  <Link
                    to={`/colleges/${college.id}`}
                    className="cursor-pointer"
                  >
                    <button className="mt-2 bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 hover:scale-105 transition duration-600 ease-in-out cursor-pointer">
                      Details
                    </button>
                  </Link>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No colleges found.</p>
      )}

      {/* College Image Gallery */}
      <section className="my-6">
        <h2 className="text-2xl font-bold">College Image Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {filteredColleges.map((data) => (
            <Link
              key={data.id}
              to={`/colleges/${data.id}`}
              className="cursor-pointer"
            >
              <img
                src={data.image}
                alt={data.name}
                className="rounded shadow-md w-full h-[350px] object-cover hover:scale-[101%] transition duration-500 ease-in-out"
              />
            </Link>
          ))}
        </div>
      </section>

      {/* Research Papers Section */}
      <section className="my-6">
        <h2 className="text-2xl font-bold">Recommended Research Papers</h2>
        <ul className="list-disc pl-6 mt-2">
          <li>
            <a href="#" className="text-indigo-500">
              AI in Healthcare
            </a>
          </li>
          <li>
            <a href="#" className="text-indigo-500">
              Sustainable Energy Research
            </a>
          </li>
          <li>
            <a href="#" className="text-indigo-500">
              Blockchain Security
            </a>
          </li>
        </ul>
      </section>

      {/* Review Section */}
      <section className="my-6">
        <h2 className="text-2xl font-bold text-center">User Reviews</h2>
        {reviews.length > 0 ? (
          <>
            <Carousel reviews={reviews} />
          </>
        ) : (
          <p className="text-sm text-center">No Reviews Found</p>
        )}
      </section>
    </div>
  );
}

export default HomePage;