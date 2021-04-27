import React, { useState, useEffect } from "react";
import { Temporal } from "proposal-temporal";
import "./calendar.css";
import { IconButton } from "@material-ui/core";
import { CalendarToday, ChevronLeft, ChevronRight } from "@material-ui/icons";
import { CalendarEvent } from "../shared/types";

const today = Temporal.now.plainDateISO();
const thisMonth = new Temporal.PlainYearMonth(today.year, today.month);

const validMonths = [
  thisMonth.toString(),
  thisMonth.add({ months: 1 }).toString(),
];

export default function MyCal({
  month,
  date: selectedDate,
  monthSetter,
  dateSetter: setSelectedDate,
  events,
}: {
  month: Temporal.PlainYearMonth;
  date: Temporal.PlainDate;
  monthSetter: React.Dispatch<React.SetStateAction<Temporal.PlainYearMonth>>;
  dateSetter: React.Dispatch<React.SetStateAction<Temporal.PlainDate>>;
  events: Record<string, CalendarEvent[]>;
}): JSX.Element {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [dates, setDates] = useState<Temporal.PlainDate[]>([]);
  useEffect(() => {
    const firstDay = month.toPlainDate({ day: 1 }).dayOfWeek % 7;
    const result = [];

    const lastMonth = month.add({ months: -1 });
    const first = lastMonth.daysInMonth - firstDay + 1;
    for (let i = first; i <= lastMonth.daysInMonth; i++)
      result.push(lastMonth.toPlainDate({ day: i }));

    for (let i = 1; i <= month.daysInMonth; i++)
      result.push(month.toPlainDate({ day: i }));

    const daysToGo = 6 * 7 - result.length;
    const nextMonth = month.add({ months: 1 });
    for (let i = 1; i <= daysToGo; i++)
      result.push(nextMonth.toPlainDate({ day: i }));
    setDates(result);
  }, [month]);

  const dateClickHandler = (date: Temporal.PlainDate) => {
    date.month == month.month ? setSelectedDate(date) : null;
  };

  return (
    <div className="calendar">
      <div className="header">
        <span className="title">
          {
            [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ][month.month - 1]
          }{" "}
          {month.year}
        </span>
        <div className="navicons">
          <IconButton
            disabled={
              new Temporal.PlainYearMonth(
                new Date().getFullYear(),
                new Date().getMonth() + 1
              ).equals(month) &&
              Temporal.now.plainDateISO().equals(selectedDate)
            }
            onClick={() => {
              monthSetter(
                new Temporal.PlainYearMonth(
                  new Date().getFullYear(),
                  new Date().getMonth() + 1
                )
              );
              setSelectedDate(Temporal.now.plainDateISO());
            }}
          >
            <CalendarToday />
          </IconButton>
          <IconButton
            disabled={
              !validMonths.includes(month.add({ months: -1 }).toString())
            }
            onClick={() => monthSetter(month.add({ months: -1 }))}
          >
            <ChevronLeft />
          </IconButton>
          <IconButton
            disabled={
              !validMonths.includes(month.add({ months: 1 }).toString())
            }
            onClick={() => monthSetter(month.add({ months: 1 }))}
          >
            <ChevronRight />
          </IconButton>
        </div>
      </div>
      <div className="tabular">
        <div className="top-row">
          {daysOfWeek.map((day, i) => (
            <span key={i}>{day}</span>
          ))}
        </div>
        <div className="days">
          {dates.map((date, i) => (
            <div
              className={`day ${
                date.equals(selectedDate) && date.month == month.month
                  ? "selected"
                  : ""
              }`}
              key={i}
              onClick={() => dateClickHandler(date)}
            >
              <span className={date.month == month.month ? "" : "other"}>
                {date.day}
              </span>
              {events[date.toString()]?.filter((x) => x.type == "test").length >
                0 && <div className="dot red" />}
              {events[date.toString()]?.filter((x) => x.type == "holiday")
                .length > 0 && <div className="dot green" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
