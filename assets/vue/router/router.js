import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const home = {
	template: '<div>Home</div>'
};
const foo = {
	template: '<div>Foo</div>'
};
const bar = {
	template: '<div>bar</div>'
};

const routes = [
	{
		path: '/',
		component: home
	},
	{
		path: '/foo',
		component: foo
	},
	{
		path: '/bar',
		component: bar
	},
	{
		path: '*',
		component: {
			template: '<div>404</div>'
		}
	}
];

export default new VueRouter({
	routes,
	mode: 'history'
});