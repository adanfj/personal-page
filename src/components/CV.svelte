<script lang="ts">
    import { fly } from "svelte/transition";
    import Group from "./CV/Group.svelte";

    export let name;
    export let profession;
    export let studies: { [k: string]: string } = {};
    export let socialMedia: { [k: string]: string } = {};
    export let experience: { [k: string]: string } = {};
    export let languages: { [k: string]: string } = {};
    const years = (date: Date) => {
        let years = 0,
            refDate = new Date(
                date.getFullYear() + 1,
                date.getMonth(),
                date.getDate()
            ),
            now = new Date();
        while (refDate.getTime() < now.getTime()) {
            refDate = new Date(
                refDate.getFullYear() + 1,
                refDate.getMonth(),
                refDate.getDate()
            );
            console.log(refDate);
            years++;
        }
        return years;
    };
    let currentYears = years(new Date("July 8 1998"));
</script>

<div
    id="cv"
    class="grid py-4 slide-in-fwd-center" 
    style="grid-template-columns: repeat(14, minmax(0, 1fr)); width: 64rem"
>
    <div
        class="flex flex-col items-center bg-primary-300 dark:bg-primary-900 col-span-5 py-12 gap-24 h-full"
    >
        <div class="space-y-8" style="width:70%">
            <div class="rounded-full overflow-hidden slide-in-fwd-center" style="animation-delay: 0.5s">
                <img class="slide-in-fwd-center w-full" src="/portrait.jpg" alt="" />
            </div>
            <div class="slide-in-left" style="animation-delay: 0.6s;">
                <Group title="Perfil Profesional">
                    Soy un chico de {currentYears} años muy activo, energético y flexible
                    interesado en el bienestar de las personas de todas las edades y
                    ámbitos. Manejo bien el estrés y ciertas situaciones comprometidas
                    sin perder la paciencia, además de que siempre busco soluciones en
                    todo momento de adversidad.
                </Group>
            </div>
        </div>
        <div class="slide-in-left" style="animation-delay: 0.8s;width:80%;">
            <Group title="Contacta conmigo">
                <ul>
                    {#each Object.entries(socialMedia) as [k, value]}
                        <li>{k}: <span class="font-bol">{value}</span></li>
                    {/each}
                </ul>
            </Group>
        </div>
    </div>
    <div class="col-span-9 flex flex-col">
        <div
            class="bg-primary-600-300-token text-primary-200-700-token flex flex-col items-center text-center pt-12 pb-16" style="aspect-ratio: 16/7.5;"
        >
            <h1>{name}</h1>
            <p>{profession}</p>
        </div>
        <div class="bg-surface-50-900-token w-full h-full p-16 space-y-8">
            <div class="slide-in-right" style="animation-delay: 1s;">
                <Group title="Estudios académicos">
                    <ul>
                        {#each Object.entries(studies) as [k, value]}
                            <li>{k} - {value}</li>
                        {/each}
                    </ul>
                </Group>
            </div>
            <div class="slide-in-right" style="animation-delay: 1.2s;">
                <Group title="Experiencia" >
                    <!-- <ul>
                        {#each Object.entries(experience) as [k, value]}
                            <li>{k} - {value}</li>
                        {/each}
                    </ul> -->
                    Ayudé a programar diversos proyectos de programación orientados a la creación de páginas web dedicadas a márketing y educación escolar.
                </Group>
            </div>
                <div class="slide-in-right" style="animation-delay: 1.4s;">

                <Group title="Idiomas" >
                    <ul>
                        {#each Object.entries(languages) as [k, value]}
                            <li>{k}: {value}</li>
                        {/each}
                    </ul>
                </Group>
            </div>
        </div>
    </div>
</div>
