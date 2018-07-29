import Rule from "./Rule";

export type RuleRangeComparisonType = 'gte' | 'lte' | 'lt' | 'gt';

export default class RuleRange extends Rule {
    constructor(private input: number, private type: RuleRangeComparisonType) {
        super();
    }
    public validate(value: any) {
        let n: number;
        if(typeof value == 'string')
            n = value.length;
        else if(typeof value == 'number')
            n = value;
        else if(Array.isArray(value))
            n = value.length;
        else
            throw new Error('Unexpected value');

        if(this.type == 'gte')
            return n >= this.input;
        else if(this.type == 'lte')
            return n <= this.input;
        else
            throw new Error('Invalid RangeComparisonType');
    }
}