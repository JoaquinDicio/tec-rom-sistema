import { useState } from "react";
import axios from "axios";

export default function ModalAddProveedor({ setModalAddProveedor }) {
  const [proveedorName, setProveedorName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSucccess] = useState(false);

  async function handleGuardarProveedor() {
    setLoading(true);
    try {
      const request = await axios.post("http://localhost:8080/proveedores", {
        nombre: proveedorName,
      });
      if (request.status == 200) {
        setSucccess(true);
        setProveedorName("");
      }
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-black/75 flex justify-center items-center h-screen w-screen fixed top-0">
      <div className="px-5 pt-8 pb-5 bg-white rounded-md w-[400px] max-h-screen">
        <h2 className="text-2xl font-medium">Agregar proveedor</h2>
        <input
          type="text"
          placeholder="Nombre Proveedor"
          className="mt-5 border-b w-full border-black rounded-sm p-2"
          value={proveedorName}
          onChange={(e) => setProveedorName(e.target.value)}
        />
        {success && (
          <i className="text-sm text-green-500 italic">
            Proveedor registrado con exito
          </i>
        )}
        {error && <i className="text-sm text-red-500 italic">Algo salio mal</i>}
        <button
          onClick={handleGuardarProveedor}
          className="bg-black p-2 rounded-sm text-white w-full mt-2"
          disabled={proveedorName.trim() == "" && true}
        >
          {loading ? "Guardando" : "Guardar"}
        </button>
        <button
          onClick={() => setModalAddProveedor(false)}
          className="mt-2 text-center w-full"
        >
          {success ? "Salir" : "Cancelar"}
        </button>
      </div>
    </div>
  );
}
