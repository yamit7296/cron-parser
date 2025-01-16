import { FieldType } from "./types/core-type";

export default class CronParser {
    private fields: FieldType[]= [];
    private command: string;

    constructor(cron:string) {
        const cronArr = cron.split(' ');
        if(cronArr.length != 6) {
            throw new Error("cron expression does not have valid length");
        }
        const [minute, hour, dayOfMonth, month, dayOfWeeks, command] = cronArr;

        this.fields = [
            {name: 'minute', value: minute, min: 0, max: 59},
            {name: 'hour', value: hour, min: 0, max: 23},
            {name: 'day of month', value: dayOfMonth, min: 1, max: 31},
            {name: 'month', value: month, min: 0, max: 12},
            {name: 'day of week', value: dayOfWeeks, min: 0, max: 7}
        ];
        this.command = command;
    }

    public validate() {
        this.fields.forEach((field) => {
            let {name, value, min, max} = field;
            let arr: number[] = [];
            
            if(value.includes(',')) {
                arr = value.split(',').map((v) => Number(v));
            }
            else if(value.includes('-')) {
                arr = value.split('-').map((v) => Number(v));
                if(arr.length > 2) {
                    throw new Error(`Invalid range, Please use only 2 interger in range min and max for ${name}`);
                }
                if(arr[0] > arr[1]) {
                    throw new Error(`Start value can't be more than end value for ${name}`);
                }
            }
            else if(value.includes('/')) {
                const [base, interval] = value.split('/');
                if(base !== '*') {
                    throw new Error(`Invalid expression, Please use * in range for ${name}`);
                }
                else if(!interval) {
                    throw new Error(`Invalid expression, interval can't be empty for ${name}`);
                }
                min = 1; 
                arr.push(Number(interval));
            }
            else if(value !== '*' && !isNaN(Number(value))) {
                arr.push(Number(value))
            }
            else if(value != '*'){
                throw new Error(`Please use interger value only for ${name}`)
            }

            arr.forEach((v) => {
                if(isNaN(v)) {
                    throw new Error(`Please use interger value only for ${name}`);
                }
                else if(v < min || v > max) {
                    throw new Error(`Please use interger value in range of ${min} - ${max} only for ${name}`);
                }
                else if(!v) {
                    throw new Error(`value can't be empty only for ${name}`);
                }
            })
        });
    }

    public parse(): void {
        this.fields.forEach((field) => {
            let {name, value, min, max} = field;
            let arr: number[] = [];
            
            if(value === '*') {
                for(let i = min; i <= max; i++) {
                    arr.push(i);
                }
            }
            else if(value.includes(',')) {
                arr = value.split(',').map((v) => Number(v)); 
            }
            else if(value.includes('-')) {
                const [rangeMin, rangeMax] = value.split('-').map((v) => Number(v));
                for(let i = rangeMin; i <= rangeMax; i++) {
                    arr.push(i);
                }
            }
            else if(value.includes('/')) {
                const interval = Number(value.split('/')[1]);
                for(let i = min; i <= max; i = i+interval) {
                    arr.push(i);
                }
            }
            else if(!isNaN(Number(value))) {
                arr.push(Number(value))
            }
            console.log(`${name.padEnd(14)} ${arr.join(' ')}`)
        });
        console.log(`${'command'.padEnd(14)} ${this.command}`);
    }
}