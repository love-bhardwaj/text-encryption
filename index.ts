import * as crypto from 'crypto';
import yargs from 'yargs';
import { resolve } from 'path';
import * as fs from 'fs';

const fetchArgs = () => {
  const args = yargs
    .option('paraphrase', { alias: 'p', demandOption: true, string: true })
    .option('file', { alias: 'f', demandOption: true, string: true })
    .option('encryptedText', { alias: 'et', demandOption: true, string: true })
    .option('debug', { alias: 'd', demandOption: false, boolean: true }).argv as {
    paraphrase: string;
    file: string;
    encryptedText: string;
    debug: boolean;
  };

  return { paraphrase: args.paraphrase, file: args.file, encryptedText: args.encryptedText, debug: args.debug };
};

function decode(toDecrypt: string, file: string, paraphrase: string) {
  const absolutePath = resolve(file);
  const privateKey = fs.readFileSync(absolutePath, 'utf8');
  const buffer = Buffer.from(toDecrypt, 'base64');
  return crypto.privateDecrypt({ key: privateKey, passphrase: paraphrase }, buffer).toString();
}

(() => {
  try {
    const { encryptedText, file, paraphrase, debug } = fetchArgs();
    if (debug) console.log(`EncryptedText: ${encryptedText}\nParaphrase: ${paraphrase}\n`);
    const decodeString = decode(encryptedText, file, paraphrase);
    console.log(decodeString);
  } catch (error) {
    console.error(error);
  }
})();
