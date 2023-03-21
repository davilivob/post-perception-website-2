<script lang="ts">
    import {information} from '../info';

    export let params = {
        language: undefined
    };

    const is_en: boolean = params.language == 'en';
    const all_info: object = $information[params.language];
    const members_info: object = all_info.admins
    console.log(members_info)
</script>