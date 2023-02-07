<script>
  import "../../scss/styles.scss";
</script>

<a href="/" class="brand">
  <img src="/logo-icon.png" alt="Noroff Logo">
</a>

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

<!-- <h1>Test</h1> -->
<main>
  <slot/>
</main>