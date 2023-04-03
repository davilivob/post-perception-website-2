<script>
    import FacePic from "../Components/FacePic.svelte";
    import {information} from "../lib/info";

    export let params = {};
    const is_en = params.language == 'en';
    let all_info = $information[params.language];

    const school_ids = all_info.school_ids;
    let name = '';
    Object.keys(school_ids).forEach((key) => {
        if (school_ids[key] == params.id) name = key;
    });
    name = name

</script>
<div class="flex flex-col mx-10 my-12 justify-center items-center text-center gap-3">
    <a href="/#/{params.language}/members">Go Back</a>
    <FacePic id={params.id} rounded="xl" w="w-[40vh]" h="max-h-[40vh]" lang="{params.language}"></FacePic>
    <i class="font-bold text-3xl">{name}</i>
</div>
