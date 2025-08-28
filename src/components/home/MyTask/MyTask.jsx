import { useEffect, useState } from "react";
import { Button, Flex, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import TaskList from "./TaskList.jsx";
import AddTaskModal from "../modal/AddTaskModal.jsx";
import FilterModal from "../modal/FilterModal.jsx";  
import { useDispatch } from "react-redux";
import { fetchTasks } from "../../../redux/slices/taskSlice.jsx";

function MyTask() {
  const dispatch = useDispatch();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchTasks({ Page: 1, PerPage: 10, Search: search }));
  }, [dispatch, search]);

  return (
    <div style={{ marginTop: "1.5rem" }}>
      <Flex
        gap="0.75rem"
        mb="md"
        align="center"
        justify="space-between"
        wrap="wrap"
        style={{ width: "100%" }}
      >
        <Button onClick={() => setShowFilterModal(true)}>Filter</Button>

        <TextInput
          leftSection={<IconSearch size={18} />}
          placeholder="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flexGrow: 1, maxWidth: 300 }}
        />

        <Button onClick={() => setShowAddModal(true)}>Add Task</Button>
      </Flex>

      <TaskList />

      <AddTaskModal opened={showAddModal} handleClose={() => setShowAddModal(false)} />
      <FilterModal opened={showFilterModal} handleClose={() => setShowFilterModal(false)} />
    </div>
  );
}

export default MyTask;
