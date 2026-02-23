import{a as S,S as q,i as l}from"./assets/vendor-B5nsgUv9.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();const B="https://pixabay.com/api/",M="54634222-77c9b0f4b64a04c45eba29331";async function f(o,t=1){return(await S.get(B,{params:{key:M,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:t}})).data}const m=document.querySelector(".gallery"),y=document.querySelector(".loader"),p=document.querySelector(".load-more"),$=new q(".gallery a",{captionsData:"alt",captionDelay:250});function g(o){const t=o.map(({webformatURL:s,largeImageURL:a,tags:e,likes:r,views:i,comments:w,downloads:v})=>`
      <li class="gallery-item">
        <a href="${a}">
          <img src="${s}" alt="${e}" />
        </a>
        <div class="info">
          <p>Likes: ${r}</p>
          <p>Views: ${i}</p>
          <p>Comments: ${w}</p>
          <p>Downloads: ${v}</p>
        </div>
      </li>
    `).join("");m.insertAdjacentHTML("beforeend",t),$.refresh()}function P(){m.innerHTML=""}function h(){y.classList.add("is-visible")}function L(){y.classList.remove("is-visible")}function b(){p.classList.remove("is-hidden")}function d(){p.classList.add("is-hidden")}const H=document.querySelector(".form"),O=document.querySelector(".load-more");let n=1,c="",u=0;H.addEventListener("submit",async o=>{if(o.preventDefault(),c=o.target.elements.searchQuery.value.trim(),!!c){n=1,P(),d(),h();try{const t=await f(c,n);if(u=t.totalHits,t.hits.length===0){l.error({message:"Sorry, there are no images matching your search query. Please try again!"});return}g(t.hits),u>15&&b()}catch{l.error({message:"Something went wrong!"})}finally{L()}}});O.addEventListener("click",async()=>{n+=1,d(),h();try{const o=await f(c,n);g(o.hits);const t=Math.ceil(o.totalHits/15);n>=t?(d(),l.info({message:"We're sorry, but you've reached the end of search results."})):b();const s=document.querySelector(".gallery-item");if(s){const{height:a}=s.getBoundingClientRect();window.scrollBy({top:a*2,behavior:"smooth"})}}catch{l.error({message:"Something went wrong!"})}finally{L()}});
//# sourceMappingURL=index.js.map
