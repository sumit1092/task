import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, updateTaskStatus, deleteTask } from "../../../redux/slices/taskSlice";
import CommonTable from "../../CommonTable/CommonTable"; 
import MyTaskColumn from "./MyTaskColumn";

function TaskList() {
  const dispatch = useDispatch();
  const { tasks, totalCount, loading } = useSelector((s) => s.task);

  return (
    <CommonTable
      columns={MyTaskColumn}
      data={tasks || []}  
      isLoading={loading}
      sortField="Title"
      stickyHeader={true}
      sortDirection="asc"
      sortServer={true}
      paginationProps={{
        isPagination: true,
        currentPage: 1,
        totalCount: totalCount,
        rowsPerPageValue: 10,
        setPageSelected: (page) => dispatch(fetchTasks({ Page: page, PerPage: 10 })),
        setRowsPerPageValue: (perPage, page) => dispatch(fetchTasks({ Page: page, PerPage: perPage })),
      }}
    />
  );
}

export default TaskList;
