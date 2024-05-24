import { formatNumberWithCommas } from "../utils.js";
import logo from "../assets/logo.png";

export default function Presupuesto({ dataPresupuesto }) {
  return (
    <div className="p-5 min-h-screen">
      <img src={logo} alt="logo" className="w-[150px] mb-5" />
      <div className="flex flex-wrap gap-y-2">
        <p className="w-[50%]">
          <span className="font-medium">Tel: </span>{" "}
          {dataPresupuesto.telefono_empresa || "NO DEFINIDO"}
        </p>
        <p className="w-[50%] text-end">
          <span className="font-medium">Fecha de emision: </span>{" "}
          {dataPresupuesto.fecha_emision || "NO DEFINIDO"}
        </p>
        <p className="w-[50%]">
          <span className="font-medium">Desintatario: </span>{" "}
          {dataPresupuesto.destinatario || "NO DEFINIDO"}
        </p>
        <p className="w-[50%] text-end">
          <span className="font-medium">Valido hasta: </span>{" "}
          {dataPresupuesto.fecha_validez || "NO DEFINIDO"}
        </p>
      </div>
      <div className="flex flex-wrap mt-10">
        <div className="flex items-center w-full">
          <p className="w-[80%] font-bold p-2">Detalle</p>
          <p className=" font-bold text-center w-[40px]">Cant</p>
          <p className=" font-bold flex-1 text-center">Valor</p>
        </div>
        {dataPresupuesto.items.map((item) => (
          <div className="flex flex-wrap w-full">
            <p className="border w-[80%] border-black p-2">{item.detalle}</p>
            <p className="border text-center w-[40px] border-black p-2">
              {item.cantidad}
            </p>
            <p className="border flex-1 flex items-center justify-center border-black p-2">
              {"$" + formatNumberWithCommas(item.valor)}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-5">
        <i className="text-sm text-grey-100">
          Este presupuesto es valido hasta el {dataPresupuesto.fecha_validez}
        </i>
        <p className="text-2xl font-medium mt-10">
          TOTAL: ${formatNumberWithCommas(dataPresupuesto.total)}
        </p>
      </div>
    </div>
  );
}
