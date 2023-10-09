<script lang="ts">
    import BlogPreviewContent from "./BlogPreviewContent.svelte";

    export let image: string = undefined;
    export let title: string = "Blog post";
    export let publishDate: Date = undefined;
    export let reverse = false;
    export let grid = "";
    export let href: string = undefined;
</script>

{#if href}
    <a {href} class="w-full {grid} text-center link">
        <BlogPreviewContent {image} {title} {publishDate} {reverse} />
    </a>
{:else}
    <div class="w-full {grid} text-center">
        <BlogPreviewContent {image} {title} {publishDate} {reverse} />
    </div>
{/if}
