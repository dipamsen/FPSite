export type Subject = "eng" | "hin" | "sci" | "mat" | "ssc"

export type CalendarEvent = {
  dates: string[],
  description: string,
  name: string,
  type: "test" | "holiday"
}