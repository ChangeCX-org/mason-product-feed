export class ProductAttribute {
    constructor(name, dataType) {
        this.name = name;
        this.dataType = dataType;
    }
};


const commonProductAttributes = [
    new ProductAttribute("asSeenOnTv", "Boolean"),
    new ProductAttribute("brandName", "String"),
    new ProductAttribute("brandParent", "String"),
    new ProductAttribute("className", "String"),
    new ProductAttribute("colorFamily", "String"),
    new ProductAttribute("departmentName", "String"),
    new ProductAttribute("gender", "String"),
    new ProductAttribute("licensedType", "String"),
    new ProductAttribute("productTypeCodes", "String"),
    new ProductAttribute("seasonCode", "String"),
   // new ProductAttribute("recipient", "String"),
   // new ProductAttribute("team", "String"),
    new ProductAttribute("subClassName", "String"),
    new ProductAttribute("waterproof", "String"),
    new ProductAttribute("onlineExclusive", "Boolean"),
    new ProductAttribute("openBox", "Boolean"),
    new ProductAttribute("personalizeOption", "Boolean"),
    //new ProductAttribute("refinementCondition", "String"),
    new ProductAttribute("batteryIncluded", "Boolean"),
    new ProductAttribute("batteryRequired", "Boolean"),
    new ProductAttribute("batterySizeCode", "String"),
    new ProductAttribute("batteryCount", "Integer"),
    new ProductAttribute("stepName", "String"),
    new ProductAttribute("abwStyle","String"),
    new ProductAttribute("abwDescription", "String"),
    new ProductAttribute("stiboDSku", "String"),
    new ProductAttribute("vendorPart", "String"),
    new ProductAttribute("originName", "String"),
    new ProductAttribute("productLine", "String"),
    new ProductAttribute("sellEndDate", "Date"),
    new ProductAttribute("stateNotAvail", "String"),
    new ProductAttribute("countryAvail", "String"),
    new ProductAttribute("signatureRequired", "Boolean"),
    new ProductAttribute("allowAkHIUsterrShip", "Boolean"),
    // new ProductAttribute("apoFpoShip", "Boolean"),
    new ProductAttribute("allowExpressShip", "Boolean"),
    new ProductAttribute("poBoxAvail", "Boolean"),
    new ProductAttribute("allowPriorityShip", "Boolean"),
    new ProductAttribute("forceFreightShip", "Boolean"),
    new ProductAttribute("forceLTLShip", "Boolean"),
    new ProductAttribute("swExcludePromo", "Boolean"),
    new ProductAttribute("personalizeMandatory", "Boolean"),
    new ProductAttribute("visualizeOption", "Boolean"),
    new ProductAttribute("primaryImageDate", "Date"),
    new ProductAttribute("warrantyEligible", "String"),
    new ProductAttribute("returnTypeAccept", "String"),
    new ProductAttribute("itemCost", "Price"),
    new ProductAttribute("map", "Price"),
    new ProductAttribute("pdpSeo", "String")
];

export const productTypeAttributesSchemas = {
    "apparel-fashion-accessories": [
        ...commonProductAttributes,
        new ProductAttribute("activityType",  "String"),
        new ProductAttribute("careCode",  "String"),
        new ProductAttribute("detailCode",  "String"),
        new ProductAttribute("fillTypeCode",  "String"),
        new ProductAttribute("insulationCode",  "Boolean"),
        new ProductAttribute("liningCode",  "String"),
        new ProductAttribute("material",  "String"),
        new ProductAttribute("sleeveLength",  "String"),
        new ProductAttribute("lifestyleCode",  "String"),
        new ProductAttribute("apparelSizeOptions",  "String"),
        new ProductAttribute("sizeInformation",  "String"),
        new ProductAttribute("sizeCategoryCode",  "String"),
        new ProductAttribute("apparelLengthOptions",  "String"),
        new ProductAttribute("beltSizeOptions",  "String"),
        new ProductAttribute("hatSizeOptions",  "String"),
        new ProductAttribute("intimatesCupSizeOptions",  "String"),
        new ProductAttribute("intimatesSizeOptions",  "String"),
        new ProductAttribute("noSizeOptions",  "String"),
        new ProductAttribute("sockSizeOptions",  "String")
    ],
    "appliance-floorcare": [
        ...commonProductAttributes,
        new ProductAttribute("material, String"),
        new ProductAttribute("powerTypeCode, String"),
        new ProductAttribute("safety, String"),
        new ProductAttribute("noSizeOptions, String")
    ],
    "audio-musical-instruments": [
        ...commonProductAttributes,
        new ProductAttribute("genreTypeCode", "String"),
        new ProductAttribute("powerTypeCode", "String"),
        new ProductAttribute("safety", "String"),
        new ProductAttribute("refurbished", "Boolean"),
        new ProductAttribute("screenSize", "String"),
        new ProductAttribute("electronicSizeOptions", "String")
    ],
    "baby": [
        ...commonProductAttributes,
        new ProductAttribute("material", "String"),
        new ProductAttribute("powerTypeCode", "String"),
        new ProductAttribute("safety", "String"),
        new ProductAttribute("noSizeOptions", "String")
    ],
    "bath": [
        ...commonProductAttributes,
        new ProductAttribute("material", "String"),
        new ProductAttribute("powerTypeCode", "String"),
        new ProductAttribute("safety", "String"),
        new ProductAttribute("rugSize", "String"),
        new ProductAttribute("careCode", "String"),
        new ProductAttribute("noSizeOptions", "String"),
        new ProductAttribute("towelSizeOptions", "String")
    ],
    "beauty": [
        ...commonProductAttributes,
        new ProductAttribute("bodyPartTypeCode", "String"),
        new ProductAttribute("safety", "String"),
        new ProductAttribute("scentTypeCode", "String"),
        new ProductAttribute("specialFeaturesCode", "String"),
        new ProductAttribute("powerTypeCode", "String"),
        new ProductAttribute("skinTypeCode", "String"),
        new ProductAttribute("spfTypeCode", "String"),
        new ProductAttribute("wigExtensionLength", "String"),
        new ProductAttribute("fragranceSizeOptions", "String"),
        new ProductAttribute("cosmeticSizeOptions", "String")
    ],
    "bedding": [
        ...commonProductAttributes,
        new ProductAttribute("material",  "String"),
        new ProductAttribute("powerTypeCode",  "String"),
        new ProductAttribute("safety",  "String"),
        new ProductAttribute("fillTypeCode",  "String"),
        new ProductAttribute("firmness",  "String"),
        new ProductAttribute("careCode",  "String"),
        new ProductAttribute("threadCountTypeCode",  "String"),
        new ProductAttribute("beddingSizeOptions",  "String"),
        new ProductAttribute("sizeCategoryCode",  "String")
    ],
    "cameras-safety": [
        ...commonProductAttributes,
        new ProductAttribute("refurbished", "Boolean"),
        new ProductAttribute("powerTypeCode", "String"),
        new ProductAttribute("safety", "String"),
        new ProductAttribute("screenSize", "String"),
        new ProductAttribute("electronicSizeOptions", "String")
    ],
    "cell-phones": [
        ...commonProductAttributes,
        new ProductAttribute("refurbished", "Boolean"),
        new ProductAttribute("powerTypeCode", "String"),
        new ProductAttribute("safety", "String"),
        new ProductAttribute("screenSize", "String"),
        new ProductAttribute("electronicSizeOptions", "String")
    ],
    "computers-tablets-office": [
        ...commonProductAttributes,
        new ProductAttribute("refurbished", "Boolean"),
        new ProductAttribute("powerTypeCode", "String"),
        new ProductAttribute("safety", "String"),
        new ProductAttribute("screenSize", "String"),
        new ProductAttribute("electronicSizeOptions", "String")
    ],
    "footwear-footwear-accessories": [
        ...commonProductAttributes,
        new ProductAttribute("bootShaft", "String"),
        new ProductAttribute("closure", "String"),
        new ProductAttribute("construction", "String"),
        new ProductAttribute("detailCode", "String"),
        new ProductAttribute("heelHeight", "String"),
        new ProductAttribute("insole", "String"),
        new ProductAttribute("insulationCode", "Boolean"),
        new ProductAttribute("lifestyleCode", "String"),
        new ProductAttribute("liningCode", "String"),
        new ProductAttribute("material", "String"),
        new ProductAttribute("primaryUpperTexture", "String"),
        new ProductAttribute("safety", "String"),
        new ProductAttribute("sole", "String"),
        new ProductAttribute("toeShape", "String"),
        new ProductAttribute("footwearLengthOptions", "String"),
        new ProductAttribute("footwearWidthOptions", "String"),
        new ProductAttribute("availableSizes", "String"),
        new ProductAttribute("sizeCategoryCode", "String")
    ],
    "furniture": [
        ...commonProductAttributes,
        new ProductAttribute("material", "String"),
        new ProductAttribute("powerTypeCode", "String"),
        new ProductAttribute("safety", "String"),
        new ProductAttribute("beddingSizeOptions", "String"),
        new ProductAttribute("noSizeOptions", "String")
    ],
    "gaming": [
        ...commonProductAttributes,
        new ProductAttribute("refurbished", "Boolean"),
        new ProductAttribute("screenSize", "String"),
        new ProductAttribute("powerTypeCode", "String"),
        new ProductAttribute("safety", "String"),
        new ProductAttribute("electronicSizeOptions", "String"),
        new ProductAttribute("genreTypeCode", "String"),
        new ProductAttribute("rating", "String")
    ],
    "health-wellness": [
        ...commonProductAttributes,
        new ProductAttribute("bodyPartTypeCode", "String"),
        new ProductAttribute("specialFeaturesCode", "String"),
        new ProductAttribute("safety", "String"),
        new ProductAttribute("powerTypeCode", "String"),
        new ProductAttribute("healthBeautySizeOptions", "String")
    ],
    "home-decor": [
        ...commonProductAttributes,
        new ProductAttribute("material", "String"),
        new ProductAttribute("powerTypeCode", "String"),
        new ProductAttribute("safety", "String"),
        new ProductAttribute("careCode", "String"),
        new ProductAttribute("curtainSizeOptions", "String"),
        new ProductAttribute("rugSize", "String"),
        new ProductAttribute("noSizeOptions", "String")
    ],
    "jewelry": [
        ...commonProductAttributes,
        new ProductAttribute("gemstoneTypeCode", "String"),
        new ProductAttribute("material", "String"),
        new ProductAttribute("noSizeOptions", "String"),
        new ProductAttribute("sizeCategory", "String"),
        new ProductAttribute("ringSizeOptions", "String")
    ],
    "kitchen": [
        ...commonProductAttributes,
        new ProductAttribute("material", "String"),
        new ProductAttribute("powerTypeCode", "String"),
        new ProductAttribute("safety", "String"),
        new ProductAttribute("careCode", "String"),
        new ProductAttribute("noSizeOptions", "String")
    ],
    "luggage": [
        ...commonProductAttributes,
        new ProductAttribute("powerTypeCode", "String"),
        new ProductAttribute("noSizeOptions", "String"),
        new ProductAttribute("material", "String")
    ],
    "outdoor-living": [
        ...commonProductAttributes,
        new ProductAttribute("powerTypeCode", "String"),
        new ProductAttribute("noSizeOptions", "String"),
        new ProductAttribute("safety", "String"),
        new ProductAttribute("material", "String")
    ],
    "pet": [
        ...commonProductAttributes,
        new ProductAttribute("powerTypeCode", "String"),
        new ProductAttribute("petSizeOptions", "String"),
        new ProductAttribute("safety", "String"),
        new ProductAttribute("material", "String")
    ],
    "sporting-good": [
        ...commonProductAttributes,
        new ProductAttribute("ageCategoryMax", "String"),
        new ProductAttribute("ageCategoryMin", "String"),
        new ProductAttribute("powerTypeCode", "String"),
        new ProductAttribute("safety", "String"),
        new ProductAttribute("sportSizeOptions", "String")
    ],
    "storage-organization": [
        ...commonProductAttributes,
        new ProductAttribute("powerTypeCode", "String"),
        new ProductAttribute("noSizeOptions", "String"),
        new ProductAttribute("safety", "String"),
        new ProductAttribute("material", "String")
    ],
    "tools-auto-yard-equipment": [
        ...commonProductAttributes,
        new ProductAttribute("powerTypeCode", "String"),
        new ProductAttribute("noSizeOptions", "String"),
        new ProductAttribute("safety", "String"),
        new ProductAttribute("material", "String")
    ],
    "toys": [
        ...commonProductAttributes,
        new ProductAttribute("ageCategoryMax", "String"),
        new ProductAttribute("ageCategoryMin", "String"),
        new ProductAttribute("powerTypeCode", "String"),
        new ProductAttribute("safety", "String"),
        new ProductAttribute("sportSizeOptions", "String")
    ],
    "tv-video": [
        ...commonProductAttributes,
        new ProductAttribute("genreTypeCode", "String"),
        new ProductAttribute("rating", "String"),
        new ProductAttribute("powerTypeCode", "String"),
        new ProductAttribute("refurbished", "Boolean"),
        new ProductAttribute("electronicSizeOptions", "String"),
        new ProductAttribute("safety", "String"),
        new ProductAttribute("screenSize", "String")
    ],
    "wearable-technology": [
        ...commonProductAttributes,
        new ProductAttribute("rating", "String"),
        new ProductAttribute("powerTypeCode", "String"),
        new ProductAttribute("refurbished", "Boolean"),
        new ProductAttribute("electronicSizeOptions", "String"),
        new ProductAttribute("safety", "String"),
        new ProductAttribute("screenSize", "String")
    ],

};
