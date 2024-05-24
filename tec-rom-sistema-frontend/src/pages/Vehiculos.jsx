import { useEffect, useState } from "react";
import axios from "axios";
import ModalSearchDomain from "../components/ModalSearchDomain";
import ModalAddVehicule from "../components/ModalAddVehicule";
import PageHeader from "../components/PageHeader";
import MinVehiculeInfo from "../components/MinVehiculeInfo";
import PaginationControls from "../components/PaginationControls";

export default function Vehiculos() {
  const [modalSearchDomain, setModalSearchDomain] = useState(false);
  const [modalAddVehicule, setModalAddVehicule] = useState(false);
  const [vehiculesList, setVehiculesList] = useState([]);
  const [listDisplay, setListDisplay] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    async function getAllVehicules() {
      const { data } = await axios.get("http://localhost:8080/vehiculos");
      setVehiculesList(data);
    }
    getAllVehicules();
  }, []);

  useEffect(() => {
    let start = currentPage * 12;
    let end = (currentPage + 1) * 12;
    setListDisplay(vehiculesList.slice(start, end));
  }, [currentPage, vehiculesList]);

  return (
    <>
      <section className="px-20 py-12 bg-gray-100 min-h-screen">
        <PageHeader
          pageName={"Vehiculos"}
          mainBtnTxt={"Agregar nuevo"}
          mainAction={() => setModalAddVehicule(true)}
          secondaryBtnTxt={"Buscar vehiculo"}
          secondaryAction={() => setModalSearchDomain(true)}
        />
        <div>
          <h2 className="text-xl">Lista de vehiculos</h2>
          <ul className="grid mt-8 grid-cols-4 gap-2">
            {listDisplay?.map((vehicule) => (
              <li
                key={vehicule.patente}
                className="bg-white rounded-sm shadow-sm p-5"
              >
                <MinVehiculeInfo selectedVehicule={vehicule} />
              </li>
            ))}
          </ul>
        </div>
        <PaginationControls
          itemsList={vehiculesList}
          itemsPerPage={12}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </section>
      {modalSearchDomain && (
        <ModalSearchDomain setModalSearchDomain={setModalSearchDomain} />
      )}
      {modalAddVehicule && (
        <ModalAddVehicule setModalAddVehicule={setModalAddVehicule} />
      )}
    </>
  );
}
