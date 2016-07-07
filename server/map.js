const fs = require('fs');
const d3 = require('d3');
const jsdom = require('jsdom');
const topojson = require('topojson');

function make(callback) {
  function buildSVG(domErr, window) {
    if (domErr) throw domErr;
    const width = 960;
    const height = 1160;
    const w = window;
    w.d3 = d3.select(w.document);

    function write() {
      const path = `${__dirname}/../public/assets/map.svg`;
      const data = w.d3.select('div').html();
      fs.writeFile(path, data, (fileErr) => {
        if (fileErr) throw fileErr;
        callback();
      });
    }

    function makeMap(map, svg) {
      const admin = topojson.feature(map, map.objects.admin);
      const projection = d3.geoMercator()
        .scale(500)
        .translate([width / 2, height / 2]);
      const path = d3.geoPath()
        .projection(projection);

      svg.append('path')
        .datum(admin)
        .attr('d', path);

      write();
    }

    function readData() {
      fs.readFile(`${__dirname}/data/map.json`, (loadErr, data) => {
        const mapData = JSON.parse(data);
        if (loadErr) throw loadErr;
        const svg = w.d3.select('body')
          .append('div')
          .append('svg');
        svg.attr({
          xmlns: 'http://www.w3.org/2000/svg',
          width,
          height,
        });
        svg.append('g')
          .attr('transform', `translate(${width / 2}, ${height / 2})`);
        makeMap(mapData, svg);
      });
    }

    readData();
  }

  jsdom.env({
    html: '<html><body></body></html>',
    features: { QuerySelector: true },
    done: buildSVG,
  });
}


module.exports = {
  make,
};
