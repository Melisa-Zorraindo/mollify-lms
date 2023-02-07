<script lang="ts">
	import Speech from 'speak-tts';
	import { browser } from '$app/environment';
  import StopIcon from '../icons/StopIcon.svelte';
  import PauseIcon from '../icons/PauseIcon.svelte';
  import PlayIcon from '../icons/PlayIcon.svelte';
	const reader = browser ? new Speech() : undefined;
	export let text = '';

	export let voice = 'Google UK English Male';

	let speaking = false;
	let paused = false;

	async function init() {
		if (browser && reader) {
			const { voices } = await reader.init({ voice });

			reader.cancel();

			return voices.filter((voice) => voice.lang.includes('en'));
		}

		throw new Error('Browser does not support speech synthesis');
	}

	async function start() {
		if (browser && reader) {
			if (paused) {
				speaking = true;
				reader.resume();
			} else {
				speaking = true;
				paused = false;
				await reader.speak({
					text,
					voice
				});
				speaking = false;
				paused = false;
			}
		}
	}

	function stop() {
		if (browser && reader) {
			console.log('stopping', reader);
			reader.cancel();
			speaking = false;
			paused = false;
		}
	}

	function pause() {
		if (browser && reader) {
			console.log('pausing', reader);
			reader.pause();
			speaking = false;
			paused = true;
		}
	}

	function setVoice({ target }: Event) {
		const value = (target as HTMLInputElement).value;
		if (browser && reader) {
			reader.setVoice(value);
			voice = value;
			stop();
		}
	}

	function setRate({ target }: Event) {
		const value = Number((target as HTMLInputElement).value);
		if (browser && reader) {
			reader.setRate(value);
		}
	}

	function setVolume({ target }: Event) {
		const value = Number((target as HTMLInputElement).value);
		if (browser && reader) {
			reader.setVolume(value);
		}
	}

	function setPitch({ target }: Event) {
		const value = Number((target as HTMLInputElement).value);
		if (browser && reader) {
			reader.setPitch(value);
		}
	}
</script>

{#await init() then voices}
	<form class="reader" on:submit|preventDefault={console.log}>
		<div class="settings">
			<label for="rate">Rate</label>
			<input min="0" max="10" type="range" name="rate" id="rate" on:input={setRate} />
			<label for="volume">Volume</label>
			<input
				min="0"
				max="1"
				step="0.01"
				type="range"
				name="volume"
				id="volume"
				on:input={setVolume}
			/>
			<label for="pitch">Pitch</label>
			<input min="0" max="2" step="0.01" type="range" name="pitch" id="pitch" on:input={setPitch} />
		</div>

		<div class="voice">
			<label for="voice">Voice</label>
			<select name="voice" id="voice" on:input={setVoice}>
				{#each voices as voiceOption}
					<option selected={voiceOption.name === voice} value={voiceOption.name}
						>{voiceOption.name}</option
					>
				{/each}
			</select>
		</div>

		<div class="options">
			<button disabled={!speaking} type="button" on:click={stop}><StopIcon/></button>
			{#if speaking}
				<button type="button" on:click={pause}><PauseIcon/></button>
			{:else}
				<button disabled={speaking} type="button" on:click={start}><PlayIcon/></button>
			{/if}
		</div>
	</form>
{:catch error}
	<pre>{error}</pre>
{/await}

<style lang="scss">
	.reader {
		display: flex;
    padding-top: 2px;

		button {
			appearance: none;
			border: none;
			background: none;
			outline: none;
			font-size: 2rem;
			padding: 0;
      cursor: pointer;
      max-width: 2rem;
      color: inherit;

      &:disabled {
        opacity: 0.25;
      }
		}

		.settings {
			display: flex;
			flex-direction: column;
			display: none;
		}

		.voice {
			display: none;
		}
	}
</style>
