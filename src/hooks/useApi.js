import { useEffect, useState } from "react";

import { ApiError } from "../utils/api";

// Custom hook for API calls with loading and error states
export const useApi = (apiFunction) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiFunction();
        if (mounted) {
          setData(result);
        }
      } catch (err) {
        if (mounted) {
          setError(
            err instanceof ApiError
              ? err
              : new ApiError("Unknown error", 0, err.message),
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, [apiFunction]);

  return { data, loading, error, refetch: () => setLoading(true) };
};

// Custom hook for API mutations (POST, PUT, DELETE)
export const useApiMutation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = async (apiCall) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiCall();
      return result;
    } catch (err) {
      const apiError =
        err instanceof ApiError
          ? err
          : new ApiError("Unknown error", 0, err.message);
      setError(apiError);
      throw apiError;
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, error };
};

export default useApi;
