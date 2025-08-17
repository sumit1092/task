import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import * as Yup from "yup";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import AddUsersModal from "./AddUsersModal";
import "./AddTaskModal.css";

const AddTaskModal = ({ show, handleClose }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("others"); // 'others' or 'me'

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .matches(/^[A-Za-z\s]+$/, "Only alphabets are allowed")
      .required("Task title is required"),
    dueDate: Yup.date()
      .required("Due date is required")
      .min(
        new Date(new Date().setDate(new Date().getDate() + 1)),
        "Due date must be greater than today"
      ),
    file: Yup.mixed()
      .required("File is required")
      .test("fileSize", "File size must be less than 2 MB", (value) => {
        return value && value.size <= 2 * 1024 * 1024;
      }),
  });

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    const fileBase64 = await convertToBase64(values.file);

    const payload = {
      ...values,
      users: selectedUsers, // include selected users
      file: fileBase64,
    };

    console.log("Final Task Payload:", payload);

    setTimeout(() => {
      alert("Task Added Successfully");
      resetForm();
      setSubmitting(false);
      handleClose();
    }, 1000);
  };

  // State for Add Users modal
  const [showUsersModal, setShowUsersModal] = useState(false);

  return (
    <>
      {/* Main Add Task Modal */}
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        centered
        backdrop="static"
        className="add-task-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title className="modal-title">Add Task</Modal.Title>
        </Modal.Header>

        {/* Tabs */}
        <div className="add-task-tabs">
          <button
            type="button"
            className={activeTab === "others" ? "active" : ""}
            onClick={() => setActiveTab("others")}
          >
            Assign to Others
          </button>
          <button
            type="button"
            className={activeTab === "me" ? "active" : ""}
            onClick={() => setActiveTab("me")}
          >
            Assign to Me
          </button>
        </div>

        <Formik
          initialValues={{
            title: "",
            dueDate: "",
            file: null,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, isSubmitting }) => (
            <FormikForm>
              <Modal.Body>
                {/* Task Title */}
              <div className="row">
              <div className="mt-5">
                <Form.Group>
                  <Field
                    name="title"
                    className="form-control"
                    placeholder="Enter task title"
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="text-danger"
                  />
                </Form.Group>
              </div>
                
                {/* <div className="col-md-6"> */}
                <Form.Group className="mt-5">
                  <Form.Control
                    as="textarea"
                    rows={1}
                    placeholder="Enter description"
                  />
                </Form.Group>
                {/* </div> */}

              </div>




                <div className="d-flex gap-2 mt-5">
                  <Form.Group className="mb-3 flex-fill">
                    <Form.Select>
                      <option>Select...</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3 flex-fill">
                    <Form.Control type="date" placeholder="Due Date"/>
                  </Form.Group>
                </div>

                <Form.Group className="mb-3">
                  <Form.Label>Select Priority</Form.Label>
                  <Form.Select>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </Form.Select>
                </Form.Group>

                {activeTab === "others" && (
                  <Form.Group className="mb-3">
                    <Form.Label>Add Users *</Form.Label>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="ms-2"
                    >
                      Add Users
                    </Button>
                  </Form.Group>
                )}

                {/* File Upload */}
                <Form.Group className="mt-3">
                  <input
                    type="file"
                    className="form-control"
                    placeholder="Attach file"
                    onChange={(event) => {
                      setFieldValue("file", event.currentTarget.files[0]);
                    }}
                  />
                  <ErrorMessage
                    name="file"
                    component="div"
                    className="text-danger"
                  />
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={handleClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-add"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Add"}
                </button>
              </Modal.Footer>
            </FormikForm>
          )}
        </Formik>
      </Modal>

      {/* Add Users Modal */}
      <AddUsersModal
        show={showUsersModal}
        handleClose={() => setShowUsersModal(false)}
        setSelectedUsers={setSelectedUsers}
        selectedUsers={selectedUsers}
      />
    </>
  );
};

export default AddTaskModal;
