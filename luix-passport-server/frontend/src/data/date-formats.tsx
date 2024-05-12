export type DateFormat = {
  value: string
  label: string
  dateTimeFormat: string
  dateFormat: string
  timeFormat: string
  sample: string
}

export const dateFormats = [
  { value: "1", label: "2021-09-10 10:15:00", dateTimeFormat: "YYYY-MM-DD HH:mm:ss", dateFormat: "YYYY-MM-DD", timeFormat: "HH:mm:ss" },
  { value: "2", label: "10 Sep 2021, 10:15 AM", dateTimeFormat: "DD MMM YYYY, HH:mm A", dateFormat: "DD MMM YYYY", timeFormat: "HH:mm A" },
  { value: "3", label: "10/09/2021, 10:15 AM", dateTimeFormat: "DD/MM/YYYY, HH:mm A", dateFormat: "DD/MM/YYYY", timeFormat: "HH:mm A" },
  { value: "4", label: "Sep 10, 2021 10:15 am", dateTimeFormat: "MMM DD, YYYY HH:mm a", dateFormat: "DD/MM/YYYY", timeFormat: "HH:mm a" }
]

