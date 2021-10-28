import { useEffect, useState } from "react";
import { Button, Container, Modal, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import MeasurementScreen from "./Measurement/Components/MeasurementScreen";
import { getUser } from "./User/actions";
import { currentUserSelector, errorSelector, resetError } from "./User/reducer";
import { ErrorEnum } from "./utils/errors";

function AppLayout() {
  const dispatch = useDispatch();
  const user = useSelector(currentUserSelector);
  const error = useSelector(errorSelector);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    dispatch(getUser({}));
  }, [dispatch]);

  useEffect(() => {
    setShowError(error ? true : false);
  }, [error]);

  const errorMessage = () => {
    switch (error) {
      case ErrorEnum.BAD_CONNECTION:
        return "This was not supposed to happen... Did you start the API?";
      case ErrorEnum.SAME_DATE_MEASUREMENT:
        return "You can not have multiple measurements on the same day!";
      default:
        return "This was not supposed to happen...";
    }
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Lenus Demo</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>Welcome {user?.name}</Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <MeasurementScreen />

      <Modal show={showError} onHide={() => dispatch(resetError())}>
        <Modal.Header closeButton>
          <Modal.Title>{error}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{errorMessage()}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-warning"
            onClick={() => window.location.reload()}
          >
            {error === ErrorEnum.SAME_DATE_MEASUREMENT ? "Cancel" : "Refresh"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AppLayout;
