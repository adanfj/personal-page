<script lang="ts">
    export let image: string = undefined;
    export let title: string = "Blog post";
    export let publishDate: Date = undefined;
    export let reverse = false;
</script>
{#if image}
    <img
        src={image}
        alt={title}
        class="rounded-token w-full aspect-video object-cover shadow-surface-400 dark:shadow-surface-600"
    />
    <!-- {:else}
     <div class="rounded-token w-full aspect-video object-cover shadow-surface-400 dark:shadow-surface-600" style="background-color: hsl({Math.floor(Math.random()*360)}, 65%, 50%);"></div> -->
{/if}
<div
    class="flex space-y-4 mt-4"
    class:flex-col-reverse={reverse}
    class:flex-col={!reverse}
>
    <h2 class="text-center">{title}</h2>
    <p class="text-center text-2xl">
        {publishDate.toLocaleDateString("es-ES", {
            month: "long",
            day: "2-digit",
            year: "numeric",
        })}
    </p>
</div>
