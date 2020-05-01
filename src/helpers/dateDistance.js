import { formatDistanceToNow } from "date-fns";

export default function (date) {
  return formatDistanceToNow(date)
    .replace("about ", "")
    .replace("less than a minute", "1min")
    .replace(" minutes", "min")
    .replace(" minute", "min")
    .replace(" hours", "h")
    .replace(" hour", "h")
    .replace(" days", "d")
    .replace(" day", "d")
    .replace(" months", "m")
    .replace(" month", "m");
}
