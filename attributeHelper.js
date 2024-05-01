import { productTypeAttributesSchemas, ProductAttribute } from "./productAttribute.js";
import { skuAttributesSchemas, SkuAttribute } from "./skuAttribute.js";
import { retriveCategoryByKey } from './ctServiceApi.js'; 
import * as CONSTANTS from './constants.js';

export class AttributeHelper {

    static attriWithDiffPropertyName = new Map([
        [CONSTANTS.CLASS_PROPERTY_NAME,CONSTANTS.CLASS_PROPERTY_FEED_NAME],
        [CONSTANTS.DEPARTMENT_PROPERTY_NAME, CONSTANTS.DEPARTMENT_PROPERTY_FEED_NAME], 
        [CONSTANTS.SUB_CLASS_PROPERTY_NAME, CONSTANTS.SUB_CLASS_PROPERTY_FEED_NAME], 
        [CONSTANTS.ORIGIN_PROPERTY_NAME, CONSTANTS.ORIGIN_PROPERTY_FEED_NAME], 
        [CONSTANTS.APO_FPO_SHIP_PROPERTY_NAME, CONSTANTS.APO_FPO_SHIP_PROPERTY_FEED_NAME],
        [CONSTANTS.ABWSKU_PROPERTY_NAME, CONSTANTS.ABWSKU_PROPERTY_FEED_NAME],
        [CONSTANTS.VARIANt_COST_PROEPRTY_NAME, CONSTANTS.VARIANt_COST_PROEPRTY_FEED_NAME]
    ]);

    static createProductSchemaForType =  (productType) =>  {
        const schema = productTypeAttributesSchemas[productType];
        if (schema) {
            // Instantiate attributes in the schema
            const instantiatedSchema = schema.map(attribute => {
                return new ProductAttribute(attribute.name, attribute.dataType);
            });
            return instantiatedSchema;
        } else {
            // Handle case when product type is not found
            console.error(`Product type "${productType}" not found in prooduct schemas.`);
            return null;
        }
    };

    static createSkuSchemaForType =  (productType) =>  {
        const schema = skuAttributesSchemas[productType];
        if (schema) {
            // Instantiate attributes in the schema
            const instantiatedSchema = schema.map(attribute => {
                return new SkuAttribute(attribute.name, attribute.dataType);
            });
            return instantiatedSchema;
        } else {
            // Handle case when product type is not found
            console.error(`Product type "${productType}" not found in Sku schemas.`);
            return null;
        }
    
    };

    static retriveProductAttributeValueFromJson = (productAttributeFromFeedItemJson, propertyName, dataType) => {
        let propertyValueFromJson;

        for (let i = 0; i < productAttributeFromFeedItemJson?.length ; i++) {
            if ( propertyName === productAttributeFromFeedItemJson[i].name ) {
                if (productAttributeFromFeedItemJson[i].value ){
                    if (CONSTANTS.BOOLEAN_DATA_TYPE === dataType ) {
                        propertyValueFromJson = this.returnBooleanPropertyValue(productAttributeFromFeedItemJson[i].value);
                    }else {
                        propertyValueFromJson = productAttributeFromFeedItemJson[i].value;
                    }
                }
                break;
            }
        }
        // productAttributeFromFeedItemJson.forEach(instance => {
        //     if ( propertyName === instance?.name ) {
        //         if (instance.value ){
        //             if (CONSTANTS.BOOLEAN_DATA_TYPE === dataType ) {
        //                 propertyValueFromJson = this.returnBooleanPropertyValue(instance.value);
        //             }else {
        //                 propertyValueFromJson = instance.value;
        //             }
        //         } 
        //     }
        // });
        return propertyValueFromJson
    };


    static retriveSkuAttributeValueFromJson = (variantAttributeFromFeedItemJson, propertyName, dataType) => {
        let propertyValueFromJson;
        for (let i = 0; i < variantAttributeFromFeedItemJson?.length ; i++) {
            if ( propertyName === variantAttributeFromFeedItemJson[i].name ) {
                if (variantAttributeFromFeedItemJson[i].value ){
                    if (CONSTANTS.BOOLEAN_DATA_TYPE === dataType ) {
                        propertyValueFromJson = this.returnBooleanPropertyValue(variantAttributeFromFeedItemJson[i].value);
                    }else {
                        propertyValueFromJson = variantAttributeFromFeedItemJson[i].value;
                    }
                }
                break;
            }
        }
        // variantAttributeFromFeedItemJson.forEach(instance => {
        //     if ( propertyName === instance?.name ) {
        //         if (CONSTANTS.BOOLEAN_DATA_TYPE === dataType ) {
        //             propertyValueFromJson = this.returnBooleanPropertyValue(instance.value);
        //         }else {
        //             propertyValueFromJson = instance.value;
        //         }
        //     }
        // });
        return propertyValueFromJson
    };

    static returnBooleanPropertyValue = ( propertyValue) => {
        if (propertyValue === "Yes" || propertyValue === "True" || propertyValue === "YES"
            || propertyValue === "TRUE" || propertyValue === "true" || propertyValue === true) {
            return true;
        }else if (propertyValue === "No" || propertyValue === "False" || propertyValue === "NO"
            || propertyValue === "FALSE" || propertyValue === "false" || propertyValue === false){
           return false;
        }else {
            return false
        }
    };

    static defaultValueAsPerType = (dataType) => {
        let propertyValue;
        if (CONSTANTS.BOOLEAN_DATA_TYPE === dataType) {
            propertyValue = false;
        } else if (CONSTANTS.ARRAY_DATA_TYPE === dataType) {
            propertyValue = [];
        } else if (CONSTANTS.PRICE_DATA_TYPE === dataType){
            propertyValue = {
            type: 'centPrecision',
            centAmount: 0,
            currencyCode: 'USD',
            fractionDigits: 2
          };
        } else if (CONSTANTS.STRING_DATA_TYPE === dataType){
            propertyValue = '';
        } else if (CONSTANTS.INTEGER_DATA_TYPE === dataType) {
            propertyValue = 0;
        }
        return propertyValue;
    };

    /** This method is written for those attribute properties whose property name are different from those present in the feed */
    static retriveValueFromFeedAttributeforSpecificProperty = (attributeFromFeedItemJson, attributePropertyNameFromFeedItem) => {
        let propertyValueFromJson;
        for (let i = 0; i < attributeFromFeedItemJson?.length ; i++) {
            if ( attributePropertyNameFromFeedItem === attributeFromFeedItemJson[i]?.name ) {
                propertyValueFromJson = attributeFromFeedItemJson[i].value;
                break;
            }
        }
        return propertyValueFromJson
    };

    static retriveCategoriesValueFromFeedAttribute = (attributeFromFeedItemJson) => {
        let propertyValueFromJson;
        for (let i = 0; i < attributeFromFeedItemJson.length; i++) {
            if (attributeFromFeedItemJson[i].categories) {
                propertyValueFromJson = attributeFromFeedItemJson[i].categories;
                break;
            }
        }
        return propertyValueFromJson
    };

    static retriveCategoryIdArrayFromKey = async (feedCategoryArrayKeys) => {
        let feedCategoryArrayIds = [];
        for (let i = 0; i < feedCategoryArrayKeys.length; i++) {
            const feedCategoryItem = await retriveCategoryByKey(feedCategoryArrayKeys[i]);
            
            if(feedCategoryItem && feedCategoryItem?.body?.results?.length > 0) {

                feedCategoryArrayIds.push(feedCategoryItem?.body?.results[0]?.id);                    
            }
        }
        return feedCategoryArrayIds;
    };

    static checkAndReturnDifferentPropertyFeedName = (propertyName) => {
        let feedPropertyName;
        
        for (let key of this.attriWithDiffPropertyName.keys()) {
          // Compare the current key with the target key
          if (key === propertyName) {
              // Return the value associated with the target key
              feedPropertyName =  this.attriWithDiffPropertyName.get(key);
              break;
          }
        }
        return feedPropertyName;
    };
}
