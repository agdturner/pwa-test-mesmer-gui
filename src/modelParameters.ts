import {
    NumberWithAttributes
} from "./classes";
import { getEndTag, getStartTag, getTag } from "./xml";

/**
 * A class for measures of grain size.
 */
export class GrainSize extends NumberWithAttributes {

    /**
     * @param {string} units The units.
     */
    constructor(attributes: Map<string, string>, value: number) {
        super(attributes, value);
    }
    toString() {
        return `GrainSize(${super.toString()})`;
    }
}

/**
 * A class for model parameters.
 */
export class ModelParameters {

    /**
     * The grain size.
     */
    grainSize: GrainSize;
    
    /**
     * The energy above the top hill.
     */
    energyAboveTheTopHill: number;

    /**
     * @param {GrainSize} grainSize The grain size.
     * @param {number} energyAboveTheTopHill The energy above the top hill.
     */
    constructor(grainSize: GrainSize, energyAboveTheTopHill: number) {
        this.grainSize = grainSize;
        this.energyAboveTheTopHill = energyAboveTheTopHill;
    }

    toString() {
        return `ModelParameters(` +
            `grainSize(${this.grainSize.toString()}), ` +
            `energyAboveTheTopHill(${this.energyAboveTheTopHill.toString()}))`;
    }

    /**
     * Get the XML representation.
     * @param {string} pad The pad (Optional).
     * @param {string} padding The padding (Optional).
     * @returns An XML representation.
     */
    toXML(pad?: string, padding?: string): string {
        let padding2: string = "";
        if (pad != undefined && padding != undefined) {
            padding2 = padding + pad;
        }
        let s: string = this.grainSize.toXML("me:GrainSize", padding2);
        s += getTag(this.energyAboveTheTopHill.toString(), "me:EnergyAboveTheTopHill", undefined, undefined, undefined, padding2, false);
        return getTag(s, "me:modelParameters", undefined, undefined, undefined, padding, true);
    }
}
