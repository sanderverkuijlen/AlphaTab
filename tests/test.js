'use strict';

describe('TEST', function(){

	it('should equel 1', function(){
		expect(1).toBe(1);
	});

	it('should not equal 2', function(){
		expect(1).toNotBe(2);
	});

	it('should equal 1 if parsed to int', function(){
		expect(1).toBe(parseInt('1'));
	});
});