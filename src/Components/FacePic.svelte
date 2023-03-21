<script>
    export let id = 0;
    export let rounded = 'full';
    export let w = 'w-[30vh]';
    export let h = 'h-[30vh]';
    $: img_link = `images/exhibition/head_photos/jpg/${id}.jpg`
</script>

<div class="{w} {h} bg-no-repeat bg-cover bg-center rounded-{rounded}"
     id="image-container" style="background-image: url({img_link})"></div>