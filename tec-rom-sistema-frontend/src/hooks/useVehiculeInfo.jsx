import { useState } from "react";
import axios from "axios";

export default function useVehiculeInfo() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const getVehiculeInfo = async (patente) => {
    try {
      setLoading(true);
      const query = await axios.get(
        `http://localhost:8080/vehiculos/${patente}`
      );
      setError(false);
      return query.data;
    } catch (e) {
      setError(e.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  return { error, loading, getVehiculeInfo };
}
