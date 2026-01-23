import * as UI from "../../src/index";

export default {
  title: "Date & Time",
};

export const FormatDateTime = {
  render: () =>
    UI.widgets.formatDateTime(
      new Date(),
      "{FullYear}-{Month}-{Date}T{Hours}:{Minutes}:{Seconds}.{Milliseconds}",
    ),

  name: "formatDateTime",
};

export const FormatDateTimeDate = {
  render: () => UI.widgets.formatDateTime(new Date(), "{Date}.{Month}.{Year}"),
  name: "formatDateTime date",
};

export const FormatDateTimeTime = {
  render: () =>
    UI.widgets.formatDateTime(new Date(), "{Hours}:{Minutes}:{Seconds}"),
  name: "formatDateTime time",
};

export const ShortDateNotTodayWithoutTime = {
  render: () => UI.widgets.shortDate("2020-01-01T15:43", true),
  name: "shortDate (not today & without time)",
};

export const ShortDateWithTimeButNotToday = {
  render: () => UI.widgets.shortDate("2020-01-01T15:43", false),
  name: "shortDate (with time, but not today)",
};

export const ShortDateTodayWithoutTime = {
  render: () => UI.widgets.shortDate(new Date().toISOString(), true),
  name: "shortDate (today & without time)",
};

export const ShortDateTodayWithTime = {
  render: () => UI.widgets.shortDate(new Date().toISOString(), false),
  name: "shortDate (today & with time)",
};

export const ShortTime = {
  render: () => UI.widgets.shortTime(),
  name: "shortTime",
};

export const Timestamp = {
  render: () => UI.widgets.timestamp(),
  name: "timestamp",
};
