<script lang="ts">
    // Import Assets
    import Logo from '../assets/logo.svg'

    export let language: string = 'zh';
    let is_en: boolean = language === 'en';
    let URL: string = window.location.href

    function switch_language() {
        window.location.href = is_en ? URL.replace('en', 'zh') : URL.replace('zh', 'en');
        location.reload();
    }
</script>

<nav class="fixed inset-x-0 top-0 h-16 leading-3">
    <a href="#/{language}/" class="">
        <h1 class="text-white fixed not-italic text-7xl top-5 left-5 tracking-tighter" id="header-title">
            { is_en ? 'Post' : '後知' }
            <img src={Logo} alt="Logo" class="w-16 inline">
            <br>
            { is_en ? 'Perception' : '後覺後' }
        </h1>
    </a>

    <input type="checkbox" class="hidden" id="check"/>
    <label for="check">
        <i class="fas fa-bars" id="btn"></i>
        <i class="fas fa-times" id="cancel"></i>
    </label>

    <ul class="float-right mr-6">
        <li>
            <a href="#/{language}/news/">
                {is_en ? 'news' : '最新消息'}
            </a>
        </li>
        <li>
            <a href="#/{language}/about/">
                {is_en ? 'about' : '展覽資訊'}
            </a>
        </li>
        <li>
            <a href="#/{language}/artworks/">
                {is_en ? 'artworks' : '作品'}
            </a>
        </li>
        <li>
            <a href="#/{language}/record/">
                {is_en ? 'record' : '展覽紀錄'}
            </a>
        </li>
        <li>
            <a href="#/{language}/members/">
                {is_en ? 'members' : '參展人員'}
            </a>
        </li>
        {#if is_en}
            <li><a class="cursor-pointer" on:click={switch_language}>中</a></li>
        {:else}
            <li><a class="cursor-pointer" on:click={switch_language}>En</a></li>
        {/if}
    </ul>
</nav>

<style>
    nav ul li {
        display: inline-block;
        line-height: 80px;
        margin: 0 15px;
    }

    nav ul li a {
        position: relative;
        font-size: 1rem;
        padding: 7px 2px; /*線條距離*/
        text-transform: uppercase;
        transition: filter .3s ease-in-out;
    }

    nav ul li a:before {
        position: absolute;
        content: "";
        left: 0;
        bottom: 0;
        height: 2px;
        width: 100%;
        background: white; /*Line color*/
        transform: scaleX(0);
        transform-origin: right;
        transition: transform 0.4s ease-in-out;
    }

    nav ul li a:hover {
        filter: blur(0px);
    }

    nav ul li a:hover::before {
        transform: scaleX(1);
        transform-origin: left;
    }

    label #btn,
    label #cancel {
        color: rgb(0, 0, 0); /*漢堡圖示顏色*/
        font-size: 30px;
        float: right;
        line-height: 80px;
        margin-right: 40px;
        cursor: pointer;
        display: none;
        font-family: "Font Awesome\ 5 Free", serif;
    }

    @media (max-width: 1100px) {
        label #btn {
            display: block;
        }

        ul {
            position: fixed;
            width: 100%;
            height: 100vh;
            background: hsla(0, 0%, 80%, 0.5); /* 手機板選單背景 */
            top: 80px;
            left: -100%;
            text-align: center;
            transition: all 0.5s ease-in-out;
        }

        nav ul li {
            display: block;
            margin: 50px 0;
            line-height: 30px;
        }

        nav ul li a {
            font-size: 30px;
        }

        #check:checked ~ ul {
            left: 0;
        }

        #check:checked ~ label #btn {
            display: none;
        }

        #check:checked ~ label #cancel {
            display: block;
        }
    }
</style>