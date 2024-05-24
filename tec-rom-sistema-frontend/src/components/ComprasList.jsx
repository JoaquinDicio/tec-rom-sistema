import { formatNumberWithCommas } from "../utils";

export default function ComprasList({ listaCompras, listaProveedores }) {
  return listaCompras.map((compra, idx) => (
    <div key={idx} className="flex justify-around">
      <p className="border border-black flex-1 p-1">
        {
          listaProveedores.find((proveedor) => proveedor.id == compra.proveedor)
            ?.nombre
        }
      </p>
      <p className="border border-black flex-1 p-1">{compra.articulo}</p>
      <p className="border border-black flex-1 p-1">{compra.asociado}</p>
      <p className="border border-black flex-1 p-1">
        {formatNumberWithCommas(compra.valor || 0)}
      </p>
      <p className="border border-black flex-1 p-1">
        {formatNumberWithCommas(compra.pagado || 0)}
      </p>
    </div>
  ));
}
