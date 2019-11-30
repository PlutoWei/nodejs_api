var express = require("express");
var router = express.Router();
var bCrypt = require("bcrypt-nodejs");
var passport = require("passport");
var svgCaptcha = require("svg-captcha");
var stringSimilarity = require("string-similarity");

var User = require("../models/user");
var rCaptcha = require("../models/regcaptcha");
var Inventory = require("../models/inventory");
var Receiving = require("../models/receiving");
var Orders = require("../models/order");

const jwt = require("jsonwebtoken");
const requireAuth = passport.authenticate("jwt", { session: false });

var crypto = require("crypto");
var fs = require("fs");

function getDetailInventory(id, callback) {
  Inventory.findOne({ _id: id }, function(err, res) {
    // In case of any error, return using the done method.
    if (err) {
      return err;
    } else {
      callback(err, res);
    }
  });
}

function getInventorybyCategory(product_category, skip, limit, callback) {
  const query = Inventory.find(
    { product_category: product_category },
    { skip: skip, limit: limit },
    function(err, res) {
      // In case of any error, return using the done method.
      if (err) {
        return err;
      } else {
        console.log("SS");
      }
      callback(err, res);
    }
  );
  query.select(
    "product_name product_image product_description product_price stock_number"
  );
  return query;
}

function getInventoryAll(limit, callback) {
  Inventory.find({}, function(err, res) {
    // In case of any error, return using the done method.
    if (err) {
      return err;
    } else {
      callback(err, res);
    }
  });
}

function getInventoryByCatandSort(c, s, l, callback) {
  Inventory.find({ product_category: c }, { skip: s, limit: l }, function(
    err,
    res
  ) {
    // In case of any error, return using the done method.
    if (err) {
      return err;
    } else {
      console.log(res);
    }
    callback(err, res);
  });
}

function getOneandUpdateInventory(
  id,
  product_name,
  product_description,
  product_category,
  product_price,
  stock_number,
  delivery_date,
  total_stock,
  item_supplier,
  supplier_name,
  supplier_email,
  supplier_number,
  is_available,
  callback
) {
  Inventory.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        product_name: product_name,
        product_description: product_description,
        product_category: product_category,
        product_price: product_price,
        stock_number: stock_number,
        delivery_date: delivery_date,
        total_stock: total_stock,
        item_supplier: item_supplier,
        supplier_name: supplier_name,
        supplier_email: supplier_email,
        supplier_number: supplier_number,
        is_available: is_available
      }
    },
    { upsert: true, new: true },
    function(err, res) {
      if (err) {
        return err;
      } else {
        callback(err, res);
      }
    }
  );
}

function deleteInvetory(stock_number, callback) {
  Inventory.findOneAndRemove({ _id: stock_number }, function(err, result) {
    if (err) {
      return err;
    } else {
      callback(err, result);
    }
  });
}

function getDetailOrder(id, callback) {
  Orders.findOne({ _id: id }, function(err, res) {
    // In case of any error, return using the done method.
    if (err) {
      return err;
    } else {
      callback(err, res);
    }
  });
}

function getOrderByStatus(order_status, callback) {
  Orders.find({ order_status: order_status }, function(err, res) {
    // In case of any error, return using the done method.
    if (err) {
      return err;
    } else {
      console.log("SS");
    }
    callback(err, res);
  });
}

function getDeliveries(inventory_id, callback) {
  Receiving.find({ inventory_id: inventory_id }, function(err, res) {
    // In case of any error, return using the done method.
    if (err) {
      return err;
    } else {
      console.log("Getting Deliveries");
    }
    callback(err, res);
  });
}

function deleteOrder(id, callback) {
  Order.findOneAndRemove({ _id: id }, function(err, result) {
    if (err) {
      return err;
    } else {
      callback(err, result);
    }
  });
}

router.post("/insert", function(req, res) {
  // var user = req.user.username;
  // console.log("Username :", user);
  // console.log("Req body", req.body);
  var newInventory = new Inventory();
  newInventory.product_name = req.body.product_name;
  newInventory.product_description = req.body.product_description;
  newInventory.product_category = req.body.product_category;
  newInventory.product_price = req.body.product_price;
  newInventory.stock_number = req.body.stock_number;
  newInventory.item_supplier = req.item_supplier;
  newInventory.supplier_name = req.body.supplier_name;
  newInventory.supplier_email = req.body.supplier_email;
  newInventory.supplier_number = req.body.supplier_number;
  newInventory.is_available = req.body.is_available;
  newInventory.product_image = req.body.product_image;

  newInventory.save(function(err) {
    if (err) {
      console.log("Error in creating  new  Inventory: " + err);
      // throw err;
      return next(err);
    }
    console.log("New Inventory Save Successfully");
    //return (null, newJob);
    console.log(newInventory);
    res.status(201).json(newInventory);
  });
});

router.post("/read/:_id", requireAuth, function(req, res) {
  var _id = req.params._id;
  getDetailInventory(_id, function(err, result) {
    if (err) {
      res.json({ success: false, message: "An Error Occured " });
    } else {
      res.json(result);
    }
  });
});

router.post("/read/:category/:skip/:limit", function(req, res) {
  var category = req.params.category;
  var skip = req.params.skip;
  var limit = req.params.limit;
  getInventorybyCategory(category, skip, limit, function(err, result) {
    if (err) {
      res.json({
        success: false,
        message: "An error occurred"
      });
    } else {
      res.json(result);
    }
  });
});

router.post("/update/:id", requireAuth, function(req, res) {
  var id = req.params.id;
  getOneandUpdateInventory(
    id,
    req.body.product_name,
    req.body.product_description,
    req.body.product_category,
    req.body.product_price,
    req.body.stock_number,
    req.body.delivery_date,
    req.body.total_stock,
    req.body.item_supplier,
    req.body.supplier_name,
    req.body.supplier_email,
    req.body.supplier_number,
    req.body.is_available,
    function(err, result) {
      if (err) {
        res.json({ success: false, message: "An Error Occured " });
      } else {
        res.json(result);
      }
    }
  );
});

router.post("/delete/:stock_number_id", requireAuth, function(req, res) {
  var id = req.params.stock_number_id;
  deleteInvetory(id, function(err, result) {
    if (err) {
      res.json({ success: false, message: "An Error Occured " });
    } else {
      res.json(result);
    }
  });
});

router.post("/getbycategory/:skip/:limit", requireAuth, function(req, res) {
  var skip = req.params.skip;
  var limit = req.params.limit;
  if (true) {
    console.log("Yahiiko");
    getInventoryAll(limit, function(err, result) {
      if (err) {
        res.json({ success: false, message: "An Error Occured " });
      } else {
        //console.log(result)
        res.json(result);
      }
    });
  }
});

router.post("/receiving/insert", requireAuth, function(req, res) {
  console.log("Receiving ", req.body);
  var newReceiving = new Receiving();

  newReceiving.inventory_id = req.body.inventory_id;
  newReceiving.quantity = req.body.quantity;
  newReceiving.unit = req.body.unit;
  newReceiving.price_per_unit = req.body.price_per_unit;
  newReceiving.additional_cost_acquisition =
    req.body.additional_cost_acquisition;
  newReceiving.taxes = req.body.taxes;
  newReceiving.receiving_date = req.body.receiving_date;
  newReceiving.notes = req.body.notes;

  newReceiving.save(function(err) {
    if (err) {
      console.log("Error in creating  new  Inventory: " + err);
      throw err;
    }
    console.log("New Receiving Save Successfully");
    //return (null, newJob);

    getDeliveries(req.body.inventory_id, function(err, result) {
      if (err) {
        res.json({ success: false, message: "An Error Occured " });
      } else {
        //console.log(result)
        var deliveries = result;
        var s = [];
        for (var i = 0; i < deliveries.length; i++) {
          var obj = deliveries[i];
          var n = Number(obj.quantity);
          s.push(n);

          var summation = s.reduce((a, b) => a + b, 0);
          console.log(obj.quantity);
          console.log("Total orders", summation);
          //UPdate Total Number of Available Stock
        }
      }
    });
    console.log(newReceiving);
    res.json(newReceiving);
  });
});

router.post("/orders/insert", requireAuth, function(req, res) {
  var newOrder = new Orders();

  var username = req.user.username;
  newOrder.inventory_id = req.body.inventory_id;
  newOrder.quantity = req.body.quantity;
  newOrder.price_per_unit = req.body.price_per_unit;
  newOrder.order_status = req.body.order_status;
  newOrder.username = username;

  console.log("Orders ", req.body);

  newOrder.save(function(err) {
    if (err) {
      console.log("Error in creating  new  Inventory: " + err);
      throw err;
    }
    console.log("New Orders Save Successfully");
    //return (null, newJob);
    console.log(newOrder);
    res.json(newOrder);
  });
});

router.post("/orders/find/:order_status", requireAuth, function(req, res) {
  var username = req.user.username;
  var order_status = req.params.order_status;
  getOrderByStatus(order_status, function(err, result) {
    if (err) {
      res.json({ success: false, message: "An Error Occured " });
    } else {
      //console.log(result)
      res.json(result);
    }
  });
});

router.get("/makeadmin", function(req, res) {
  var username = "ragnarokconnectio4869@gmail.com";
  User.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        userType: "admin"
      }
    },
    { upsert: true, new: true },
    function(err, res) {
      if (err) {
        return err;
      } else {
        callback(err, res);
      }
    }
  );
});

module.exports = router;
