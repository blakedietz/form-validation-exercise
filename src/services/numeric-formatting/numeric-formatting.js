export const MAGNITUDES = {
    THOUSAND: 1e3,
    MILLION: 1e6,
    BILLION: 1e9,
    TRILLION: 1e12,
};

const SUPPORTED_SHORTHANDS = new Map([
    ["k", MAGNITUDES.THOUSAND],
    ["K", MAGNITUDES.THOUSAND],
    ["m", MAGNITUDES.MILLION],
    ["M", MAGNITUDES.MILLION],
    ["bn", MAGNITUDES.BILLION],
    ["B", MAGNITUDES.BILLION],
    ["T", MAGNITUDES.TRILLION],
    ["tn", MAGNITUDES.TRILLION],
]);


export const convertMagnitudeShortHandToNumeric = shorthand => {
    const matchedKey = [...SUPPORTED_SHORTHANDS.keys()].filter((key) => {
        return shorthand.includes(key);
    }).pop();

    const numericString = Number(shorthand.replace(matchedKey, ''));

    return numericString * SUPPORTED_SHORTHANDS.get(matchedKey);
};

export const isValidShorthand = shorthand => {
    // TODO: (bdietz) - it's a trap :) this is not easily extensible and could be hard to maintain write another example

    /**
     * Unpacking this regex:
     *
     * ^(-*\d*(\.\d+)*) meat and potatoes for numeric aspect of the shorthand
     * ^ forces only numbers to be allowed at beginning of the given string
     *
     * (-*\d*)? handles the first half of input before the .
     * - 0
     * - -0
     *
     * (\.\d+)? allows for including a . in the number * where \.d+ is the capture group that forces the digit to repeat
     * at least once after the . occurs this allows for cases such as:
     *
     * - 0.0
     * - .0
     *
     * ? allows for zero or one occurence of . along with numbers but disallows accidentally throwing more . in,
     * so it stops 0.0.0.0.0. from happening
     *
     * (k|K|m|M|bn|B|T|tn)$ is responsible for ensuring that the shorthand forms are availalable
     *
     */
    return /^((-*\d*)?(\.\d+)?)(k|K|m|M|bn|B|T|tn)$/.test(shorthand);
};

