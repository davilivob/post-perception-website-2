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

    // Create Router
    const routes = {
        '/': RedirToZh,
        '/:language/': Home,
        '/:language/about': About,
        '/:language/artworks': Artworks,
        '/:language/artworks/:id': Artwork,
        '*': PageNotFound,
    }

    let URL: string = window.location.href;
    let language: string = URL.split('#')[1].split('/')[1]
</script>


<TailwindCSS/>
<div class="bg-gradient-to-b from-gray-800 to-gray-900 top-0 w-screen h-screen fixed"></div>
<main>
    <Header language="{language}"/>
    <Router {routes}/>
</main>