import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button, Form, Modal } from "react-bootstrap";

import {
  addMeasurement,
  deleteMeasurement,
  updateMeasurement,
} from "../actions";

interface Props {
  measurementId?: string;
  happinessLevel?: number;
  bodyWeight?: number;
  date?: Date;
  handleClose: () => void;
  show: boolean;
}

function MeasurementForm(props: Props) {
  const dispatch = useDispatch();

  const [happinessLevel, setHappinessLevel] = useState(props.happinessLevel);
  const [bodyWeight, setBodyWeight] = useState(props.bodyWeight);
  const [date, setDate] = useState(props.date);

  useEffect(() => {
    setBodyWeight(props.bodyWeight);
    setHappinessLevel(props.happinessLevel);
    if (props.date) {
      setDate(new Date(props.date));
    }
  }, [props]);

  const formatDate = (value: Date) => {
    const date = new Date(value);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const handleDelete = () => {
    if (props.measurementId) {
      dispatch(deleteMeasurement({ measurementId: props.measurementId }));
    }
    props.handleClose();
  };
  const handleForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (happinessLevel && bodyWeight && date) {
      if (props.measurementId) {
        dispatch(
          updateMeasurement({
            content: { happinessLevel, bodyWeight, date },
            measurementId: props.measurementId,
          })
        );
      } else {
        dispatch(
          addMeasurement({
            content: { happinessLevel, bodyWeight, date },
          })
        );
      }
    }
    props.handleClose();
  };

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Form onSubmit={handleForm}>
        <Modal.Header closeButton>
          <Modal.Title>
            {props.measurementId ? "Update" : "Add"} a measurement
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Happiness level (0-10)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter value..."
              min={0}
              max={10}
              defaultValue={props.happinessLevel}
              onChange={(event) =>
                setHappinessLevel(event.target.value as unknown as number)
              }
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Body weight (kg)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter value..."
              min={0}
              defaultValue={props.bodyWeight}
              step="0.1"
              onChange={(event) =>
                setBodyWeight(event.target.value as unknown as number)
              }
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Date</Form.Label>
            {props.date ? (
              <Form.Control
                type="text"
                value={formatDate(props.date)}
                required
                readOnly
              />
            ) : (
              <Form.Control
                type="date"
                onChange={(event) => setDate(new Date(event.target.value))}
                required
              />
            )}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          {props.measurementId ? (
            <Button variant="outline-danger" onClick={handleDelete}>
              Delete
            </Button>
          ) : null}
          <Button
            className="justify-content-center"
            variant={`outline-${props.measurementId ? "warning" : "success"}`}
            type="submit"
          >
            {props.measurementId ? "Update" : "Add"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default MeasurementForm;
