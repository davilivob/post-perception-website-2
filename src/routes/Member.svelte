<script>
    import FacePic from "../Components/FacePic.svelte";
    import {information} from "../info";

    export let params = {};
    const is_en = params.language == 'en';
    const all_info = $information[params.language];

</script>
<div class="flex flex-row mx-10 mt-3">
    <FacePic id={params.id} rounded="xl" w="w-[40vh]" h="h-[40vh]" lang="{params.language}"></FacePic>

</div>
