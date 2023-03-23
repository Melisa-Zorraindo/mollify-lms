<script lang="ts">
	import '../../scss/styles.scss';
	import LogoIcon from '../icons/LogoIcon.svelte';
	// import Reader from '../reader/Reader.svelte';
	import { page } from '$app/stores';
	import Tags from '../tags/Tags.svelte';

	export let name = '';
	export let tags = new Array<string>();
	export let children = new Array<string>();

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
	<div class="sidebar-fixed">
		<nav>
			{#each children as child}
				<a href={'./' + child} class:active={$page.url.pathname === child}>
					<h2 class="proper-case">{child.replace("-", " ")}</h2>
				</a>
			{/each}
		</nav>
	</div>
</div>

<!-- {#if body}
	{#key $page.url.pathname}
		<Reader text={body.innerText} />
	{/key}
{/if} -->

<main>
	<h1>{name}</h1>

	{#if tags && tags.length}
	<Tags {tags} />
	{/if}

	<div class="body" bind:this={body}>
		<slot />
	</div>
</main>

<footer>
	© {new Date().getFullYear()} Noroff Fagskole AS
</footer>
