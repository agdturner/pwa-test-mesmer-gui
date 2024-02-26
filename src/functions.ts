/**
 * For convertina a map to a string.
 * @param map The map to convert to a string.
 * @returns A string representation of all the entries in the map.
 */
export function mapToString(map: Map<any, any>): string {
    if (map == null) {
        return "";
    }
    return Array.from(map.entries()).map(([key, value]) =>
        `${key == null ? "null" : key.toString()}(${value == null ? "null" : value.toString()})`).join(', ');
}

/**
 * For converting an array to a string.
 * @param {any[]} array The array to convert to a string.
 * @param {string} delimiter The (optional) delimiter.
 */
export function arrayToString(array: any[], delimiter: string): string {
    if (array == null) {
        return "";
    }
    if (delimiter == null) {
        delimiter = ', ';
    }
    return array.map((value) => value == null ? "null" : value.toString()).join(delimiter);
}

/**
 * For converting a string array to a number array.
 * @param {string[]} s The string to convert to a number array.
 * @returns A number array.
 */
export function toNumberArray(s: string[]): number[] {
    let r: number[] = [];
    for (let i = 0; i < s.length; i++) {
        r.push(parseFloat(s[i]));
    }
    return r;
}

/**
 * Is the string numeric in that it can be parsed as a float that is not a NaN?
 * @param {string} s The string.
 * @returns True if the string can be parsed as a float that is not a NaN and false otherwise.
 */
export function isNumeric(s: string): boolean {
    return !isNaN(parseFloat(s));
}