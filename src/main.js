import { hydrate, mount } from 'svelte';
import App from './App.svelte';
import './styles.css';

const target = document.getElementById('app');
/** @type {'en' | 'ja'} */
const initialLocale = window.location.pathname.startsWith('/ja') ? 'ja' : 'en';

if (!target) throw new Error('App mount point was not found.');

const options = { target, props: { initialLocale } };
target.hasChildNodes() ? hydrate(App, options) : mount(App, options);
