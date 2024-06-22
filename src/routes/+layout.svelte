<script>
	// Libs
	import { Toaster } from 'svelte-french-toast';

	// Styles
	import "../app.css";
</script>

<svelte:head>
	<link rel="preload" as="image" href="images/pause.svg" />
	<link rel="preload" as="image" href="images/play.svg" />
</svelte:head>

<Toaster />

<slot />
