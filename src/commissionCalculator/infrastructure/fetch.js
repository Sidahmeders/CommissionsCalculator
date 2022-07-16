import https from 'https';

const payseraHostname = 'https://developers.paysera.com/tasks/api';

export default class Fetch {
  static Get({ host = payseraHostname, path }) {
    return new Promise((resolve, reject) => {
      https
        .get(host + path, (response) => {
          let result = '';
          response.on('data', (data) => {
            result += data;
          });
          response.on('end', () => resolve(result));
        })
        .on('error', (error) => reject(error));
    });
  }
}
