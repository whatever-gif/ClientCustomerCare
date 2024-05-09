import React, { useEffect, useState } from "react";

const CountTime = ({ baseTime }) => {
  if (!baseTime) return <></>;

  const parseTime = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(":").map(Number);
    return { hours, minutes, seconds };
  };

  const [time, setTime] = useState(parseTime(baseTime));

  //   console.log(parseTime(baseTime), baseTime);

  useEffect(() => {
    const timer = setInterval(() => {
      let crTime = time;
      crTime.seconds++;
      if (crTime.seconds === 60) {
        crTime.seconds = 0;
        crTime.minutes++;
      }
      if (crTime.minutes === 60) {
        crTime.minutes = 0;
        crTime.hours++;
      }
      setTime({ ...crTime });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (time) => (time < 10 ? `0${time}` : time);

  return (
    <div>
      {formatTime(time.hours)}:{formatTime(time.minutes)}:
      {formatTime(time.seconds)}
    </div>
  );
};

export default CountTime;
