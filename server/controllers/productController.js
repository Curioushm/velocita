import Product from '../models/productModel.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const pageSize = Number(req.query.pageSize) || 12;
    const page = Number(req.query.page) || 1;
    
    const keyword = req.query.keyword
      ? {
          $or: [
            { name: { $regex: req.query.keyword, $options: 'i' } },
            { description: { $regex: req.query.keyword, $options: 'i' } },
          ],
        }
      : {};
    
    const category = req.query.category ? { category: req.query.category } : {};
    const brand = req.query.brand ? { brand: req.query.brand } : {};
    const featured = req.query.featured ? { featured: true } : {};
    const isBestSeller = req.query.bestSeller ? { isBestSeller: true } : {};
    const isLatest = req.query.new ? { isLatest: true } : {};
    
    const count = await Product.countDocuments({
      ...keyword,
      ...category,
      ...brand,
      ...featured,
      ...isBestSeller,
      ...isLatest,
    });
    
    const products = await Product.find({
      ...keyword,
      ...category,
      ...brand,
      ...featured,
      ...isBestSeller,
      ...isLatest,
    })
      .populate('category', 'name slug')
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort(req.query.sortBy ? { [req.query.sortBy]: req.query.order || -1 } : { createdAt: -1 });
    
    res.json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
      count,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category', 'name slug');
    
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discount,
      images,
      category,
      brand,
      countInStock,
      specifications,
      weight,
      dimensions,
      sku,
    } = req.body;
    
    const product = new Product({
      name,
      description,
      price,
      discount: discount || 0,
      images: images || [{ url: '/images/sample.jpg', alt: 'Sample Image' }],
      category,
      brand,
      countInStock: countInStock || 0,
      specifications: specifications || [],
      weight: weight || 0,
      dimensions: dimensions || { length: 0, width: 0, height: 0 },
      sku,
      user: req.user._id,
    });
    
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discount,
      images,
      category,
      brand,
      countInStock,
      featured,
      isBestSeller,
      isLatest,
      specifications,
      weight,
      dimensions,
      sku,
    } = req.body;
    
    const product = await Product.findById(req.params.id);
    
    if (product) {
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.discount = discount !== undefined ? discount : product.discount;
      product.images = images || product.images;
      product.category = category || product.category;
      product.brand = brand || product.brand;
      product.countInStock = countInStock !== undefined ? countInStock : product.countInStock;
      product.featured = featured !== undefined ? featured : product.featured;
      product.isBestSeller = isBestSeller !== undefined ? isBestSeller : product.isBestSeller;
      product.isLatest = isLatest !== undefined ? isLatest : product.isLatest;
      product.specifications = specifications || product.specifications;
      product.weight = weight !== undefined ? weight : product.weight;
      product.dimensions = dimensions || product.dimensions;
      product.sku = sku || product.sku;
      
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (product) {
      await product.deleteOne();
      res.json({ message: 'Product removed' });
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
export const createProductReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    
    const product = await Product.findById(req.params.id);
    
    if (product) {
      // Check if user already reviewed
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );
      
      if (alreadyReviewed) {
        res.status(400);
        throw new Error('Product already reviewed');
      }
      
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };
      
      product.reviews.push(review);
      product.updateRatingStatistics();
      
      await product.save();
      res.status(201).json({ message: 'Review added' });
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
export const getTopProducts = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 5;
    
    const products = await Product.find({})
      .sort({ rating: -1 })
      .limit(limit);
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get featured products
// @route   GET /api/products/featured
// @access  Public
export const getFeaturedProducts = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 8;
    
    const products = await Product.find({ featured: true })
      .limit(limit);
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get new products
// @route   GET /api/products/new
// @access  Public
export const getNewProducts = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 8;
    
    const products = await Product.find({ isNew: true })
      .limit(limit);
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get best seller products
// @route   GET /api/products/bestsellers
// @access  Public
export const getBestSellerProducts = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 8;
    
    const products = await Product.find({ isBestSeller: true })
      .limit(limit);
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
