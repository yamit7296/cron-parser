import CronParser from "../cron-parser";

describe('CronParser', () => {
  test('should throw an error for an invalid cron expression length', () => {
    const invalidCron = '5 10 15 * *';
    expect(() => new CronParser(invalidCron)).toThrow('cron expression does not have valid length');
  });

  test('should throw an error if a field has an invalid range', () => {
    const invalidCron = '5 10 15 1 30 /usr/bin/command';
    const cronParser = new CronParser(invalidCron);
    expect(() => cronParser.validate()).toThrow('Please use interger value in range of 0 - 7 only for day of week');
  });

  test('should throw an error if a field has an invalid value (e.g., non-integer)', () => {
    const invalidCron = '5 10 15 a 1 /usr/bin/command';
    const cronParser = new CronParser(invalidCron);
    expect(() => cronParser.validate()).toThrow('Please use interger value only for month');
  });

  test('should throw an error if the range is inverted (min > max)', () => {
    const invalidCron = '5 10 15 6-1 1 /usr/bin/command';
    const cronParser = new CronParser(invalidCron);
    expect(() => cronParser.validate()).toThrow('Start value can\'t be more than end value for month');
  });

  test('should parse and print the cron fields correctly', () => {
    const cron = '5 10 15 1 1 /usr/bin/command';
    const cronParser = new CronParser(cron);
    console.log = jest.fn(); 
    cronParser.parse();

    expect(console.log).toHaveBeenCalledWith(`${'minute'.padEnd(14)} 5`);
    expect(console.log).toHaveBeenCalledWith(`${'hour'.padEnd(14)} 10`);
    expect(console.log).toHaveBeenCalledWith(`${'day of month'.padEnd(14)} 15`);
    expect(console.log).toHaveBeenCalledWith(`${'month'.padEnd(14)} 1`);
    expect(console.log).toHaveBeenCalledWith(`${'day of week'.padEnd(14)} 1`);
    expect(console.log).toHaveBeenCalledWith(`${'command'.padEnd(14)} /usr/bin/command`);
  });

  test('should parse "*" fields correctly', () => {
    const cron = '* * * * * /usr/bin/command';
    const cronParser = new CronParser(cron);

    console.log = jest.fn(); 
    cronParser.parse();

    expect(console.log).toHaveBeenCalledWith(`${'minute'.padEnd(14)} 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59`);
    expect(console.log).toHaveBeenCalledWith(`${'hour'.padEnd(14)} 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23`);
    expect(console.log).toHaveBeenCalledWith(`${'day of month'.padEnd(14)} 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31`);
    expect(console.log).toHaveBeenCalledWith(`${'month'.padEnd(14)} 0 1 2 3 4 5 6 7 8 9 10 11 12`);
    expect(console.log).toHaveBeenCalledWith(`${'day of week'.padEnd(14)} 0 1 2 3 4 5 6 7`);
    expect(console.log).toHaveBeenCalledWith(`${'command'.padEnd(14)} /usr/bin/command`);
  });

});
