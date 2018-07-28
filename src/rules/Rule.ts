import ValidationResult from "../ValidationResult";

export type RuleName = string;
export type RuleResult = boolean | ValidationResult;
export default abstract class Rule {
    constructor(private name: string = "unnamed") {}
    public setName(name: string) {
        this.name = name;
        return this;
    }
    public getName(): string {
        return this.name;
    }
    public abstract validate(value: any, property: string | number): Promise<RuleResult> | RuleResult;
}