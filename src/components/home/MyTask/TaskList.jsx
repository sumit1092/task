import  { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, addTask } from "../../../redux/slices/taskSlice";
import CommonTable from "../../CommonTable/CommonTable";
import { MyTaskColumn } from "./MyTaskColumn";

const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks, totalCount, loading } = useSelector((state) => state.task);

  // local state for pagination + sorting
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortField, setSortField] = useState("TaskId");
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    dispatch(
      fetchTasks({
        page,
        rowsPerPage,
        sortField,
        sortDirection,
      })
    );
  }, [dispatch, page, rowsPerPage, sortField, sortDirection]);


  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Tasks</h2>
      </div>

      <CommonTable
        columns={MyTaskColumn} 
        data={tasks}
        isLoading={loading}
        sortField={sortField}
        sortDirection={sortDirection}
        sortServer
        onSort={(column, direction) => {
          setSortField(column.name); 
          setSortDirection(direction);
        }}
        paginationProps={{
          isPagination: true,
          currentPage: page,
          totalCount: totalCount,
          rowsPerPageValue: rowsPerPage,
          setPageSelected: (p) => setPage(p),
          setRowsPerPageValue: (r) => setRowsPerPage(r),
        }}
      />
    </div>
  );
};

export default TaskList;
