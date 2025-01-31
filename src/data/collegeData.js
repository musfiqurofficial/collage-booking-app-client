import Harvard from "../assets/Harvard University.jpg";
import Stanford from "../assets/Stanford University.jpg";
import MIT from "../assets/MIT.jpg";

const collegeData = [
  {
    id: 1,
    name: "Harvard University",
    image: Harvard,
    rating: 4.8,
    admissionDate: "Jan 1 - March 31",
    researchCount: 120,
    details: "Top research institution with a rich history.",
    events: ["Science Fair", "Annual Tech Symposium"],
    sports: ["Basketball", "Rowing", "Track and Field"],
  },
  {
    id: 2,
    name: "Stanford University",
    image: Stanford,
    rating: 4.7,
    admissionDate: "Feb 1 - May 15",
    researchCount: 90,
    details: "Renowned for innovation and tech research.",
    events: ["Innovation Week", "Startup Demo Day"],
    sports: ["Soccer", "Tennis", "Swimming"],
  },
  {
    id: 3,
    name: "MIT",
    image: MIT,
    rating: 4.9,
    admissionDate: "March 1 - June 30",
    researchCount: 150,
    details: "Leader in science and engineering education.",
    events: ["Robotics Championship", "Data Science Summit"],
    sports: ["Hockey", "Weightlifting", "Fencing"],
  },
  {
    id: 4,
    name: "Yale University",
    image: MIT,
    rating: 4.9,
    admissionDate: "April 1 - July 30",
    researchCount: 150,
    details: "Leader in science and engineering education.",
    events: ["Robotics Championship", "Data Science Summit"],
    sports: ["Hockey", "Weightlifting", "Fencing"],
  },
];

export default collegeData;
