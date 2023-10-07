<script lang="ts">
    export let image: string;
    export let title: string;
    export let href: string;
    export let publishDate: Date;
    export let grid = "";
    export let reverse = false;
</script>

<a {href} class="w-full {grid} text-center" class:link={href}>
    <img
        src={image}
        alt={title}
        class="rounded-xl w-full aspect-video object-cover shadow-surface-400 dark:shadow-surface-600"
    />
    <div class="flex space-y-4 mt-4"
    class:flex-col-reverse={reverse}
    class:flex-col={!reverse}
    >
        <h1 class="text-center">{title}</h1>
        <p class="text-center text-2xl">
            {publishDate.toLocaleDateString("es-ES", {
                month: "long",
                day: "2-digit",
                year: "numeric",
            })}
        </p>
    </div>
</a>

<style>
    .link:hover img {
        @apply shadow-2xl;
    }
    .link:hover * {
        @apply text-primary-500-400-token;
    }
</style>
