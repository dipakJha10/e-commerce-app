const router = require("express").Router();
const models = require("../../../models/models");
const categories = models.category;
const constants = require("../../../utilities/constants");
const httpStatus = require("http-status");

//post api for categoies

router.post("/newCategories", async (req, res) => {
  try {
    let newCategory = new categories(req.body);
    const category = await newCategory.save();
    res.status(200).json({
      status: httpStatus.OK,
      message: constants.SUCCCESS_MSG,
      data: category,
    });
  } catch (exception) {
    res.status(500).send({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: constants.FAILURE_MSG,
      data: null,
    });
  }
});

// get api for all categories

router.get("/allCategories", async (req, res) => {
  try {
    const category = await categories.find({});
    res.status(200).json({
      status: httpStatus.OK,
      message: constants.SUCCCESS_MSG,
      data: category,
      count: category.length,
    });
  } catch (exception) {
    res.status(500).send({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: constants.FAILURE_MSG,
      data: null,
    });
  }
});

// update api for the categories

router.put("/updateCategory", async (req, res) => {
  try {
    const results = await categories.findOneAndUpdate(
      {
        categoryId: req.body.categoryId,
      },
      req.body,
      {
        new: true,
        upsert: true,
        rawResult: true,
      }
    );
    res.status(200).json({
      status: httpStatus.OK,
      message: "request successfull",
      data: results.value,
    });
  } catch (exception) {
    res.status(500).send({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: "request Failed",
      data: null,
    });
  }
});

// delete api for categories

router.delete("/deleteCategory", async (req, res) => {
  try {
    const delCategory = await categories.findOneAndRemove({
      categoryId: req.body.categoryId,
    });
    res.status(200).json({
      status: httpStatus.OK,
      message: `request successfull !! Category with id ${req.body.categoryId} is deleted`,
      data: null,
    });
  } catch (exception) {
    console.log(exception);
    res.status(500).send({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: "request Failed",
      data: null,
    });
  }
});

module.exports = router;
