export default class CronParserValidator{
    
    public static handleRangeErrorExpression(arr: number[], name: string): void {
        if(arr.length !== 2 || isNaN(arr[0]) || isNaN(arr[1])) {
            throw new Error(`Invalid range, Please use only 2 interger in range min and max in ${name} expression`);
        }
        if(arr[0] > arr[1]) {
            throw new Error(`Start value can't be more than end value in ${name} expression`);
        }
    }

    public static handleIntervalErrorExpression(base: string, interval:string, name: string): void {
        if(base !== '*') {
            throw new Error(`Invalid expression, Please use * in range in ${name} expression`);
        }
        else if(!interval) {
            throw new Error(`Invalid expression, interval can't be empty in ${name} expression`);
        }
    }

    public static handleCommonError(unit: number, min: number, max: number, name: string): void {
        if(isNaN(unit)) {
            throw new Error(`Invalid expression in ${name}`);
        }
        else if(unit < min || unit > max) {
            throw new Error(`Please use interger value in range of ${min} - ${max} in ${name} expression`);
        }
        else if(!unit && unit !== 0) {
            throw new Error(`Value can't be empty in ${name} expression`);
        }
    }
}