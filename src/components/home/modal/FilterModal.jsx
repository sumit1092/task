import { Modal, Button, Group, Select } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import {
  fetchTasks,
  fetchMembers,
  fetchLeads,
} from "../../../redux/slices/taskSlice.jsx";
import { useEffect } from "react";
import { showSuccessNotification, showErrorNotification } from "../../../utility/index.jsx";

function FilterModal({ opened, handleClose }) {
  const dispatch = useDispatch();
  const { members, leads } = useSelector((s) => s.task);

  // fetch dropdown data when modal opens
  useEffect(() => {
    if (opened) {
      dispatch(fetchMembers());
      dispatch(fetchLeads());
    }
  }, [opened, dispatch]);

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title="Filter Tasks"
      centered
      closeOnClickOutside={false}
      size="lg"
    >
      <Formik
        initialValues={{
          leadId: "",
          assigneeId: "",
          priority: "",
          fromDate: null,
          toDate: null,
        }}
        validationSchema={Yup.object({
          fromDate: Yup.date().nullable(),
          toDate: Yup.date()
            .nullable()
            .when("fromDate", (fromDate, schema) =>
              fromDate
                ? schema.min(
                    fromDate,
                    "To Date cannot be earlier than From Date"
                  )
                : schema
            ),
        })}
        onSubmit={(values) => {
          try {
            const filters = {
              Page: 1,
              PerPage: 10,
              LeadId: values.leadId || undefined,
              AssigneeId: values.assigneeId || undefined,
              Priority: values.priority || undefined,
              FromDate: values.fromDate
                ? new Date(values.fromDate).toISOString()
                : null,
              ToDate: values.toDate
                ? new Date(values.toDate).toISOString()
                : null,
            };

            console.log("filters", filters);

            dispatch(fetchTasks(filters));
            showSuccessNotification("Task filtered successfully!");
            handleClose();
          } catch (err) {
            showErrorNotification(err?.message || "Filter failed");
          }
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div className="mt-4">
              <Select
                label="Lead"
                placeholder="Select Lead"
                data={(leads || []).map((l) => ({
                  value: String(l.id),
                  label: l.name,
                }))}
                value={values.leadId}
                onChange={(val) => setFieldValue("leadId", val)}
                searchable
              />
            </div>

            <div className="mt-4">
              <Select
                label="Assignee"
                placeholder="Select Assignee"
                data={(members || []).map((m) => ({
                  value: String(m.id),
                  label: m.name,
                }))}
                value={values.assigneeId}
                onChange={(val) => setFieldValue("assigneeId", val)}
                searchable
              />
            </div>

            <div className="mt-4">
              <Select
                label="Priority"
                placeholder="Select Priority"
                data={[
                  { value: "High", label: "High" },
                  { value: "Medium", label: "Medium" },
                  { value: "Low", label: "Low" },
                ]}
                value={values.priority}
                onChange={(val) => setFieldValue("priority", val)}
              />
            </div>

            <div className="flex gap-4 mt-4">
              <DateInput
                label="From Date"
                placeholder="Pick From Date"
                value={values.fromDate}
                onChange={(d) => setFieldValue("fromDate", d)}
              />
              <DateInput
                label="To Date"
                placeholder="Pick To Date"
                value={values.toDate}
                onChange={(d) => setFieldValue("toDate", d)}
              />
            </div>

            <Group justify="flex-end" mt="lg">
              <Button variant="default" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit">Apply Filters</Button>
            </Group>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}

export default FilterModal;
