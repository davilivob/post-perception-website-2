<script lang="ts">
    import FacePic from "../Components/FacePic.svelte";
    import {information} from '../info';

    export let params = {};

    const is_en: boolean = params.language == 'en';
    const all_info: object = $information[params.language];
    const artwork_info: object = all_info.art_teams[params.id];

    const team_members: object = artwork_info.members
    const description: String = artwork_info.description;
    const format: String = artwork_info.format;
    const media: String = artwork_info.media;
    const face_pic_width_vw = parseInt(String(100.0 / (team_members.length)));
    console.log(face_pic_width_vw)
    console.log(artwork_info);

    let current_page = 'creators'

    // This line in necessary to make TailwindCSS know what tags need to be used
    const tailwinds_tags = ['to-violet-900', 'to-violet-900/10', 'to-rose-900', 'to-rose-900/10', 'to-cyan-900', 'to-cyan-900/10', 'to-lime-900', 'to-lime-900/10'];

    const pages: Object = [
        {
            name: 'creators', color: 'rose', content: is_en ? 'Creators' : '創作者'
        },
        {
            name: 'description', color: 'cyan', content: is_en ? 'Description' : '作品論述'
        },
        {
            name: 'image_record', color: 'violet', content: is_en ? 'Image Record' : '照片記錄'
        },
        {
            name: 'video_record', color: 'lime', content: is_en ? 'Video Record' : '影像記錄'
        },
    ];

    function hide_page(page_name: String) {
        console.log(`${page_name} page is hidden`)
        document.getElementById(`${page_name}-page`).classList.add('hidden')
    }

    function show_page(page_name: String) {
        console.log(`switched to ${page_name}`)
        document.getElementById(`${page_name}-page`).classList.remove('hidden')
    }

    const stop_red_btn = () => clearInterval(set_red_btn)

    let set_red_btn = setInterval(() => {
        if (document.getElementById('creators-btn').classList.contains(`to-rose-900/10`)) {
            document.getElementById('creators-btn').classList.add(`to-rose-900`);
            document.getElementById('creators-btn').classList.remove(`to-rose-900/10`);
            stop_red_btn()
        } else return
    }, 100)


</script>

<a class="fa-solid fa-arrow-left text-2xl p-3 top-0" href="/#/{params.language}/artworks"></a>

<div class="mx-3 break-all">
    <h1 class="text-center text-5xl font-black my-1 text-white">{artwork_info.title}</h1>
    <h2 class="text-center text-xl font-bold my-1">{artwork_info.format}</h2>
    <h3 class="text-center text-xs font-extralight my-1">{artwork_info.media}</h3>
</div>

<div class="mx-3 flex flex-col justify-center items-center text-center mt-3">
    <div class="flex flex-rol rounded-full m-auto items-center justify-center gap-3 px-2 py-1">
        {#each pages as page}
            <div id="{page.name}-btn"
                 class="rounded-full bg-gradient-to-tl from-white/10 to-{page.color}-900/10 px-3 py-1 text-xs cursor-pointer duration-300 ease-in-out"
                 on:click={e => {
                    if (current_page === page.name) return
                    current_page = page.name
                    console.log(`switching to ${page.name}`)
                    e.target.classList.toggle(`to-${page.color}-900`)
                    e.target.classList.toggle(`to-${page.color}-900/10`)
                    for (let i = 0; i < pages.length; i++) {
                        if (pages[i].name !== page.name) {
                            hide_page(pages[i].name)
                            document.getElementById(`${pages[i].name}-btn`).classList.remove(`to-${pages[i].color}-900`);
                            document.getElementById(`${pages[i].name}-btn`).classList.add(`to-${pages[i].color}-900/10`);
                        }else {
                            show_page(pages[i].name)
                        }
                    }
                }}>
                {page.content}
            </div>
        {/each}
    </div>

    <div class="w-11/12 bg-gradient-to-tr from-white/10 to-violet-600/10 rounded-xl m-5 text-gray-300 font-bolder">
        <div class="block p-10" id="creators-page">
            <div class="justify-center flex flex-wrap gap-5">
                {#each team_members as member}
                    <div class="mx-1 md:mx-2 w-48 md:w-64 font-light text-center flex flex-col justify-center items-center">
                        <FacePic id={all_info.school_ids[member.name]} lang="{params.language}"></FacePic>
                        <div class="desc text-xl mt-1">{member.name}</div>
                        <div class="overlay" onmouseover="">
                            <div class="text-sm">{member.title}</div>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
        <div id="description-page" class="hidden p-5">
            <!--            <h3 class="text-3xl font-normal mb-10">{is_en ? 'Description' : '作品論述'}</h3>-->
            <p class="sm:text-lg text-s text-left">{@html description.replace('<br>', '<br><br>')}</p>
        </div>
        <div id="image_record-page" class="hidden">
            <h3 class="text-3xl font-normal mb-10">{is_en ? 'Description' : '作品論述'}</h3>
            <div class="text-sm">{description}</div>
        </div>
        <div id="video_record-page" class="hidden">
            <h3 class="text-3xl font-normal mb-10">{is_en ? 'Description' : '作品論述'}</h3>
            <div class="text-sm">{description}</div>
        </div>
    </div>
</div>

