<script lang="ts">
    // Import Assets
    import Logo from '../assets/images/website/logo.svg'
    import {Menu, Close} from "svelte-ionicons";

    export let language: string = 'zh';
    let is_en: boolean = language === 'en';
    let URL: string = window.location.href
    let menu_opened: boolean = false;

    function switch_language() {
        window.location.href = is_en ? URL.replace('en', 'zh') : URL.replace('zh', 'en');
        location.reload();
    }

    const links = [
        {id: 0, en: 'news', zh: '最新消息'},
        {id: 1, en: 'about', zh: '關於我們'},
        {id: 2, en: 'members', zh: '參展人員'},
        {id: 3, en: 'artworks', zh: '參展作品'},
        {id: 4, en: 'records', zh: '展場紀錄'},
    ];

    function open_menu() {
        let list = document.querySelector('ul');
        let menu = document.querySelector('#menu-icon')
        let close = document.querySelector('#close-icon')
        let navbar = document.querySelector('nav');
        if (!menu_opened) {
            menu.classList.add('hidden');
            close.classList.remove('hidden')
            list.classList.add('opacity-100');
            list.classList.add('blur-none');
            list.classList.add('bg-gradient-to-bl');
            list.classList.add('from-fuchsia-900/30');
            list.classList.add('justify-center');
            list.classList.add('h-screen');
            navbar.classList.add('bg-none');
        } else {
            menu.classList.remove('hidden');
            close.classList.add('hidden')
            list.classList.remove('opacity-100');
            list.classList.remove('blur-none');
            list.classList.remove('bg-gradient-to-bl');
            list.classList.remove('from-fuchsia-900/30');
            list.classList.remove('justify-center');
            list.classList.remove('h-screen');
            navbar.classList.remove('bg-none');
        }
        menu_opened = !menu_opened;
    }

    function deblur_links() {
        let links = document.querySelectorAll('nav ul li');
        for (let link of links) {
            link.classList.add('blur-none');
            link.classList.remove('blur-sm');
        }
    }

    function blur_links() {
        let links = document.querySelectorAll('nav ul li');
        for (let link of links) {
            link.classList.remove('blur-none');
            link.classList.add('blur-sm');
        }
    }
</script>


<nav class="fixed z-10 right-0 w-full top-0 leading-3 p-5
        md:flex md:items-center md:justify-between
        backdrop-blur-sm hover:backdrop-blur-lg
        shadow-black/30 shadow-2xl
        bg-gradient-to-l hover:from-black/20 hover:to-black/40 from-black/10
        "
     on:mouseover={deblur_links}
     on:mouseleave={blur_links}
>
    <div class="flex justify-between items-center ">
        <a href="#/{language}/" class="font-bold">
            <h1 class="text-white not-italic text-4xl left-5 tracking-tighter" id="header-title">
                { is_en ? 'Post' : '後知' }
                <img src={Logo} alt="Logo" class="w-10 inline">
                { is_en ? 'Perception' : '後覺後' }
            </h1>
        </a>
        <span class="text-3xl cursor-pointer mx-2 md:hidden block" on:click={open_menu}>
            <Menu id="menu-icon" size="40"/>
            <Close id="close-icon" size="40" class="hidden"/>
        </span>
    </div>

    <ul class="
    absolute w-full left-0 py-4 pt-20 top-0 blur opacity-0 transition-all ease-in-out duration-500
    md:flex md:items-center z-[-1] md:z-auto md:static md:w-auto md:py-0 md:pl-0 md:pt-0 md:blur-none md:opacity-100">
        {#each links as link (link.id)}
            <li class="z-[100] text-center mx-4 text-2xl hover:text-lg my-6 blur-sm md:my-0 transition-all duration-200 ease-in-out">
                <a href="#/{language}/{link.en}/">
                    {is_en ? link.en : link.zh}
                </a>
            </li>
        {/each}

        {#if is_en}
            <li class="text-center cursor-pointer mx-4 text-2xl hover:text-lg my-6 blur-sm md:my-0 transition-all duration-200 ease-in-out">
                <a on:click={switch_language}>中</a>
            </li>
        {:else}
            <li class="text-center cursor-pointer mx-4 text-2xl hover:text-lg my-6 blur-sm md:my-0 transition-all duration-200 ease-in-out">
                <a on:click={switch_language}>En</a>
            </li>
        {/if}
    </ul>
</nav>

<style>
    nav ul li a {
        position: relative;
        font-size: 1rem;
        padding: 7px 2px; /*線條距離*/
        text-transform: uppercase;
        transition: filter .1s ease-in-out;
    }

    nav ul li a::before {
        position: absolute;
        content: "";
        left: 0;
        bottom: 0;
        height: 2px;
        width: 100%;
        background: white; /*Line color*/
        transform: scaleX(0);
        transform-origin: right;
        transition: transform 0.1s ease-in-out;
    }

    nav ul li a:hover::before {
        transform: scaleX(1);
        transform-origin: left;
    }
</style>