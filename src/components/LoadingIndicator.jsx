import { useState, useEffect } from "react";

const LoadingIndicator = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return loading ? (
    <div>
      <h3>Loading...</h3>
    </div>
  ) : null;
};

export default LoadingIndicator;
