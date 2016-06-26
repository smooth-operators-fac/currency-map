(function () {
	'use strict';

	describe('Testing apiCaller methods', function () {

		beforeEach(function() {

		});

		afterEach(function() {
			
		});


		describe('this tests are for the AJAX call', function () {
			it('',function(){
				var doneFn = jasmine.createSpy("success");			
				currencyOBJ.init()
				expect(currencyOBJ.dates).toEqual(['2016-06-15','2016-06-08','2016-06-01','2016-05-25'])
			});
			it('',function(){
				currencyOBJ.init()
				expect(currencyOBJ.dates).toEqual(['2016-06-15','2016-06-08','2016-06-01','2016-05-25'])
			});



		});
	});
})();

