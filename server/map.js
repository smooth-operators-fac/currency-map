const fs = require('fs');
const d3 = require('d3');
const jsdom = require('jsdom');
const topojson = require('topojson');

function make(callback) {
  const width = 960;
  const height = 1160;

  function buildSVG(map) {
    const svg = window.d3.select('body')
      .append('div').attr('class', 'container')
      .append('svg')
      .attr({
        xmlns: 'http://www.w3.org/2000/svg',
        width,
        height,
      })
      .append('g')
      .attr('transform', `translate(${width / 2}, ${width / 2})`);
    const subunits = topojson.feature(map, map.objects.subunits);
    const projection = d3.geo.mercator()
      .scale(500)
      .translate([width / 2, height / 2]);
    const path = d3.geo.path()
      .projection(projection);

    svg.append('path')
      .datum(subunits)
      .attr('d', path);

    fs.writeFile('map.svg', window.d3.select('.container').html(), (err) => {
      if (err) throw err;
      callback();
    });
  }

  function inject() {
    d3.json(`${__dirname}/data/map.json`, (err, map) => {
      if (err) throw err;
      buildSVG(map);
    });
  }

  function createHTML() {
    jsdom.env({
      html: '',
      features: { QuerySelector: true },
      done: inject,
    });
  }

  createHTML();
}

module.exports = {
  make,
};
