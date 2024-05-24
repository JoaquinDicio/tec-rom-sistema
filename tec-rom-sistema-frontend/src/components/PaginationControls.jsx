export default function PaginationControls({
  itemsList,
  itemsPerPage,
  setCurrentPage,
  currentPage,
}) {
  function handlePageChange(action) {
    const max_pages = Math.ceil(itemsList.length / itemsPerPage);
    if (
      (currentPage == 0 && action == "prev") ||
      (currentPage + 1 == max_pages && action == "next")
    ) 
      return;

    action == "next"
      ? setCurrentPage(currentPage + 1)
      : setCurrentPage(currentPage - 1);
  }

  return (
    <div className="flex gap-2 mt-10">
      <button
        onClick={() => handlePageChange("prev")}
        className="p-2 bg-black rounded-sm text-white"
      >
        Anterior
      </button>
      <button
        onClick={() => handlePageChange("next")}
        className="p-2 bg-black rounded-sm text-white"
      >
        Siguiente
      </button>
    </div>
  );
}
