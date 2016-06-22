describe('Sam and Jakub tests', function(){
  it('env', function(){
    var a = 1;
    b = a;
    expect(b).toBe(1);
  })

  it('if when a country clicked, it changes its colour', function(){
    var actual = changeColour();
    var expected = '#ff0000';
    expect(expected).toBe(actual); 
  })
})
