import { 
    NumberWithAttributes
 } from "./classes";
import { getSelfClosingTag } from "./html";
import { getTag } from "./xml";

/**
 * A class for the diagram energy offset.
 */
export class DiagramEnergyOffset extends NumberWithAttributes {
    
    /**
     * @param {Map<string, string>} attributes The attributes (ref refers to a particular reaction). 
     * @param {number} value The value.
     */
    constructor(attributes: Map<string, string>, value: number) {
        super(attributes, value);
    }
}

/**
 * A class for the control.
 */
export class Control {
    testDOS: boolean | undefined;
    printSpeciesProfile: boolean | undefined;
    testMicroRates: boolean | undefined;
    testRateConstant: boolean | undefined;
    printGrainDOS: boolean | undefined;
    printCellDOS: boolean | undefined;
    printReactionOperatorColumnSums: boolean | undefined;
    printTunnellingCoefficients: boolean | undefined;
    printGrainkfE: boolean | undefined;
    printGrainBoltzmann: boolean | undefined;
    printGrainkbE: boolean | undefined;
    eigenvalues: number | undefined;
    hideInactive: boolean | undefined;
    diagramEnergyOffset: DiagramEnergyOffset | undefined;
    constructor(testDOS?: boolean, printSpeciesProfile?: boolean, testMicroRates?: boolean, testRateConstant?:
        boolean, printGrainDOS?: boolean, printCellDOS?: boolean, printReactionOperatorColumnSums?:
            boolean, printTunnellingCoefficients?: boolean, printGrainkfE?: boolean, printGrainBoltzmann?: boolean,
        printGrainkbE?: boolean, eigenvalues?: number, hideInactive?: boolean, diagramEnergyOffset?: DiagramEnergyOffset) {
        this.testDOS = testDOS;
        this.printSpeciesProfile = printSpeciesProfile;
        this.testMicroRates = testMicroRates;
        this.testRateConstant = testRateConstant;
        this.printGrainDOS = printGrainDOS;
        this.printCellDOS = printCellDOS;
        this.printReactionOperatorColumnSums = printReactionOperatorColumnSums;
        this.printTunnellingCoefficients = printTunnellingCoefficients;
        this.printGrainkfE = printGrainkfE;
        this.printGrainBoltzmann = printGrainBoltzmann;
        this.printGrainkbE = printGrainkbE;
        this.eigenvalues = eigenvalues;
        this.hideInactive = hideInactive;
        this.diagramEnergyOffset = diagramEnergyOffset;
    }
    toString() {
        return `Control(` +
            `testDOS(${this.testDOS?.toString()}), ` +
            `printSpeciesProfile(${this.printSpeciesProfile?.toString()}), ` +
            `testMicroRates(${this.testMicroRates?.toString()}), ` +
            `testRateConstant(${this.testRateConstant?.toString()}), ` +
            `printGrainDOS(${this.printGrainDOS?.toString()}), ` +
            `printCellDOS(${this.printCellDOS?.toString()}), ` +
            `printReactionOperatorColumnSums(${this.printReactionOperatorColumnSums?.toString()}), ` +
            `printTunnellingCoefficients(${this.printTunnellingCoefficients?.toString()}), ` +
            `printGrainkfE(${this.printGrainkfE?.toString()}), ` +
            `printGrainBoltzmann(${this.printGrainBoltzmann?.toString()}), ` +
            `printGrainkbE(${this.printGrainkbE?.toString()}), ` +
            `eigenvalues(${this.eigenvalues?.toString()}), ` +
            `hideInactive(${this.hideInactive?.toString()}))`;
    }

    /**
     * Get the XML representation.
     * @param {string} pad The pad (Optional).
     * @param {string} padding The padding (Optional).
     * @returns An XML representation.
     */
    toXML(pad: string, padding?: string): string {
        let padding1: string = "";
        if (pad != undefined && padding != undefined) {
            padding1 = padding + pad;
        }
        let s: string = "\n";
        s += padding1 + getSelfClosingTag(null, "me:testDOS") + "\n";
        s += padding1 + getSelfClosingTag(null, "me:printSpeciesProfile") + "\n";
        s += padding1 + getSelfClosingTag(null, "me:testMicroRates") + "\n";
        s += padding1 + getSelfClosingTag(null, "me:testRateConstant") + "\n";
        s += padding1 + getSelfClosingTag(null, "me:printGrainDOS") + "\n";
        s += padding1 + getSelfClosingTag(null, "me:printCellDOS") + "\n";
        s += padding1 + getSelfClosingTag(null, "me:printReactionOperatorColumnSums") + "\n";
        s += padding1 + getSelfClosingTag(null, "me:printTunnellingCoefficients") + "\n";
        s += padding1 + getSelfClosingTag(null, "me:printGrainkfE") + "\n";
        s += padding1 + getSelfClosingTag(null, "me:printGrainBoltzmann") + "\n";
        s += padding1 + getSelfClosingTag(null, "me:printGrainkbE") + "\n";
        s += padding1 + getSelfClosingTag(null, "me:eigenvalues") + "\n";
        s += padding1 + getSelfClosingTag(null, "me:hideInactive");
        s += this.diagramEnergyOffset?.toXML("me:diagramEnergyOffset", padding1);
        return getTag(s, "control", undefined, undefined, null, padding, true);
    }
}