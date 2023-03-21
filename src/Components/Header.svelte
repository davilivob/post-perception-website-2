<script lang="ts">
    // Import Assets
    import Logo from '../../public/images/website/logo.svg'
    import {Menu, Close} from "svelte-ionicons";

    export let language: string = 'zh';
    let is_en: boolean = language === 'en';
    let URL: string = window.location.href

    function switch_language() {
        URL = window.location.href;
        window.location.href = is_en ? URL.replace('en', 'zh') : URL.replace('zh', 'en');
        location.reload();
    }

    const links = [
        {id: 0, en: 'about', zh: '關於我們'},
        {id: 1, en: 'members', zh: '參展人員'},
        {id: 2, en: 'artworks', zh: '參展作品'},
        {id: 3, en: 'records', zh: '展場紀錄'},
    ];

    function open_menu() {
        const links_container = document.querySelector('#links-container');
        const menu_icon = document.querySelector('#menu-icon');
        const close_icon = document.querySelector('#close-icon');
        links_container.classList.toggle('hidden');
        links_container.classList.toggle('backdrop-blur-xl');
        menu_icon.classList.toggle('hidden');
    }

    function blur_links() {
        document.querySelector('nav ul').classList.toggle('xl:blur-sm');
    }

</script>

<div id="navbar"
     class="fixed w-screen h-16 backdrop-blur-2xl z-30 flex flex-row items-center bg-gradient-to-t from-transparent to-cyan-900/30 shadow-2xl">
    <div class="flex justify-between items-center float-right pl-5 font-extrabold">
        <a href="#/{language}/" class="font-extrabold">
            <h1 class="text-white not-italic text-4xl left-5 tracking-tighter" id="header-title">
                <img src={Logo} alt="Logo" class="w-10 inline">
                <a class="hidden sm:inline">{ is_en ? 'Post-Perception' : '後知後覺後' }</a>
            </h1>
        </a>
    </div>
    <i id="menu-icon" class="fa-duotone fa-bars p-5 text-3xl ml-auto cursor-pointer text-3xl mx-2"
       on:click={open_menu}></i>
</div>


<div id="links-container"
     class="fixed text-center items-center justify-center flex flex-col hidden w-screen h-screen gap-10 z-10 bg-violet-500/10 transition-all ease-in-out duration-700 text-white">
    <i id="close-icon" class="fa-solid fa-xmark text-3xl cursor-pointer " on:click={open_menu}></i>
    {#each links as link (link.id)}
        <a class="">
            <a href="#/{language}/{link.en}/" on:click={open_menu}>
                {is_en ? link.en : link.zh}
            </a>
        </a>
    {/each}
    <div class="flex flex-row top-0 cursor-pointer">
        <a class="">
            <a on:click={switch_language} on:click={open_menu}>
                {is_en ? '中' : 'En'}
            </a>
        </a>
    </div>
</div>


