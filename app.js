const grid=document.querySelector("#grid"),search=document.querySelector("#search"),summary=document.querySelector("#summary"),dialog=document.querySelector("#profile"),profile=document.querySelector("#profile-content");let filter="all";
const labels={venomous:"Medically significant venom","non-venomous":"Non-venomous",check:"Needs verification"};
const photoCache=new Map();
async function findCommonsPhoto(query){
  if(photoCache.has(query))return photoCache.get(query);
  const request=(async()=>{
    try{
      const url="https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch="+encodeURIComponent('filetype:bitmap '+query)+"&gsrnamespace=6&gsrlimit=1&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=800&format=json&origin=*";
      const response=await fetch(url);
      if(!response.ok)throw new Error("Image search failed");
      const data=await response.json();
      const page=Object.values(data.query?.pages||{})[0];
      const info=page?.imageinfo?.[0];
      if(!info)return null;
      return {url:info.thumburl||info.url,title:page.title,description:info.extmetadata?.ImageDescription?.value||"",artist:info.extmetadata?.Artist?.value||"",license:info.extmetadata?.LicenseShortName?.value||"",source:info.descriptionurl||""};
    }catch(e){return null}
  })();
  photoCache.set(query,request);return request;
}
function imageMarkup(s,profileImage=false){return `<img class="${profileImage?"profile-photo":"photo"}" data-photo-query="${s.query}" alt="Photograph of ${s.common}" loading="lazy"><div class="fallback" hidden aria-hidden="true">🐍</div>`}
async function loadPhotos(root=document){
  for(const img of root.querySelectorAll("img[data-photo-query]")){
    const result=await findCommonsPhoto(img.dataset.photoQuery);
    if(result?.url){img.src=result.url;img.dataset.source=result.source||"";img.dataset.artist=result.artist||"";img.dataset.license=result.license||"";img.addEventListener("error",()=>{img.hidden=true;const fallback=img.nextElementSibling;if(fallback)fallback.hidden=false},{once:true});}
    else{img.hidden=true;const fallback=img.nextElementSibling;if(fallback)fallback.hidden=false;}
  }
}
function render(){const q=search.value.trim().toLowerCase();const list=snakes.filter(s=>(filter==="all"||s.status===filter)&&`${s.common} ${s.scientific} ${s.habitat} ${s.diet}`.toLowerCase().includes(q));grid.innerHTML=list.map(s=>`<article class="card"><button type="button" data-id="${s.id}" aria-label="Open ${s.common} profile">${imageMarkup(s)}<div class="content"><span class="tag ${s.status}">${labels[s.status]}</span><h3>${s.common}</h3><p class="latin">${s.scientific}</p><div class="habitat">${s.habitat.split(",")[0]} · View profile ↗</div></div></button></article>`).join("");summary.textContent=`Showing ${list.length} of ${snakes.length} profiles.`;grid.hidden=list.length===0;if(list.length===0)summary.textContent+=" Try a different search.";document.querySelector("#count").textContent=snakes.length;loadPhotos(grid)}
async function openProfile(id){const s=snakes.find(x=>x.id===Number(id));if(!s)return;profile.innerHTML=`${imageMarkup(s,true)}<div class="fallback" hidden aria-hidden="true">🐍</div><div class="profile-body"><span class="tag ${s.status}">${labels[s.status]}</span><h2>${s.common}</h2><p class="latin">${s.scientific}</p><h3>Identification notes</h3><p>${s.note}</p><h3>Habitat</h3><p>${s.habitat}.</p><h3>Diet</h3><p>${s.diet}.</p><h3>Kenyan distribution</h3><p>${s.range}</p><p id="photo-credit" class="footnote">Looking for a photograph from Wikimedia Commons…</p></div>`;dialog.showModal();await loadPhotos(profile);const img=profile.querySelector("img[data-photo-query]"),credit=profile.querySelector("#photo-credit");if(img?.src&&img.dataset.source){credit.innerHTML=`Photo: <a href="${img.dataset.source}" target="_blank" rel="noopener">Wikimedia Commons file page</a>. ${img.dataset.artist?`Credit: ${img.dataset.artist}. `:""}${img.dataset.license?`Licence: ${img.dataset.license}.`:"Check the file page for reuse terms."}`}else{credit.textContent="No matching Commons photograph loaded. Check a trusted field guide or Commons manually; verify image identity and licence before reuse."}}
search.addEventListener("input",render);document.querySelectorAll("[data-filter]").forEach(b=>b.addEventListener("click",()=>{filter=b.dataset.filter;document.querySelectorAll("[data-filter]").forEach(x=>{x.classList.toggle("active",x===b);x.setAttribute("aria-pressed",String(x===b))});render()}));grid.addEventListener("click",e=>{const b=e.target.closest("[data-id]");if(b)openProfile(b.dataset.id)});document.querySelector("#close").addEventListener("click",()=>dialog.close());dialog.addEventListener("click",e=>{if(e.target===dialog)dialog.close()});document.querySelector("#year").textContent=new Date().getFullYear();render();