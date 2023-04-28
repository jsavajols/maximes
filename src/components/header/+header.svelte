<script>
  import Menu from "../../components/menu/+menu.svelte";
</script>


<div class="header">
  <div style="flex:2; display:flex; flex-flow:row">
    <Menu />
    <a href="/">
      <img src="/1clusif-logo-vertical.png" alt="Les maximes" width="15%" />
    </a>
  </div>
</div>


<style>
  .header {
   position: sticky;
   left: 0;
   top: 0;
   height: 150px;
   width: 100%;
   background-color: white;
  }
</style>