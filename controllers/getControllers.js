const Product = require("../models/products.js");

/*  numeric filtering */

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
    const correspondObject = {
      ">": "$gt",
      ">=": "$gte",
      "<": "$lt",
      "<=": "$lte",
      "=": "$eq",
    };

    const regex = /\b(>|<|>=|<=|=)\b/g;
    numericFilters.replace(regex, (match) => {
      return `-${correspondObject[match]}-`;
    });
    //price-$gt-40,rating-$lte-4.5
    const numericFiltersParsed = numericFilters.split(",");
    let field;
    let operator;
    let value;

    numericFiltersParsed.forEach((filter) => {
      [field, operator, value] = filter.split("-");
      const backupCheck = ["price", "rating"];
      if (backupCheck.includes(field)) {
        queryObject.field = {
          operator: value,
        };
      }
    });
  }

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
