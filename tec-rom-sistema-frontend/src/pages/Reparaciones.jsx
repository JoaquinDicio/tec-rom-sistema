import { useEffect, useState } from "react";
import ModalSearchDomain from "../components/ModalSearchDomain";
import ModalAddRepair from "../components/ModalAddRepairModal";
import PageHeader from "../components/PageHeader";
import axios from "axios";
import Reparacion from "../components/Reparacion";
import PaginationControls from "../components/PaginationControls";

export default function Reparaciones() {
  const [modalSearchDomain, setModalSearchDomain] = useState(false);
  const [modalAddRepair, setModalAddRepair] = useState(false);
  const [repairsList, setRepairsList] = useState([]);
  const [listDisplay, setListDisplay] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    async function getRepairs() {
      const query = await axios.get("http://localhost:8080/reparaciones");
      if (query) setRepairsList(query.data);
    }
    getRepairs();
  }, []);

  useEffect(() => {
    const start = 6 * currentPage;
    const end = 6 * (currentPage + 1);
    setListDisplay(repairsList.slice(start, end));
  }, [currentPage, repairsList]);

  return (
    <>
      <section className="min-h-screen bg-gray-100 py-12 px-20">
        <PageHeader
          pageName={"Reparaciones"}
          mainAction={() => setModalAddRepair(true)}
          mainBtnTxt={"Nueva Reparacion"}
          secondaryBtnTxt={"Ver historial"}
          secondaryAction={() => setModalSearchDomain(true)}
        />
        <div className="grid grid-cols-2 gap-2">
          {listDisplay
            ? listDisplay.map((repair) => (
                <Reparacion key={repair.id} repair={repair} />
              ))
            : "No se registran reparaciones"}
        </div>
        <PaginationControls
          itemsList={repairsList}
          itemsPerPage={6}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </section>
      {/* modals to show at the body */}
      {modalSearchDomain && (
        <ModalSearchDomain setModalSearchDomain={setModalSearchDomain} />
      )}
      {modalAddRepair && (
        <ModalAddRepair setModalAddRepair={setModalAddRepair} />
      )}
    </>
  );
}
