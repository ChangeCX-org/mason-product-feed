import { AttributeHelper } from './attributeHelper.js';
import * as CONSTANTS from './constants.js';

export const retriveCategoriesFromFeed = async ( productItemJson ) => {
  let addCategoryArray = [];
  const categoriesValueFromFeedItem = AttributeHelper.retriveCategoriesValueFromFeedAttribute(productItemJson?.productAttributes);
  
  addCategoryArray = await AttributeHelper.retriveCategoryIdArrayFromKey(categoriesValueFromFeedItem);
  
  return addCategoryArray;
};

export const createMasterVariantDatatForItem = ( productItemJson ) => {
  const firstVariantItem = productItemJson?.variants[0];
  let attributePayloadJson = [];
  const masterVariant = {
      sku: firstVariantItem?.key,
      key: firstVariantItem?.key,
      attributes: createAtrributeJsonArray(productItemJson.pdpSeo, productItemJson.productType, productItemJson?.productAttributes, firstVariantItem, attributePayloadJson),
  };
  return masterVariant;
};

export const createVariantDatafromItem =  ( productItemJson ) => {
  const productVariantsFromFeedItem = productItemJson?.variants;
  let attributePayloadJson = [];
  let variantArray = [];
  for ( const index in productVariantsFromFeedItem ) {
    if ( productVariantsFromFeedItem[0]?.key !== productVariantsFromFeedItem[index]?.key) {
      variantArray.push({
         sku: productVariantsFromFeedItem[index]?.key,
         key: productVariantsFromFeedItem[index]?.key,
         attributes: createAtrributeJsonArray(productItemJson.pdpSeo, productItemJson.productType, productItemJson?.productAttributes, productVariantsFromFeedItem[index], attributePayloadJson)
      });
    }
  }
  return variantArray;
};

export const createAtrributeJsonArray = (pdpSeoValue, productTypeValue,  productAttributeFromFeedItemJson , variantItem, attributePayloadJson ) => {
  createProductAtrributeJsonArray(pdpSeoValue, productTypeValue, productAttributeFromFeedItemJson, attributePayloadJson);
  createSkuAtrributeJsonArray(productTypeValue, attributePayloadJson, variantItem);
  return attributePayloadJson;
};

export const createProductAtrributeJsonArray = (pdpSeoValue, productTypeValue, productAttributeFromFeedItemJson, attributePayloadJson ) => {
  const productSchemaForType =  AttributeHelper.createProductSchemaForType(productTypeValue);
  // condition to check if the productSchemaForType is there or not
  if ( productSchemaForType ) {
    productSchemaForType.forEach(instance => {
      const propertyName = instance?.name;
      const dataType = instance?.dataType;
      let propertyValue;
      const differentPropertyName =  AttributeHelper.checkAndReturnDifferentPropertyFeedName(propertyName);
      if (differentPropertyName) {
        propertyValue =  AttributeHelper.retriveValueFromFeedAttributeforSpecificProperty(productAttributeFromFeedItemJson, differentPropertyName);
      } else if (propertyName === CONSTANTS.PDPSEO_PROEPRTY_NAME) {
        propertyValue =  pdpSeoValue;
      } else {
        propertyValue =  AttributeHelper.retriveProductAttributeValueFromJson(productAttributeFromFeedItemJson, propertyName, dataType);
      }
            
      if ( !propertyValue) {
        propertyValue = AttributeHelper.defaultValueAsPerType(dataType);
      }

      if ((propertyName === CONSTANTS.MAP_PROEPRTY_NAME) || (propertyName === CONSTANTS.ITEM_COST_PROEPRTY_NAME)) {
        populatePriceAttibuteValue(attributePayloadJson, propertyName, propertyValue);  
      } else {
        populateAttributeJsonWithPropertyValue(propertyName, propertyValue, attributePayloadJson);
      }

    });
  }
  console.log("attributePayloadJson",attributePayloadJson);
  return attributePayloadJson;
};

/** */
export const createSkuAtrributeJsonArray = (productTypeValue, attributePayloadJson, variantItem ) => {
  const skuSchemaForType =  AttributeHelper.createSkuSchemaForType(productTypeValue);
  if (skuSchemaForType) {
    skuSchemaForType.forEach(instance => {
      const propertyName = instance?.name;
      const dataType = instance?.dataType;
      let propertyValue;

      const differentPropertyName =  AttributeHelper.checkAndReturnDifferentPropertyFeedName(propertyName);
      if (differentPropertyName) {
        propertyValue =  AttributeHelper.retriveValueFromFeedAttributeforSpecificProperty(variantItem.variantAttributes, differentPropertyName);
      } else {
        propertyValue =  AttributeHelper.retriveSkuAttributeValueFromJson(variantItem.variantAttributes, propertyName, dataType);
      }
      
      if ( !propertyValue) {
         propertyValue = AttributeHelper.defaultValueAsPerType(dataType);
      }

      if ( propertyName === CONSTANTS.VARIANt_COST_PROEPRTY_NAME) {
        populatePriceAttibuteValue(attributePayloadJson, propertyName, propertyValue);  
      } else {
        populateAttributeJsonWithPropertyValue(propertyName, propertyValue, attributePayloadJson);
      }

    });
  }
  return attributePayloadJson;
};

/** */
export const populatePriceAttibuteValue = (attributePayloadJson, propertyName, propertyValue)  => {

  attributePayloadJson.push({
    name: propertyName,
    value: {
      type: propertyValue?.type,
      centAmount: propertyValue?.centAmount,
      currencyCode: propertyValue?.currencyCode,
      fractionDigits: propertyValue?.fractionDigits,
    },
  });

  return attributePayloadJson;
};

/** */
export const populateAttributeJsonWithPropertyValue = (propertyName, propertyValue, attributePayloadJson) => {
  console.log("propertyName--"+propertyName+"  property value--"+propertyValue);
  
  attributePayloadJson.push({
    name: propertyName,
    value: propertyValue,
  });
  
  return attributePayloadJson;
};