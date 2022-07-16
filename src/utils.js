import path from 'path';
import fs from 'fs';
import readline from 'readline';

const dirname = path.resolve();

export function readFileContent(filePath, isRelativePath) {
  const absoluteFilePath = isRelativePath ? path.join(`${dirname}`, filePath) : filePath;
  return new Promise((resolve, reject) => {
    fs.readFile(absoluteFilePath, 'utf8', (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

export function readCmdFilePath() {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question('please enter an absolute path to the input file: ', (answer) => {
      resolve(answer);
      rl.close();
    });
  });
}

export async function readCommissionsArray(filePath) {
  const relativeFilePath = filePath || process.argv[2];
  const fileContent = relativeFilePath
    ? await readFileContent(relativeFilePath, true)
    : await readFileContent(await readCmdFilePath());

  return JSON.parse(fileContent);
}

export function getDateDifferenceInDays(date1, date2) {
  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  const currentTransactionDate = new Date(date1).getTime();
  const lastTransactionDate = new Date(date2).getTime();
  const transactionPassedDays = (currentTransactionDate - lastTransactionDate) / MS_PER_DAY;

  return transactionPassedDays;
}
