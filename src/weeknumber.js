function getWeekNumber(date = new Date()) {
  // Copy date so don't modify original
  const target = new Date(date.valueOf());

  // ISO week date weeks start on Monday, so correct the day number
  const dayNr = (date.getDay() + 6) % 7;

  // Set the target to the Thursday of this week so the week number is correct
  target.setDate(target.getDate() - dayNr + 3);

  // ISO 8601 week date year
  const firstThursday = new Date(target.getFullYear(), 0, 4);

  // Adjust to Thursday in week 1 and count number of weeks from date to week 1
  const weekNumber = 1 + Math.round(((target.getTime() - firstThursday.getTime()) / 86400000
    - 3 + ((firstThursday.getDay() + 6) % 7)) / 7);

  return weekNumber;
}

module.exports = { getWeekNumber };
