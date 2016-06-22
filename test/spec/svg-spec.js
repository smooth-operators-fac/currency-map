describe('Sam and Jakub want', function(){
  it('the environment to work', function(){
    var a = 1;
    b = a;
    expect(b).toBe(1);
  })

  it('a country to change its colour when clicked', function(){
    var actual = changeColour();
    var expected = '#ff0000';
    expect(expected).toBe(actual);
  })

  it('getCountries() to return the array of countries', function(){
    var actual = getCountries()[2];
    var expected = 'AL';
    expect(expected).toBe(actual);
  })

  it('clicking the same country twice to deselect it')
  var actual = changeColour();
  var expected = '#818181';
  expect(expected).toBe(actual);
})
