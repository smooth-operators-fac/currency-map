(function map() {
  const width = 960;
  const height = 500;
  const topojson = this.topojson;
  const d3 = this.d3;

  function addPaths(mapData, svg) {
    const admin = topojson.feature(mapData, mapData.objects.admin).features;
    const projection = d3.geoMercator()
      .center([0, 0])
      .scale(100)
      .translate([width / 2, height / 2]);
    const path = d3.geoPath()
      .projection(projection);
    svg.selectAll('path')
      .data(admin)
      .enter()
      .append('path')
      .attr('d', path);
  }

  function createSVG() {
    return d3.select('body')
      .select('div.container')
      .append('svg')
      .attr('xmlns', 'http://www.w3.org/2000/svg')
      .attr('width', width)
      .attr('height', height)
      .append('g');
  }

  function readData() {
    const svg = createSVG();
    d3.json('/public/assets/map.json', (err, res) => {
      if (err) throw err;
      addPaths(res, svg);
    });
  }

  readData();
}());
