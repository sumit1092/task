import { useEffect } from 'react';
import {
  Modal,
  Button,
  Group,
  Tooltip,
  TextInput,
  Textarea,
  Select,
  MultiSelect,
  FileInput
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import {
  addTask,
  fetchMembers,
  fetchTasks,
  fetchLeads
} from '../../../redux/slices/taskSlice.jsx';
import {
  showErrorNotification,
  showSuccessNotification
} from '../../../utility/index.jsx';
import { format } from 'date-fns';
import './AddTaskModal.css';

const TITLE_REGEX = /^[A-Za-z ]+$/;

const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

function AddTaskModal({ opened, handleClose }) {
  const dispatch = useDispatch();
  const { members, leads } = useSelector((s) => s.task);

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
      title="Add Task"
      centered
      closeOnClickOutside={false}
      size = "xl"
    >
      <Formik
        initialValues={{
          title: '',
          description: '',
          assignees: [],
          dueDate: null,
          priority: 'Medium',
          leadId: '',
          file: null,
        }}
        validationSchema={Yup.object({
          title: Yup.string()
            .matches(TITLE_REGEX, 'Only alphabets and spaces are allowed')
            .required('Task title is required'),
          description: Yup.string().required('Description is required'),
          // assignees: Yup.array()
          //   .min(1, 'Select at least one assignee'),
          //   .required('Assignees are required'),
          dueDate: Yup.date()
            .required('Due date is required')
            .nullable()
            .test('future-date', 'Due date must be in the future', (val) => {
              if (!val) return false;
              const today = new Date(); today.setHours(0, 0, 0, 0);
              return new Date(val) > today;
            }),
          priority: Yup.string().required('Priority is required'),
          // leadId: Yup.string().required('Lead is required'),
          file: Yup.mixed()
            .test('fileSize', 'File must be ≤ 2MB', (file) => {
              if (!file) return true;
              return file.size <= 2 * 1024 * 1024;
            }),
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            let attachmentBase64;
            if (values.file) {
              attachmentBase64 = await fileToBase64(values.file);
            }

            const payload = {
              Title: values.title.trim(),
              Description: values.description,
              DueDate: format(new Date(values.dueDate), 'yyyy-MM-dd'),
              AssigneeIds: values.assignees,
              Priority: values.priority,
              LeadId: values.leadId,
              AttachmentBase64: attachmentBase64,
            };

            await dispatch(addTask(payload)).unwrap();
            showSuccessNotification('Task added successfully!');
            resetForm();
            handleClose();
            dispatch(fetchTasks({ Page: 1, PerPage: 10 }));
          } catch (e) {
            showErrorNotification(e?.message || 'Failed to add task');
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ values, setFieldValue, touched, errors, isSubmitting }) => (
          <Form>
            {/* Title */}
            <Tooltip label="Only alphabets and spaces allowed" withArrow>
              <div className="mt-2">
                <TextInput 
                  className="field"
                  label="Task Title"
                  placeholder="Enter task title"
                  value={values.title}
                  onChange={(e) => setFieldValue('title', e.target.value)}
                  withAsterisk
                  error={touched.title && errors.title}
                />
              </div>
            </Tooltip>

            {/* Description */}
            <div className="mt-4">
              <Textarea
                className="field"
                label="Description"
                placeholder="Enter description"
                value={values.description}
                onChange={(e) => setFieldValue('description', e.target.value)}
                withAsterisk
                error={touched.description && errors.description}
              />
            </div>

            {/* Lead Select */}
            <div className="mt-4 ">
              <Select
                className="field"
                label="Select Lead"
                placeholder="Pick a lead"
                data={(leads || []).map((l) => ({
                  value: String(l.id),
                  label: l.name,
                }))}
                value={values.leadId}
                onChange={(val) => setFieldValue('leadId', val)}
                searchable
                withAsterisk
                error={touched.leadId && errors.leadId}
              />
            </div>

            {/* Assignees & Due Date */}
            <div className="flex gap-4 mt-4 ">
              <div className="flex-1">
                <Select
                  className="field"
                  label="Assignees"
                  placeholder="Pick users"
                  data={(members || []).map((u) => ({
                    value: String(u.id),
                    label: u.name,
                  }))}
                  value={values.assignees}
                  onChange={(v) => setFieldValue('assignees', v)}
                  searchable
                  withAsterisk
                  error={touched.assignees && errors.assignees}
                />
              </div>

              <div className="flex-1 field">
                <DateInput
                  className="field"
                  label="Due Date"
                  placeholder="Pick date"
                  value={values.dueDate}
                  onChange={(d) => setFieldValue('dueDate', d)}
                  withAsterisk
                  minDate={new Date()}
                  error={touched.dueDate && errors.dueDate}
                />
              </div>
            </div>

            {/* Priority */}
            <div className="mt-4 field">
              <Select
                className="field"
                label="Select Priority"
                value={values.priority}
                onChange={(val) => setFieldValue('priority', val)}
                data={[
                  { value: 'High', label: 'High' },
                  { value: 'Medium', label: 'Medium' },
                  { value: 'Low', label: 'Low' },
                ]}
                withAsterisk
                error={touched.priority && errors.priority}
              />
            </div>

            {/* File Upload */}
            <div className="mt-4 field">
              <FileInput
                className="field"
                label="Attachment (optional)"
                placeholder="Choose file (max 2MB)"
                value={values.file}
                onChange={(f) => setFieldValue('file', f)}
                error={touched.file && errors.file}
              />
            </div>

            {/* Action Buttons */}
            <Group justify="flex-end" mt="lg">
              <Button variant="default" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Save'}
              </Button>
            </Group>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}

export default AddTaskModal;