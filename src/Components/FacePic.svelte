<script>
    export let id = 0;
    export let lang = 'zh';
    export let rounded = 'full';
    export let w = 'w-[30vh]';
    export let h = 'h-[30vh]';
    $: img_link = `images/exhibition/head_photos/png/${id}.png`

    const go_to_person = () => {
        window.location.href = `/#/${lang}/members/${id}`;
    }
</script>

<!--<div class="{w} {h} bg-no-repeat bg-cover bg-center rounded-{rounded} cursor-pointer"-->
<!--     on:click={go_to_person} id="image-container"-->
<!--     style="background-image: url({img_link})">-->
<!--</div>-->

<img src="{img_link}" alt="" class="{w} {h} rounded-{rounded} cursor-pointer"
     on:click={go_to_person} id="image-container"
>