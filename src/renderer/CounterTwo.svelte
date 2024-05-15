<style src="./CounterTwo.sass" lang="sass"></style>

<script lang="ts">
  let count = 42
</script>

<div class="counter">
  <p>{count}</p>
  <button on:click="{() => { count += 1 }}">+1</button>
</div>

