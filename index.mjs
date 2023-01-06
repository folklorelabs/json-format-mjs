/*
  change for npm modules.
  by Luiz Estácio.
  json-format v.1.1
  http://github.com/phoboslab/json-format
  Released under MIT license:
  http://www.opensource.org/licenses/mit-license.php
*/
let p = [];
const indentConfig = {
  tab: { char: '\t', size: 1 },
  space: { char: ' ', size: 4 },
};
const configDefault = {
  type: 'tab',
};
function push(m) { return `\\${p.push(m)}\\`; }
function pop(m, i) { return p[i - 1]; }
function tabs(count, indentType) { return new Array(count + 1).join(indentType); }

function JSONFormat(json, indentType) {
  p = [];
  let out = '';
  let indent = 0;

  // Extract backslashes and strings
  const cleanJson = json
    .replace(/\\./g, push)
    .replace(/(".*?"|'.*?')/g, push)
    .replace(/\s+/, '');

  // Indent and insert newlines
  for (let i = 0; i < cleanJson.length; i += 1) {
    const c = cleanJson.charAt(i);

    switch (c) {
      case '{':
      case '[':
        indent += 1;
        out += `${c}\n${tabs(indent, indentType)}`;
        break;
      case '}':
      case ']':
        indent -= 1;
        out += `\n${tabs(indent, indentType)}${c}`;
        break;
      case ',':
        out += `,\n${tabs(indent, indentType)}`;
        break;
      case ':':
        out += ': ';
        break;
      default:
        out += c;
        break;
    }
  }

  // Strip whitespace from numeric arrays and put backslashes
  // and strings back in
  out = out
    .replace(/\[[\d,\s]+?\]/g, (m) => m.replace(/\s/g, ''))
    .replace(/\\(\d+)\\/g, pop) // strings
    .replace(/\\(\d+)\\/g, pop); // backslashes in strings

  return out;
}

export default function main(json, config = configDefault) {
  const indent = indentConfig[config.type];

  if (indent == null) {
    throw new Error(`Unrecognized indent type: "${config.type}"`);
  }
  const indentType = new Array((config.size || indent.size) + 1).join(indent.char);
  return JSONFormat(JSON.stringify(json), indentType);
}
