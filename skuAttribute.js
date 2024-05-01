export class SkuAttribute {
    constructor(name, dataType) {
        this.name = name;
        this.dataType = dataType;
    }
};

const commonSkutAttributes = [
    new SkuAttribute("shippingCategoryCode", "String"),
    new SkuAttribute("upc", "String"),
    new SkuAttribute("erpStatus", "String"),
    new SkuAttribute("fulfillmentMethod", "String"),
    new SkuAttribute("abwSku", "String"),
    new SkuAttribute("prop65ChemicalPresent", "Boolean"),
    new SkuAttribute("variantCost", "Price"),
];

export const skuAttributesSchemas = {
    "Apparel": [
        ...commonSkutAttributes
    ],
    "Appliance Floorcare": [
        ...commonSkutAttributes
    ],
    "Audio Musical Instrunments": [
        ...commonSkutAttributes
    ],
    "Baby": [
        ...commonSkutAttributes
    ],
    "Bath": [
        ...commonSkutAttributes
    ],
    "Beauty": [
        ...commonSkutAttributes
    ],
    "bedding": [
        ...commonSkutAttributes
    ],
    "Camera Safety": [
        ...commonSkutAttributes
    ],
    "Cell Phones": [
        ...commonSkutAttributes
    ],
    "Computers Tablets Office": [
        ...commonSkutAttributes
    ],
    "Footwear-Footwear-Accessories": [
        ...commonSkutAttributes
    ],
    "furniture": [
        ...commonSkutAttributes
    ],
    "Gaming": [
        ...commonSkutAttributes
    ],
    "Health Wellness": [
        ...commonSkutAttributes
    ],
    "home-decor": [
        ...commonSkutAttributes
    ],
    "Jewelry": [
        ...commonSkutAttributes
    ],
    "kitchen": [
        ...commonSkutAttributes
    ],
    "luggage": [
        ...commonSkutAttributes
    ],
    "Outdoor Living": [
        ...commonSkutAttributes
    ],
    "Pet": [
        ...commonSkutAttributes
    ],
    "Sporting Good": [
        ...commonSkutAttributes
    ],
    "Storage Organization": [
        ...commonSkutAttributes
    ],
    "Tools Auto YardEquipment": [
        ...commonSkutAttributes
    ],
    "toys": [
        ...commonSkutAttributes
    ],
    "TV Video": [
        ...commonSkutAttributes
    ],
    "Wearable Technology": [
        ...commonSkutAttributes
    ],
};