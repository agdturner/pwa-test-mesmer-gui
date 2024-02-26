import {
    mapToString
} from './functions.js';

import {
    Molecule
} from './molecule.js';

import {
    Attributes, NumberWithAttributes
} from './classes.js';

import {
    getTag
} from './xml.js';

/**
 * A class for representing a Reaction Molecule.
 */
export class ReactionMolecule extends Attributes {

    /**
     * A reference to the molecule.
     */
    molecule: Molecule;

    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {Molecule} molecule The molecule.
     */
    constructor(attributes: Map<string, string>, molecule: Molecule) {
        super(attributes);
        this.molecule = molecule;
    }

    /**
     * Get the XML representation.
     * @param {string} tagName The tag name.
     * @param {string} pad The pad for an extra level of padding (Optional).
     * @param {string} padding The padding (Optional).
     * @returns An XML representation.
     */
    toXML(tagName: string, pad?: string | undefined, padding?: string | undefined): string {
        let padding1: string = "";
        if (pad != undefined && padding != undefined) {
            padding1 = padding + pad;
        }
        let s: string = this.toTag("molecule", padding1);
        return getTag(s, tagName, undefined, undefined, undefined, padding, true);
    }
}

/**
 * A class for representing a reactant.
 * This is a molecule often with a role in a reaction.
 */
export class Reactant extends ReactionMolecule {

    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {Molecule} molecule The molecule.
     */
    constructor(attributes: Map<string, string>, molecule: Molecule) {
        super(attributes, molecule);
    }
}

/**
 * A class for representing a product.
 * This is a molecule produced in a reaction.
 */
export class Product extends ReactionMolecule {

    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {Molecule} molecule The molecule.
     */
    constructor(attributes: Map<string, string>, molecule: Molecule) {
        super(attributes, molecule);
    }

}

/**
 * A class for representing a transition state.
 */
export class TransitionState extends ReactionMolecule {

    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {Molecule} molecule The molecule.
     */
    constructor(attributes: Map<string, string>, molecule: Molecule) {
        super(attributes, molecule);
    }

    /**
     * A convenience method to get the ref (the molecule ID) of the transition state.
     * @returns The ref of the transition state.
     */
    getRef(): string {
        let s: string | undefined = this.attributes.get("ref");
        if (s == null) {
            throw new Error('Attribute "ref" is undefined.');
        }
        return s;
    }
}


/**
 * A class for representing the Arrhenius pre-exponential factor.
 */
export class PreExponential extends NumberWithAttributes {

    /**
     * A class for representing the Arrhenius pre-exponential factor.
     * @param {Map<string, string>} attributes The attributes. 
     * @param {number} value The value of the factor.
     */
    constructor(attributes: Map<string, string>, value: number) {
        super(attributes, value);
    }
}

/**
 * A class for representing the Arrhenius activation energy factor.
 */
export class ActivationEnergy extends NumberWithAttributes {

    /**
     * A class for representing the Arrhenius pre-exponential factor.
     * @param {Map<string, string>} attributes The attributes. 
     * @param {number} value The value of the factor.
     */
    constructor(attributes: Map<string, string>, value: number) {
        super(attributes, value);
    }
}

/**
 * A class for representing the reference temperature.
 */
export class TInfinity extends NumberWithAttributes {

    /**
     * @param {Map<string, string>} attributes The attributes. 
     * @param {number} value The value of the factor.
     */
    constructor(attributes: Map<string, string>, value: number) {
        super(attributes, value);
    }
}

/**
 * A class for representing the modified Arrhenius parameter factor.
 */
export class NInfinity extends NumberWithAttributes {

    /**
     * @param {Map<string, string>} attributes The attributes. 
     * @param {number} value The value of the factor.
     */
    constructor(attributes: Map<string, string>, value: number) {
        super(attributes, value);
    }
}

/**
 * A class for representing tunneling.
 */
export class Tunneling extends Attributes {
    
    /**
     * @param {Map<string, string>} attributes The attributes.
     */
    constructor(attributes: Map<string, string>) {
        super(attributes);
    }
}

/**
 * A class for representing the MCRCMethod specifications.
 * Extended classes indicate how microcanonical rate constant is to be treated.
 */
export class MCRCMethod extends Attributes {

    /**
     * The name of the method.
     */
    mCRCMethodName: string;

    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {string} name The name or xsi:type of the method.
     */
    constructor(attributes: Map<string, string>, name: string) {
        super(attributes);
        this.mCRCMethodName = name;
    }
    toString() {
        return `MCRCMethod(name(${this.mCRCMethodName}))`;
    }
}

/**
 * A class for representing the inverse Laplace transform (ILT) type of microcanonical rate constant.
 */
export class MesmerILT extends MCRCMethod {

    /**
     * The pre-exponential factor.
     */
    preExponential: PreExponential | undefined;
    
    /**
     * The activation energy.
     */
    activationEnergy: ActivationEnergy | undefined;
    
    /**
     * The TInfinity.
     */
    tInfinity: TInfinity | undefined;
    
    /**
     * The nInfinity.
     */
    nInfinity: NInfinity | undefined;

    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {PreExponential | undefined} preExponential The pre-exponential factor.
     * @param {ActivationEnergy | undefined} activationEnergy The activation energy.
     * @param {TInfinity | undefined} tInfinity The TInfinity.
     * @param {NInfinity | undefined} nInfinity The nInfinity.
     */
    constructor(attributes: Map<string, string>, preExponential: PreExponential | undefined,
        activationEnergy: ActivationEnergy | undefined, tInfinity: TInfinity | undefined,
        nInfinity: NInfinity | undefined) {
        super(attributes, "MesmerILT");
        this.preExponential = preExponential;
        this.activationEnergy = activationEnergy;
        this.tInfinity = tInfinity;
        this.nInfinity = nInfinity;
    }

    toString() {
        return `MesmerILT(${super.toString()}, ` +
            `preExponential(${this.preExponential}), ` +
            `activationEnergy(${this.activationEnergy}), ` +
            `TInfinity(${this.tInfinity}), ` +
            `nInfinity(${this.nInfinity}))`;
    }

    /**
     * Get the XML representation.
     * @param {string} tagName The tag name.
     * @param {string} padding The padding (Optional).
     * @returns An XML representation.
     */
    override toXML(tagName: string, padding?: string | undefined): string {
        let padding1: string = "";
        if (padding != undefined) {
            padding1 = padding + "  ";
        }
        let preExponential_xml: string = "";
        if (this.preExponential != undefined) {
            preExponential_xml = this.preExponential.toXML("me.preExponential", padding1);
        }
        let activationEnergy_xml: string = "";
        if (this.activationEnergy != undefined) {
            activationEnergy_xml = this.activationEnergy.toXML("me.activationEnergy", padding1);
        }
        let tInfinity_xml: string = "";
        if (this.tInfinity != undefined) {
            tInfinity_xml = this.tInfinity.toXML("me.nInfinity", padding1);
        }
        let nInfinity_xml: string = "";
        if (this.nInfinity != undefined) {
            nInfinity_xml = this.nInfinity.toXML("me.nInfinity", padding1);
        }
        return getTag(preExponential_xml + activationEnergy_xml + tInfinity_xml + nInfinity_xml,
            tagName, this.attributes, undefined, undefined, padding, true);
    }
}

/**
 * A class for representing the Zhu-Nakamura crossing MCRCMethod.
 */
export class ZhuNakamuraCrossing extends MCRCMethod {
    harmonicReactantDiabat_FC: number;
    harmonicReactantDiabat_XO: number;
    harmonicProductDiabat_DE: number;
    exponentialProductDiabat_A: number;
    exponentialProductDiabat_B: number;
    exponentialProductDiabat_DE: number;

    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {number} harmonicReactantDiabat_FC The harmonic reactant diabatic FC.
     * @param {number} harmonicReactantDiabat_XO The harmonic reactant diabatic XO.
     * @param {number} harmonicProductDiabat_DE The harmonic product diabatic DE.
     * @param {number} exponentialProductDiabat_A The exponential product diabatic A.
     * @param {number} exponentialProductDiabat_B The exponential product diabatic B.
     * @param {number} exponentialProductDiabat_DE The exponential product diabatic DE.
     */
    constructor(attributes: Map<string, string>,
        harmonicReactantDiabat_FC: number,
        harmonicReactantDiabat_XO: number,
        harmonicProductDiabat_DE: number,
        exponentialProductDiabat_A: number,
        exponentialProductDiabat_B: number,
        exponentialProductDiabat_DE: number) {
        super(attributes, "ZhuNakamuraCrossing");
        this.harmonicReactantDiabat_FC = harmonicReactantDiabat_FC;
        this.harmonicReactantDiabat_XO = harmonicReactantDiabat_XO;
        this.harmonicProductDiabat_DE = harmonicProductDiabat_DE;
        this.exponentialProductDiabat_A = exponentialProductDiabat_A;
        this.exponentialProductDiabat_B = exponentialProductDiabat_B;
        this.exponentialProductDiabat_DE = exponentialProductDiabat_DE;
    }
    toString() {
        return `ZhuNakamuraCrossing(${super.toString()}, ` +
            `harmonicReactantDiabat_FC(${this.harmonicReactantDiabat_FC.toString()}), ` +
            `harmonicReactantDiabat_XO(${this.harmonicReactantDiabat_XO.toString()}), ` +
            `harmonicProductDiabat_DE(${this.harmonicProductDiabat_DE.toString()}), ` +
            `exponentialProductDiabat_A(${this.exponentialProductDiabat_A.toString()}), ` +
            `exponentialProductDiabat_B(${this.exponentialProductDiabat_B.toString()}), ` +
            `exponentialProductDiabat_DE(${this.exponentialProductDiabat_DE.toString()}))`;
    }
}

/**
 * A class for representing the sum of states.
 * @param {string} units The units of energy.
 * @param {boolean} angularMomentum The angular momentum attribute.
 * @param {boolean} noLogSpline The no log spline attribute.
 * @param {SumOfStatesPoint[]} sumOfStatesPoints The sum of states points.
 */
/*
export class SumOfStates extends NumberWithAttributes {
    units: string;
    angularMomentum: boolean;
    noLogSpline: boolean;
    sumOfStatesPoints: SumOfStatesPoint[];
    constructor(units: string, angularMomentum: boolean, noLogSpline: boolean, sumOfStatesPoints: SumOfStatesPoint[]) {
        this.units = units;
        this.angularMomentum = angularMomentum;
        this.noLogSpline = noLogSpline;
        this.sumOfStatesPoints = sumOfStatesPoints;
    }
    toString() {
        return `SumOfStates(` +
            `units(${this.units}), ` +
            `angularMomentum(${this.angularMomentum.toString()}), ` +
            `noLogSpline(${this.noLogSpline.toString()}), ` +
            `sumOfStatesPoints(${arrayToString(this.sumOfStatesPoints, " ")}))`;
    }
}
*/

/**
 * A class for representing a sum of states point.
 * @param {number} value The value of the point.
 * @param {number} energy The energy of the point.
 * @param {number} angMomMag The angular momentum magnitude of the point.
 */
/*
export class SumOfStatesPoint {
    value: number;
    energy: number;
    angMomMag: number;
    constructor(value: number, energy: number, angMomMag: number) {
        this.value = value;
        this.energy = energy;
        this.angMomMag = angMomMag;
    }
    toString() {
        return `SumOfStatesPoint(` +
            `value(${this.value}), ` +
            `energy(${this.energy.toString()}), ` +
            `angMomMag(${this.angMomMag.toString()}))`;
    }
}
*/

/**
 * A class for representing the DefinedSumOfStates MCRCMethod.
 * @param {string} name The name or xsi:type of the method.
 * @param {SumOfStates} sumOfStates The sum of states.
 */
/*
export class DefinedSumOfStates extends MCRCMethod {
    sumOfStates: SumOfStates;

    constructor(name: string, sumOfStates: SumOfStates) {
        super(name);
        this.sumOfStates = sumOfStates;
    }
    toString() {
        return `DefinedSumOfStates(${super.toString()}, ` +
            `sumOfStates(${this.sumOfStates.toString()}))`;
    }
}
*/

/**
 * A class for representing a reaction.
 */
export class Reaction extends Attributes {

    /**
     * The id of the reaction. This is also stored in the attributes, but is hee for convenience...
     */
    id: string;

    /**
     * The reactants in the reaction.
     */
    reactants: Map<string, Reactant>;

    /**
     * The products of the reaction.
     */
    products: Map<string, Product>;

    /**
     * The MCRCMethod.
     */
    mCRCMethod: MCRCMethod | undefined;

    /**
     * The transition state.
     */
    transitionState: TransitionState | undefined;

    /**
     * The tunneling.
     */
    tunneling: Tunneling | undefined;

    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {string} id The id of the reaction.
     * @param {Map<string, Reactant>} reactants The reactants in the reaction.
     * @param {Map<string, Product>} products The products of the reaction.
     * @param {MCRCMethod | undefined} mCRCMethod The MCRCMethod (optional).
     * @param {TransitionState | undefined} transitionState The transition state (optional).
     * @param {Tunneling | undefined} tunneling The tunneling (optional).
     */
    constructor(attributes: Map<string, string>, id: string,
        reactants: Map<string, Reactant>, products: Map<string, Product>,
        mCRCMethod?: MCRCMethod | undefined,
        transitionState?: TransitionState | undefined,
        tunneling?: Tunneling | undefined) {
        super(attributes);
        this.id = id;
        this.reactants = reactants;
        this.products = products;
        this.mCRCMethod = mCRCMethod;
        this.transitionState = transitionState;
        this.tunneling = tunneling;
    }

    /**
     * Convert the product to a string.
     * @returns String representation of the product.
     */
    toString(): string {
        let s: string = super.toString();
        return super.toString() + `id(${this.id}), ` +
            `reactants(${mapToString(this.reactants)}), ` +
            `products(${mapToString(this.products)}), ` +
            `mCRCMethod(${this.mCRCMethod?.toString()}), ` +
            `transitionState(${this.transitionState?.toString()}), ` +
            `tunneling(${this.tunneling?.toString()}))`;
    }

    /**
     * Get the label of the reactants.
     * @returns The label of the reactants.
     */
    getReactantsLabel(): string {
        return Array.from(this.reactants.values()).map(reactant => reactant.molecule.id).join(' + ');
    }

    /**
     * Get the combined energy of the reactants.
     * @returns The combined energy of the reactants.
     */
    getReactantsEnergy(): number {
        return Array.from(this.reactants.values()).map(reactant => reactant.molecule.getEnergy()).reduce((a, b) => a + b, 0);
    }

    /**
     * Returns the label for the products.
     * @returns The label for the products.
     */
    getProductsLabel(): string {
        return Array.from(this.products.values()).map(product => product.molecule.id).join(' + ');
    }

    /**
     * Returns the total energy of all products.
     * @returns The total energy of all products.
     */
    getProductsEnergy(): number {
        return Array.from(this.products.values()).map(product => product.molecule.getEnergy()).reduce((a, b) => a + b, 0);
    }

    /**
     * Get the label of the reaction.
     * @returns The label of the reaction.
     */
    getLabel(): string {
        let label: string = this.getReactantsLabel() + ' -> ' + this.getProductsLabel();
        return label;
    }

    /**
     * @param {string} tagName The tag name.
     * @param {string} pad The pad (Optional).
     * @param {number} level The level of padding (Optional).
     * @returns An XML representation.
     */
    toXML(tagName: string, pad?: string, level?: number): string {
        // Padding
        let padding0: string = "";
        let padding1: string = "";
        let padding2: string = "";
        let padding3: string = "";
        if (pad != undefined && level != undefined) {
            padding0 = pad.repeat(level);
            padding1 = padding0 + pad;
            padding2 = padding1 + pad;
            padding3 = padding2 + pad;
        }
        // Reactants
        let reactants_xml: string = "";
        this.reactants.forEach(reactant => {
            reactants_xml += reactant.toXML("reactant", pad, padding1);
        });
        // Products
        let products_xml: string = "";
        this.products.forEach(product => {
            products_xml += product.toXML("product", pad, padding1);
        });
        // Tunneling
        let tunneling_xml: string = "";
        if (this.tunneling != undefined) {
            tunneling_xml = this.tunneling.toTag("me.tunneling", padding1);
        }
        // TransitionState
        let transitionState_xml: string = "";
        if (this.transitionState != undefined) {
            transitionState_xml = this.transitionState.toXML("transitionState", pad, padding1);
        }
        // MCRCMethod
        let mCRCMethod_xml: string = "";
        if (this.mCRCMethod != undefined) {
            if (this.mCRCMethod instanceof MesmerILT) {
                mCRCMethod_xml = this.mCRCMethod.toXML("mCRCMethod", padding1);
            } else {
                mCRCMethod_xml = this.mCRCMethod.toTag("mCRCMethod", padding1);
            }
        }
        return getTag(reactants_xml + products_xml + tunneling_xml + transitionState_xml + mCRCMethod_xml,
            tagName, this.attributes, undefined, undefined, padding0, true);
    }
}