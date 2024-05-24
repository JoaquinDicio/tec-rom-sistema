import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import VehiculeInfo from "../components/VehiculeInfo";
import useVehiculeHistory from "../hooks/useVehiculeHistory";
import Reparacion from "../components/Reparacion";
import ModalAddRepair from "../components/ModalAddRepairModal";

export default function History() {
  const { patente } = useParams();
  const [vehiculo, setVehiculo] = useState();
  const [modalAddRepair, setModalAddRepair] = useState(null);
  const { getVehiculeHistory, loading, error } = useVehiculeHistory();

  useEffect(() => {
    async function getHistory() {
      const query = await getVehiculeHistory(patente.toUpperCase());
      if (query) setVehiculo(query);
    }
    if (patente) {
      getHistory();
    }
  }, []);

  return (
    <>
      <section className="min-h-screen bg-gray-100 py-12 px-20">
        <Link
          className="text-sm text-blue-500 hover:font-medium duration-[.5]"
          to={"/"}
        >
          Volver al inicio
        </Link>
        <h2 className="text-3xl">Historial</h2>
        <div className="mt-10">
          {loading && (
            <p className="text-xl">Estamos buscando el vehiculo...</p>
          )}
          {vehiculo?.patente && (
            <VehiculeInfo
              selectedVehiculo={{
                patente: vehiculo.patente,
                modelo: vehiculo.modelo,
                marca: vehiculo.marca,
                telefono: vehiculo.telefono,
                email: vehiculo.email,
                dni_titular: vehiculo.dni_titular,
                deuda: vehiculo.deuda,
              }}
            />
          )}
          {error && (
            <i className="text-xl text-red-500">El vehiculo no existe</i>
          )}
          <button
            onClick={() => setModalAddRepair(true)}
            className="rounded-sm w-fit bg-black text-white px-4 mt-5 py-2"
          >
            Nueva reparacion
          </button>
        </div>
        <div className="py-20 flex flex-col gap-3">
          {vehiculo?.reparaciones.length > 0 ? (
            vehiculo.reparaciones.map((reparacion) => (
              <Reparacion key={reparacion.id} repair={reparacion} />
            ))
          ) : (
            <p>Todavia no se registrar reparaciones</p>
          )}
        </div>
      </section>
      {modalAddRepair && (
        <ModalAddRepair
          setModalAddRepair={setModalAddRepair}
          vehicule={vehiculo}
        />
      )}
    </>
  );
}
