import Vue from 'vue';

import Canvas from './components/Canvas';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer'

const Components = {
	Header,
	Canvas,
	Footer
}

Object.keys(Components).forEach(name => {
	Vue.component(name, Components[name]);
})

export default Components;