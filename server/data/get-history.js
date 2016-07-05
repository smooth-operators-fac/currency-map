#! /usr/local/bin/node

/* Executable script to retrieve large number of data points
 * and write them to file. Script will prompt for number and
 * interval of dates before running API requests */

/* eslint-disable no-console */

const fs = require('fs');
const http = require('http');
const readline = require('readline');

/* defines custom date object with useful methods */
function MyDate(start) {
  this.date = start || new Date();
  this.subtractDays = (days) => {
    this.date.setTime(this.date.getTime() - days * 3600 * 24 * 1000);
    return this;
  };
  this.format = () => {
    const addZ = (n) => (n < 10 ? `0${n}` : `${n}`);
    const year = this.date.getUTCFullYear();
    const month = addZ(this.date.getUTCMonth()) + 1;
    const date = addZ(this.date.getUTCDate());
    return `${year}-${month}-${date}`;
  };
}

function getPastDates() {
  const filePath = `${__dirname}/usd-historical.txt'`;
  return new Promise((resolve) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) throw err;
      const out = {};
      data.split('\n').forEach((line) => {
        if (line) out[Object.keys(JSON.parse(line))[0]] = null;
      });
      resolve(out);
    });
  });
}

/* generates an array of @number dates @interval days apart,
 * counting back from @start */
function makeDates(number, pastDates) {
  const start = 0;
  const interval = 1;
  const now = new MyDate();
  let date = now.subtractDays(start).format();
  const dates = [];
  let i = number;
  while (i) {
    if (!pastDates.hasOwnProperty(date)) {
      dates.push(date);
      i--;
    }
    date = now.subtractDays(interval).format();
  }
  return dates;
}

/* generates array of http option objects from array of dates */
function makeOptions(dates) {
  const base = '/api';
  const id = 'app_id=bdf1519ec8b749ff8d01851d7da1391f';
  return dates.map((date) => {
    const query = `/historical/'${date}.json`;
    return {
      protocol: 'http:',
      hostname: 'openexchangerates.org',
      path: `${base}${query}?${id}`,
    };
  });
}

/* generates array of promises for http requests from array of
 *  http options */
function makePromises(options) {
  return options.map((option) => new Promise((resolve, reject) => {
    setTimeout(() => {
      http.get(option, (res) => {
        res.setEncoding('utf8');
        const out = {
          path: res.req.path,
          data: '',
        };
        res.on('data', (chunk) => {
          out.data += chunk;
        });
        res.on('end', () => {
          if ([200, 302].indexOf(res.statusCode) > -1) {
            resolve(out);
          } else {
            reject(out);
          }
        });
      });
    }, 200);
  })
  );
}

/* returns a chain of promises as a single promise */
function chainPromises(promises) {
  const chain = promises.map((p) => p.then(
      (out) => {
        console.log(`SUCCESS with ${out.path}`);
        return out.data;
      },
      (out) => {
        console.log(`FAILURE with ${out.path}`);
      }
  ));
  return Promise.all(chain);
}

/* removes some unneeded data and returns as JSON */
function formatResponses(responses) {
  const lines = responses.map((response) => {
    const parsed = JSON.parse(response);
    const date = new MyDate(new Date(parsed.timestamp * 1000));
    const temp = {};
    temp[date.format()] = parsed.rates;
    return JSON.stringify(temp);
  });
  lines.push('');
  return lines.join('\n');
}

  /* returns promise to write the array of responses to file */
function writeResults(responses) {
  if (!responses.length) return Promise.reject();
  const filePath = `${__dirname}/usd-historical.txt`;
  const data = formatResponses(responses);
  return new Promise((resolve) => {
    fs.appendFile(filePath, data, (err) => {
      if (err) {
        console.log(`FAILURE saving to file: ${err}`);
      } else {
        console.log('SUCCESS saving to file');
      }
      resolve();
    });
  });
}

function getData(number) {
  getPastDates().then((pastDates) => {
    const dates = makeDates(number, pastDates);
    const options = makeOptions(dates);
    const promises = makePromises(options);
    return chainPromises(promises);
  }).then((responses) => {
    console.log('Writing to file........');
    writeResults(responses).then(() => process.exit(0));
  });
}

function getParams() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const prompts = [
    'Number of calls',
  ];
  const params = [];
  const next = () => {
    rl.setPrompt(`${prompts[params.length]} > `);
    rl.prompt();
  };
  rl.on('line', (l) => {
    params.push(l);
    if (params.length < prompts.length) {
      next();
    } else {
      return rl.close();
    }
  }).on('close', () => {
    console.log('Sending API requests...');
    getData(...params);
  });
  next();
}

getParams();

