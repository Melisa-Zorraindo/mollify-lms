<script lang="ts">
  import Tag from "./Tag.svelte";
  export let tags = new Array<string>();
</script>

<div class="tags">
  {#each tags as tag}
    <Tag {tag} />
  {/each}
</div>

<style lang="scss">
  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5em;
    font-size: 0.9rem;
    margin-bottom: calc(var(--gutter) / 2);
  }
</style>