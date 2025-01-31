import { Link } from "react-router-dom";
import collegeData from "../data/collegeData";

function CollegePage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Colleges</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {collegeData.map((college) => (
          <div
            key={college.id}
            className="border border-gray-300 p-4 rounded shadow-2xs hover:shadow-xl group hover:scale-[101%] transition duration-600 ease-in-out"
          >
            <Link to={`/colleges/${college.id}`} className="cursor-pointer">
              <img
                src={college.image}
                alt={college.name}
                className="w-full rounded mb-2 h-[360px] object-cover hover:scale-105 transition duration-600 ease-in-out"
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
                <Link to={`/colleges/${college.id}`} className="cursor-pointer">
                  <button className="mt-2 bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 hover:scale-105 transition duration-600 ease-in-out cursor-pointer">
                    Details
                  </button>
                </Link>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CollegePage;
