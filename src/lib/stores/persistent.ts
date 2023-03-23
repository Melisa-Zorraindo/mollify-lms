import { writable } from 'svelte/store';

export function persistentStore(key: string, value: any) {
	const storedValue = typeof window !== 'undefined' ? localStorage.getItem(key) : null;
	const data = storedValue === null ? value : JSON.parse(storedValue);
	const store = writable(data);

	store.subscribe(($value) => {
		if (typeof window !== 'undefined') {
			localStorage.setItem(key, JSON.stringify($value));
		}
	});

	return store;
}
