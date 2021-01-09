<svelte:head>
  <title>Tam Minh Le - Passionate Engineering</title>
</svelte:head>

<main class="text-red-400">
  This is {fullName} CV
</main>

<style global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>

<script>
  let firstName = 'Tam'
  let middleName = 'Minh'
  let lastName = 'Le'

  $: fullName = `${firstName} ${middleName} ${lastName}`
</script>

