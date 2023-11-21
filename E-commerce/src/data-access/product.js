const COLLECTION_NAME = "product";
function makeProductData({ axios, config }) {
  return Object.freeze({
    addProduct,
    getProduct,
    deleteProduct,
    getAllProduct,
    updateProduct,
    getProductIdByName,
    getCategoryId,
    deleteProductsByCategoryId,
    productSearch,
  });

  async function addProduct({ product_name, category_id }) {
    try {
      const data = [
        {
          product_name,
          category_id,
          created_at_dt: new Date().toISOString(),
        },
      ];
      // Add product to the product collection
      const result = await axios.post(
        `${config.solrProduct}/${COLLECTION_NAME}/update?commit=true`,
        data
      );
      return result.data;
    } catch (err) {
      throw new Error(`Failed to add document to Solr: ${err.message}`);
    }
  }

  async function getProduct({ id }) {
    try {
      const result = await axios.get(
        `${config.solrProduct}/${COLLECTION_NAME}/select?q=id:${id}&wt=json`
      );
      const document = result.data.response.docs;

      if (!document || !document.length) {
        return false;
      }

      return result.data.response.docs;
    } catch (err) {
      throw new Error(`Failed to fetch document from Solr: ${err.message}`);
    }
  }

  async function deleteProduct({ id }) {
    try {
      const deleteInstruction = {
        delete: { id },
      };
      const response = await axios.post(
        `${config.solrProduct}/${COLLECTION_NAME}/update?commit=true`,
        deleteInstruction
      );
      return response.data;
    } catch (err) {
      throw new Error(`Failed to delete document from Solr: ${err.message}`);
    }
  }

  async function getAllProduct() {
    try {
      const params = {
        q: "*:*",
        rows: 10000,
        wt: "json",
      };
      const result = await axios.get(
        `${config.solrProduct}/${COLLECTION_NAME}/select`,
        { params }
      );
      return result.data.response.docs;
    } catch (err) {
      throw new Error(`Failed to fetch document from Solr: ${err.message}`);
    }
  }

  async function updateProduct({ id, updateProductData }) {
    try {
      updateProductData.modified_at_dt = new Date().toISOString();
      params = {
        commit: true,
      };
      const document = {
        id,
        ...updateProductData,
      };
      const response = await axios.patch(
        `${config.solrProduct}/${COLLECTION_NAME}/update/json`,
        [document],
        { params }
      );
      return response.data;
    } catch (err) {
      throw new Error(`Failed to update document from Solr: ${err.message}`);
    }
  }

  async function getProductIdByName({ product_name }) {
    try {
      params = {
        q: `product_name:"${product_name}"`,
        fl: "id", // fetch only the id field
        rows: 1, // limit the result
      };

      const response = await axios.get(
        `${config.solrProduct}/${COLLECTION_NAME}/select`,
        { params }
      );
      const result = response.data.response.docs;
      return result[0].id;
    } catch (err) {
      throw new Error(`Failed to fetch document from Solr: ${err.message}`);
    }
  }

  async function getCategoryId({ product_id }) {
    try {
      params = {
        q: `id:"${product_id}"`,
        fl: "category_id", // fetch only the id field
        rows: 1, // limit the result
      };

      const response = await axios.get(
        `${config.solrProduct}/${COLLECTION_NAME}/select`,
        { params }
      );

      const result = response.data.response.docs;
      return result[0].category_id;
    } catch (err) {
      throw new Error(`Failed to fetch document from Solr: ${err.message}`);
    }
  }

  async function deleteProductsByCategoryId({ id }) {
    try {
      const deleteInstruction = {
        delete: { query: `category_id:${id}` },
      };
      await axios.post(
        `${config.solrProduct}/${COLLECTION_NAME}/update?commit=true`,
        deleteInstruction
      );
    } catch (err) {
      throw new Error(`Failed to delete document from Solr: ${err.message}`);
    }
  }

  async function productSearch({ product_name, order }) {
    try {
      const sorting = order ?? "asc";
      const search = `${product_name}*`;
      params = {
        q: `product_name:${search}`,
        wt: "json",
        rows: 100,
        sort: `product_name ${sorting}`, // Use the product_name field for sorting
      };
      const response = await axios.get(
        `${config.solrProduct}/${COLLECTION_NAME}/select`,
        { params }
      );
      const result = response.data.response.docs;
      return result;
    } catch (err) {
      throw new Error(`Failed to fetch document from Solr: ${err.message}`);
    }
  }
}

module.exports = makeProductData;
