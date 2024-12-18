import { useState, useEffect } from "react";
import axios from "axios";

const useUserAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAuthUser = async () => {
      try {
        const response = await axios.get(
          "https://backend-production-63cd.up.railway.app/auth/check",
          {
            withCredentials: true,
          }
        );

        setUser(response?.data?.user);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.msg || "Failed to authenticate");
        setUser(null);
        setLoading(false);
      }
    };

    fetchAuthUser();
  }, []);

  return { user, setUser, loading, error };
};

export default useUserAuth;
