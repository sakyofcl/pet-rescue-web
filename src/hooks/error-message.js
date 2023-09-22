import React from 'react';
import { isString, isFunction } from './checking';

export const ErrorMessage = ({ errors, propertyName, errorSelector }) => {

    errorSelector = !(errors && errors[propertyName]) ? null
        : (!errorSelector) ? ((isString(errors[propertyName])) ? errors[propertyName] : errors[propertyName][Object.keys(errors[propertyName])[0]])
            : (!isFunction(errorSelector)) ? errors[propertyName][errorSelector]
                : ((errorSelector = Array.prototype.find.call(Object.keys(errors[propertyName]), errorSelector))) ? errors[propertyName][errorSelector]
                    : null;
    return (
        <>
            {(!!errorSelector) && <span className='error-msg'>{errorSelector}</span>}
        </>
    );
};


export function wrapWithErrorObject(Component, errors) {
    return function WrappedWithErrors(props) {
        return (<Component {...{ errors, ...props }} />);
    };
}