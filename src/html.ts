/**
 * Create a table header row.
 * @param {string[]} headings The headings.
 * @returns {string} Table row with headings.
 */
export function getTH(headings: string[]): string {
    var th = "";
    for (let i = 0; i < headings.length; i++) {
        th += "<th>" + headings[i] + "</th>";
    }
    return getTR(th);
}

/**
 * Create a table cell.
 * @param {string} x A cell for a table row.
 * @param {boolean} contentEditable If true then the cell is set to be editable.  
 * @returns {string} x wrapped in td tags.
 */
export function getTD(x: string, contentEditable: boolean = false): string {
    let r: string = "<td";
    if (contentEditable) {
        r += " contenteditable=\"true\"";
    }
    r += ">" + x + "</td>";
    return r;
}

/**
 * Create a table row.
 * @param {string} x A row for a table.
 * @returns {string} x wrapped in tr tags.
 */
export function getTR(x: string): string {
    return "<tr>" + x + "</tr>\n";
}

/**
 * Create a table.
 * @param {string} x Table rows for a table.
 * @returns {string} x wrapped in table tags.
 */
export function getTable(x: string): string {
    return "<table>" + x + "</table>";
}

/**
 * Create a div.
 * @param {string} x The content of the div.
 * @param {string | null} id The id of the div.
 * @param {string | null} html_class The class of the div.
 * @returns {string} x wrapped in div tags.
 */
export function getDiv(x: string, id: string | null, html_class: string | null): string {
    let r: string = "<div";
    if (id !== null) {
        r += " id=\"" + id + "\"";
    }
    if (html_class !== null) {
        r += " class=\"" + html_class + "\"";
    }
    return r + ">" + x + "</div>";
}

/**
 * Create a input.
 * @param {string} type The input type (e.g. text, number).
 * @param {string | null} id The id of the button.
 * @param {string | null} func The function called on a change.
 * @param {string | null} value The value of the input.
 * @returns {string} An input HTML element.
 */
export function getInput(type: string, id: string | null, func: string | null,
    value : string | null): string {
    let r: string = "<input type=\"" + type + "\"";
    if (id !== null) {
        r += " id=\"" + id + "\"";
    }
    if (func !== null) {
        r += " onchange=\"" + func + "\"";
    }
    if (value !== null) {
        r += " value=\"" + value + "\"";
    }
    return r + ">";
}

/**
 * Create a self closing tag.
 * @param {Map<string, string> | null} attributes The attributes.
 * @param {string} tagName The tag name.
 */
export function getSelfClosingTag(attributes: Map<string, string> | null, tagName: string): string {
    let s: string = "<" + tagName;
    if (attributes) {
        for (let [key, value] of attributes) {
            s += " " + key + "=\"" + value + "\"";
        }
    }
    return s + " />";
}