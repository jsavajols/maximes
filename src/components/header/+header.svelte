<script>
  import { vars } from '../../vars/vars.js';
  import { menuOpen } from '../../store.js';
  let isOpen = false;
  menuOpen.subscribe(value => {
		isOpen = value;
	});
</script>


<div class="header">
  <div style="flex:2; display:flex; flex-flow:row">
    <button on:click={() => (menuOpen.update(menuOpen => !menuOpen) )}>
      {isOpen ? "Close" : "Open"} Menu
    </button>
    <a href="/" on:click={() => (menuOpen.update(menuOpen => false) )}>
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