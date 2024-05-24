import { useEffect, useState } from "react";
import axios from "axios";
export default function ModalSearchProveedor({ setModalSearchProveedor }) {
  const [listaProveedores, setListaProveedores] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    async function getProveedores() {
      try {
        const query = await axios.get("http://localhost:8080/proveedores");
        if (query.status === 200) setListaProveedores(query.data);
      } catch (e) {
        console.log(e);
      }
    }

    getProveedores();
  }, []);

  function handleClick() {
    if (selected !== null) window.location.href = `/compras/${selected}`;
  }

  return (
    <div className="bg-black/75 flex justify-center items-center h-screen w-screen fixed top-0">
      <div className="px-5 pt-8 pb-5 flex-col flex bg-white rounded-md w-fit max-h-screen">
        <h2 className="text-xl font-medium">Seleccionar Proveedor</h2>
        <select
          className="p-2 my-2"
          onChange={(e) => setSelected(e.target.value)}
        >
          <option value="0">Seleccionar proveedor</option>
          {listaProveedores?.map((proveedor, idx) => (
            <option key={idx} className="p-1" value={proveedor.id}>
              {proveedor.nombre}
            </option>
          ))}
        </select>
        <button
          disabled={selected ? false : true}
          onClick={handleClick}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Buscar
        </button>
        <button
          className="mt-2 text-center text-sm"
          onClick={() => setModalSearchProveedor(false)}
        >
          Salir
        </button>
      </div>
    </div>
  );
}
