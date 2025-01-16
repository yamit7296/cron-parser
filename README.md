**Cron-parser** 

It's a tool which validate and parse the cron expression. Useful when you want to validate cron expression, also it will give you list of units when your cron will run based on input


Steps to setup cron parser

1. move inside the project directy
```
cd root_directory
```

2. Install the dependencies
```
npm i
```

3. Build the project
```
npm run build
```

4. To access cron-parser in terminal
```
npm i .
```

Now we are ready to run cron-parser. Let's run below code to test
```
cron-parser "*/15 0 1,15 * 1-5 /usr/bin/find"
```