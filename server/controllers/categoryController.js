import Category from '../models/categoryModel.js';

// @desc    Fetch all categories
// @route   GET /api/categories
// @access  Public
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({}).sort({ displayOrder: 1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch single category
// @route   GET /api/categories/:id
// @access  Public
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    
    if (category) {
      res.json(category);
    } else {
      res.status(404);
      throw new Error('Category not found');
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// @desc    Create a category
// @route   POST /api/categories
// @access  Private/Admin
export const createCategory = async (req, res) => {
  try {
    const { name, slug, description, image, parent, isActive, displayOrder } = req.body;
    
    const categoryExists = await Category.findOne({ slug });
    
    if (categoryExists) {
      res.status(400);
      throw new Error('Category with this slug already exists');
    }
    
    const category = new Category({
      name,
      slug,
      description,
      image,
      parent,
      isActive: isActive !== undefined ? isActive : true,
      displayOrder: displayOrder || 0,
    });
    
    const createdCategory = await category.save();
    res.status(201).json(createdCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Private/Admin
export const updateCategory = async (req, res) => {
  try {
    const { name, slug, description, image, parent, isActive, displayOrder } = req.body;
    
    const category = await Category.findById(req.params.id);
    
    if (category) {
      // Check if slug is being changed and if it already exists
      if (slug && slug !== category.slug) {
        const slugExists = await Category.findOne({ slug });
        
        if (slugExists) {
          res.status(400);
          throw new Error('Category with this slug already exists');
        }
      }
      
      category.name = name || category.name;
      category.slug = slug || category.slug;
      category.description = description !== undefined ? description : category.description;
      category.image = image || category.image;
      category.parent = parent !== undefined ? parent : category.parent;
      category.isActive = isActive !== undefined ? isActive : category.isActive;
      category.displayOrder = displayOrder !== undefined ? displayOrder : category.displayOrder;
      
      const updatedCategory = await category.save();
      res.json(updatedCategory);
    } else {
      res.status(404);
      throw new Error('Category not found');
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    
    if (category) {
      // Check if category has children
      const hasChildren = await Category.findOne({ parent: category._id });
      
      if (hasChildren) {
        res.status(400);
        throw new Error('Cannot delete category with subcategories');
      }
      
      await category.deleteOne();
      res.json({ message: 'Category removed' });
    } else {
      res.status(404);
      throw new Error('Category not found');
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get categories tree (with hierarchy)
// @route   GET /api/categories/tree
// @access  Public
export const getCategoriesTree = async (req, res) => {
  try {
    // Get all categories
    const categories = await Category.find({}).sort({ displayOrder: 1 });
    
    // Build tree structure
    const categoriesMap = {};
    categories.forEach(category => {
      categoriesMap[category._id] = {
        _id: category._id,
        name: category.name,
        slug: category.slug,
        description: category.description,
        image: category.image,
        isActive: category.isActive,
        displayOrder: category.displayOrder,
        children: []
      };
    });
    
    const rootCategories = [];
    
    categories.forEach(category => {
      if (category.parent) {
        // Has parent, add to parent's children
        if (categoriesMap[category.parent]) {
          categoriesMap[category.parent].children.push(categoriesMap[category._id]);
        }
      } else {
        // No parent, add to root categories
        rootCategories.push(categoriesMap[category._id]);
      }
    });
    
    res.json(rootCategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
