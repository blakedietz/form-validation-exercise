import {validate} from "./financial-range";

describe("financial-range", () => {
    describe(validate.name, () => {
        test("both values must be defined if one value is defined", () => {

        });

        test("min cannot be greater than max", () => {
            const errors = validate({min: 2, max: 1});

            expect(errors.max).toBeDefined();
            expect(errors.min).toBeUndefined();
        });

        test("invalid values return errors", () => {

        });
    });
});