<script lang="ts">
	// Props
	export let percentage: number;

    // Varibles
    $: displayLoadingPercentage = adjustLoadingPercentage(percentage);

	function adjustLoadingPercentage(percentage: number) {
		if (percentage >= 90 && percentage < 100) {
			return 90;
		}
		if (percentage <= 50) {
			return 25;
		}
		return percentage;
	}
</script>

<!-- Main container -->
<div class="relative h-1 w-64 bg-black/10 mt-64 rounded-full overflow-hidden">
	<div class="absolute left-0 h-1 bg-black" style={`width: ${displayLoadingPercentage}%;`}></div>
</div>