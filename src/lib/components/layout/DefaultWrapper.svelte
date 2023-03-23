<script>
	import Default from './Default.svelte';
	export let name = '';
  export let tags = [''];
	export let children = [''];
</script>

<Default {name} {tags} {children}>
	<slot />
</Default>