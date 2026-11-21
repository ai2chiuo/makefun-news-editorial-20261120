import {copyFileSync, mkdirSync, readFileSync} from 'node:fs';
import {join} from 'node:path';
const image = new URL('./art/edition.jpg', import.meta.url);
const bytes = readFileSync(image);
if (bytes.length > 1048576 || bytes[0] !== 255 || bytes[1] !== 216 || bytes.at(-2) !== 255 || bytes.at(-1) !== 217) {
  throw new Error('Shipped image is not a complete size-compliant JPEG');
}
const output = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(output, {recursive:true});
copyFileSync(image, join(output, 'entry.png'));
