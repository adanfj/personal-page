<script lang="ts">
    export let title;
</script>

<div class="flex flex-col items-center w-full gap-4">
    <p
        class="text-xl bg-primary-800-100-token text-primary-200-700-token w-full py-2 px-4 uppercase font-bold"
    >
        {title}
    </p>
    <p class="px-2 text-justify w-full space-y-8">
        <slot />
    </p>
</div>