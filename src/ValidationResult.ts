import { RuleName } from "./rules/Rule";

export interface ValidationFailureProperty {
    /**
     * If the property had `required` property and
     * was not declared
     */
    missing: boolean;
    /**
     * Rules in which the validation failed
     */
    rules: RuleName[];
}

/**
 * Represents the validation result of an object
 */
export default class ValidationResult {
    constructor(private failures?: ValidationFailures) {}
    /**
     * Returns if the result is a failure
     * @param property Property which you want information about failuring
     */
    public failed(property?: string | number | Array<string | number>): boolean {
        return typeof this.get(property) != 'undefined' ? true : false;
    }
    public get(property?: string | number | Array<string | number>) {
        if(this.failures == undefined)
            return undefined;

        if(Array.isArray(property)) {
            let failures: any = this.failures;

            for(const prop of property) {
                if(failures instanceof ValidationResult) {
                    if(!failures.failed(prop))
                        return undefined;

                    failures = failures.get(prop);
                } else if(typeof failures[prop] == 'undefined') {
                    return undefined;
                } else {
                    failures = failures[prop];
                }
            }

            return failures;
        }

        if(property)
            return this.failures[property];

        return this.failures;
    }
}

export type ValidationFailure = ValidationFailureProperty | ValidationResult;

export interface ValidationFailures {
    [s: string]: ValidationFailure;
}
