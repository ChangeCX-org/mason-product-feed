import { readFileSync } from 'fs'
import { createProductPayloadFromFeedItem, updateProductPayloadFromFeedItem } from "./createOrUpdateProductPayload.js";
import { createProduct, reteieveProductByKey , updateProduct } from "./ctServiceApi.js";

const productTypeArrays = [
  "apparel-fashion-accessories", "footwear-footwear-accessories", "toys", "sporting-good", "jewelry",
  "luggage", "pet", "bedding", "bath", "kitchen", "home-decor", "furniture", "tools-auto-yard-equipment",
  "baby", "outdoor-living", "appliance-floorcare", "beauty", "health-wellness", "storage-organization",
  "tv-video", "computers-tablets-office", "cell-phones", "gaming", "cameras-safety", "audio-musical-instruments",
  "wearable-technology"
];

const slugPatternValidation = (slugValue) => {
  const pattern = /^[a-zA-Z0-9_-]{2,256}$/;
  return pattern.test(slugValue);
};


async function processProductFeedItem (productJsonItem ) {
  try {
    //  Basic Validation before the product feed item is processed
    if(productJsonItem && (!productJsonItem?.productType || !productTypeArrays.includes(productJsonItem?.productType))) {
      console.log("The product type is invalid");
      throw new Error("Product Type for the producct item is either empty or invalid", productJsonItem?.key);
    }
    const slugPatternValidationFlag = slugPatternValidation(productJsonItem?.key);
    console.log("The slugPatternValidationFlag value is",slugPatternValidationFlag);

    if (!slugPatternValidationFlag){
      throw new Error("Product has invalid slug value", productJsonItem?.key);
    }


  
    const responseObject = await reteieveProductByKey(productJsonItem?.key);

    const existingCurrentProductItem = responseObject?.body?.results[0];

    if (existingCurrentProductItem) {
      
      const updateProductPayload = await updateProductPayloadFromFeedItem(existingCurrentProductItem, productJsonItem);
      console.log("payload in update is :",updateProductPayload);
      await updateProduct(existingCurrentProductItem?.key, updateProductPayload);
    
    }else {

      const productPayload = await createProductPayloadFromFeedItem(productJsonItem);
      console.log("payload in create is :",productPayload);
      await createProduct(productPayload);
      
    }    
  } catch (error) {
    console.log("error while processong the feed file is ",error);
  }
};


export const localReader = async () => {
  try {
    console.log("----- start ----");

    let jsonData = readFileSync("CommerceTools_Products.json", { encoding: "utf-8" });
    const productItemArray = JSON.parse(jsonData);
   // console.log("the value of parsed json object is : ", productItemArray[0].productAttributes[0].name);
    
    for (const index in productItemArray) {
      const productItem = productItemArray[index];
      
      await processProductFeedItem(productItem);

    }
    console.log("----- End ----");
  } catch (error) {
    throw error;
  }
};

localReader();