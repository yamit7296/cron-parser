# Cron Parser

**Cron Parser** is a tool to validate and parse cron expressions. It is useful when you want to ensure your cron expression are valid and also it will provide a list of time when your cron will executed based on the input.

## Features

+ **Validate Cron Expression:** Ensure the cron expression is correctly formatted.

+ **Parse Cron Expression:** Outputs a detailed breakdown of when the cron job will run (minutes, hours, days, etc.).

## Setup

Follow these steps to setup **Cron Parser** in your project:


### Cloning the Repository

To clone the repository and set up the project locally, follow these steps:

1. Open a terminal window on your computer.
2. Navigate to the directory where you want to clone the repository.
3. Run the following command to clone the repository:

```bash
git clone https://github.com/yamit7296/cron-parser.git
```

4. Navigate to project directory:
```
cd cron-parser
```

5. Install dependencies:
```
npm install
```

6. Build the project:
```
npm run build
```

7. Install the Cron Parser CLI tool locally:
```
npm i -g .
```

Now, we are ready to run **Cron Parser** in terminal.

## Usage

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
