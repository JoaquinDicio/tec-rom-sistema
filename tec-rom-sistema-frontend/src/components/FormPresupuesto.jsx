import { useState, useEffect } from "react";
import { formatNumberWithCommas } from "../utils.js";

export default function FormPresupuesto({
  setDataPresupuesto,
  dataPresupuesto,
}) {
  const [currentItem, setCurrentItem] = useState({});
  //updates changes in form fields
  function handleChange(field, value) {
    setDataPresupuesto((prev) => ({ ...prev, [field]: value }));
  }
  //update changes in form-items fields
  function handleItemChange(field, value) {
    if (/^[\d.]+$/.test(value)) value = parseInt(value.replace(/\./g, ""));
    setCurrentItem((prev) => ({ ...prev, [field]: value }));
    console.log(currentItem);
  }
  //push items and updates dataPresupuesto
  function handlePushItem(e) {
    e.preventDefault();
    //push new item into items[] in dataPresupuesto
    const newItems = [...dataPresupuesto.items, currentItem];
    setDataPresupuesto((prev) => ({ ...prev, items: newItems }));
    setCurrentItem({});
  }
  //updates the total
  useEffect(() => {
    const total = dataPresupuesto.items.reduce(
      (acc, current) => acc + parseInt(current.valor * current.cantidad),
      0
    );
    setDataPresupuesto((prev) => ({ ...prev, total }));
  }, [dataPresupuesto.items]);

  return (
    <>
      <h2 className="text-2xl font-medium">Datos para el presupuesto</h2>
      <form className="p-5 flex flex-col">
        <div className="my-2">
          <label htmlFor="nombre-empresa" className="mr-1">
            De:
          </label>
          <input
            className="p-1 border border-black"
            id="nombre-empresa"
            type="text"
            value={dataPresupuesto?.empresa || ""}
            onChange={(e) => handleChange("empresa", e.target.value)}
          />
        </div>
        <div className="my-2">
          <label htmlFor="fecha-emision" className="mr-1">
            Fecha:
          </label>
          <input
            className="p-1 border border-black"
            id="fecha-emision"
            value={dataPresupuesto?.fecha_emision || ""}
            type="date"
            onChange={(e) => handleChange("fecha_emision", e.target.value)}
          />
        </div>
        <div className="my-2">
          <label htmlFor="fecha-validez" className="mr-1">
            Valido hasta:
          </label>
          <input
            className="p-1 border border-black"
            id="fecha-validez"
            value={dataPresupuesto?.fecha_validez || ""}
            type="date"
            onChange={(e) => handleChange("fecha_validez", e.target.value)}
          />
        </div>
        <div className="my-2">
          <label htmlFor="destinatario" className="mr-1">
            Para:
          </label>
          <input
            className="p-1 border border-black"
            id="destinatario"
            value={dataPresupuesto?.destinatario || ""}
            type="text"
            onChange={(e) => handleChange("destinatario", e.target.value)}
          />
        </div>
        <div className="my-2 flex flex-col max-w-[700px]">
          <p className="mb-2">Items:</p>
          <div className="border flex flex-col">
            {dataPresupuesto.items.map((item) => (
              <div className="flex">
                <textarea
                  type="text"
                  className="border border-black w-[80%] py-1 px-2.5"
                  placeholder="detalle"
                  value={item.detalle}
                  disabled
                />
                <input
                  type="number"
                  className="border border-black text-center w-[50px] py-1 px-2.5"
                  placeholder="Cant"
                  value={item.cantidad}
                  disabled
                />
                <input
                  type="text"
                  className="border border-black py-1 px-2.5"
                  placeholder="valor"
                  value={"$" + formatNumberWithCommas(item.valor)}
                  disabled
                />
              </div>
            ))}
            <div className="flex">
              <input
                onChange={(e) => handleItemChange("detalle", e.target.value)}
                type="text"
                className="border border-black w-[80%] py-1 px-2.5"
                placeholder="detalle"
                value={currentItem.detalle || ""}
              />
              <input
                onChange={(e) => handleItemChange("cantidad", e.target.value)}
                type="number"
                className="border border-black text-center w-[50px] py-1 px-2.5"
                placeholder="Cant"
                value={currentItem.cantidad || ""}
              />
              <input
                onChange={(e) => handleItemChange("valor", e.target.value)}
                type="text"
                className="border border-black py-1 px-2.5"
                placeholder="valor"
                value={formatNumberWithCommas(currentItem.valor) || ""}
              />
              <button
                onClick={(e) => handlePushItem(e)}
                className="p-2 bg-black text-white"
              >
                +
              </button>
            </div>
          </div>
        </div>
        <p className="text-2xl mt-5 font-bold">
          TOTAL: ${formatNumberWithCommas(dataPresupuesto.total) || 0}
        </p>
      </form>
    </>
  );
}
