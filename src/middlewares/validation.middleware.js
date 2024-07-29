import { body, validationResult } from "express-validator";

// export default expect 3 things
// 1. Hoisted declaration => a function
// 2. class
// 3. assigment expression

// server side validation of data which client is providing
const validateRequest = async (req, res, next) => {
  // 1. setup rules for validation
  const rules = [
    body("name").isEmpty().withMessage("Name is Required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price should be positive value"),
    body("imageUrl").isURL().withMessage("invalid URL"),
  ];
  // 2. run those rules
  await Promise.all(
    rules.map((rule) => {
      rule.run(req);
    })
  );
  // 3. check if there are any errors after running the rules
  var validationErrors = validationResult(req)

//   const { name, price, imageURL } = req.body;
//   let errors = [];
//   if (!name || name.trim() == "") {
//     errors.push("Name is required");
//   }
//   if (!price || parseFloat(price) < 1) {
//     errors.push("Price must be positive value");
//   }
//   try {
//     const validUrl = new URL(imageUrl);
//   } catch (err) {
//     errors.push("URL is Invalid");
//   }

// 4. if there are errors then return the error message
  if (!validationErrors.isEmpty()) {
    return res.render("new-product", {
      errorMessage: validationErrors.array()[0].msg,
    });
  }
};

export default validateRequest;
