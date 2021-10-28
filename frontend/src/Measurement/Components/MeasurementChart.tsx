import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useSelector } from "react-redux";

import { currentUserSelector } from "../../User/reducer";
import { Measurement } from "../types";

interface Props {
  handleClick: (measurement?: Measurement) => void;
}

function MeasurementChart(props: Props) {
  const measurements = useSelector(currentUserSelector)?.measurements || [];

  const formatDate = (value: number) => new Date(value).toLocaleDateString();
  const handleClick = (_: any, payload: any) =>
    props.handleClick(measurements[payload.index]);

  return (
    <ResponsiveContainer width="100%" height={450}>
      <LineChart
        data={measurements.map((measurement) => ({
          ...measurement,
          date: new Date(measurement.date).getTime(),
        }))}
        margin={{
          top: 25,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          domain={["dataMin", "dataMax"]}
          type="number"
          scale="time"
          tickFormatter={formatDate}
          interval={"preserveStartEnd"}
        />
        <YAxis
          label={{
            value: "Body weight",
            angle: -90,
            position: "insideLeft",
            offset: -5,
          }}
          unit="Kg"
          yAxisId="left"
          domain={["dataMin - 5", "dataMax + 5"]}
        />
        <YAxis
          label={{
            value: "Happiness level",
            angle: 90,
            position: "insideRight",
            offset: 15,
          }}
          yAxisId="right"
          domain={[0, 10]}
          orientation="right"
        />
        <Tooltip labelFormatter={formatDate} />
        <Legend />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="bodyWeight"
          name="Body weight"
          stroke="#8884d8"
          activeDot={{ onClick: handleClick }}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="happinessLevel"
          name="Happiness level"
          stroke="#82ca9d"
          activeDot={{ onClick: handleClick }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default MeasurementChart;
