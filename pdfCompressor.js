const ILovePDFApi = require("@ilovepdf/ilovepdf-nodejs");
const ILovePDFFile = require("@ilovepdf/ilovepdf-nodejs/ILovePDFFile");
const fs = require("fs");

async function compressPDF(input, publicKey, secretKey, filename = null) {
  // Initialize API
  const instance = new ILovePDFApi(publicKey, secretKey);

  // Create compress task
  const task = instance.newTask("compress");

  // Start
  await task.start();

  let fileBuffer;
  let fileName;

  if (Buffer.isBuffer(input)) {
    if (!filename) {
      throw new Error("Filename is required when input is a Buffer");
    }
    fileBuffer = input;
    fileName = filename;
  } else if (typeof input === "string") {
    fileBuffer = fs.readFileSync(input);
    fileName = filename || input.split(/[\\/]/).pop();
  } else {
    throw new Error("Input must be a file path or Buffer");
  }

  const pdfFile = ILovePDFFile.fromArray(fileBuffer, fileName);
  await task.addFile(pdfFile);

  // Process
  await task.process();
  // Download gj nigga
  const compressedData = await task.download();

  return Buffer.from(compressedData);
}

module.exports = { compressPDF };
