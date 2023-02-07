<script lang="ts">
	import '../../scss/styles.scss';
  import LogoIcon from '../icons/LogoIcon.svelte';
	import Reader from '../reader/Reader.svelte';

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
	<h1>Development Platforms</h1>
	<div class="sidebar-fixed">
		<nav>
			<a href="#"><h2>Datastores</h2></a>
			<a href="#">Relational Datastores</a>
			<a href="#">Non-Relational Datastores</a>
			<a href="#">Caching</a>
			<a href="#">DBaaS</a>
		</nav>

		<nav>
			<a href="#"><h2>Backend</h2></a>
			<a href="#">Hosting</a>
			<a href="#">Networking</a>
			<a href="#">BaaS</a>
			<a href="#">BaaS Starter</a>
		</nav>

		<nav>
			<a href="#"><h2>Concepts</h2></a>
			<a href="#">DevOps</a>
			<a href="#">Security</a>
			<a href="#">Containerization</a>
			<a href="#">Machine Learning</a>
		</nav>
	</div>
</div>

{#if body}
	<Reader text={body.innerText} />
{/if}

<main>
	<h1>{title}</h1>

	<div class="body" bind:this={body}>
		<slot />
	</div>
</main>

<footer>
	© {new Date().getFullYear()} Noroff Fagskole AS
</footer>
