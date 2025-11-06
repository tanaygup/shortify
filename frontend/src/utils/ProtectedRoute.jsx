import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

axios.defaults.withCredentials = true; // crucial for cookie auth

const ProtectedRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await axios.get(
          "https://shortify-7rv5.vercel.app/api/auth/me",
          { withCredentials: true }
        );
        if (res.status === 200) setIsAuth(true);
      } catch (err) {
        console.error(err);
        setIsAuth(false);
      }
    };
    verify();
  }, []);

  if (isAuth === null) return <div>Loading...</div>;
  return isAuth ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
