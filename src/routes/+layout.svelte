<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<div class="min-h-screen antialiased bg-white text-gray-900">
	{@render children()}
</div>
