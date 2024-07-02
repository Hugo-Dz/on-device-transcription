<script lang="ts">
	// Svelte
	import { onMount } from "svelte";

	// Libs
	import WaveSurfer from "wavesurfer.js";
	import RegionsPlugin from "wavesurfer.js/plugins/regions";
	import { Segment } from "$lib/ratchet/ratchet-web";

	// Props
	export let blobURL: string;
    export let segments: Segment[] = [];

	// Variables
	let waveSurfer: WaveSurfer | null = null;
	let regionPlugin: RegionsPlugin | null = null;
	let container: HTMLDivElement;
	let isAudioPlaying = false;
	let region: any;
    let currentSegment: Segment | undefined = undefined;

    
	function findSegmentByTime(seconds: number): Segment | undefined {
        return segments.find((segment) => segment.start <= seconds && segment.stop >= seconds);
	}

	function scrollToSegment(segment: Segment) {
        let index = segments.indexOf(segment);
		const segmentElement = document.querySelector(`#segment-${index}`); 
		if (segmentElement) {
			segmentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
		}
	}

	onMount(() => {
		waveSurfer = WaveSurfer.create({
			container,
			waveColor: "#7F7F7F",
			progressColor: "#FF0000",
			barWidth: 2,
			barRadius: 100,
			url: blobURL,
		});
		regionPlugin = waveSurfer.registerPlugin(RegionsPlugin.create());

        waveSurfer.on("timeupdate", scroll);

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

    function scroll() {
		if (!waveSurfer) return;

		const curSeg = findSegmentByTime(waveSurfer.getCurrentTime());
		if (curSeg && curSeg !== currentSegment) {
			currentSegment = curSeg;
			scrollToSegment(curSeg);
		}
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
