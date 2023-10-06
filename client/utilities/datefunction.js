export default function timeElapsed(incomingdate) {
  const created = new Date(incomingdate);
  const current = new Date();
  const ddiff = current - created;
  const differinSec = ddiff / 1000;
  const one = "1 minute";
  const minutesDifference = `${Math.floor(differinSec / 60)} minutes`;
  const hourDifference = `${Math.floor(differinSec / (60 * 60))} hours`;
  const dayDifference = `${Math.floor(differinSec / (60 * 60 * 24))} days`;
  const monthDifference = `${Math.floor(
    differinSec / (60 * 60 * 24 * 30.5)
  )} months`;
  const yearDifference = `${Math.floor(
    differinSec / (60 * 60 * 24 * 30.5 * 12)
  )} years`;
  if (differinSec < 60) {
    return one;
  } else if (differinSec < 3600) {
    return minutesDifference;
  } else if (differinSec < 86400) {
    return hourDifference;
  } else if (differinSec < 2635200) {
    return dayDifference;
  } else if (differinSec < 31622400) {
    return monthDifference;
  } else {
    return yearDifference;
  }
}
