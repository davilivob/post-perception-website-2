<script>
    import {information} from "../lib/info";
    import Sponsor from "../Components/Sponsor.svelte";

    export let params = {};
    const is_en = params.language == 'en';
    const all_info = $information[params.language];
</script>

<div class="pt-16 flex flex-col items-center justify-center">
    <div class="mx-3 break-all">
        <h1 class="text-center text-5xl font-black my-1 text-white">關於我們</h1>
    </div>

    <img src="public/images/exhibition/poster.jpeg" alt="" class="max-h-[60vh]">
    <Sponsor language="{params.language}"/>
</div>