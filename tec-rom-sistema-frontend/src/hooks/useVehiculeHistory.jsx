import { useState } from "react";
import axios from "axios";

export default function useVehiculeHistory() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const getVehiculeHistory = async (patente) => {
    try {
      setLoading(true);
      const query = await axios.get(
        `http://localhost:8080/historial/${patente}`
      );
      setError(false);
      return query.data;
    } catch (e) {
      setError(e.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  return { error, loading, getVehiculeHistory };
}
