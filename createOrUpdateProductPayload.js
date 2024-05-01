import { retriveCategoriesFromFeed, createMasterVariantDatatForItem, createVariantDatafromItem } from "./createProdctMapper.js";
import { createUpdateProductActionArray } from './updateProductMapper.js'
import * as CONSTANTS from './constants.js';

export const createProductPayloadFromFeedItem = async ( productItemJson ) => {

    const productPayload = {  
      key: productItemJson.key,
      productType: {
        key: productItemJson.productType,
        typeId: CONSTANTS.PRODUCT_TYPE,
      },
      name: {
        "en-us": productItemJson.name,
      },
      slug: {
        "en-us": productItemJson.key,
      },
      description: {
        "en-us": productItemJson.description["en-us"]
      },
      categories: await retriveCategoriesFromFeed(productItemJson),
      masterVariant: createMasterVariantDatatForItem(productItemJson),
      variants: createVariantDatafromItem(productItemJson),
    };
    return productPayload;
};


export const updateProductPayloadFromFeedItem = async (existingCurrentProductItem, productFeedItemFromJson) => {
    const updateProductPayload = {
      "version" : existingCurrentProductItem?.version,
      "actions": await createUpdateProductActionArray(existingCurrentProductItem, productFeedItemFromJson)
    };
    return updateProductPayload
};