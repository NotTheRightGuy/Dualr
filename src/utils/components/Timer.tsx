import React from "react";
import { Timer as Clock } from "lucide-react";

export function Timer({ startTime }: { startTime?: number }) {
  const [time, setTime] = React.useState("00:00");

  React.useEffect(() => {
    const initialTime = startTime ? new Date(startTime) : new Date();

    const updateTime = () => {
      const now = new Date();
      const diff = now.getTime() - initialTime.getTime();
      const minutes = Math.floor(diff / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);

      setTime(
        `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      );
    };

    updateTime(); // Initial update
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  return (
    <div className="flex items-center gap-2">
      <Clock />
      <p className="font-semibold">{time}</p>
    </div>
  );
}
