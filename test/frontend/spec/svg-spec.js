describe('Sam and Jakub want', function(){
  it('the environment to work', function(){
    var a = 1;
    b = a;
    expect(b).toBe(1);
  })


  it('a country to change its colour when clicked', function(){

    spyOn(apiCaller, 'getScores').and.returnValue({})
    var node = document.getElementsByClassName('country')[0]
    var fakeEvent = {
      target: node
    };
    changeColour(fakeEvent);
    var expected = 'white';
    var actual = document.getElementsByClassName('country')[0].getAttribute('fill')
    expect(actual).toBe(expected);
  })

  it('getColours() to return a correct colour object for a set of scores', function(){
    var scores = {EUR: 2, GBP: 5, USD: 6};
    var actual = getColours(scores);
    var expected = {EUR: '#FF0000', GBP: '#90FF00', USD: '#10FF00'};
    expect(actual).toEqual(expected);
  })

  it('sets the correct colour for other countries', function(){
    obj = {}
    obj[countryCurrencies['AE']] = 1
    obj[countryCurrencies['AF']] = 15
    obj[countryCurrencies['AL']] = 30
    spyOn(apiCaller, 'getScores').and.returnValue(obj)
    var node = document.getElementsByClassName('country')[3] //AM
    var fakeEvent = {
      target: node
    };
    changeColour(fakeEvent);
    var actual = [
      document.getElementsByClassName('country')[0].getAttribute('fill'),
      document.getElementsByClassName('country')[1].getAttribute('fill'),
      document.getElementsByClassName('country')[2].getAttribute('fill')
    ];
    console.log(actual)
    var expected = ['#FF0000', '#FFE000', '#10FF00' ]
    expect(actual).toEqual(expected);
  })

  it('clicking the same country twice to deselect it', function(){
    spyOn(apiCaller, 'getScores').and.returnValue({})
    var node = document.getElementsByClassName('country')[0]
    var fakeEvent = {
      target: node
    };
    changeColour(fakeEvent);
    changeColour(fakeEvent);
    var actual = document.getElementsByClassName('country')[0].getAttribute('fill')
    var expected = '#818181';
    expect(actual).toBe(expected);
  })
})
