# Cron Parser

**Cron Parser** is a tool to validate and parse cron expressions. It is useful when you want to ensure your cron expression are valid and also it will provide a list of time when your cron will executed based on the input.

## Features

+ **Validate Cron Expression:** Ensure the cron expression is correctly formatted.

+ **Parse Cron Expression:** Outputs a detailed breakdown of when the cron job will run (minutes, hours, days, etc.).

## Setup

Follow these steps to setup **Cron Parser** in your project:

1. Navigate to project directory:
```
cd project_dir
```

2. Install dependencies:
```
npm install
```

3. Build the project:
```
npm run build
```

4. Install the Cron Parser CLI tool locally:
```
npm i .
```

Now, we are ready to run **Cron Parser** in terminal.

## Usage

> ### **NOTE**
> If you see `permission denied: cron-parser` then you have to provide executable permissions to file by running below cmd in terminal

```
chmod +x dist/index.js
```

To test run the following command in terminal
```
cron-parser "*/15 0 1,15 * 1-5 /usr/bin/find"
```

### Output
```
minute            0 15 30 45
hour              0
day of month      1 15
month             0 1 2 3 4 5 6 7 8 9 10 11 12
day of week       1 2 3 4 5
command           /usr/bin/find
```

### Explanation:
+ **Minutes:** The cron job will run at 0, 15, 30, and 45 minutes past the hour.
+ **Hour:** It will only run at midnight (00:00).
+ **Day of Month:** The job will run on the 1st and 15th of every month.
+ **Month:** It will run in all months (January to December).
+ **Day of Week:** It will run on weekdays (Monday to Friday).
+ **Command:** The command /usr/bin/find will be executed.

### Run Tests
To run the test cases, use the following command:
```
npm run test
```
