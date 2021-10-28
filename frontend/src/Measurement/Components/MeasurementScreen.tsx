import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

import MeasurementChart from "./MeasurementChart";
import MeasurementForm from "./MeasurementForm";
import { Measurement } from "../types";
import { currentUserSelector } from "../../User/reducer";

function MeasurementScreen() {
  const measurements = useSelector(currentUserSelector)?.measurements || [];

  const [showForm, setShowForm] = useState(false);
  const [happinessLevel, setHappinessLevel] =
    useState<number | undefined>(undefined);
  const [bodyWeight, setBodyWeight] = useState<number | undefined>(undefined);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [measurementId, setMeasurementId] =
    useState<string | undefined>(undefined);

  const handleClick = (measurement?: Measurement) => {
    setHappinessLevel(measurement?.happinessLevel);
    setBodyWeight(measurement?.bodyWeight);
    setDate(measurement?.date);
    setMeasurementId(measurement?._id);
    setShowForm(true);
  };

  const handleClose = () => {
    setHappinessLevel(undefined);
    setBodyWeight(undefined);
    setDate(undefined);
    setMeasurementId(undefined);
    setShowForm(false);
  };

  return (
    <Container>
      <Row className="text-center mt-2">
        <h1>Your measurement history</h1>
        {measurements.length ? (
          <p>Click on the measurements to edit them</p>
        ) : (
          <p>Please add your first measurement</p>
        )}
      </Row>
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <MeasurementChart handleClick={handleClick} />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col className="text-center">
          <Button variant="outline-success" onClick={() => handleClick()}>
            Add a measurement
          </Button>
        </Col>
      </Row>
      <MeasurementForm
        show={showForm}
        handleClose={handleClose}
        measurementId={measurementId}
        happinessLevel={happinessLevel}
        bodyWeight={bodyWeight}
        date={date}
      />
    </Container>
  );
}

export default MeasurementScreen;
