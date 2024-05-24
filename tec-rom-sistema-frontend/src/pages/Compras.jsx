import ModalAddProveedor from "../components/ModalAddProveedor";
import ModalAddCompra from "../components/ModalAddCompra";
import PageHeader from "../components/PageHeader";
import { useEffect, useState } from "react";
import axios from "axios";
import TableCompras from "../components/TableCompras";
import ModalSearchProveedor from "../components/ModalSearchProveedor";

export default function Compras() {
  const [modalAddProveedor, setModalAddProveedor] = useState(false);
  const [modalAddCompra, setModalAddCompra] = useState(false);
  const [listaCompras, setListaCompras] = useState(null);
  const [modalSearchProveedor, setModalSearchProveedor] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getAllCompras() {
      setLoading(true);
      try {
        const query = await axios.get("http://localhost:8080/compras");
        if (query.status == 200) setListaCompras(query.data.reverse());
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    }
    getAllCompras();
  }, []);

  return (
    <>
      <section className="min-h-screen bg-gray-100 py-12 px-20">
        <PageHeader
          pageName={"Compras"}
          mainBtnTxt={"Registrar Compra"}
          mainAction={() => setModalAddCompra(true)}
          secondaryBtnTxt={"Agregar Proveedor"}
          secondaryAction={() => setModalAddProveedor(true)}
          moreButtons={[
            {
              action: () => setModalSearchProveedor(true),
              text: "Ver por proveedor",
            },
          ]}
        />
        {loading && <p className="text-xl">Cargando...</p>}
        {error && (
          <p className="text-xl text-red-500">Error leyendo la base de datos</p>
        )}
        <TableCompras itemsList={listaCompras} />
      </section>
      {modalAddProveedor && (
        <ModalAddProveedor setModalAddProveedor={setModalAddProveedor} />
      )}
      {modalAddCompra && (
        <ModalAddCompra setModalAddCompra={setModalAddCompra} />
      )}
      {modalSearchProveedor && (
        <ModalSearchProveedor
          setModalSearchProveedor={setModalSearchProveedor}
        />
      )}
    </>
  );
}
