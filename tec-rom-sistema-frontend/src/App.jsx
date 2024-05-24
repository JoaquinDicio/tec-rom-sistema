import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Reparaciones from "./pages/Reparaciones.jsx";
import Vehiculos from "./pages/Vehiculos.jsx";
import History from "./pages/History.jsx";
import Presupuestos from "./pages/Presupuestos.jsx";
import Compras from "./pages/Compras.jsx";
import ComprasProveedor from "./pages/ComprasProveedor.jsx";
import ComprasVehiculo from "./pages/ComprasVehiculo.jsx";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reparaciones/" element={<Reparaciones />} />
          <Route path="/compras" element={<Compras />} />
          <Route path="/compras/:proveedor_id" element={<ComprasProveedor />} />
          <Route
            path="/compras/vehiculo/:vehiculo_id"
            element={<ComprasVehiculo />}
          />
          <Route path="/historial/:patente" element={<History />} />
          <Route path="/vehiculos" element={<Vehiculos />} />
          <Route path="/presupuestos" element={<Presupuestos />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
