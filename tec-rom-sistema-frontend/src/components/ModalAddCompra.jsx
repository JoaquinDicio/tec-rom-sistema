import axios from "axios";
import { useEffect, useState } from "react";
import { formatNumberWithCommas } from "../utils.js";
import ComprasList from "./ComprasList.jsx";

export default function ModalAddCompra({ setModalAddCompra }) {
  const [listaProveedores, setListaProveedores] = useState(null);
  const [newCompra, setNewCompra] = useState({});
  const [listaCompras, setListaCompras] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

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

  function handleCompraChange(field, value) {
    if (/^[\d.]+$/.test(value) && field !== "proveedor") {
      value = parseInt(value.replace(/\./g, ""));
    }
    setNewCompra((prev) => ({ ...prev, [field]: value }));
  }

  async function handlePostCompra() {
    try {
      if (listaCompras.length == 0) return;
      const request = await axios.post(
        "http://localhost:8080/compras",
        listaCompras
      );
      if (request.status == 200) {
        setSuccess(true);
        window.location.reload();
      }
    } catch (e) {
      setError(e.data);
    } finally {
      setLoading(false);
      setListaCompras([]);
    }
  }

  function handleAddCompraToList() {
    let compra = { ...newCompra };
    compra = normalizeFields(compra);

    if (compra.proveedor) {
      setListaCompras((prev) => [...prev, compra]);
      setNewCompra({});
    }
  }

  function normalizeFields(compra) {
    if (compra.pagado == "" || !compra.pagado) compra.pagado = 0;
    if (compra.valor == "" || !compra.valor) compra.valor = 0;
    if (compra.asociado == "" || !compra.asociado) compra.asociado = "NO POSEE";
    if (compra.asociado) compra.asociado = compra.asociado.toUpperCase();
    return compra;
  }

  return (
    <div className="bg-black/75 flex justify-center items-center h-screen w-screen fixed top-0">
      <div className="px-5 pt-8 pb-5 bg-white rounded-md w-[90vw] max-h-screen">
        <h2 className="font-medium text-2xl">Nueva compra</h2>
        <div className="flex flex-col mt-5">
          <ComprasList
            listaCompras={listaCompras}
            listaProveedores={listaProveedores}
          />
          <div className="flex items-center">
            <select
              value={newCompra.proveedor || 0}
              onChange={(e) => handleCompraChange("proveedor", e.target.value)}
              className="mt-5 border-b w-full border-black rounded-sm p-2"
            >
              <option value="0">Seleccione proveedor</option>
              {listaProveedores?.map((proveedor) => (
                <option key={proveedor.id} value={proveedor.id}>
                  {proveedor.nombre}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Articulo"
              className="mt-5 border-b w-full border-black rounded-sm p-2"
              value={newCompra.articulo || ""}
              onChange={(e) => handleCompraChange("articulo", e.target.value)}
            />
            <input
              type="text"
              placeholder="Asociado"
              className="mt-5 border-b w-full border-black rounded-sm p-2"
              value={newCompra.asociado || ""}
              onChange={(e) => handleCompraChange("asociado", e.target.value)}
            />
            <input
              type="text"
              placeholder="Valor"
              className="mt-5 border-b w-full border-black rounded-sm p-2"
              value={formatNumberWithCommas(newCompra.valor) || ""}
              onChange={(e) => handleCompraChange("valor", e.target.value)}
            />
            <input
              type="text"
              placeholder="Pagado"
              className="mt-5 border-b w-full border-black rounded-sm p-2"
              value={formatNumberWithCommas(newCompra.pagado) || ""}
              onChange={(e) => handleCompraChange("pagado", e.target.value)}
            />
            <button
              onClick={handleAddCompraToList}
              className="bg-black text-white font-medium py-2 px-4 mt-5"
            >
              +
            </button>
          </div>
        </div>
        {success && (
          <i className="mt-5 text-green-500 text-sm italic">
            Compras cargadas con exito
          </i>
        )}
        <button
          onClick={handlePostCompra}
          className="p-2 mt-5 w-full text-white font-medium rounded-sm bg-black"
          disabled={loading}
        >
          {loading ? "Regsitrando..." : "Registrar"}
        </button>
        <button
          className="w-full mt-2"
          onClick={() => setModalAddCompra(false)}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
