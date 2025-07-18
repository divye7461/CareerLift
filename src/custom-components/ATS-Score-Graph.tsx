"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";

interface Props {
  atsScore: number;
}

const AtsScoreGraph = ({ atsScore }: Props) => {
  const category = getCategory(atsScore);
  const data = [
    { name: "Very Bad", value: 20 },
    { name: "Bad", value: 50 },
    { name: "Good", value: 75 },
    { name: "Very Good", value: 90 },
  ];

  const barColors: Record<string, string> = {
    "Very Bad": "#ef4444",
    Bad: "#f97316",
    Good: "#3b82f6",
    "Very Good": "#10b981",
  };

  return (
    <div>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="name" stroke="#ccc" />
          <YAxis hide />
          <Tooltip />
          <Bar dataKey="value">
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={
                  entry.name === category ? "#facc15" : barColors[entry.name]
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <p className="text-center mt-2 text-yellow-300">
        You scored <b>{atsScore}</b> — <i>{category}</i>
      </p>
    </div>
  );
};

function getCategory(score: number): string {
  if (score < 30) return "Very Bad";
  if (score < 60) return "Bad";
  if (score < 80) return "Good";
  return "Very Good";
}

export default AtsScoreGraph;
