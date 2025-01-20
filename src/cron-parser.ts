import { FieldType } from "./types/core-type";
import CronParserValidator from "./cron-parser-validator";

export default class CronParser {
    private fields: FieldType[]= [];
    private command: string;

    constructor(cron:string) {
        const cronExpressions = cron.split(' ');
        if(cronExpressions.length != 6) {
            throw new Error("cron expression length should be 6 units separated by space.");
        }
        const [minute, hour, dayOfMonth, month, dayOfWeeks, command] = cronExpressions;

        this.fields = [
            {name: 'minute', value: minute, min: 0, max: 59},
            {name: 'hour', value: hour, min: 0, max: 23},
            {name: 'day of month', value: dayOfMonth, min: 1, max: 31},
            {name: 'month', value: month, min: 1, max: 12},
            {name: 'day of week', value: dayOfWeeks, min: 1, max: 7}
        ];
        this.command = command;
    }

    public validate(): void {
        this.fields.forEach((field) => {
            const {name, value, min, max} = field;
            const values = this.getValueFromExpression(value, name);
            values.forEach((v) => CronParserValidator.handleCommonError(v, min, max, name))
        });
    }

    public parse(): void {
        this.fields.forEach((field) => {
            const { name, value } = field;
            const values = this.getValueFromExpression(value, name);
            console.log(`${name.padEnd(14)} ${values.join(' ')}`)
        });
        console.log(`${'command'.padEnd(14)} ${this.command}`);
    }

    private getValueFromExpression(value: string, name: string): number[] {
        if(value === '*') {
            const { min, max } = this.fields.find(field => field.name === name)!;
            return this.getTimeUnits(min, max, 1);
        }
        else if(value.includes(',')) {
            const values =  value.split(',');
            const units: number[]= [];
            values.forEach((v) => {
                units.push(...this.getValueFromExpression(v, name));
            })
            return units;
        }
        else if(value.includes('-')){
            const [rangeMin, rangeMax] = value.split('-').map(Number);
            CronParserValidator.handleRangeErrorExpression([rangeMin, rangeMax], name);
            return this.getTimeUnits(rangeMin, rangeMax, 1);
        }
        else if(value.includes('/')) {
            const [base, interval] = value.split('/');
            CronParserValidator.handleIntervalErrorExpression(base, interval, name);
            const { min, max } = this.fields.find(field => field.name === name)!;
            return this.getTimeUnits(min, max, Number(interval));
        }
        else if(value !== '' && !isNaN(Number(value))) {
            return [Number(value)];
        }
        throw new Error(`Invalid cron expression '${value}' in '${name}'`);
    }

    private getTimeUnits(min: number, max: number, interval: number): number[] {
        let units: number[] = [];
        for(let i = min; i <= max; i+=interval) {
            units.push(i);
        }
        return units;
    }
}