import { projectKey, httpApiRoot } from "./client.js";
import dotenv from "dotenv";
const env = dotenv.config();

export const reteieveProductByKey = async (productKey) => {
  let productItem = null;
  try{
    productItem = await getProductByKey(productKey);
    
  }catch (error){ 
    //console.log(error);
  }
  return productItem;
};

export const retriveCategoryByKey = async (categoryKey) => {
  let categoryItem = null;
  try{
      categoryItem = await getCategoryByKey(categoryKey);
    
  }catch (error){ 
    //console.log(error);
  }
  return categoryItem;
};

export const getProductByKey = async (productKey) => {
  return await httpApiRoot
  .withProjectKey({ projectKey })
  .products()
  .get({
    queryArgs: {
      where: [`key="${productKey}"`],
      limit: 1,
    },
  })
  .execute();
};

export const getCategoryByKey = async (categoryKey) => {
  return await httpApiRoot
  .withProjectKey({ projectKey })
  .categories()
  .get({
    queryArgs: {
      where: [`key="${categoryKey}"`],
      limit: 1,
    },
  })
  .execute();
};


export const createProduct = async (productPayload) => {
  return await httpApiRoot
    .withProjectKey({ projectKey })
    .products()
    .post({ body: productPayload })
    .execute();
};

export const updateProduct = async (productKey, updateProductJson) => {
  return await httpApiRoot
  .withProjectKey({ projectKey })
  .products()
  .withKey({key: productKey})
  .post({ body: updateProductJson })
  .execute();
};