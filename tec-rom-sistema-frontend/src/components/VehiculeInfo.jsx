export default function VehiculeInfo({ selectedVehiculo }) {
  function formatNumberWithCommas(number) {
    return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  return (
    <>
      <div className="flex gap-2">
        <div className="min-w-[130px] rounded bg-white shadow-md p-5 h-[120px] flex items-center justify-center flex-col">
          <p className="text-xl font-bold">{selectedVehiculo.patente}</p>
          <p className="text-sm">DOMINIO</p>
        </div>
        <div className="min-w-[130px] rounded bg-white shadow-md p-5 h-[120px] flex items-center justify-center flex-col">
          <p className="text-xl font-bold">
            {selectedVehiculo.marca.toUpperCase()}
          </p>
          <p className="text-sm">MARCA</p>
        </div>
        <div className="min-w-[130px] rounded bg-white shadow-md p-5 h-[120px] flex items-center justify-center flex-col">
          <p className="text-xl font-bold">
            {selectedVehiculo.modelo.toUpperCase()}
          </p>
          <p className="text-sm">MODELO</p>
        </div>
        <div className="min-w-[130px] rounded bg-white shadow-md p-5 h-[120px] flex items-center justify-center flex-col">
          <p className="text-xl font-bold">
            ${formatNumberWithCommas(selectedVehiculo.deuda)}
          </p>
          <p className="text-sm">DEUDA</p>
        </div>
        <div className="min-w-[130px] rounded bg-white shadow-md p-5 h-[120px] flex items-center justify-center flex-col">
          <p className="text-xl font-bold">{selectedVehiculo.dni_titular}</p>
          <p className="text-sm">DNI</p>
        </div>
        <div className="min-w-[130px] rounded bg-white shadow-md p-5 h-[120px] flex items-center justify-center flex-col">
          <p className="text-xl font-bold">{selectedVehiculo.email}</p>
          <p className="text-sm">EMAIL</p>
        </div>
      </div>
    </>
  );
}
