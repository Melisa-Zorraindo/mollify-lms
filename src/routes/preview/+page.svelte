<script lang="ts">
  import { page } from '$app/stores';

  console.log($page.url.searchParams.get('source'));
</script>

<h1>{$page.url.searchParams.get('source')}</h1>