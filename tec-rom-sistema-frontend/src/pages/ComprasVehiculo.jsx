import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import TableCompras from "../components/TableCompras";
import axios from "axios";
import { formatNumberWithCommas } from "../utils";

export default function ComprasVehiculo() {
  const { vehiculo_id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [listaCompras, setListaCompras] = useState([]);

  useEffect(() => {
    async function getVehiculeCompras() {
      setLoading(true);
      try {
        const query = await axios.get(
          `http://localhost:8080/compras/vehiculo/${vehiculo_id}`
        );
        if (query.status == 200) setListaCompras(query.data);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    }
    getVehiculeCompras();
  }, []);

  return (
    <section className="min-h-screen bg-gray-100 py-12 px-20">
      <div>
        <p className="text-3xl mt-5 font-bold">
          {listaCompras.length > 0 && listaCompras[0].asociado}
        </p>
      </div>
      <div className="flex flex-col mt-5">
        {loading ? (
          <p className="text-xl mt-5">Cargando compras...</p>
        ) : (
          <TableCompras itemsList={listaCompras} />
        )}
        {error && (
          <p className="text-xl mt-5 text-red-500 italic">
            No se encontraron las compras solicitadas o no existen
          </p>
        )}
      </div>
    </section>
  );
}
