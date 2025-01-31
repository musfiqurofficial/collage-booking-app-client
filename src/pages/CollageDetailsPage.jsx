import { useParams, Link } from "react-router-dom";
import collegeData from "../data/collegeData";

function CollegeDetailsPage() {
  const { id } = useParams();
  const college = collegeData.find((college) => college.id === parseInt(id));

  if (!college) {
    return <p className="p-4">College not found.</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <Link to="/colleges" className="text-blue-500 mb-4 block">
        &larr; Back to Colleges
      </Link>
      <div className="grid grid-cols-2 gap-10">
        <img
          src={college.image}
          alt={college.name}
          className="w-full object-cover rounded mb-4 h-[500px]"
        />
        <div>
          <h1 className="text-3xl font-bold mb-4">{college.name}</h1>
          <p>{college.details}</p>
          <p>Rating: {college.rating} ⭐</p>
          <p>Admission Dates: {college.admissionDate}</p>
          <p>Research Publications: {college.researchCount}</p>
          <h2 className="text-2xl font-bold mt-4">Events</h2>
          <ul className="list-disc list-inside">
            {college.events.map((event, index) => (
              <li key={index}>{event}</li>
            ))}
          </ul>
          <h2 className="text-2xl font-bold mt-4">Sports Facilities</h2>
          <ul className="list-disc list-inside">
            {college.sports.map((sport, index) => (
              <li key={index}>{sport}</li>
            ))}
          </ul>
          <Link to={`/admission`}>
            <button className="mt-10 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer">Go to admission page</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CollegeDetailsPage;
