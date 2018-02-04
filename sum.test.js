test('mock function GAZUAAAAA~~~', () => {
	const mock = jest.fn();
	mock.mockReturnValueOnce(1);
	mock.mockReturnValueOnce(2);
	mock.mockReturnValue(3);
	// [1,2,3,4,5,6,7,8,9,10].forEach(_ => console.log(mock()));
	console.log(mock(), mock(), mock(), mock(), mock());

	expect.assertions(1);
	return expect(Promise.resolve(1)).resolves.toBe(1);
});