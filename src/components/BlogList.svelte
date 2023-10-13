<script lang="ts">
    import type { CollectionEntry } from "astro:content";
    import BlogPreview from "./BlogPreview.svelte";
    import { crossfade } from "svelte/transition";
    import { quintOut } from "svelte/easing";
    import { flip } from "svelte/animate";

    export let posts: CollectionEntry<"blog">[];
    let search: string = "";

    const [send, receive] = crossfade({
        duration: (d) => Math.sqrt(d * 200),

        fallback(node, params) {
            const style = getComputedStyle(node);
            const transform = style.transform === "none" ? "" : style.transform;

            return {
                duration: 600,
                easing: quintOut,
                css: (t) => `
				transform: ${transform} scale(${t});
				opacity: ${t}
			`,
            };
        },
    });
</script>

<div class="flex flex-col items-center gap-8">
    <h1>Blog</h1>
    <p class="text-xl">Puedes ver aquí el contenido audiovisual que hago</p>
    <form class="max-w-4xl w-full">
        <label class="label w-full">
            <p class="font-bold variant-">Busca el post deseado</p>
            <input class="input" type="text" bind:value={search} />
        </label>
    </form>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl">
        {#each posts.filter(post=>!search.length || post.data.title.toLowerCase().includes(search.toLowerCase())) as post, i (post.id)}
            <div
                in:receive={{ key: post.id }}
                out:send={{ key: post.id }}
                animate:flip={{ duration: 200 }}
                class:lg:col-span-2={i == 0}
            >
                <BlogPreview
                    {...post.data}
                    href={`/${post.collection}/${post.slug}`}
                    grid={i == 0 ? "lg:col-span-2" : ``}
                />
            </div>
        {/each}
    </div>
</div>
