/* empty css                      */import{a as q,S,i as l}from"./assets/vendor-DWXSRYDZ.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function a(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(t){if(t.ep)return;t.ep=!0;const s=a(t);fetch(t.href,s)}})();function x(){let e=1;const r=16;async function a(t){const s=new URLSearchParams({key:"50846905-dc608c04a9f845ecec04912aa",q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:e,per_page:r}),o=await q.get(`https://pixabay.com/api/?${s}`);e++;const{hits:p,totalHits:f}=o.data,g=Math.ceil(f/r),b=e>g;return{hits:p,isLastPage:b}}function n(){e=1}return{fetchingGalleryPage:a,resetNextPageNum:n}}function h(e,r){let a="";e.forEach(({webformatURL:n,largeImageURL:t,tags:s,likes:o,views:p,comments:f,downloads:g})=>{a+=`<li class="gallery-item">
    <a class="gallery-item-link" href="${t}">
    <img
    src="${n}"
    alt="${s}"
    /></a>
    <ul class="image-descr">
    <li>
      <span>Likes</span>
      <span>${o}</span>
    </li>
    <li>
      <span>Views</span>
      <span>${p}</span>
    </li>
    <li>
      <span>Comments</span>
      <span>${f}</span>
    </li>
    <li>
      <span>Downloads</span>
      <span>${g}</span>
    </li>
  </ul>
  </li>`}),r.insertAdjacentHTML("beforeend",a)}const m=document.querySelector(".search-form"),u=document.querySelector(".gallery"),d=document.querySelector("button[data-load]"),{fetchingGalleryPage:y,resetNextPageNum:M}=x();let c="";const L=new S(".gallery a",{captionsData:"alt",captionDelay:150});m.addEventListener("submit",async e=>{if(e.preventDefault(),c=e.target.elements.requestValue.value.trim(),!!c){M(),$(),P(m),w();try{const{hits:r,isLastPage:a}=await y(c);if(!r.length){l.error({message:"Вибачте, наразі немає зображень, що відповідають Вашому  пошуковому запиту. Спробуйте пізніше!",position:"topRight"}),i();return}h(r,u),L.refresh(),i(),v(a)}catch(r){console.error(r),l.error({message:"Ой, щось пішло не так. Спробуйте пізніше!",position:"topRight"}),i()}m.reset()}});d.addEventListener("click",async()=>{P(u),w();const{height:e}=document.querySelector(".gallery-item").getBoundingClientRect();try{const{hits:r,isLastPage:a}=await y(c);i(),h(r,u),L.refresh(),window.scrollBy(0,e*2),v(a)}catch(r){console.error(r),l.error({message:"Ой, щось пішло не так. Спробуйте пізніше!",position:"topRight"}),i()}});function P(e){e.insertAdjacentHTML("afterend","<span class='loader'></span>")}function i(e=document.querySelector(".loader")){e&&e.remove()}function v(e){d.classList.contains("visually-hidden")&&(e?l.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}):d.classList.remove("visually-hidden"))}function w(){d.classList.add("visually-hidden")}function $(){u.innerHTML=""}
//# sourceMappingURL=index.js.map
