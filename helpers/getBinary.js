const getBinary = async (params = undefined) => {
  // params format:
  // getBinary({
  //   path : '<file_relative_path>',
  //   padlength: '<prepending_padding_length>', (Default: 4)
  //   debug: false,                             (Default: true)
  //   limit: 10                                 (Default: Full_File_Length)
  //   putSpacing: Boolean                       (Default: false)
  // })

  // Params Description:
  //   1. path: Specifies the relative file path, to be read.
  //   2. padlength: After reading the file, it reads object as number
  //                 (ex: hex(f): 1111, hex(0): 0), so if you need a
  //                 unform lenght binary string then you will need to
  //                 fill the strings. as hex(0): 0000 when padlength is 4.
  //   3. limit: limits the read buffer to render.
  //   4. putSpacing: if true it puts a space after each padlength.

  //
  // or
  // getBinary('<file_relative_path>');

  let fs = require("fs");
  let result = "";
  try {
    if (typeof params == "string") {
      params = {
        path: params,
      };
    }
    if (params) {
      let mendatoryKeys = ["path"];
      for (let i = 0; i < mendatoryKeys.length; i++) {
        if (!params.hasOwnProperty(mendatoryKeys[i])) {
          throw (
            "JSON key " + mendatoryKeys[i] + " is expected in prarameter object"
          );
        }
      }
      let hexBuffer = Buffer.from(fs.readFileSync(params.path)).toString("hex");
      let padding = params.hasOwnProperty("padlength") ? params.padlength : 4;
      let limit = params.hasOwnProperty("limit")
        ? parseInt(params.limit)
        : hexBuffer.length;
      let putSpacing = params.hasOwnProperty("putSpacing")
        ? params.putSpacing
        : false;
      if (typeof putSpacing == "boolean") {
        putSpacing = putSpacing ? " " : "";
      } else {
        throw "JSON key 'putSpacing' is expected as boolean";
      }
      for (let i = 0; i < limit; i++) {
        result +=
          String(parseInt(hexBuffer[i], 16).toString(2).substr(-8)).padStart(
            padding,
            "0"
          ) + putSpacing;
      }
    } else {
      throw "JSON object is expected as prarameter, but got undefined";
    }
  } catch (e) {
    if (params.hasOwnProperty("debug") ? params.debug : true) {
      console.log(e);
    }
  } finally {
    return result.trim() === "" ? undefined : result.trim();
  }
};

exports.main = () => {
  let obj = {
    path: "./uploads/girl1.png",
    padlength: 4,
    limit: 10,
  };
  getBinary(obj).then((data) => {
    console.log(data);
  });

  // or for quick use
  //
  // getBinary('./a.jpg').then((data)=>{
  //   console.log(data);
  // })
};
