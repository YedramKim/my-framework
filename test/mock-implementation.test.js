jest.mock('./module');
const mod = require('./module');

test('mockImplementation 테스트', function() {
	mod.mockImplementation(_ => 100);
	expect(mod()).toBe(100);
});

it('스냅샷 테스트 가즈아아아아아', () => {
	expect('<div>스냅샷 테스트 GAZUAAAAA~~</div>').toMatchSnapshot();
});