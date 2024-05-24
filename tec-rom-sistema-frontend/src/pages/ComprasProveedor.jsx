import { useFetcher, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import TableCompras from "../components/TableCompras";
import axios from "axios";
import { formatNumberWithCommas } from "../utils";

export default function ComprasProveedor() {
  const { proveedor_id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [listaCompras, setListaCompras] = useState([]);
  const [deuda, setDeuda] = useState(0);
  useEffect(() => {
    async function getProveedorInfo() {
      setLoading(true);
      try {
        const query = await axios.get(
          `http://localhost:8080/compras/${proveedor_id}`
        );
        if (query.status == 200) setListaCompras(query.data);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    }
    getProveedorInfo();
  }, []);

  function calcularDeuda(listaCompras) {
    if (listaCompras) {
      let deudaAcc = listaCompras.reduce(
        (acc, current) => acc + current.balance,
        0
      );
      setDeuda(deudaAcc);
    }
  }

  useEffect(() => {
    calcularDeuda(listaCompras);
  }, [listaCompras]);

  return (
    <section className="min-h-screen bg-gray-100 py-12 px-20">
      <div>
        <p className="text-3xl mt-5 font-bold">
          {listaCompras.length > 0 && listaCompras[0].nombre_proveedor}
        </p>
        {
          <div className="bg-white shadow-sm p-5 rounded-sm m-2 w-fit flex-col flex">
            <p className="text-2xl font-medium">
              {formatNumberWithCommas(deuda)}
            </p>
            <p className="text-center text-sm font-medium">Deuda total</p>
          </div>
        }
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
