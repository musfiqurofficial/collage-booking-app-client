import { useEffect, useState } from "react";
import axios from "axios";
import { useAdmissions } from "../context/AdmissionContext";
import { useAuth } from "../context/AuthContext";

function MyCollegePage() {
  const { fetchReviews } = useAdmissions();
  const { user } = useAuth();
  const [review, setReview] = useState("");
  const [rating, setRating] = useState();
  const [successMessage, setSuccessMessage] = useState("");
  const [admissions, setAdmissions] = useState([]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    const newReview = {
      review,
      rating,
      collegeName: admissions[0].collegeName || "Unknown College",
      name: user?.name || "Anonymous",
    };

    try {
      await axios.post(
        "https://collage-booking-app-server.vercel.app/api/reviews",
        newReview
      );
      fetchReviews();
      setReview("");
      setRating(0);
      setSuccessMessage("Review submitted successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  useEffect(() => {
    const fetchAdmissions = async () => {
      if (!user) return;

      try {
        const response = await axios.get(
          `https://collage-booking-app-server.vercel.app/api/admissions/user/${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setAdmissions(response.data);
      } catch (error) {
        console.error("Error fetching admissions:", error);
      }
    };

    fetchAdmissions();
  }, [user]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        My College Details
      </h1>

      {/* Admission Details Section */}
      {admissions.length > 0 ? (
        admissions.map((admission, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-6 mb-8 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
              {admission.imagePath && (
                <>
                  <img
                    src={`https://collage-booking-app-server.vercel.app/${admission.imagePath}`}
                    alt="Candidate"
                    className="w-32 h-32 md:w-48 md:h-48 object-cover rounded-lg shadow-md"
                  />
                </>
              )}
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {admission.candidateName}
                </h2>
                <div className="mt-4 space-y-2 text-gray-600">
                  <p>
                    <span className="font-medium">Subject:</span>{" "}
                    {admission.subject}
                  </p>
                  <p>
                    <span className="font-medium">Email:</span>{" "}
                    {admission.email}
                  </p>
                  <p>
                    <span className="font-medium">Phone:</span>{" "}
                    {admission.phone}
                  </p>
                  <p>
                    <span className="font-medium">Address:</span>{" "}
                    {admission.address}
                  </p>
                  <p>
                    <span className="font-medium">Date of Birth:</span>{" "}
                    {new Date(admission.dob).toLocaleDateString()}
                  </p>
                  <p>
                    <span className="font-medium">College:</span>{" "}
                    {admission.collegeName}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-600">No admission data found.</p>
      )}

      {/* Add a Review Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Add a Review</h2>
        <form onSubmit={handleReviewSubmit} className="space-y-4">
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write your review here..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none "
            rows="4"
            required
          />
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            placeholder="Rating (0-5)"
            min="0"
            max="5"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none "
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors duration-300"
          >
            Submit Review
          </button>
        </form>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="mt-6 p-4 bg-green-500 text-white rounded-lg text-center">
          {successMessage}
        </div>
      )}
    </div>
  );
}

export default MyCollegePage;
