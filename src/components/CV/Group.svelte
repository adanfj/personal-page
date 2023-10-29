<script lang="ts">
    export let title;
</script>

<div class="flex flex-col items-center w-full gap-4">
    <p
        class="text-xl bg-primary-600-300-token text-primary-200-700-token w-full py-2 px-4 uppercase font-bold"
    >
        {title}
    </p>
    <p class="px-2 text-justify w-full">
        <slot />
    </p>
</div>