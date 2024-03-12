<script lang="ts">
    import {
        faFacebook,
        faInstagram,
        faPatreon,
        faPaypal,
        faTwitch,
        faTwitter,
        faYoutube,
    } from "@fortawesome/free-brands-svg-icons";
    import { faBars } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";
    import "../globals.css";
// import { LightSwitch } from "@skeletonlabs/skeleton";
    import { fly } from "svelte/transition";
    export let socialMedia: { [k: string]: URL } = {};
    export let links: { [k: string]: string } = {};
    export let currentPath: string;
    export let cv: boolean = false;
    $: isCurrentPath = (link: string) =>
        (link == "/" && currentPath == link) ||
        (currentPath.startsWith(link) && link != "/");
    function clickOutside(node, { enabled: initialEnabled, cb }) {
        const handleOutsideClick = ({ target }) => {
            if (!node.contains(target)) {
                cb();
            }
        };

        function update({ enabled }) {
            if (enabled) {
                window.addEventListener("click", handleOutsideClick);
            } else {
                window.removeEventListener("click", handleOutsideClick);
            }
        }

        update({ enabled: initialEnabled });
        return {
            update,
            destroy() {
                window.removeEventListener("click", handleOutsideClick);
            },
        };
    }
    let navOpen = false;
    const linkIcons = {
        Facebook: faFacebook,
        Youtube: faYoutube,
        Twitch: faTwitch,
        Twitter: faTwitter,
        Instagram: faInstagram,
        Patreon: faPatreon,
        Paypal: faPaypal,
    };
</script>

{#if !cv}
     <nav
         use:clickOutside={{ enabled: navOpen, cb: () => (navOpen = false) }}
         class="px-8 py-8 lg:px-24 justify-between items-center"
     >
         <a
             href="/"
             class="flex space-x-4 items-center hover:variant-soft-primary dark:hover:bg-transparent hover:bg-transparent"
         >
             <!-- <Fa icon={faVideo} size="2x" /> -->
             <!-- <Icon icon={twotoneWebStories} width="3rem" /> -->
             <img src="/logo.jpg" alt="" class="rounded-full" width="60rem">
             <h2 class="">Adan</h2>
         </a>
         <div
             class="variant-filled-surface rounded-container-token p-4 space-x-4 shadow-md shadow-surface-400 dark:shadow-surface-600 hidden lg:block"
         >
             {#each Object.entries(links) as [link, title]}
                 <a
                     href={link}
                     class="text-xl rounded-container-token py-2 px-4 font-bold"
                     class:variant-filled={isCurrentPath(link)}>{title}</a
                 >
             {/each}
         </div>
         <button
             class="btn flex justify-center items-center lg:hidden bg-surface-100-800-token rounded-container-token w-8 aspect-square"
             title="Abrir menú de navegación"
             on:click={() => (navOpen = !navOpen)}><Fa icon={faBars} /></button
         >
         <div class="hidden lg:flex gap-8 items-center">
             <div class="flex space-x-8 items-center">
                 {#each Object.entries(socialMedia) as [name, link]}
                     <a
                         href={link.href}
                         target="_blank"
                         aria-label="Accede a mi link de {name}"
                         ><Fa
                             icon={linkIcons[name]}
                             scale="2"
                             class="text-primary-500-400-token"
                         /></a
                     >
                 {/each}
             </div>
             <!-- <LightSwitch /> -->
         </div>
         {#if navOpen}
             <div
                 transition:fly={{ x: "400px" }}
                 class="fixed z-20 top-0 right-0 bg-surface-600-300-token text-surface-50-900-token flex flex-col lg:hidden max-w-[20rem] w-full shadow-md"
             >
                 <div
                     class="p-4 border-b border-b-surface-500 dark:border-b-surface-400 flex flex-col space-y-8"
                 >
                     {#each Object.entries(links) as [link, title]}
                         <a
                             href={link}
                             class="text-2xl"
                             class:font-bold={isCurrentPath(link)}>{title}</a
                         >
                     {/each}
                 </div>
                 <div class="py-8 px-4 flex justify-between items-center">
                     <div class="flex space-x-4 items-center">
                         {#each Object.entries(socialMedia) as [name, link]}
                             <a href={link.href} target="_blank"
                                 ><Fa
                                     icon={linkIcons[name]}
                                     size="2x"
                                     class="text-primary-500-400-token"
                                 /></a
                             >
                         {/each}
                     </div>
                     <!-- <LightSwitch /> -->
                 </div>
             </div>
         {/if}
     </nav>
{/if}


<div class="mt-16 px-8 lg:px-24">
    <slot />
</div>

{#if !cv}
<footer>
    <p class="font-bold">
        &copy;{new Date().getFullYear()} Adan. Todos los derechos reservados.
    </p>
    <div class="flex space-x-8 items-center">
        {#each Object.entries(socialMedia) as [name, link]}
            <a
                href={link.href}
                target="_blank"
                aria-label="Accede a mi link de {name}"
                ><Fa
                    icon={linkIcons[name]}
                    scale="2"
                    class="hover:text-surface-900-50-token text-surface-700-200-token"
                /></a
            >
        {/each}
    </div>
</footer>
{/if}
