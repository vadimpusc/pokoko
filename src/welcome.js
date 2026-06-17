import { mount } from 'svelte';
import Welcome from './Welcome.svelte';
import './styles.css';

const target = document.getElementById('app');
if (!target) throw new Error('App mount point was not found.');
mount(Welcome, { target });
