import { useState } from "react";
import DataTable from "react-data-table-component";
import AddTaskModal from "../modal/AddTaskModal";

const TaskDataTable = ({ search, setSearch, filtered }) => {
  const [showModal, setShowModal] = useState(false);

  const columns = [
    { name: "Title", selector: (row) => row.name, sortable: true },
    { name: "Customer Name", selector: (row) => row.address.city },
    { name: "Assigned By", selector: (row) => row.company.name },
    { name: "Assigned Date", selector: (row) => row.address.street, sortable: true },
    { name: "Due Date", selector: (row) => row.email, sortable: true },
    {
      name: "Priority",
      cell: (row) => <button onClick={() => alert(row.username)}>Edit</button>,
    },
    {
      name: "Status",
      cell: (row) => <button onClick={() => alert(row.username)}>Active</button>,
    },
  ];

  return (
    <div>
      <DataTable
        title="My Task"
        columns={columns}
        data={filtered || []}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="100vh"
        selectableRowsHighlight
        highlightOnHover
        subHeaderAlign="center"
        actions={
          <>
            <button className="btn btn-primary" type="button" onClick={() => setShowModal(true)}>Add Task</button>
          </>
        }
        subHeaderComponent={
          <input
            placeholder="Search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        }
      />

      {/* Add Task Modal */}
      <AddTaskModal
        show={showModal}
        handleClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default TaskDataTable;
