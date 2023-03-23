import { derived, type Writable } from 'svelte/store';
import { persistentStore } from './persistent';

const userPrefersDark = typeof window !== 'undefined' ?
    window.matchMedia('(prefers-color-scheme: dark)').matches : false;

export const darkMode: Writable<boolean> = persistentStore('dark', userPrefersDark);

export const bodyClass = derived(darkMode, ($darkMode) => $darkMode ? 'theme-dark' : 'theme-light');
