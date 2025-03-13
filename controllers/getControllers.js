const Product = require("../models/products.js");

const getAll = async (req, res) => {
  const { name, company, featured, sort, fields, numericFilters } = req.query;
  const queryObject = {};
  if (name) {
    queryObject.name = {
      $regex: name,
      $options: "i",
    };
  }
  if (company) {
    queryObject.company = company;
  }
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (numericFilters) {
    //price>40,rating<=2
    const operatorTransformer = {
      ">": "$gt",
      ">=": "$gte",
      "<": "$lt",
      "<=": "$lte",
      "=": "$eq",
    };

    const regex = /\b(>|>=|<|<=|=)\b/g;
    const mNumericFilters = numericFilters.replace(regex, (match) => {
      return `-${operatorTransformer[match]}-`;
    });
    const separateFilter = mNumericFilters.split(",");
    const checker = ["price", "rating"];
    separateFilter.forEach((filter) => {
      const [field, operator, value] = filter.split("-");
      if (checker.includes(field)) {
        queryObject[field] = {
          [operator]: value,
        };
      }
    });
  }

  console.log(queryObject);

  let result = Product.find(queryObject);

  if (sort) {
    const sortList = sort.split(",").join(" ");
    result.sort(sortList);
  }
  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result.select(fieldsList);
  }

  const limit = req.query.limit || 10;
  const page = req.query.page || 1;
  const skip = (page - 1) * limit;
  result.limit(limit).skip(skip);

  const products = await result;

  res.status(200).json({ nmHits: products.length, products: products });
};

module.exports = {
  getAll,
};
