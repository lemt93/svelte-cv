<div class="flex flex-wrap w-full justify-center items-center">
  <div class="p-2 md:w-3/4 relative">
    <CV />
  </div>
  
  <footer class="print:hidden flex-grow text-center w-full p-4 mt-4">
    Tam Minh Le CV - Built with 
    <a href="https://svelte.dev/" target="_blank" class="text-yellow-500">
      Svelte
    </a>
    and
    <a href="https://mdsvex.com/" target="_blank" class="text-yellow-500">
      mdsvex
    </a>
  </footer>
</div>

<script>
  import './TailwindCSS.svelte'
  import CV from './components/cv.svx'
</script>

