"use client";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface Props {
  value: number;
}

export default function CircularAtsScore({ value }: Props) {
  return (
    <div className="w-32 h-32">
      <CircularProgressbar
        value={value}
        text={`${value}%`}
        styles={buildStyles({
          textColor: "#ffffff",
          pathColor: value > 70 ? "#22c55e" : "#facc15",
          trailColor: "#374151",
          textSize: "18px",
        })}
      />
    </div>
  );
}
