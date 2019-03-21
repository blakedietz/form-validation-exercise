import React from "react";
import TextField from '@material-ui/core/TextField';
import {Field} from "redux-form";
import {convertMagnitudeShortHandToNumeric} from "../../services/numeric-formatting/numeric-formatting";
import {isValidShorthand} from "../../services/numeric-formatting/numeric-formatting";
import Button from '@material-ui/core/Button';
import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    }
});

// Stole this from: https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
const isEmpty = (obj) => Object.entries(obj).length === 0 && obj.constructor === Object;

const shortCutExpansionNormalizer = (value) => (isValidShorthand(value) ? convertMagnitudeShortHandToNumeric(value) : value);

const validateNumericField = (value) => {
    if ((value !== undefined && isNaN(Number(value))) || (typeof Number(value) !== "number" && !isValidShorthand(value))) {
        return "Must be numeric"
    } else {
        return undefined;
    }
};

export const validate = ({min, max}) => {
    let errors = {};

    // TODO: (bdietz) - talk with designer/tech writer about proper copy
    if ((max === undefined && min !== undefined)) {
        errors.max = "Required";
    } else if ((max !== undefined && min === undefined)) {
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


const renderField = ({input, label, type, meta: {error}}) => {
    if (error) {
        return (<TextField error
                           label={error}
                           {...input}
        />);

    } else {
        return <TextField label={label} {...input}/>;
    }
};

let FinancialRange = props => {
    const {classes, handleSubmit, valid} = props;
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
            {/*<button type="submit" disabled={!(pristine || valid)}>Submit</button>*/}
            <Button
                type="submit"
                variant="contained"
                className={classes.button}
                disabled={!valid}
            >
               Submit
            </Button>
        </form>
    );
};

FinancialRange = withStyles(styles)(FinancialRange);

export {FinancialRange};
