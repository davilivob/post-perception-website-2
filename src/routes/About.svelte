<script>
    import {information} from "../lib/info";
    import Sponsor from "../Components/Sponsor.svelte";

    export let params = {};
    const is_en = params.language == 'en';
    const all_info = $information[params.language];

    const description = `
                在資本社會與科技發展方興未艾的當今，技術革新持續擴充感知的疆界，高速且溢滿的提供著人們經驗世界的方式。而科技、新媒體藝術亦在這波浪潮中乘風邁進，時代的步伐正如火如荼的朝向虛擬前進。<br><br>
                身處感官紛亂的世代，在擁抱技術與便利生活之際，日常經驗的切片總在回望時倏然體現。使我們反思時代的課題與出口。我們將「後知後覺後」視為一種立基於高速時代的感知練習與行動，核心概念分為三個面向——<br><br>
                <i class="font-bold">一、後</i><br>
                將當代的現象視為基石，緩慢地體察並閱覽每個感知流動的時刻，期待瀏覽的節奏、感知的頻率能逐步發展出更多可能與契機。「後」也如同諸多歷史流派之意，也作為一種溫柔的抵抗與期待，一個出口與濫觴的節點。<br><br>
                <i class="font-bold">二、在知覺之後</i><br>
                在藝術創作與生產的進程裡，時常仰賴創作者自身的遠眺與回眸，梳理出更清晰的脈絡，如同後知後覺般，給予創作者與觀者更多元且寬廣的可能。在接觸新媒體並練習創作的期間，我們深刻體認到媒介和速度帶來的「感知時間差」，微妙的思緒如同浪花一道又一道的湧現。<br><br>
                <i class="font-bold">三、光譜的可能</i><br>
                不追隨科技與速度的先鋒，搏取眼球也不再是首要任務。我們期盼回歸媒體藝術中關注媒介與議題的精神價值，向內梳理亦對外擴張，推進浪潮之際仍不忘回望。作品面向多元，感官體驗從高速飽滿到深刻幽微，部分關注資訊運算、虛實辯證與網路世代，同時不乏觸及觀演關係、身體性和夢境等。<br><br>
                身為千禧世代，我們生於類比與數位的節點，成長於網路起飛的年代，發展於數據運算的當今。集結所學專業與創作能量的奮力一出擊，「後知後覺後」指向屬於我們自身的時代輪廓，一種高速之下反思、辯證與前行的動態。<br><br>
                伴隨科技革新，感知的疆界不斷擴張，提供人們高速經驗世界的方式。在擁抱科技的便捷與速度之際，時有日常碎片散落在來去匆匆的日月之間，而在回望時倏然體現。<br><br>
                展覽將「後知後覺後」視為一種立基於高速時代的感知練習，分為「後」、「在知覺之後」與「光譜的可能」三個子題。期盼回應當今高速時代的表徵，為其提出更多元的感知節奏。透過梳理生命經驗與創作課題，體現感知錯落的微妙之處；聚焦科技/新媒體藝術在當今發展的光譜，在藝術與科技實踐的奮力一擊。<br><br>
                「後知後覺後」指向屬於我們自身的時代輪廓，一種高速之下反思、辯證與前行的動態。
            `;

</script>

<div class="pt-16 flex flex-col gap-5 items-center justify-center">
    <div class="mx-3 ">
        <h1 class="text-center text-5xl font-black my-1 text-white">
            {is_en ? "About This Exhibition" : "關於本展覽"}
        </h1>
    </div>

    <div class="flex flex-row flex-wrap gap-1 justify-center items-center">
        <img src="images/exhibition/poster.jpg" alt="" class="max-h-[60vh] rounded">
        <div class="w-5/6 md:w-2/6 max-h-[60vh] overflow-auto sticky rounded-xl bg-gradient-to-br from-white/80 to-cyan-50/50 shadow-inner shadow-black">
            <!--            <div class="h-64 fixed bg-gradient-to-b from-black/50 to-transparent w-2/6 m-0 rounded-xl"></div>-->
            <!--            <div class="backdrop-blur-xl w-full h-12 fixed top-1/2"></div>-->
            <p class="m-4 mx-8 text-black/80 tracking-wider text-lg text-center">
                {@html description}
            </p>
        </div>
    </div>
    <Sponsor language="{params.language}"/>
</div>