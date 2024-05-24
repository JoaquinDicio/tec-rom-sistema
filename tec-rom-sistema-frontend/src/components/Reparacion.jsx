import axios from "axios";
import { formatNumberWithCommas } from "../utils.js";
export default function Reparacion({ repair }) {
  //formats the date
  const fecha = new Date(repair.fecha * 1000); // Multiplicar por 1000 para convertir segundos a milisegundos
  const dia = ("0" + fecha.getDate()).slice(-2);
  const mes = ("0" + (fecha.getMonth() + 1)).slice(-2);
  const anio = fecha.getFullYear();
  const fechaFormateada = dia + "/" + mes + "/" + anio;

  //deletes the repair
  async function handle_delete() {
    try {
      const { data } = await axios.delete(
        "http://localhost:8080/reparaciones/" + repair.id
      );
      if (data.ok) window.location.reload();
    } catch (e) {
      console.log("Error eliminando:", e);
    }
  }

  return (
    <div className="bg-white rounded-sm shadow-sm p-4 flex flex-col">
      <div>
        <div className="flex justify-between items-center mb-3">
          <div className="flex gap-3 align-center">
            <h5 className="text-sm font-bold">Reparacion - {repair.patente}</h5>
            <button
              onClick={() => handle_delete()}
              className="bg-red-500 text-sm text-white rounded font-medium p-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-trash-fill"
                viewBox="0 0 16 16"
              >
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
              </svg>
            </button>
          </div>
          <p className="text-sm">{fechaFormateada}</p>
        </div>
        <p>{repair.detalle}</p>
      </div>
      <div className="flex gap-1 mt-5 justify-between">
        {repair.balance > 0 ? (
          <div className="flex gap-2">
            <p className="w-fit bg-black rounded-full text-sm text-white px-2 font-bold">
              ${formatNumberWithCommas(repair.valor)}
            </p>
            <p className="w-fit bg-green-500 rounded-full text-sm text-white px-2 font-bold">
              ${formatNumberWithCommas(repair.pagado)}
            </p>
            <p className="w-fit bg-red-500 rounded-full text-sm text-white px-2 font-bold">
              Debe ${formatNumberWithCommas(repair.balance)}
            </p>
          </div>
        ) : (
          <p className="w-fit bg-green-500 rounded-full text-sm text-white px-2 font-bold">
            ${formatNumberWithCommas(repair.pagado)}
          </p>
        )}
        <div className="flex gap-2">
          <p className="w-fit bg-black rounded-full text-sm text-white px-2 font-bold">
            {formatNumberWithCommas(repair.kilometraje)} KM
          </p>
        </div>
      </div>
    </div>
  );
}
