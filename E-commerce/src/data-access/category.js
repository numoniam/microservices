const COLLECTION_NAME = "category";
function makeCategoryData({ axios, config }) {
  return Object.freeze({
    addCategory,
    getCategory,
    getAllCategory,
    deleteCategory,
    updateCategory,
    addProductIdInCategory,
    fetchProductIdsFromCategory,
    categorySearch,
  });

  async function addCategory({ category_name, product_ids }) {
    try {
      const data = [
        {
          category_name,
          product_ids,
          created_at_dt: new Date().toISOString(),
        },
      ];

      const result = await axios.post(
        `${config.solrCategory}/${COLLECTION_NAME}/update?commit=true`,
        data
      );

      return result.data;
    } catch (err) {
      throw new Error(`Failed to add document to Solr: ${err.message}`);
    }
  }

  async function getCategory({ id }) {
    try {
      const result = await axios.get(
        `${config.solrCategory}/${COLLECTION_NAME}/select?q=id:${id}&wt=json`
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

  async function getAllCategory() {
    try {
      const params = {
        q: "*:*",
        rows: 10000,
        wt: "json",
      };
      const result = await axios.get(
        `${config.solrCategory}/${COLLECTION_NAME}/select`,
        { params }
      );
      return result.data.response.docs;
    } catch (err) {
      throw new Error(`Failed to fetch document from Solr: ${err.message}`);
    }
  }

  async function deleteCategory({ id }) {
    try {
      const deleteInstruction = {
        delete: { id },
      };
      const response = await axios.post(
        `${config.solrCategory}/${COLLECTION_NAME}/update?commit=true`,
        deleteInstruction
      );
      return response.data;
    } catch (err) {
      throw new Error(`Failed to delete document from Solr: ${err.message}`);
    }
  }

  async function updateCategory({ id, updateCategoryData }) {
    try {
      updateCategoryData.modified_at_dt = new Date().toISOString();

      params = {
        commit: true,
      };

      const document = {
        id,
        ...updateCategoryData,
      };

      const response = await axios.patch(
        `${config.solrCategory}/${COLLECTION_NAME}/update/json`,
        [document],
        { params }
      );
      return response.data;
    } catch (err) {
      throw new Error(`Failed to update document from Solr: ${err.message}`);
    }
  }

  async function addProductIdInCategory({ product_Id, category_id }) {
    try {
      const updateData = {
        id: category_id,
        product_ids: { add: product_Id },
      };
      params = { commit: true };

      await axios.post(
        `${config.solrCategory}/${COLLECTION_NAME}/update`,
        [updateData],
        { params }
      );
    } catch (err) {
      throw new Error(`Failed to add product id in document: ${err.message}`);
    }
  }

  async function fetchProductIdsFromCategory({ category_id }) {
    try {
      params = {
        q: `id:"${category_id}"`,
        fl: "product_ids", // fetch only the id field
        rows: 1, // limit the result
      };

      const response = await axios.get(
        `${config.solrCategory}/${COLLECTION_NAME}/select`,
        { params }
      );
      const result = response.data.response.docs;
      return result[0].product_ids;
    } catch (err) {
      throw new Error(
        `Failed to delete product id in document: ${err.message}`
      );
    }
  }

  async function categorySearch({ category_name, order }) {
    try {
      const sorting = order ?? "asc";
      const search = `${category_name}*`;
      params = {
        q: `category_name:${search}`,
        wt: "json",
        rows: 100,
        sort: `category_name ${sorting}`, // Use the product_name field for sorting
      };
      const response = await axios.get(
        `${config.solrCategory}/${COLLECTION_NAME}/select`,
        { params }
      );
      const result = response.data.response.docs;
      return result;
    } catch (err) {
      throw new Error(`Failed to fetch document from Solr: ${err.message}`);
    }
  }
}

module.exports = makeCategoryData;
