<script lang="ts">
  export let tag: string;
</script>

<a href={`/tags/${tag.toLocaleLowerCase()}`} class="tag">{tag}</a>

<style lang="scss">
  .tag {
    margin: 0;
  }
</style>