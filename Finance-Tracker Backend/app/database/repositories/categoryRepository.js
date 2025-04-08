const categoryModel = require('../../models/categoryModel');

const createCategory = async (name) => {
    try {
        const newCategory = await categoryModel.create({
            name: name
        });
        return newCategory;
    } catch (err) {
        throw new Error(`Error while creating category: ${err.message}`);
    }
};

const editCategory = async (categoryId, newData) => {
    try {
        const categoryObject = await categoryModel.findOne({
            _id: categoryId
        });

        if (!categoryObject) {
            return null;
        }

        categoryObject.name = newData.name;

        const updatedCategory = await categoryObject.save();
        return updatedCategory;

    } catch (err) {
        throw new Error(`Error while creating category: ${err.message}`);
    }
};

const deleteCategory = async (categoryId) => {
    try {
        const categoryObject = await categoryModel.findById(categoryId);

        if (!categoryObject) {
            return null;
        }

        const updatedCategory = await categoryObject.save();
        return updatedCategory;

    } catch (err) {
        throw new Error(`Error while creating category: ${err.message}`);
    }
};

const getCategory = async (categoryId) => {
    try {
      const categoryObject = await categoryModel.findOne({
        _id: categoryId
      });
      
      return categoryObject;
    } catch (err) {
      throw new Error(`Error while fetching category: ${err.message}`);
    }
  };
  
  const getAllCategories = async () => {
    try {
      const categories = await categoryModel.find();
      return categories;
    } catch (err) {
      throw new Error(`Error while fetching categories: ${err.message}`);
    }
  };
  
  const getCategoryIdByName = async (categoryName) => {
    try {
      const categoryObject = await categoryModel.findOne({
        name: categoryName,
        isActive: true,
      });
      return categoryObject._id;
    } catch (err) {
      throw new Error(`Error while fetching category: ${err.message}`);
    }
  };

module.exports = {
    createCategory,
    editCategory,
    deleteCategory,
    getCategory,
    getAllCategories,
    getCategoryIdByName
};