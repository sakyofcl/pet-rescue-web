export const PRIMITIVE_TYPES = {
    string: typeof (''),
    function: typeof (() => { })
};

export function isTypeOf(value, type) { return typeof (value) === type; }
export function isString(value) { return isTypeOf(value, PRIMITIVE_TYPES.string); }
export function isFunction(value) { return isTypeOf(value, PRIMITIVE_TYPES.function); }
