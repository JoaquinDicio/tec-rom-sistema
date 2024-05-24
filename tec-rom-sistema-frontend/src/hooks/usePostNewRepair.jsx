import { useState } from "react";
import axios from "axios";

export default function usePostNewRepair() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function postNewRepair(newRepair) {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("http://localhost:8080/reparaciones", [
        newRepair,
      ]);
      if (response.status >= 200 && response.status < 300) {
        setSuccess(true);
        return response.data;
      }
    } catch (e) {
      setError(e.response.data.error);
    } finally {
      setLoading(false);
    }
  }
  return { loading, error, postNewRepair, success };
}
