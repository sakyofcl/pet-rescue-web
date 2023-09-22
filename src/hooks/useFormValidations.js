import { useState } from 'react';

const FIRST_ERROR = 0;

export function useFormValidations(validationSchema) {
    const [validationErrors, setValidationErrors] = useState([]);

    const onValidate = (dataToValidate) => {
        return validateFormData(dataToValidate, validationSchema(), setValidationErrors);
    };

    function validateValues(values, schema, resolveAllErrors, validateOptions){
        resolveAllErrors = resolveAllErrors || false;
        return schema.validate(values, Object.assign({}, { abortEarly: false }, validateOptions || {})).then(
            () => true,
            (errors) => Promise.reject((!resolveAllErrors ? getFirstErrorsFromValidationError : getAllErrorsFromValidationError)(errors)));
    };

    function validateFormData(values, schema, errorSetter) {
        return validateValues(values, schema, true).then(
            () => { return new Promise((resolve) => { errorSetter({}); resolve(); }); },
            (valErrors) => { return new Promise(() => { errorSetter(valErrors); }); });
    }

    var isValid = () => {
        return !Object.keys(validationErrors).length;
    };



    return [validationErrors, onValidate, isValid];
}

function getFirstErrorsFromValidationError(validationErrors) {
    return validationErrors.inner.reduce((errors, error) => {
        return ({ ...errors, [error.path]: error.errors[FIRST_ERROR] });
    }, {});
}

function getAllErrorsFromValidationError(validationErrors) {
    return validationErrors.inner.reduce((result, error) => {
        (result[error.path] || (result[error.path] = new ErrorsResolver()))[error.type] = error.message;
        return result;
    }, {});
}

class ErrorsResolver {
    constructor() { }

    first(predicateValue, negate) {
        const predicate = (value) => !predicateValue || (predicateValue && (negate ? value != predicateValue : value == predicateValue));
        return Object.keys(this) && Object.keys(this).some(predicate) ? this[Object.keys(this).filter(predicate)[FIRST_ERROR]] : '';
    }
}