import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddUsersModal = ({ show, handleClose, setSelectedUsers, selectedUsers }) => {
  const [users, setUsers] = useState([]);
  const [checkedUsers, setCheckedUsers] = useState(selectedUsers);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, []);

  const handleCheck = (user) => {
    setCheckedUsers((prev) =>
      prev.find((u) => u.id === user.id)
        ? prev.filter((u) => u.id !== user.id)
        : [...prev, user]
    );
  };

  const handleSave = () => {
    setSelectedUsers(checkedUsers);
    handleClose();
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="md"
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>Members</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {users.map((user) => (
            <Form.Check
              key={user.id}
              type="checkbox"
              label={user.name}
              checked={checkedUsers.some((u) => u.id === user.id)}
              onChange={() => handleCheck(user)}
            />
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddUsersModal;
