<script lang="ts">
	import { browser } from '$app/environment';
	import StopIcon from '../icons/StopIcon.svelte';
	import PauseIcon from '../icons/PauseIcon.svelte';
	import PlayIcon from '../icons/PlayIcon.svelte';
	import MollifyTTS from 'mollify-tts';
	import type { MollifyTTSState } from 'mollify-tts/dist/models';
	import Progress from '../progress/Progress.svelte';

	export let text = '';

	const tts = browser ? new MollifyTTS(text) : null;

	let state: MollifyTTSState = {
		playing: false,
		paused: false,
		ended: false,
		stopped: false,
		progress: 0,
		head: 0,
	};

	tts?.addEventListener("statechange", (event: Event) => {
		const { detail } = event as CustomEvent<MollifyTTSState>;
		state = detail;
	});
</script>

{#if tts}
	<form class="reader" on:submit|preventDefault>
		<button type="button" on:click={() => tts.controls.stop()}><StopIcon /></button>
		<Progress progress={state.progress} />
		{#if state.playing}
			<button type="button" on:click={() => tts.controls.pause()}><PauseIcon /></button>
		{:else}
			<button disabled={state.playing} type="button" on:click={() => tts.controls.start()}><PlayIcon /></button>
		{/if}
	</form>
{/if}

<style lang="scss">
	.reader {
		display: flex;
		align-items: flex-start;
		padding-top: 2px;
		gap: 0.5rem;
		grid-area: reader;

		button {
			appearance: none;
			border: none;
			background: none;
			outline: none;
			font-size: 2rem;
			padding: 0;
			cursor: pointer;
			height: 100%;
			color: inherit;

			&:disabled {
				opacity: 0.25;
			}
		}
	}
</style>
