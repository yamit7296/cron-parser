#!/usr/bin/env node

import CronParser from "./cron-parser";

try {
    if(!process.argv[2]) {
        throw new Error("Please provide cron input");
    }
    const parser = new CronParser(process.argv[2]);
    parser.validate();
    parser.parse();
} catch (error: any) {
    console.log(error.message)
}
    


