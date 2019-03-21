import {
    MAGNITUDES,
    convertMagnitudeShortHandToNumeric,
    isValidShorthand,
} from "./numeric-formatting";

const {
    THOUSAND,
    MILLION,
    BILLION,
    TRILLION,
} = MAGNITUDES;

describe("numeric-formatting", () => {
    describe(convertMagnitudeShortHandToNumeric.name, () => {
        test("Handles non-decimal conversion", () => {
            expect(convertMagnitudeShortHandToNumeric("2k")).toBe(2 * THOUSAND);
            expect(convertMagnitudeShortHandToNumeric("2K")).toBe(2 * THOUSAND);
            expect(convertMagnitudeShortHandToNumeric("2m")).toBe(2 * MILLION);
            expect(convertMagnitudeShortHandToNumeric("2M")).toBe(2 * MILLION);
            expect(convertMagnitudeShortHandToNumeric("2bn")).toBe(2 * BILLION);
            expect(convertMagnitudeShortHandToNumeric("2B")).toBe(2 * BILLION);
            expect(convertMagnitudeShortHandToNumeric("2T")).toBe(2 * TRILLION);
            expect(convertMagnitudeShortHandToNumeric("2tn")).toBe(2 * TRILLION);
        });
        test("Handles decimal conversion", () => {
            expect(convertMagnitudeShortHandToNumeric("2.3k")).toBe(2.3 * THOUSAND);
            expect(convertMagnitudeShortHandToNumeric("2.3K")).toBe(2.3 * THOUSAND);
            expect(convertMagnitudeShortHandToNumeric("2.3m")).toBe(2.3 * MILLION);
            expect(convertMagnitudeShortHandToNumeric("2.3M")).toBe(2.3 * MILLION);
            expect(convertMagnitudeShortHandToNumeric("2.3bn")).toBe(2.3 * BILLION);
            expect(convertMagnitudeShortHandToNumeric("2.3B")).toBe(2.3 * BILLION);
            expect(convertMagnitudeShortHandToNumeric("2.3T")).toBe(2.3 * TRILLION);
            expect(convertMagnitudeShortHandToNumeric("2.3tn")).toBe(2.3 * TRILLION);
        });
    });

    describe(isValidShorthand.name, () => {
        test("Handles shorthands without decimal", () => {
            expect(isValidShorthand("2k")).toBeTruthy();
            expect(isValidShorthand("2K")).toBeTruthy();
            expect(isValidShorthand("2m")).toBeTruthy();
            expect(isValidShorthand("2M")).toBeTruthy();
            expect(isValidShorthand("2bn")).toBeTruthy();
            expect(isValidShorthand("2B")).toBeTruthy();
            expect(isValidShorthand("2T")).toBeTruthy();
            expect(isValidShorthand("2tn")).toBeTruthy();
        });

        test("Handles shorthands with decimal", () => {
            expect(isValidShorthand("2.0k")).toBeTruthy();
            expect(isValidShorthand("2.0K")).toBeTruthy();
            expect(isValidShorthand("2.0m")).toBeTruthy();
            expect(isValidShorthand("2.0M")).toBeTruthy();
            expect(isValidShorthand("2.0bn")).toBeTruthy();
            expect(isValidShorthand("2.0B")).toBeTruthy();
            expect(isValidShorthand("2.0T")).toBeTruthy();
            expect(isValidShorthand("2.0tn")).toBeTruthy();
        });

        test("Handles negative shorthands without decimal", () => {
            expect(isValidShorthand("-2k")).toBeTruthy();
            expect(isValidShorthand("-2K")).toBeTruthy();
            expect(isValidShorthand("-2m")).toBeTruthy();
            expect(isValidShorthand("-2M")).toBeTruthy();
            expect(isValidShorthand("-2bn")).toBeTruthy();
            expect(isValidShorthand("-2B")).toBeTruthy();
            expect(isValidShorthand("-2T")).toBeTruthy();
            expect(isValidShorthand("-2tn")).toBeTruthy();
        });

        test("fails when no shorthand is given", () => {
            expect(isValidShorthand("2")).toBeFalsy();
            expect(isValidShorthand("b2")).toBeFalsy();
            expect(isValidShorthand("b")).toBeFalsy();

        });

        test("fails on incomplete shorthand", () => {
            expect(isValidShorthand("2.")).toBeFalsy();
            expect(isValidShorthand("-2.")).toBeFalsy();
            expect(isValidShorthand("-2.k")).toBeFalsy();
            expect(isValidShorthand("-.k")).toBeFalsy();
        });
    });
});
