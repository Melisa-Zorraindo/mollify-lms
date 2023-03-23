<script lang="ts">
	import '../../scss/styles.scss';
	import LogoIcon from '../icons/LogoIcon.svelte';
	// import Reader from '../reader/Reader.svelte';
	import { page } from '$app/stores';
	import Tags from '../tags/Tags.svelte';
	import { darkMode, bodyClass } from '$lib/stores';

	export let name = '';
	export let tags = new Array<string>();
	export let children = new Array<string>();

	let body: HTMLDivElement;

	function toggleDarkMode() {
    $darkMode = !$darkMode
	}

	$: {
    if (typeof window !== 'undefined') {
      document.body.className = $bodyClass;
    }
  }
</script>

<a href="/" class="brand">
	<LogoIcon />
</a>

<label id="switch" class="switch">
	<input type="checkbox" id="slider" checked={$darkMode} on:input={toggleDarkMode} />
	<span class="slider round" />
</label>
<!-- 
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
</div> -->

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
