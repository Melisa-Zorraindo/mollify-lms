<script lang="ts">
	import '../../scss/styles.scss';
	import LogoIcon from '../icons/LogoIcon.svelte';
	import Reader from '../reader/Reader.svelte';
	import { page } from '$app/stores';

	export let title = '';

	let body: HTMLDivElement;

	function changeTheme() {
		const body = document.querySelector('body')!;
		const slider = document.querySelector('#slider') as HTMLInputElement;

		if (slider?.checked) {
			body.classList.add('theme-light');
		} else {
			body.classList.remove('theme-light');
		}
	}
</script>

<a href="/" class="brand">
	<LogoIcon />
</a>

<label id="switch" class="switch">
	<input type="checkbox" id="slider" on:input={changeTheme} />
	<span class="slider round" />
</label>

<div class="sidebar">
	<h1>Dev Platforms</h1>
	<div class="sidebar-fixed">
		<nav>
			<a href="/case-studies"><h2>Case Studies</h2></a>
			<a href="/case-studies/tensorflow">TensorFlow</a>
			<a href="/case-studies/prometheus">Prometheus</a>
			<a href="/case-studies/cpanel">cPanel</a>
			<a href="/case-studies/google/platforms">Google Platforms</a>
		</nav>
	</div>
</div>

{#if body}
	{#key $page.url.pathname}
		<Reader text={body.innerText} />
	{/key}
{/if}

<main>
	<!-- <h1>{title}</h1> -->

	<div class="body" bind:this={body}>
		<slot />
	</div>
</main>

<footer>
	© {new Date().getFullYear()} Noroff Fagskole AS
</footer>
