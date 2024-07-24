// export default expect 3 things
// 1. Hoisted declaration => a function
// 2. class
// 3. assigment expression


const validateRequest = (req, res, next) => {
  // server side validation of data which client is providing
  const { name, price, imageURL } = req.body;
  let errors = [];
  if (!name || name.trim() == "") {
    errors.push("Name is required");
  }
  if (!price || parseFloat(price) < 1) {
    errors.push("Price must be positive value");
  }
  try {
    const validUrl = new URL(imageUrl);
  } catch (err) {
    errors.push("URL is Invalid");
  }

  if (errors.length > 0) {
    return res.render("new-product", {
      errorMessage: error[0],
    });
  }
};

export default validateRequest;