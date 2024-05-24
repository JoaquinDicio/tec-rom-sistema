import { useState, useEffect } from "react";
import PaginationControls from "./PaginationControls";
import Compra from "./Compra";

export default function TableCompras({ itemsList }) {
  const [listDisplay, setListDisplay] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const start = itemsPerPage * currentPage;
    const end = itemsPerPage * (currentPage + 1);
    setListDisplay(itemsList?.slice(start, end));
  }, [currentPage, itemsList]);

  return (
    <ul className="flex flex-col">
      <li className="flex bg-white rounded-md mb-2 p-2">
        <span className="font-bold text-center w-full">Proveedor</span>
        <span className="font-bold text-center w-full">Articulo</span>
        <span className="font-bold text-center w-full">Asociado</span>
        <span className="font-bold text-center w-full">Valor</span>
        <span className="font-bold text-center w-full">Pagado</span>
        <span className="font-bold text-center w-full">Fecha</span>
      </li>
      {listDisplay?.map((compra, idx) => (
        <Compra key={compra.id} idx={idx} compra={compra} />
      ))}
      <PaginationControls
        itemsList={itemsList}
        itemsPerPage={itemsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </ul>
  );
}
