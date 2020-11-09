const getBinary = require("../helpers/getBinary");

exports.getHome = (req, res) => {
  res.render("home");
};

/**
 *
 * @param {*} input Chuoi ma ban muon dau di
 * @param output dau ra la mot chuoi nhi phan
 */
const binaryString = (input) => {
  let output = "";
  for (let i = 0; i < input.length; i++) {
    output += input[i].charCodeAt(0).toString(2) + " ";
  }
  return output;
};

exports.postHome = (req, res) => {
  if (req.fileValidationError) {
    return res.send(req.fileValidationError);
  } else if (!req.file) {
    return res.send("Please select an image to upload");
  }

  let stringBinarySentence = binaryString(req.body.stringEncrypt);
  getBinary.main();
  res.json(stringBinarySentence);
  console.log(req.file);
};
