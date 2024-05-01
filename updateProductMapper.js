import { AttributeHelper } from "./attributeHelper.js"
import * as CONSTANTS from './constants.js';

export const createUpdateProductActionArray = async (productCurrentData, productItemJson) => {
    let actionArray = [];
    checkAndPopulateProductAttributeValueIinActionJsonArray(actionArray, productCurrentData, productItemJson);
    checkAndPopulateVariantAttributeValueInActionJsonArray(actionArray, productCurrentData, productItemJson);
    checkAndPopulateNameInActionJsonArray(actionArray, productCurrentData, productItemJson);
    checkAndPopulateDescriptionInActionJsonArray(actionArray, productCurrentData, productItemJson);
    checkAndPopulateSlugInActionJsonArray(actionArray, productCurrentData, productItemJson);
    chekAndPopulateMetaTitleValueInAActionJsonArray(actionArray, productCurrentData, productItemJson);
    chekAndPopulateMetaKeywordValueInAActionJsonArray(actionArray, productCurrentData, productItemJson);
    chekAndPopulateMetaDescriptionValueInAActionJsonArray(actionArray, productCurrentData, productItemJson);
    await chekAndPopulateCategoriesValueInAActionJsonArray(actionArray, productCurrentData, productItemJson);
    return actionArray;
};

const checkAndPopulateNameInActionJsonArray = (actionArray, productCurrentData, productFeedItemJson) => {
    const currentProductName = productCurrentData?.masterData?.current?.name["en-US"];
    const productNameFromFeedItem = productFeedItemJson?.name;
    if (productNameFromFeedItem && (currentProductName !== productNameFromFeedItem)) {
        populateLocalalizedValueInActionJsonArray(actionArray,"changeName", propertyName, productNameFromFeedItem);
    }
};

const checkAndPopulateDescriptionInActionJsonArray = (actionArray, productCurrentData, productFeedItemJson) => {
    const currentProductDescription = productCurrentData?.masterData?.current?.description?.["en-US"];
    const productDescriptionFromFeedItem = productFeedItemJson?.description?.["en-US"];
    if (productDescriptionFromFeedItem && (currentProductDescription !== productDescriptionFromFeedItem)) {
        populateLocalalizedValueInActionJsonArray(actionArray,"setDescription", propertyName, productDescriptionFromFeedItem);
    }
};

const chekAndPopulateMetaTitleValueInAActionJsonArray = (actionArray, productCurrentData, productFeedItemJson) => {
    const currentProductMetaTitle = productCurrentData?.masterData?.current?.metaTitle?.["en-US"];
    const productMetaTitleFromFeedItem = productFeedItemJson?.metaTitle?.["en-US"];
    if (productMetaTitleFromFeedItem && (currentProductMetaTitle !== productMetaTitleFromFeedItem)) {
        populateLocalalizedValueInActionJsonArray(actionArray,"setMetaTitle", propertyName, productMetaTitleFromFeedItem);
    }
};

const chekAndPopulateMetaKeywordValueInAActionJsonArray = (actionArray, productCurrentData, productFeedItemJson) => {
    const currentProductMetaKey = productCurrentData?.masterData?.current?.metaKeyword?.["en-US"];
    const productMetaKeyFromFeedItem = productFeedItemJson?.metaKeyword?.["en-US"];
    if (productMetaKeyFromFeedItem && (currentProductMetaKey !== productMetaKeyFromFeedItem)) {
        populateLocalalizedValueInActionJsonArray(actionArray,"setMetaKeywords", propertyName, productMetaKeyFromFeedItem);
    }
};
const chekAndPopulateMetaDescriptionValueInAActionJsonArray = (actionArray, productCurrentData, productFeedItemJson) => {
    const currentProductMetaDescription = productCurrentData?.masterData?.current?.metaDescription?.["en-US"];
    const productMetaDescriptionFromFeedItem = productFeedItemJson?.metaDescription?.["en-US"];
    if (productMetaDescriptionFromFeedItem && (currentProductMetaDescription !== productSlugFromFeedItem)) {
        populateLocalalizedValueInActionJsonArray(actionArray,"setMetaDescription", propertyName, productMetaDescriptionFromFeedItem);
    }
};

const checkAndPopulateSlugInActionJsonArray = (actionArray, productCurrentData, productFeedItemJson) => {
    const currentProductSlug = productCurrentData?.masterData?.current?.slug?.["en-US"];
    const productSlugFromFeedItem = productFeedItemJson?.slug?.["en-US"];
    if (productSlugFromFeedItem && (currentProductSlug !== productSlugFromFeedItem)) {
        populateLocalalizedValueInActionJsonArray(actionArray,"changeSlug", propertyName, productSlugFromFeedItem);
    }
};

const chekAndPopulateCategoriesValueInAActionJsonArray = async (actionArray, productCurrentData, productFeedItemJson) => {
    const categoriesValueFromFeedItem = AttributeHelper.retriveCategoriesValueFromFeedAttribute(productFeedItemJson?.productAttributes);
    const existingProductCategories = productCurrentData?.masterData?.current?.categories;
    await processCategoryIds(existingProductCategories, categoriesValueFromFeedItem);   
};

const processCategoryIds = async (currentCategoryIdsArray , feedCategoryKeysArray) => {
   
    const feedCategoryIdsArray = await AttributeHelper.retriveCategoryIdArrayFromKey(feedCategoryKeysArray);
    let categoryIdsToBeAdded = []
    let categoryIdsToBeRemoved = [];
    if (feedCategoryIdsArray && feedCategoryIdsArray.length > 0){
        
        if (currentCategoryIdsArray && currentCategoryIdsArray.length > 0) {

            categoryIdsToBeAdded = feedCategoryIdsArray.filter(item => !currentCategoryIdsArray.includes(item));

            categoryIdsToBeRemoved = currentCategoryIdsArray.filter(item => !feedCategoryIdsArray.includes(item));


        }else {
             categoryIdsToBeAdded = feedCategoryIdsArray;
        
        }

        if(categoryIdsToBeAdded && categoryIdsToBeAdded?.length > 0) {
            categoryIdsToBeAdded,forEach(item=>{
                populateCategoryDataInActionJsonArray(actionArray, "addToCategory", item);
            });
        }

        if(categoryIdsToBeRemoved && categoryIdsToBeRemoved?.length > 0) {
            categoryIdsToBeAdded,forEach(item=>{
                populateCategoryDataInActionJsonArray(actionArray, "removeFromCategory", item);
            });
        }

    }
};

const checkAndPopulateProductAttributeValueIinActionJsonArray = (actionArray, productCurrentData, productFeedItemJson) =>{
    const productAttributeSchema = AttributeHelper.createProductSchemaForType(productFeedItemJson?.productType);
    const existingProductAttributes = productCurrentData?.masterData?.current?.masterVariant?.attributes;
    const productAttributesFromFeed = productFeedItemJson?.productAttributes;

    if (productAttributeSchema) {
        productAttributeSchema.forEach(instance => {
            const propertyName = instance?.name;
            const dataType = instance?.dataType; // This is used to set the price data type
            
            let attributeValueFromCurrentProductDataItem =  AttributeHelper.retriveProductAttributeValueFromJson(existingProductAttributes, propertyName, dataType);
            
            let attributeValueFromProductFeedItem;
            const differentPropertyName =  AttributeHelper.checkAndReturnDifferentPropertyFeedName(propertyName);
            if (differentPropertyName) {
                attributeValueFromProductFeedItem =  AttributeHelper.retriveValueFromFeedAttributeforSpecificProperty(productAttributesFromFeed, differentPropertyName);
            } else if (propertyName === CONSTANTS.PDPSEO_PROEPRTY_NAME) {
                attributeValueFromProductFeedItem =  productFeedItemJson?.pdpSeo;
            } else {
                attributeValueFromProductFeedItem =  AttributeHelper.retriveProductAttributeValueFromJson(productAttributesFromFeed, propertyName, dataType);
            }

            if(!attributeValueFromProductFeedItem){
                attributeValueFromProductFeedItem = AttributeHelper.defaultValueAsPerType(dataType);
            }

            if(!attributeValueFromCurrentProductDataItem){
                attributeValueFromCurrentProductDataItem = AttributeHelper.defaultValueAsPerType(dataType);
            }
            if (CONSTANTS.PRICE_DATA_TYPE === dataType) {
                const centAmountForCurrentProductDataItem = attributeValueFromCurrentProductDataItem.centAmount;
                const centAmountForProductFeedItem = attributeValueFromProductFeedItem.centAmount;
                if (centAmountForCurrentProductDataItem !== centAmountForProductFeedItem) {
                    populateAttributeValueInActionJsonArray(actionArray,"setAttributeInAllVariants", propertyName, attributeValueFromProductFeedItem);
                }
            }else {
                if (attributeValueFromCurrentProductDataItem !== attributeValueFromProductFeedItem) {
                    populateAttributeValueInActionJsonArray(actionArray,"setAttributeInAllVariants", propertyName, attributeValueFromProductFeedItem);
                }
            }
            
        });
    }
};

const checkAndPopulateVariantAttributeValueInActionJsonArray = (actionArray, productCurrentData, productFeedItemJson) =>{
    const skuAttributeSchema = AttributeHelper.createSkuSchemaForType(productFeedItemJson?.productType);
    productFeedItemJson?.variants?.forEach( feedVariantItem => {
        const variantCurrentDataItem = retriveCurrentVarientDataFromJson(productCurrentData, feedVariantItem);
        if (skuAttributeSchema && variantCurrentDataItem) {
            skuAttributeSchema.forEach(instance => {
                const propertyName = instance?.name;
                const dataType = instance?.dataType; // This is used to set the price data type

                let attributeValueFromCurrentVariantDataItem =  AttributeHelper.retriveSkuAttributeValueFromJson(variantCurrentDataItem?.attributes, propertyName, dataType);
                
                let attributeValueFromVariantFeedItem;
                const differentPropertyName =  AttributeHelper.checkAndReturnDifferentPropertyFeedName(propertyName);

                if (differentPropertyName) {
                    attributeValueFromVariantFeedItem =  AttributeHelper.retriveValueFromFeedAttributeforSpecificProperty(feedVariantItem?.variantAttributes, differentPropertyName);
                }else {
                    attributeValueFromVariantFeedItem =  AttributeHelper.retriveSkuAttributeValueFromJson(feedVariantItem?.variantAttributes, propertyName, dataType);
                }

                if(!attributeValueFromCurrentVariantDataItem){
                    attributeValueFromCurrentVariantDataItem = AttributeHelper.defaultValueAsPerType(dataType);
                }
    
                if(!attributeValueFromVariantFeedItem){
                    attributeValueFromVariantFeedItem = AttributeHelper.defaultValueAsPerType(dataType);
                }
                if (CONSTANTS.PRICE_DATA_TYPE === dataType) {
                    console.log("attributeValueFromCurrentVariantDataItem", attributeValueFromCurrentVariantDataItem);
                    console.log("attributeValueFromVariantFeedItem", attributeValueFromVariantFeedItem);
                    const centAmountForCurrentVariantDataItem = attributeValueFromCurrentVariantDataItem.centAmount;
                    const centAmountForVariantFeedItem = attributeValueFromVariantFeedItem.centAmount;
                    if (centAmountForCurrentVariantDataItem !== centAmountForVariantFeedItem) {
                        populateVariantAttributeValueInActionJsonArray(actionArray,"setAttribute", propertyName, attributeValueFromVariantFeedItem, feedVariantItem.key);
                    }
                }else {
                    if (attributeValueFromCurrentVariantDataItem !== attributeValueFromVariantFeedItem) {
                        populateVariantAttributeValueInActionJsonArray(actionArray,"setAttribute", propertyName, attributeValueFromVariantFeedItem, feedVariantItem.key);
                    }
                }
            });
        }
    });
};

const populateAttributeValueInActionJsonArray = (actionArray, actionName, propertyName, productFeedItemJsonAttributeValue) => {
    actionArray.push({
        "action" : actionName,
        "name": propertyName,
        "value": productFeedItemJsonAttributeValue,
        "staged": false 
    });
};

const populateVariantAttributeValueInActionJsonArray = (actionArray, actionName, propertyName, productFeedItemJsonAttributeValue, skuID) => {
    actionArray.push({
        "action" : actionName,
        "sku": skuID,
        "name": propertyName,
        "value": productFeedItemJsonAttributeValue,
        "staged": false 
    });
};

const populateCategoryDataInActionJsonArray = (actionArray, actionName, categoryId) => {
    actionArray.push({
        "action": actionName,
        "category": {
            "typeId": "category",
            "id": categoryId
        },
        "staged": false 
    });
};

const populateLocalalizedValueInActionJsonArray = (actionArray, actionName, propertyName, productNameFromFeedItem) => {
    actionArray.push({
        "action" : actionName,
        [propertyName]: {
            "en": productNameFromFeedItem
        },
        "staged": false 
    });
};


/** This is the common method that is used for both productAttributes and Sku Attributes
 *  to get the amount depending upon the propertyName */
const retriveCurrentVarientDataFromJson = (productCurrentData, variantItemFromFeed) => {
    let variantItemFromCurrentData;
    if(variantItemFromFeed?.key === productCurrentData?.masterData?.current?.masterVariant?.key) {
        variantItemFromCurrentData = productCurrentData?.masterData?.current?.masterVariant;
    }else {
        productCurrentData?.masterData?.current?.variants?.forEach(variantItem => {
            if( variantItemFromFeed?.key === variantItem?.key) {
                variantItemFromCurrentData = variantItem;
            }
        });
    }
    return variantItemFromCurrentData;
};