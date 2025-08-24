import { Center, Loader } from "@mantine/core"; 
import DataTable from "react-data-table-component";

const CommonTable = ({
  columns,
  data,
  isLoading = false,
  sortField,
  sortDirection,
  onSort,
  sortServer = false,
  paginationProps = {},
}) => {
  const {
    isPagination = false,
    currentPage = 1,
    totalCount = 0,
    rowsPerPageValue = 10,
    setPageSelected = () => {},
    setRowsPerPageValue = () => {},
  } = paginationProps;

  return (
    <DataTable 
      columns={columns}
      data={data} 
      persistTableHead={true}
      highlightOnHover
      pointerOnHover
      responsive
      fixedHeader
      fixedHeaderScrollHeight="1000px" 
      progressPending={isLoading}
      progressComponent={
        <Center py="lg">
          <Loader size="md" />
        </Center>
      }
      defaultSortField={sortField}
      defaultSortAsc={sortDirection === "asc"}
      onSort={onSort}
      sortServer={sortServer}
      pagination={isPagination}
      paginationTotalRows={totalCount || 0} 
      paginationDefaultPage={currentPage}
      paginationPerPage={rowsPerPageValue}
      onChangePage={setPageSelected}
      onChangeRowsPerPage={setRowsPerPageValue}
      customStyles={{
        headCells: {
          style: {
            fontWeight: "bold",
            fontSize: "14px",
            backgroundColor: "#f1f3f5", 
            zIndex: 10,
          },
        },
        cells: {
          style: {
            fontSize: "13px",
            paddingTop: "10px",
            paddingBottom: "10px",
          },
        },
      }}
    />
  );
};

export default CommonTable;
