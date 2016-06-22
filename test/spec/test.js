(function () {
  'use strict';

  describe('Testing API calls', function () {
    describe('object currencyOBJ should', function () {
      beforeEach(function(){
        currencyOBJ.init();
      });
      it('call method currencyOBJ.call to set the reqType and url to its properties values ',
       function () {
        currencyOBJ.set('GET', 'http://www.google.com');

        expect(currencyOBJ.reqType).toEqual('GET');
        expect(currencyOBJ.url).toEqual('http://www.google.com');
      });
      it('calls currencyOBJ.init and initialize properties',
       function () {
        currencyOBJ.set('GET', 'http://www.google.com');
        currencyOBJ.init()
        expect(currencyOBJ.reqType).toEqual('');
        expect(currencyOBJ.url).toEqual('');
      });
      it('be testing spies', function(){
        spyOn(currencyOBJ, 'init');
        currencyOBJ.init();
        expect(currencyOBJ.init).toHaveBeenCalled();
      });
      it('be testing if set is called with correct arguments', function(){
        spyOn(currencyOBJ, 'set');
        currencyOBJ.set('GET','www.lastampa.it');
        expect(currencyOBJ.set).toHaveBeenCalledWith('GET', 'www.lastampa.it');
      });

      it('be testing if set is called with correct arguments', function(){
        spyOn(currencyOBJ, 'call').and.callThrough();
        currencyOBJ.set('GET','https://openexchangerates.org/api/latest.json?app_id=bdf1519ec8b749ff8d01851d7da1391f');

        currencyOBJ.call();
        expect(currencyOBJ.call).toHaveBeenCalled();
      });


      it(' ', function(){
        spyOn(currencyOBJ, 'call').and.callThrough();
        currencyOBJ.set('GET','https://openexchangerates.org/api/latest.json?app_id=bdf1519ec8b749ff8d01851d7da1391f');

        currencyOBJ.call();
        expect(currencyOBJ.call).toHaveBeenCalled();
      });
    });
  });
})();
