import { formatNumberWithCommas } from "../utils";
import axios from "axios";

export default function Compra({ compra, idx }) {
  const { nombre_proveedor, articulo, asociado, valor, pagado, fecha } = compra;

  // Función para agregar ceros adicionales si es necesario
  function agregarCeros(numero) {
    return numero < 10 ? "0" + numero : numero;
  }
  function formatDate(date) {
    // Fecha original
    var fechaOriginal = new Date(date);

    // Obtener día, mes y año
    var dia = agregarCeros(fechaOriginal.getDate());
    var mes = agregarCeros(fechaOriginal.getMonth() + 1); // Se suma 1 porque los meses en JavaScript van de 0 a 11
    var año = fechaOriginal.getFullYear();

    // Formatear la fecha
    return dia + "-" + mes + "-" + año;
  }
  async function handleDelete() {
    try {
      const request = await axios.delete(
        `http://localhost:8080/compras/${compra.id}`
      );
      if (request.status == 200) window.location.reload();
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="flex w-full relative">
      <li
        className={`${
          idx % 2 == 0 ? "bg-white" : "bg-blue-50"
        } px-4 py-2 flex w-full`}
      >
        <p className="w-full text-center">{nombre_proveedor}</p>
        <p className="w-full text-center">{articulo}</p>
        <p className="w-full text-center">{asociado}</p>
        <p className="w-full text-center">{formatNumberWithCommas(valor)}</p>
        <p className="w-full text-center">{formatNumberWithCommas(pagado)}</p>
        <p className="w-full text-center">{formatDate(fecha)}</p>
      </li>
      <svg
        onClick={handleDelete}
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-trash-fill absolute right-[18px] top-[12px] text-red-500 cursor-pointer"
        viewBox="0 0 16 16"
      >
        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
      </svg>
    </div>
  );
}
