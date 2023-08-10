import React, { useEffect, useState } from "react";
import moment from "moment";

function MatchTimer({ match }) {
  const startDate = moment(match.match_date, "YYYY-MM-DD");
  const startTime = moment(match.start_time, "HH:mm:ss");

  const [currentTime, setCurrentTime] = useState(moment());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const startDateTime = startDate.clone().set({
    hour: startTime.hours(),
    minute: startTime.minutes(),
    second: startTime.seconds(),
  });

  if (currentTime.isBefore(startDateTime)) {
    return "00:00";
  }

  const diff = moment.duration(Math.abs(startDateTime.diff(currentTime)));
  let totalMinutes = Math.floor(diff.asMinutes());
  let seconds = diff.seconds();

  if (totalMinutes > 90) {
    return "90:00";
  }

  return (
    <span>
      {totalMinutes?totalMinutes:"00"} : {seconds?seconds:"00"}
    </span>
  );
}

export default MatchTimer;
