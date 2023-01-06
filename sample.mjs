import jsonFormat from 'json-format-mjs';
import fs from 'fs';

(async () => {
  const obj = {
    a: 1,
    b: 2
  }
  
  /* using config default, indent with tabs */
  try {
    await fs.writeFileSync('example_tabs.json', jsonFormat(obj));
    console.log('saved');
  } catch(err) {
    console.log(err);
  }
  
  /* using indent with spaces */
  const config = {
    type: 'space',
    size: 2
  }
  
  try {
    await fs.writeFileSync('example_spaces.json', jsonFormat(obj, config));
    console.log('saved');
  } catch(err) {
    console.log(err);
  }
})();
