<script lang="ts">
    import { fly } from "svelte/transition";
    import Group from "./CV/Group.svelte";
    import { onMount } from "svelte";

    export let name;
    export let profession;
    export let studies: { [k: string]: string } = {};
    export let socialMedia: { [k: string]: string } = {};
    export let experience: { [k: string]: string } = {};
    export let languages: { [k: string]: string } = {};
    export let availability: { [k: string]: string } = {};
    export let IT: string[] = [];
    export let description: string[] = [];
    const years = (date: Date) => {
        let years = 0,
            refDate = new Date(
                date.getFullYear() + 1,
                date.getMonth(),
                date.getDate(),
            ),
            now = new Date();
        while (refDate.getTime() < now.getTime()) {
            refDate = new Date(
                refDate.getFullYear() + 1,
                refDate.getMonth(),
                refDate.getDate(),
            );
            console.log(refDate);
            years++;
        }
        return years;
    };
    let currentYears;
    onMount(() => {
        currentYears = years(new Date("July 8 1998"));
    });
</script>

<div
    id="cv"
    class="grid py-4 slide-in-fwd-center"
    style="grid-template-columns: repeat(14, minmax(0, 1fr)); width: 72rem"
>
    <div
        class="flex flex-col items-center bg-primary-300 dark:bg-primary-900 col-span-5 py-12 gap-24 h-full"
    >
        <div class="space-y-8" style="width:75%">
            <div
                class="rounded-full overflow-hidden slide-in-fwd-center"
                style="animation-delay: 0.5s"
            >
                <img
                    class="slide-in-fwd-center w-full"
                    src="/portrait.jpg"
                    alt=""
                />
            </div>
            <div class="slide-in-left" style="animation-delay: 0.6s;">
                <Group title="Perfil Profesional">
                    {#each description as p}
                        <p>{p.replaceAll("%YEARS%", currentYears)}</p>
                    {/each}
                </Group>
            </div>
        </div>
        <div class="slide-in-left" style="animation-delay: 0.8s;width:80%;">
            <Group title="Contacta conmigo">
                <ul>
                    {#each Object.entries(socialMedia) as [k, value]}
                        <li>
                            <b>{k}</b>:
                            <span class="font-bol">
                                {#if (/http[s?]/).test(value)}
                                    <a target="_blank" href={value}>{value}</a>
                                {:else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(value)}
                                    <a href="mailto:{value}" target="_blank">{value}</a>
                                {:else}
                                    {value}
                                {/if}
                            </span>
                        </li>
                    {/each}
                </ul>
            </Group>
        </div>
    </div>
    <div class="col-span-9 flex flex-col">
        <div
            class="bg-primary-800-100-token text-primary-200-700-token flex flex-col items-center text-center pt-12 pb-16 gap-4"
            style="aspect-ratio: 16/7.5;"
        >
            <h1>{name}</h1>
            <h3>{profession}</h3>
        </div>
        <div class="bg-surface-50-900-token w-full h-full p-16 space-y-8">
            <div class="slide-in-right" style="animation-delay: 1s;">
                <Group title="Estudios académicos">
                    <ul>
                        {#each Object.entries(studies) as [k, value]}
                            <li><b>{k}</b> - {value}.</li>
                        {/each}
                    </ul>
                </Group>
            </div>
            <div class="slide-in-right" style="animation-delay: 1.2s;">
                <Group title="Experiencia">
                    <ul>
                        {#each Object.entries(experience) as [k, value]}
                            <li><b>{k}</b>: {value}.</li>
                        {/each}
                    </ul>
                </Group>
            </div>
            <div class="slide-in-right" style="animation-delay: 1.4s;">
                <Group title="Idiomas">
                    <ul>
                        {#each Object.entries(languages) as [k, value]}
                            <li><b>{k}</b>: {value}</li>
                        {/each}
                    </ul>
                </Group>
            </div>
            <div class="slide-in-right" style="animation-delay: 1.6s;">
                <Group title="Informática">
                    <ul>
                        {IT.join(", ")}.
                    </ul>
                </Group>
            </div>
            <div class="slide-in-right" style="animation-delay: 1.8s;">
                <Group title="Disponibilidad">
                    <ul>
                        {#each Object.entries(availability) as [k, value]}
                            <li><b>{k}</b>: {value}.</li>
                        {/each}
                    </ul>
                </Group>
            </div>
        </div>
    </div>
</div>
