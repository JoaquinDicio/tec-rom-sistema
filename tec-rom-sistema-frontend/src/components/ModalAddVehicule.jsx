import { useState } from "react";
import axios from "axios";

export default function ModalAddVehicule({ setModalAddVehicule }) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [vehicule, setVehicule] = useState({});

  function handleChange(newValue, prop) {
    setVehicule((prevState) => ({ ...prevState, [prop]: newValue }));
  }

  async function handleSubmit() {
    let response;
    try {
      response = await axios.post("http://localhost:8080/vehiculos", vehicule);
    } catch (e) {
      setError(e.response.data.error);
    } finally {
      setLoading(false);
      if (response?.status == 200) setModalAddVehicule(false);
    }
  }

  return (
    <div className="bg-black/75 flex justify-center items-center h-screen w-screen fixed top-0">
      <div className="bg-white rounded-lg p-10">
        <h2 className="text-xl">Nuevo Vehiculo</h2>
        <div className="flex flex-col w-[400px]">
          {error && <i className="text-sm text-red-500">verificar: {error}</i>}
          <input
            value={vehicule.patente}
            onChange={(e) =>
              handleChange(e.target.value.toUpperCase(), "patente")
            }
            type="text"
            placeholder="Patente del vehiculo"
            className="mt-5 border-b w-full border-black rounded-sm p-2"
          />
          <input
            value={vehicule.marca}
            onChange={(e) => handleChange(e.target.value, "marca")}
            type="text"
            placeholder="Marca"
            className="mt-5 border-b w-full border-black rounded-sm p-2"
          />
          <input
            value={vehicule.modelo}
            onChange={(e) => handleChange(e.target.value, "modelo")}
            type="text"
            placeholder="Modelo del vehiculo"
            className="mt-5 border-b w-full border-black rounded-sm p-2"
          />
          <input
            value={vehicule.dni_titular}
            onChange={(e) => handleChange(e.target.value, "dni_titular")}
            type="text"
            placeholder="DNI"
            className="mt-5 border-b w-full border-black rounded-sm p-2"
          />
          <input
            value={vehicule.email}
            onChange={(e) => handleChange(e.target.value, "email")}
            type="text"
            placeholder="email titular"
            className="mt-5 border-b w-full border-black rounded-sm p-2"
          />
          <input
            value={vehicule.telefono}
            onChange={(e) => handleChange(e.target.value, "telefono")}
            type="text"
            placeholder="Contacto"
            className="mt-5 border-b w-full border-black rounded-sm p-2"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="rounded-sm bg-black text-white w-full mt-5 py-2"
        >
          Agregar
        </button>
        <button
          onClick={() => setModalAddVehicule(false)}
          className="w-full text-sm mt-3"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
