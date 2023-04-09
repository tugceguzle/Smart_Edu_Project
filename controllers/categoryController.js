const Category = require('../models/Category');

// CREATE CATEGORY (ADMIN) 
exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).redirect('/user/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};


// DELETE CATEGORY (ADMIN)
exports.deleteCategory = async (req, res) => {
  try {    

    await Category.findByIdAndRemove(req.params.id)
    res.status(200).redirect('/user/dashboard');

  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};
