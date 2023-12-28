import { formatDistanceToNow, parseISO } from "date-fns";

export const formatRelativeTime = (timestamp: string): string => {
  const parsedDate = parseISO(timestamp);
  return formatDistanceToNow(parsedDate, { addSuffix: true });
};

export default formatRelativeTime;
