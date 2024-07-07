import React from "react";
import { Timer as Clock } from "lucide-react";

export function Timer() {
  const [time, setTime] = React.useState("00:00");

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        const [minutes, seconds] = prev.split(":");
        let newMinutes = parseInt(minutes);
        let newSeconds = parseInt(seconds) + 1;

        if (newSeconds === 60) {
          newMinutes += 1;
          newSeconds = 0;
        }

        return `${newMinutes.toString().padStart(2, "0")}:${newSeconds
          .toString()
          .padStart(2, "0")}`;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2">
      <Clock />
      <p className="font-semibold">{time}</p>
    </div>
  );
}
