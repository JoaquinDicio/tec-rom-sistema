import { useEffect, useState } from "react";
import MinVehiculeInfo from "../components/MinVehiculeInfo.jsx";
import usePostNewRepair from "../hooks/usePostNewRepair.jsx";
import ModalSearchDomain from "./ModalSearchDomain.jsx";

export default function ModalAddRepair({ setModalAddRepair, vehicule = null }) {
  const [selectedVehicule, setSelectedVehicule] = useState(vehicule);
  const [newRepair, setNewRepair] = useState({});
  const { postNewRepair, error, loading, success } = usePostNewRepair();

  //updates the newRepair object, which is the one it's being posted to db
  function updateNewRepair(prop, value) {
    if (prop !== "detalle" && prop !== "patente")
      value = parseInt(value.replace(/\./g, ""));
    setNewRepair((prev) => ({ ...prev, [prop]: value }));
  }

  useEffect(() => {
    if (success)
      window.location.href = `/historial/${selectedVehicule.patente}`;
  }, [success]);

  //executes the code to save NewRepair in db
  async function handlePost() {
    const patente = selectedVehicule.patente;
    const repair = { ...newRepair, patente };
    try {
      await postNewRepair(repair);
    } catch (e) {
      console.log(error);
    }
  }

  function formatNumberWithCommas(number) {
    if (number) return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  return (
    <>
      {!selectedVehicule ? (
        <ModalSearchDomain
          //we pass setModalAddRepair so we close the entire component
          setModalSearchDomain={setModalAddRepair}
          redirect={false}
          setSelectedVehicule={setSelectedVehicule}
        />
      ) : (
        <div className="bg-black/75 flex justify-center items-center h-screen w-screen fixed top-0">
          <div className="px-5 pt-10 pb-5 bg-white rounded-md w-[400px] max-h-screen overflow-y-scroll">
            <h2 className="text-2xl">Nueva reparacion</h2>
            <div className="py-3">
              <MinVehiculeInfo
                showCompras={true}
                selectedVehicule={selectedVehicule}
              />
            </div>
            <div>
              <input
                onChange={(e) => updateNewRepair("kilometraje", e.target.value)}
                value={formatNumberWithCommas(newRepair?.kilometraje || "")}
                placeholder="Kilometraje"
                className="mt-5 border-b w-full border-black rounded-sm p-2"
              />
              <textarea
                onChange={(e) => updateNewRepair("detalle", e.target.value)}
                value={newRepair?.detalle || ""}
                placeholder="Detalle reparacion"
                className="mt-5 border-b w-full border-black rounded-sm p-2"
              />

              <input
                onChange={(e) => updateNewRepair("valor", e.target.value)}
                value={formatNumberWithCommas(newRepair?.valor || "")}
                placeholder="Valor"
                className="mt-5 border-b w-full border-black rounded-sm p-2"
              />
              <input
                type="text"
                onChange={(e) => updateNewRepair("pagado", e.target.value)}
                value={formatNumberWithCommas(newRepair?.pagado || "")}
                placeholder="Pagado"
                className="mt-5 border-b w-full border-black rounded-sm p-2"
              />
              <input
                type="text"
                disabled
                onChange={(e) => updateNewRepair("balance", e.target.value)}
                value={newRepair?.valor - newRepair?.pagado || 0}
                placeholder="Deuda"
                className="mt-5 mb-3 border-b w-full border-black rounded-sm p-2"
              />
              {error && (
                <i className="text-red-500 text-sm">
                  Campos invalidos: {error}
                </i>
              )}
              <button
                onClick={handlePost}
                className="rounded-sm bg-black text-white w-full mt-5 py-2"
                disabled={loading}
              >
                {loading ? "Guardando..." : "Guardar"}
              </button>
            </div>
            <button
              onClick={() => setModalAddRepair(false)}
              className="rounded-sm w-full mt-2"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
