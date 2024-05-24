export default function MinVehiculeInfo({
  selectedVehicule,
  showCompras = false,
}) {
  function handleClick() {
    const { patente } = selectedVehicule;
    if (patente) window.location = `/historial/${patente.toUpperCase()}`;
  }

  return (
    <div>
      <div onClick={handleClick} className="cursor-pointer">
        <p className="text-sm">
          Dominio:{" "}
          <span className="font-bold">{selectedVehicule?.patente}</span>
        </p>
        <p className="text-sm">
          Marca: <span className="font-bold">{selectedVehicule?.marca}</span>
        </p>
        <p className="text-sm">
          Modelo: <span className="font-bold">{selectedVehicule?.modelo}</span>
        </p>
        <p className="text-sm">
          DNI:{" "}
          <span className="font-bold">{selectedVehicule?.dni_titular}</span>
        </p>
        <p className="text-sm">
          email: <span className="font-bold">{selectedVehicule?.email}</span>
        </p>
        <p className="text-sm">
          Contacto:{" "}
          <span className="font-bold">{selectedVehicule?.telefono}</span>
        </p>
      </div>
      {showCompras && (
        <a
          target="_blank"
          className="text-blue-500 text-sm"
          href={`/compras/vehiculo/${selectedVehicule.patente}`}
        >
          Ver compras asociadas
        </a>
      )}
    </div>
  );
}
