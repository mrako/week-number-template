const weeknumber = require('../src/weeknumber');

describe('getWeekNumber', () => {
  it('should return current week if no date is given', () => {
    const currentDate = new Date();
    const currentWeek = weeknumber.getWeekNumber();
    expect(weeknumber.getWeekNumber(currentDate)).toEqual(currentWeek);
  });

  it('should return correct week for Thursday in 2023', async () => {
    const date = new Date("2023-06-22T12:00:00.000");
    expect(weeknumber.getWeekNumber(date)).toEqual(25);
  });

  it('should return correct week for a leap year', () => {
    const date = new Date("2020-02-29T00:00:00.000");
    expect(weeknumber.getWeekNumber(date)).toEqual(9);
  });

  it('should return week 1 for the first week of 2023 with at least 4 days', () => {
    const date = new Date("2023-01-02T00:00:00.000");
    expect(weeknumber.getWeekNumber(date)).toEqual(1);
  });

  it('should return week 50 for Sunday 15th of December 2024', () => {
    const date = new Date("2024-12-15T00:00:00.000");
    expect(weeknumber.getWeekNumber(date)).toEqual(50);
  });
});
