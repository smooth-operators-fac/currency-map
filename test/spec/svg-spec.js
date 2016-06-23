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

  it('getColours() returns a correct colour object for a set of scores', function(){
    var scores = {
      EUR: 2,
      GBP: 5,
      USD: 6
    };

    var actual = getColours(scores);
    var expected = {EUR: '#FF0000', GBP: '#90FF00', USD: '#10FF00'};
    expect(expected).toEqual(actual);
  })

  it('clicking the same country twice to deselect it')
  var actual = changeColour();
  var expected = '#818181';
  expect(expected).toBe(actual);
})
