import Rule from './Rule';

export type GetRuleFunction = (
    value: string,
    property: number | string
) => Rule | Promise<Rule> | undefined;

export default class RuleConditional extends Rule {
    constructor(private getRule: GetRuleFunction) {
        super();
    }
    public async validate(value: any, property: number | string) {
        const rule = await this.getRule(value, property);

        if(rule == undefined)
            return true;

        return rule.validate(value, property);
    }
}