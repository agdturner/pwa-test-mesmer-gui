import {
    Attributes, NumberWithAttributes
} from "./classes.js";

import {
    Molecule
} from "./molecule.js";

import {
    ReactionMolecule
} from "./reaction.js";
import { getEndTag, getStartTag, getTag } from "./xml.js";


/**
 * A class for representing a Pressure and Temperature pair.
 */
export class PTpair extends Attributes {

    /**
     * The pressure also stored as a string in the attributes.
     */
    P: number;

    /**
     * The temperature also stored as a string in the attributes.
     */
    T: number;

    /**
     * @param {Map<string, string>} attributes The attributes.
     */
    constructor(attributes: Map<string, string>) {
        super(attributes);
        let p: string | undefined = attributes.get("P");
        if (p) {
            this.P = parseFloat(p);
        } else {
            throw new Error("P is undefined");
        }
        let t: string | undefined = attributes.get("T");
        if (t) {
            this.T = parseFloat(t);
        } else {
            throw new Error("T is undefined");
        }
    }
}


/**
 * A class for representing a bath gas reaction molecule.
 */
export class BathGas extends ReactionMolecule {
    constructor(attributes: Map<string, string>, molecule: Molecule) {
        super(attributes, molecule);
    }
}

/**
 * A class for representing the experiment conditions.
 */
export class Conditions {

    /**
     * The bath gas.
     */
    bathGas: BathGas;

    /**
     * The Pressure and Temperature pair.
     */
    pTs: PTpair[];

    /**
     * @param {BathGas} bathGas The bath gas.
     * @param {PTpair} pTs The Pressure and Temperature pairs.
     */
    constructor(bathGas: BathGas, pTs: PTpair[]) {
        this.bathGas = bathGas;
        this.pTs = pTs;
    }

    /**
     * @returns A string representation.
     */
    toString() : string {
        return `Conditions(` +
            `bathGas(${this.bathGas.toString()}), ` +
            `pTs(${this.pTs.toString()}))`;
    }

    /**
     * @param padding The padding (optional).
     * @returns An XML representation.
     */
    toXML(pad?: string, padding?: string): string {
        let padding1: string = "";
        if (pad != undefined && padding != undefined) {
            padding1 = padding + pad;
        }
        let s: string = this.bathGas.toXML("bathGas", pad, padding1);
        this.pTs.forEach((pt) => {
            s += pt.toTag("PTpair", padding1);
        });
        return getTag(s, "conditions", undefined, undefined, undefined, padding, true);
    }
}