import {
    Attributes, NumberArrayWithAttributes, NumberWithAttributes 
} from './classes.js';

import {
    mapToString
} from './functions.js';

import {
    getTag
} from './xml.js';

/**
 * A class for representing an atom.
 * @param {Map<string, string>} attributes The attributes.
 * If there is no "id" or "elementType" key an error will be thrown.
 */
export class Atom extends Attributes {

    /**
     * @param attributes The attributes. If there is no "id" or "elementType" key an error will be thrown.
     */
    constructor(attributes: Map<string, string>) {
        super(attributes);
        let id: string | undefined = attributes.get("id");
        if (id == undefined) {
            throw new Error('id is undefined');
        }
        let elementType: string | undefined = attributes.get("elementType");
        if (elementType == undefined) {
            throw new Error('elementType is undefined');
        }
    }

    /**
     * @returns A string representation.
     */
    toString(): string {
        let s = super.toString();
        return s + `)`;
    }

    /**
     * @returns The id of the atom.
     */
    get id(): string {
        return this.attributes.get("id") as string;
    }

    /**
     * @returns The element type of the atom.
     */
    get elementType(): string {
        return this.attributes.get("elementType") as string;
    }
}

/**
 * A class for representing an atomic bond - a bond beteen two atoms.
 * @param {Map<string, string>} attributes The attributes.
 * @param {Atom} atomA One atom.
 * @param {Atom} atomB Another atom.
 * @param {string} order The order of the bond.
 */
export class Bond extends Attributes {

    /**
     * @param {Map<string, string>} attributes The attributes.
     */
    constructor(attributes: Map<string, string>) {
        super(attributes);
    }

    /**
     * @returns A string representation.
     */
    toString(): string {
        let s = super.toString();
        return s + `)`;
    }
}


/**
 * A class for representing a property.
 */
export class Property extends Attributes {

    /**
     * The property value.
     */
    property: NumberWithAttributes | NumberArrayWithAttributes;

    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {NumberWithAttributes | NumberArrayWithAttributes} property The property.
     */
    constructor(attributes: Map<string, string>, property: NumberWithAttributes | NumberArrayWithAttributes) {
        super(attributes);
        this.property = property;
    }

    /**
     * @returns A string representation.
     */
    toString(): string {
        return super.toString() + ` property(${this.property.toString()}))`;
    }

    /**
     * @param padding The padding (Optional).
     * @returns An XML representation.
     */
    toXML(pad?: string, padding?: string): string {
        let padding1: string | undefined = undefined;
        if (pad != undefined) {
            if (padding != undefined) {
                padding1 = padding + pad;
            }
        }
        if (this.property instanceof NumberWithAttributes) {
            return getTag(this.property.toXML("scalar", padding1), "property", this.attributes, undefined, undefined, padding, true);
        } else {
            return getTag(this.property.toXML("array", padding1), "property", this.attributes, undefined, undefined, padding, true);
        }
    }
}

/**
 * Represents the deltaEDown class.
 */
export class DeltaEDown extends NumberWithAttributes {

    /**
     * @param attributes The attributes.
     * @param units The units.
     */
    constructor(attributes: Map<string, string>, value: number) {
        super(attributes, value);
    }
}

/**
 * A class for representing an energy transfer model.
 */
export class EnergyTransferModel extends Attributes {

    /**
     * The DeltaEDown.
     */
    deltaEDown: DeltaEDown;

    /**
     * @param {Map<string, string>} attributes The attributes.
     * @param {DeltaEDown} deltaEDown The DeltaEDown.
     */
    constructor(attributes: Map<string, string>, deltaEDown: DeltaEDown) {
        super(attributes);
        this.deltaEDown = deltaEDown;
    }

    /**
     * @param padding - Optional padding string for formatting the XML output.
     * @returns An XML representation.
     */
    toXML(pad?: string, padding?: string): string {
        if (pad == undefined) {
            return getTag(this.deltaEDown.toXML("me.deltaEDown", padding), "me:energyTransferModel",
             this.attributes, undefined, undefined, padding, false);
        } else {
            return getTag(this.deltaEDown.toXML("me.deltaEDown", padding), "energyTransferModel",
             undefined, undefined, undefined, padding, true);
        }
    }
}

/**
 * A class for representing a method for calculating the density of states.
 */
export class DOSCMethod {
    type: string;
    constructor(type: string) {
        this.type = type;
    }

    /**
     * @returns A string representation.
     */
    toString(): string {
        return `DOSCMethod(type(${this.type}))`;
    }

    /**
     * @param padding The padding (Optional).
     * @returns A tag representation.
     */
    toTag(padding?: string): string {
        let s: string = `<me.DOSCMethod xsi:type="${this.type}"/>`;
        if (padding) {
            return "\n" + padding + s;
        }
        return "\n" + s;
    }
}

/**
 * A class for representing a molecule.
 * @param {string} id The id of the molecule.
 * @param {string} description The description of the molecule.
 * @param {boolean} active Indicates if the molecule is active.
 * @param {Map<string, Atom>} atoms A Map of atoms with keys as string atom ids and values as Atoms.
 * @param {Map<string, Bond>} bonds A Map of bonds with keys as string atom ids and values as Bonds.
 * @param {Map<string, Property>} properties A map of properties.
 * @param {EnergyTransferModel | null} energyTransferModel The energy transfer model.
 * @param {DOSCMethod | null} dOSCMethod The method for calculating density of states.
 */
export class Molecule extends Attributes {
    id: string;
    // Atoms
    atoms: Map<string, Atom>;
    // Bonds
    bonds: Map<string, Bond>;
    // Properties
    properties: Map<string, Property>;
    // EnergyTransferModel
    energyTransferModel?: EnergyTransferModel;
    // DOSCMethod
    dOSCMethod?: DOSCMethod;

    /**
     * Create a molecule.
     * @param {Map<string, string>} attributes The attributes. If there is no "id" key an error will be thrown.
     * Additional attributes known about are "description" and "active", but these do not exist for all molecules
     * in Mesmer XML input/output files.
     * @param {Map<string, Atom>} atoms A Map of atoms with keys as ids.
     * @param {Map<string, Bond>} bonds A Map of bonds with. The keys combine the ids of the two bonded atoms.
     * @param {Map<string, Property>} properties A map of properties.
     * @param {EnergyTransferModel | null} energyTransferModel The energy transfer model.
     * @param {DOSCMethod | null} dOSCMethod The method for calculating density of states.
     */
    constructor(
        attributes: Map<string, string>,
        atoms: Map<string, Atom>,
        bonds: Map<string, Bond>,
        properties: Map<string, Property>,
        energyTransferModel?: EnergyTransferModel,
        dOSCMethod?: DOSCMethod) {
        super(attributes);
        let id: string | undefined = this.attributes.get("id");
        if (id == undefined) {
            throw new Error('id is undefined');
        }
        this.id = id;
        this.atoms = atoms;
        this.bonds = bonds;
        this.properties = properties;
        this.energyTransferModel = energyTransferModel;
        this.dOSCMethod = dOSCMethod;
    }

    /** 
     * @returns A string representation.
     */
    toString(): string {
        let r = `Molecule(id(${this.getID()}), `;
        let description: string | undefined = this.getDescription();
        if (description != undefined) {
            r += `description(${description}), `;
        }
        let active: boolean | undefined = this.getActive();
        if (active != undefined) {
            r += `active(${active}), `;
        }
        if (this.atoms.size > 0) {
            r += `atoms(${mapToString(this.atoms)}), `;
        }
        if (this.bonds.size > 0) {
            r += `bonds(${mapToString(this.bonds)}), `;
        }
        if (this.properties.size > 0) {
            r += `properties(${mapToString(this.properties)}), `;
        }
        if (this.energyTransferModel) {
            r += `energyTransferModel(${this.energyTransferModel.toString()}), `;
        }
        if (this.dOSCMethod) {
            r += `dOSCMethod(${this.dOSCMethod.toString()}), `;
        }
        return r + `)`;
    }

    /**
     * @return The id of the molecule.
     */
    getID(): string {
        return this.attributes.get("id") as string;
    }

    /**
     * Gets the description of the molecule.
     * @returns The description of the molecule, or undefined if it is not set.
     */
    getDescription(): string | undefined {
        return this.attributes.get("description");
    }

    /**
     * Gets the active status of the molecule.
     * @returns The active status of the molecule, or undefined if it is not set.
     */
    getActive(): boolean | undefined {
        let active = this.attributes.get("active");
        if (active != undefined) {
            return true;
        }
        return active;
    }

    /**
     * @returns {number} The energy of the molecule or zero if the energy is not set.
     * @throws An error if "me.ZPE" is a property, but is not mapped to a PropertyScalar.
     */
    getEnergy(): number {
        let zpe: Property | undefined = this.properties.get('me:ZPE');
        if (zpe == undefined) {
            return 0;
        }
        if (zpe.property instanceof NumberWithAttributes) {
            return zpe.property.value;
        } else {
            throw new Error("Expected a PropertyScalar but got a PropertyArray and not sure how to handle that.");
        }
    }

    /**
     * Set the Energy of the molecule.
     * @param {number} energy The energy of the molecule in kcal/mol.
     */
    setEnergy(energy: number) {
        let property: Property | undefined = this.properties.get('me:ZPE');
        if (property == undefined) {
            throw new Error("No me.ZPE property found");
        }
        if (property.property instanceof NumberArrayWithAttributes) {
            throw new Error("Expected a NumberWithAttributes but got a NumberArrayWithAttributes and not sure how to handle that.");
        } else {
            property.property.value = energy;
        }
    }

    /**
     * Get the RotationConstants of the molecule.
     * @returns The RotationConstants of the molecule.
     */
    getRotationConstants(): number[] | undefined {
        let property: Property | undefined = this.properties.get('me:rotConsts');
        if (property != undefined) {
            if (property.property != null) {
                if (property.property instanceof NumberWithAttributes) {
                    return [property.property.value];
                } else {
                    return property.property.values;
                }
            } else {
                return undefined;
            }
        }
        return property;
    }

    /**
     * Get the VibrationFrequencies of the molecule.
     * @returns The VibrationFrequencies of the molecule.
     */
    getVibrationFrequencies(): number[] | undefined {
        let property: Property | undefined = this.properties.get('me:vibFreqs');
        if (property != undefined) {
            if (property.property instanceof NumberWithAttributes) {
                return [property.property.value];
            } else if (property.property instanceof NumberArrayWithAttributes) {
                return property.property.values;
            } else {
                return undefined;
            }
        }
        return property;
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
        // Atoms
        let atoms_xml: string = "";
        for (let atom of this.atoms.values()) {
            atoms_xml += atom.toTag("atom", padding2);
        }
        if (this.atoms.size > 1) {
            if (atoms_xml != "") {
                atoms_xml = getTag(atoms_xml, "atomArray", undefined, undefined, undefined, padding1, true);
            }
        }
        // Bonds
        let bonds_xml: string = "";
        for (let bond of this.bonds.values()) {
            bonds_xml += bond.toTag("bond", padding2);
        }
        if (bonds_xml != "") {
            bonds_xml = getTag(bonds_xml, "bondArray", undefined, undefined, undefined, padding1, true);
        }
        // Properties
        let properties_xml: string = "";
        this.properties.forEach(property => {
            let property_xml: string = "";
            if (property.property instanceof NumberWithAttributes) {
                property_xml += property.property.toXML("scalar", padding3);
            } else {
                property_xml += property.property.toXML("array", padding3);
            }
            properties_xml += getTag(property_xml, "property", property.attributes, undefined, undefined, padding2, true);
        });
        if (this.properties.size > 1) {
            if (properties_xml != "") {
                properties_xml = getTag(properties_xml, "propertyList", undefined, undefined, undefined, padding1, true);
            }
        }
        // EnergyTransferModel
        let energyTransferModel_xml: string = "";
        if (this.energyTransferModel) {
            energyTransferModel_xml = this.energyTransferModel.toXML(pad, padding1);
        }
        // DOSCMethod
        let dOSCMethod_xml: string = "";
        if (this.dOSCMethod) {
            dOSCMethod_xml = this.dOSCMethod.toTag(padding1);
        }
        return getTag(atoms_xml + bonds_xml + properties_xml + energyTransferModel_xml + dOSCMethod_xml,
            tagName, this.attributes, undefined, undefined, padding0, true);
    }
}