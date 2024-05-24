import { useEffect, useState } from "react";
import FormPresupuesto from "../components/FormPresupuesto.jsx";
import Presupuesto from "../components/Presupuesto.jsx";

export default function Presupuestos() {
  const [showForm, setShowForm] = useState(true);
  const [printing, setPrinting] = useState(false);
  const [dataPresupuesto, setDataPresupuesto] = useState({
    empresa: "TECROM",
    telefono_empresa: "11 6472-6418",
    fecha_emision: getFechaFormateada(),
    items: [],
  });

  useEffect(() => {
    if (printing) window.print();
  }, [printing]);

  function getFechaFormateada() {
    // Obtener la fecha actual
    let today = new Date();
    // Formatear la fecha como "YYYY-MM-DD"
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();
    let dd = String(today.getDate()).padStart(2, "0");
    let fecha_formateada = yyyy + "-" + mm + "-" + dd;
    return fecha_formateada;
  }

  function handlePrint() {
    setPrinting(true);
  }

  return (
    <>
      <div className="flex p-5 flex-col">
        {showForm ? (
          <FormPresupuesto
            dataPresupuesto={dataPresupuesto}
            setDataPresupuesto={setDataPresupuesto}
          />
        ) : (
          <Presupuesto dataPresupuesto={dataPresupuesto} />
        )}

        {!printing && (
          <div className="flex">
            <button
              onClick={() => setShowForm((prev) => !prev)}
              className="mt-10 px-4 mx-1 rounded-sm max-w-[100px] py-2 bg-black text-white font-medium"
            >
              {showForm ? "Visualizar" : "Atras"}
            </button>
            {!showForm && (
              <button
                className="mt-10 px-4 mx-1 rounded-sm max-w-[100px] py-2 bg-black text-white font-medium"
                onClick={handlePrint}
              >
                Imprimir
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}
