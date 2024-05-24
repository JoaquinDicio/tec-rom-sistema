import { useState } from "react";
import useVehiculeInfo from "../hooks/useVehiculeInfo";

export default function ModalSearchDomain({
  setModalSearchDomain,
  redirect = true,
  setSelectedVehicule = null,
}) {
  const [patente, setPatente] = useState("");
  const { getVehiculeInfo, loading, error } = useVehiculeInfo();

  function handlePatenteChange(newValue) {
    setPatente(newValue.toUpperCase());
  }

  async function handleSubmit() {
    const vehiculo = await getVehiculeInfo(patente);
    if (vehiculo && redirect) {
      window.location = `/historial/${vehiculo.patente.toUpperCase()}`;
    } else if (vehiculo && setSelectedVehicule) {
      setSelectedVehicule(vehiculo);
    }
  }

  return (
    <div className="bg-black/75 flex justify-center items-center h-screen w-screen fixed top-0">
      <div className="px-5 pt-10 pb-5 bg-white rounded-md w-[400px]">
        <h2 className="text-xl">Seleccione un vehiculo</h2>
        <input
          value={patente}
          onChange={(e) => handlePatenteChange(e.target.value)}
          type="text"
          placeholder="Patente del vehiculo"
          className="mt-5 border-b w-full border-black rounded-sm p-2"
        />
        <i className="text-xs my-2 text-red-500 italic">
          {error && <p>{error}</p>}
        </i>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="rounded-sm bg-black text-white w-full mt-5 py-2"
        >
          {loading ? "Buscando..." : "Buscar"}
        </button>
        <button
          className="w-full text-sm mt-3"
          onClick={() => setModalSearchDomain(false)}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
