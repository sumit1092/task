import { Check, CircleCheck, CircleDashed, Trash2 } from "lucide-react";
import { Tooltip, ActionIcon, Group } from "@mantine/core";
import { format } from "date-fns";

const MyTaskColumn = [
  {
    name: "Title",
    selector: (row) => row.Title,
    sortable: true,
    cell: (row) => (
      <Tooltip label={`Title: ${row.Title}`} withArrow>
        <span>{row.Title}</span>
      </Tooltip>
    ),
  },
  {
    name: "Customer Name",
    selector: (row) => row.CustomerName,
    sortable: true,
    cell: (row) => (
      <Tooltip label={`Customer: ${row.CustomerName}`} withArrow>
        <span>{row.CustomerName}</span>
      </Tooltip>
    ),
  },
  {
    name: "Assigned By",
    selector: (row) => row.AssignedBy,
    sortable: true,
    cell: (row) => (
      <Tooltip label={`Assigned By: ${row.AssignedBy}`} withArrow>
        <span>{row.AssignedBy}</span>
      </Tooltip>
    ),
  },
  {
    name: "Assigned Date",
    selector: (row) => row.AssignedDate,
    sortable: true,
    cell: (row) => {
      const date = row.AssignedDate ? format(new Date(row.AssignedDate), "dd MMM yyyy") : "-";
      return (
        <Tooltip label={`Assigned Date: ${date}`} withArrow>
          <span>{date}</span>
        </Tooltip>
      );
    },
  },
  {
    name: "Due Date",
    selector: (row) => row.DueDate,
    sortable: true,
    cell: (row) => {
      const date = row.DueDate ? format(new Date(row.DueDate), "dd MMM yyyy") : "-";
      return (
        <Tooltip label={`Due Date: ${date}`} withArrow>
          <span>{date}</span>
        </Tooltip>
      );
    },
  },
  {
    name: "Priority",
    selector: (row) => row.Priority,
    sortable: true,
    cell: (row) => (
      <Tooltip label={`Priority: ${row.Priority}`} withArrow>
        <span>{row.Priority}</span>
      </Tooltip>
    ),
  },
  {
    name: "Status",
    selector: (row) => row.Status,
    sortable: true,
    cell: (row) => (
      <Tooltip label={`Status: ${row.Status}`} withArrow>
        <span>{row.Status}</span>
      </Tooltip>
    ),
  },
  {
    name: (
      <Tooltip label="Actions" withArrow>
        <span>Actions</span>
      </Tooltip>
    ),
    cell: (row) => (
      <Group gap="xs">
        <Tooltip label="Accept" withArrow>
          <ActionIcon onClick={() => handleStatus(row.TaskID || row.id, "ACCEPTED")}>
            <Check size={16} />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Complete" withArrow>
          <ActionIcon onClick={() => handleStatus(row.TaskID || row.id, "COMPLETED")}>
            <CircleCheck size={16} />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Partial Complete" withArrow>
          <ActionIcon onClick={() => handleStatus(row.TaskID || row.id, "PARTIAL")}>
            <CircleDashed size={16} />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Delete" withArrow>
          <ActionIcon color="red" onClick={() => handleDelete(row.TaskID || row.id)}>
            <Trash2 size={16} />
          </ActionIcon>
        </Tooltip>
      </Group>
    ),
  },
];

export default MyTaskColumn;
