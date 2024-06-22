<script lang="ts">
	// Svelte
	import { onMount } from "svelte";

	// Libs
	import WaveSurfer from "wavesurfer.js";
	import RegionsPlugin from "wavesurfer.js/plugins/regions";
	import { Segment } from "$lib/ratchet/ratchet-web";

	// Props
	export let blobURL: string;

	// Variables
	let waveSurfer: WaveSurfer | null = null;
	let regionPlugin: RegionsPlugin | null = null;
	let container: HTMLDivElement;
	let isAudioPlaying = false;
	let region: any;

	onMount(() => {
		waveSurfer = WaveSurfer.create({
			container,
			waveColor: "#000000",
			progressColor: "#7F7F7F",
			barWidth: 2,
			barRadius: 100,
			url: blobURL,
		});
		regionPlugin = waveSurfer.registerPlugin(RegionsPlugin.create());

		return () => {
			waveSurfer?.destroy();
		};
	});

	function handleAudioPlayPause() {
		if (!waveSurfer) {
			return;
		}
		if (waveSurfer.isPlaying()) {
			waveSurfer.pause();
			isAudioPlaying = false;
		} else {
			waveSurfer.play();
			isAudioPlaying = true;
		}
	}

	export function playSegment() {
		if (!waveSurfer || !region) return;
		region.play();
		isAudioPlaying = true;
	}

	export function selectRegion(segment: Segment) {
		if (!waveSurfer || !regionPlugin) return;
		region = regionPlugin.addRegion({
			start: segment.start,
			end: segment.stop,
			color: "hsla(400, 100%, 30%, 0.1)",
		});
	}

	export function clearRegions() {
		if (!regionPlugin) return;
		regionPlugin.clearRegions();
	}
</script>

<!-- Main container -->
<div class="flex flex-row justify-center w-full items-center space-x-3 mt-12">
	{#if waveSurfer}
		<button on:click={handleAudioPlayPause}>
			<img src={`images/${isAudioPlaying ? "pause" : "play"}.svg`} alt="Audio button" height="32" width="32" />
		</button>
	{/if}
	<div bind:this={container} class="w-full"></div>
</div>
