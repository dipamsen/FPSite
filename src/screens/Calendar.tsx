import React, { useEffect, useState } from "react";
import { Temporal } from "proposal-temporal";
import Cal from "../components/MyCal";
import {
  Card,
  CardContent,
  CircularProgress,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { get } from "../shared/API";
import { CalendarEvent } from "../shared/types";

const Calendar: React.FC = () => {
  const [events, setEvents] = useState<Record<string, CalendarEvent[]>>({});

  useEffect(() => {
    async function getCal() {
      const cal: CalendarEvent[] = await get("/calendar");
      const r: Record<string, CalendarEvent[]> = {};
      for (const ev of cal) {
        for (const d of ev.dates) (r[d] = r[d] || []), r[d].push(ev);
      }
      setEvents(r);
      console.log(r);
    }
    getCal();
  }, []);

  const isMobile = !useMediaQuery("(min-width:700px)");
  const now = Temporal.now.plainDateISO();
  const todayMonth = new Temporal.PlainYearMonth(now.year, now.month);
  const [month, setMonth] = useState(todayMonth);
  const [selectedDate, setSelectedDate] = useState(now);
  return Object.keys(events).length > 0 ? (
    <div>
      <div
        className="calcon"
        style={{ display: "flex", flexDirection: isMobile ? "column" : "row" }}
      >
        <Cal
          month={month}
          date={selectedDate}
          monthSetter={setMonth}
          dateSetter={setSelectedDate}
          events={events}
        />

        <div className="selectedEvents">
          <h3>
            Date: {selectedDate.day.toString().padStart(2, "0")} /{" "}
            {selectedDate.month.toString().padStart(2, "0")} /{" "}
            {selectedDate.year.toString().padStart(4, "0")}
          </h3>
          <h4>{events[selectedDate.toString()] ? "Events:" : "No Events"}</h4>
          {events[selectedDate.toString()]?.map((val, i) => (
            <Card variant="outlined" key={i}>
              <CardContent>
                <Typography
                  gutterBottom
                  style={{ color: val.type == "test" ? "brown" : "blue" }}
                >
                  {val.type[0].toUpperCase() + val.type.slice(1)}
                </Typography>
                <Typography variant="h5" component="h2">
                  {val.name}
                </Typography>
                <div
                  dangerouslySetInnerHTML={{
                    __html: val.description,
                  }}
                ></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <CircularProgress />
  );
};

export default Calendar;
