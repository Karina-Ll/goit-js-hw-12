import{a as g,S as h,i as c}from"./assets/vendor-B5nsgUv9.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();const L="https://pixabay.com/api/",S="ТВІЙ_КЛЮЧ";async function b(o,r=1){return(await g.get(L,{params:{key:S,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:r}})).data}const d=document.querySelector(".gallery"),f=document.querySelector(".loader"),m=document.querySelector(".load-more"),v=new h(".gallery a",{captionsData:"alt",captionDelay:250});function w(o){const r=o.map(({webformatURL:i,largeImageURL:a,tags:e,likes:t,views:s,comments:p,downloads:y})=>`
      <li class="gallery-item">
        <a href="${a}">
          <img src="${i}" alt="${e}" />
        </a>
        <div class="info">
          <p>Likes: ${t}</p>
          <p>Views: ${s}</p>
          <p>Comments: ${p}</p>
          <p>Downloads: ${y}</p>
        </div>
      </li>
    `).join("");d.insertAdjacentHTML("beforeend",r),v.refresh()}function q(){d.innerHTML=""}function $(){f.classList.add("is-visible")}function M(){f.classList.remove("is-visible")}function O(){m.classList.remove("is-hidden")}function P(){m.classList.add("is-hidden")}const B=document.querySelector(".search-form");document.querySelector(".load-more");let l=1,n="",u=0;B.addEventListener("submit",async o=>{if(o.preventDefault(),n=o.target.elements.searchQuery.value.trim(),!!n){l=1,q(),P(),$();try{const r=await b(n,l);if(u=r.totalHits,r.hits.length===0){c.error({message:"Sorry, there are no images matching your search query. Please try again!"});return}w(r.hits),u>15&&O()}catch{c.error({message:"Something went wrong!"})}finally{M()}}});
//# sourceMappingURL=index.js.map
