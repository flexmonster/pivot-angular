const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../node_modules/flexmonster/flexmonster.full.js');
const myVariable = process.env.MY_VARIABLE_NAME;

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const modifiedData = `${data}\nwindow["flexmonsterpivottablekey"]="${myVariable}";`;

  fs.writeFile(filePath, modifiedData, 'utf8', (err) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(`Environmental variable ${myVariable} written to file successfully.`);
  });
});