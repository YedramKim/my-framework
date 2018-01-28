test('프로미스 테스트 가즈아~~~', () => {
	expect.assertions(1);
	return expect(Promise.resolve(1)).resolves.toBe(1);
});

test('the data is peanut butter', () => {
  expect.assertions(1);
  return expect(Promise.resolve('peanut butter')).resolves.toBe('peanut butter');
});