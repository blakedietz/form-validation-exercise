import React from "react";
import {Field} from "redux-form";
import {isValidShorthand} from "../../services/numeric-formatting/numeric-formatting";
import {convertMagnitudeShortHandToNumeric} from "../../services/numeric-formatting/numeric-formatting";

// Stole this from: https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
const isEmpty = (obj) => Object.entries(obj).length === 0 && obj.constructor === Object;

const shortCutExpansionNormalizer = (value) => (isValidShorthand(value) ? convertMagnitudeShortHandToNumeric(value) : value);

const validateNumericField = (value) => {
        if ((value !== undefined && isNaN(Number(value))) || (typeof Number(value) !== "number" && !isValidShorthand(value))) {
            return "Value must be a number or numeric shorthand such as 2.5k"
        }
        else {
            return undefined;
        }
};

export const validate = ({min, max}) => {
    let errors = {};


    console.log(`min ${min}, max ${max}`);
    // TODO: (bdietz) - talk with designer/tech writer about proper copy
    if ((max === undefined && min !== undefined)) {
        errors.max= "Required";
    }

    else if ((max !== undefined && min === undefined)) {
        errors.min = "Required";
    }


    if (isEmpty(errors) && (min >= max)) {
        errors = {
            // TODO: (bdietz) - talk with designer/tech writer about proper copy
            max: "Max must be greater than min"
        };
    }

    return errors;
};


const renderField = ({input, label, type, meta: {error}}) => (
    <div>
        <label>{label}</label>
        <div>
            <input {...input} placeholder={label} type={type}/>
            {(error && <span>{error}</span>)}
        </div>
    </div>
);

const FinancialRange = props => {
    const {handleSubmit, pristine, valid} = props;
    return (
        <form onSubmit={handleSubmit} autoComplete="off">
            <div>
                <Field component={renderField}
                       name="min"
                       label="min"
                       normalize={shortCutExpansionNormalizer}
                       type="text"
                       validate={[validateNumericField]}
                />
            </div>
            <div>
                <Field component={renderField}
                       label="max"
                       name="max"
                       normalize={shortCutExpansionNormalizer}
                       type="text"
                       validate={[validateNumericField]}
                />
            </div>
            {/*// TODO: (bdietz) - come up with default submit values*/}
            {/* // TODO: (bdietz) - submit to actual endpoint or mock...*/}
            <button type="submit" disabled={!(pristine || valid)}>Submit</button>
        </form>
    );
};

export {FinancialRange};
