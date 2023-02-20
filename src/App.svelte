<script lang="ts">

    // Import Libraries
    import Router from 'svelte-spa-router'
    import TailwindCSS from "./TailwindCSS.svelte";

    // Import Routes
    import Home from './routes/Home.svelte';
    import About from './routes/About.svelte';
    import Artworks from './routes/Artworks.svelte';
    import Artwork from './routes/Artwork.svelte';
    import PageNotFound from "./routes/PageNotFound.svelte";
    import RedirToZh from "./routes/RedirToZh.svelte";

    // Import Components
    import Header from "./Components/Header.svelte";
    import Cursor from "./Components/Cursor.svelte";

    // Create Router
    const routes = {
        '/': RedirToZh,
        '/:language/': Home,
        '/:language/about': About,
        '/:language/artworks': Artworks,
        '/:language/artworks/:id': Artwork,
        '/:language/members': Artwork,
        '/:language/members/:id': Artwork,
        '/:language/record': Artwork,
        '/:language/record/:id': Artwork,
        '*': PageNotFound,
    }

    let URL: string = window.location.href;
    let language: string;
    if (URL.includes('#')) {
        language = URL.split('#')[1].split('/')[1]
    } else {
        window.location.href = '/#/zh/'
        location.reload();
    }
</script>


<TailwindCSS/>
<div class="bg-gradient-to-br from-blue-900/60 to-black w-screen h-screen fixed z-[-1]"></div>
<main>
    <Cursor/>
    <Header language="{language}"/>
    <Router {routes}/>
</main>