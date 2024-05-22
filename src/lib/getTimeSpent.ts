
function convertPgTimestampToMs(pgTimestamp: string): number {
  const dateString = pgTimestamp.slice(0, pgTimestamp.indexOf("."));
  const dateObject = new Date(dateString);
  return dateObject.getTime();
}

export function calculateTimeSpent(pgTimeStamp: string): string {
  let createdAtMs = convertPgTimestampToMs(pgTimeStamp)
  const now = new Date().getTime();
  const timeDifference = now - createdAtMs;

  if (timeDifference < 0) {
    return "Record is from the future";
  } else {
    const seconds = Math.floor(timeDifference / 1000);
    if (seconds < 60) {
      return `${seconds} seconds`;
    } else if (seconds < 3600) {
      return `${Math.floor(seconds / 60)} minutes`;
    } else if (seconds < 86400) {
      return `${Math.floor(seconds / 3600)} hours`;
    } else {
      return `${Math.floor(seconds / 86400)} days`;
    }
  }
}


