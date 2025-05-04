import Blog from '../models/blogModel.js';

// @desc    Fetch all blog posts
// @route   GET /api/blog
// @access  Public
export const getBlogPosts = async (req, res) => {
  try {
    const pageSize = Number(req.query.pageSize) || 10;
    const page = Number(req.query.page) || 1;
    
    const keyword = req.query.keyword
      ? {
          $or: [
            { title: { $regex: req.query.keyword, $options: 'i' } },
            { content: { $regex: req.query.keyword, $options: 'i' } },
            { tags: { $regex: req.query.keyword, $options: 'i' } },
          ],
        }
      : {};
    
    const category = req.query.category ? { category: req.query.category } : {};
    const tag = req.query.tag ? { tags: req.query.tag } : {};
    const isPublished = { isPublished: true };
    
    const count = await Blog.countDocuments({
      ...keyword,
      ...category,
      ...tag,
      ...isPublished,
    });
    
    const posts = await Blog.find({
      ...keyword,
      ...category,
      ...tag,
      ...isPublished,
    })
      .populate('author', 'name')
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ createdAt: -1 });
    
    res.json({
      posts,
      page,
      pages: Math.ceil(count / pageSize),
      count,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch single blog post
// @route   GET /api/blog/:id
// @access  Public
export const getBlogPostById = async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id).populate('author', 'name');
    
    if (post) {
      // Increment view count
      post.views += 1;
      await post.save();
      
      res.json(post);
    } else {
      res.status(404);
      throw new Error('Blog post not found');
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// @desc    Fetch blog post by slug
// @route   GET /api/blog/slug/:slug
// @access  Public
export const getBlogPostBySlug = async (req, res) => {
  try {
    const post = await Blog.findOne({ slug: req.params.slug }).populate('author', 'name');
    
    if (post) {
      // Increment view count
      post.views += 1;
      await post.save();
      
      res.json(post);
    } else {
      res.status(404);
      throw new Error('Blog post not found');
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// @desc    Create a blog post
// @route   POST /api/blog
// @access  Private/Admin
export const createBlogPost = async (req, res) => {
  try {
    const { title, slug, content, excerpt, featuredImage, category, tags, isPublished } = req.body;
    
    const slugExists = await Blog.findOne({ slug });
    
    if (slugExists) {
      res.status(400);
      throw new Error('Blog post with this slug already exists');
    }
    
    const post = new Blog({
      title,
      slug,
      content,
      excerpt,
      author: req.user._id,
      featuredImage,
      category,
      tags: tags || [],
      isPublished: isPublished !== undefined ? isPublished : true,
    });
    
    const createdPost = await post.save();
    res.status(201).json(createdPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a blog post
// @route   PUT /api/blog/:id
// @access  Private/Admin
export const updateBlogPost = async (req, res) => {
  try {
    const { title, slug, content, excerpt, featuredImage, category, tags, isPublished } = req.body;
    
    const post = await Blog.findById(req.params.id);
    
    if (post) {
      // Check if slug is being changed and if it already exists
      if (slug && slug !== post.slug) {
        const slugExists = await Blog.findOne({ slug });
        
        if (slugExists) {
          res.status(400);
          throw new Error('Blog post with this slug already exists');
        }
      }
      
      post.title = title || post.title;
      post.slug = slug || post.slug;
      post.content = content || post.content;
      post.excerpt = excerpt || post.excerpt;
      post.featuredImage = featuredImage || post.featuredImage;
      post.category = category || post.category;
      post.tags = tags || post.tags;
      post.isPublished = isPublished !== undefined ? isPublished : post.isPublished;
      
      const updatedPost = await post.save();
      res.json(updatedPost);
    } else {
      res.status(404);
      throw new Error('Blog post not found');
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a blog post
// @route   DELETE /api/blog/:id
// @access  Private/Admin
export const deleteBlogPost = async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id);
    
    if (post) {
      await post.deleteOne();
      res.json({ message: 'Blog post removed' });
    } else {
      res.status(404);
      throw new Error('Blog post not found');
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// @desc    Add comment to blog post
// @route   POST /api/blog/:id/comments
// @access  Private
export const addComment = async (req, res) => {
  try {
    const { comment } = req.body;
    
    const post = await Blog.findById(req.params.id);
    
    if (post) {
      const newComment = {
        user: req.user._id,
        name: req.user.name,
        comment,
      };
      
      post.comments.push(newComment);
      await post.save();
      
      res.status(201).json({ message: 'Comment added' });
    } else {
      res.status(404);
      throw new Error('Blog post not found');
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get popular blog posts
// @route   GET /api/blog/popular
// @access  Public
export const getPopularBlogPosts = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 5;
    
    const posts = await Blog.find({ isPublished: true })
      .sort({ views: -1 })
      .limit(limit)
      .populate('author', 'name');
    
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
