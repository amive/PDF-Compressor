# PDF Compressor nigga

Compress PDFs using the iLovePDF API.

## Setup

1. Install dependencies:

```bash
npm install @ilovepdf/ilovepdf-nodejs dotenv
```

2. Get API keys from [developer.ilovepdf.com](https://developer.ilovepdf.com/)

3. Create `.env` file:

```env
ILOVEPDF_PUBLIC_KEY=public_key
ILOVEPDF_SECRET_KEY=secret_key
```

## Usage

```javascript
const { compressPDF } = require("./pdfCompressor");
require("dotenv").config();

const PUBLIC_KEY = process.env.ILOVEPDF_PUBLIC_KEY;
const SECRET_KEY = process.env.ILOVEPDF_SECRET_KEY;

// Compress a file
compressPDF("./input.pdf", PUBLIC_KEY, SECRET_KEY).then((buffer) => {
  require("fs").writeFileSync("./output.pdf", buffer);
});
```
