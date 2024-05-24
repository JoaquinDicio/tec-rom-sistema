import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="h-screen bg-gray-100 py-12 px-20">
      <h1 className="text-3xl font-medium">Pagina principal</h1>
      <nav className="my-10">
        <ul className="text-blue-500 text-xl flex gap-5 flex-col">
          <li>
            <Link to={"/reparaciones"}>Reparaciones</Link>
          </li>
          <li>
            <Link to={"/vehiculos"}>Vehiculos</Link>
          </li>
          <li>
            <Link to={"/compras"}>Compras</Link>
          </li>
          <li>
            <Link to={"/presupuestos"}>Generar presupuesto</Link>
          </li>
        </ul>
      </nav>
    </section>
  );
}
