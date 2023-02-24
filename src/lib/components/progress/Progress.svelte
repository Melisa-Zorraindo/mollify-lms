<script lang="ts">
	export let progress = 0;

	$: style = `width: ${progress * 100}%;`;
</script>

<div class="progress">
	<div class="progress-bar" {style} />
</div>

<style lang="scss">
	.progress {
		flex: 1;
		background: white;
		height: 100%;

    &-bar {
      background-color: var(--scheme-brand);
      height: 100%;
			transition: all 500ms ease;
    }
	}
</style>
