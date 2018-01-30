import { mount } from 'vue-test-utils';
import App from './App.vue';

test('Vue 테스트 가즈아~~~~', () => {
	const wrapper = mount(App);
	console.log(wrapper.vm);
	expect.assertion(1);
	expect(1).toBe(1);
});