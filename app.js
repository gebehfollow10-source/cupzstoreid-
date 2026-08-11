const input=document.getElementById("inputText"),results=document.getElementById("results"),counter=document.getElementById("counter"),resultCount=document.getElementById("resultCount");
const upper="ABCDEFGHIJKLMNOPQRSTUVWXYZ", lower="abcdefghijklmnopqrstuvwxyz", digits="0123456789";
const sets={};
function mapRange(str,start){const out={};for(let i=0;i<str.length;i++)out[str[i]]=String.fromCodePoint(start+i);return out}
sets.bold=Object.assign({},mapRange(upper,0x1D400),mapRange(lower,0x1D41A),mapRange(digits,0x1D7CE));
sets.italic=Object.assign({},mapRange(upper,0x1D434),mapRange(lower,0x1D44E));
sets.boldItalic=Object.assign({},mapRange(upper,0x1D468),mapRange(lower,0x1D482));
sets.mono=Object.assign({},mapRange(upper,0x1D670),mapRange(lower,0x1D68A),mapRange(digits,0x1D7F6));
sets.sans=Object.assign({},mapRange(upper,0x1D5A0),mapRange(lower,0x1D5BA),mapRange(digits,0x1D7E2));
sets.sansBold=Object.assign({},mapRange(upper,0x1D5D4),mapRange(lower,0x1D5EE),mapRange(digits,0x1D7EC));
sets.fraktur=Object.assign({},mapRange(upper,0x1D504),mapRange(lower,0x1D51E));
sets.frakturBold=Object.assign({},mapRange(upper,0x1D56C),mapRange(lower,0x1D586));
sets.script=Object.assign({},mapRange(upper,0x1D49C),mapRange(lower,0x1D4B6));
sets.double=Object.assign({},mapRange(upper,0x1D538),mapRange(lower,0x1D552),mapRange(digits,0x1D7D8));
sets.circled=Object.assign({},mapRange(upper,0x24B6),mapRange(lower,0x24D0));
sets.squared=Object.assign({},mapRange(upper,0x1F130));
sets.fullwidth=Object.assign({},mapRange(upper,0xFF21),mapRange(lower,0xFF41),mapRange(digits,0xFF10));
const special={up:"ᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿᵒᵖᑫʳˢᵗᵘᵛʷˣʸᶻ",small:"ᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ",wide:""};
const names=[
["Bold","bold","bold","popular"],["Italic","italic","italic","italic"],["Bold Italic","boldItalic","bold","popular"],["Monospace","mono","mono","special"],["Sans Bold","sansBold","bold","popular"],["Sans","sans","aesthetic","aesthetic"],["Fraktur","fraktur","special","special"],["Fraktur Bold","frakturBold","special","special"],["Script","script","aesthetic","aesthetic"],["Double Struck","double","aesthetic","popular"],["Circled","circled","special","special"],["Fullwidth","fullwidth","aesthetic","aesthetic"]];
function convert(text,map){return [...text].map(c=>map[c]||c).join("")}
function decorate(text,type){if(type==="reverse")return [...text].reverse().join("");if(type==="underline")return [...text].map(c=>c+"̲").join("");if(type==="strike")return [...text].map(c=>c+"̶").join("");if(type==="space")return [...text].join(" ");return text}
let category="all";
function render(){
 const text=input.value||"Ketik teks Anda";counter.textContent=`${[...input.value].length} karakter`;
 let list=names.filter(x=>category==="all"||x[3]===category);
 list.push(["Underline","underline","special","special"],["Strikethrough","strike","special","special"],["Spaced","space","special","special"]);
 results.innerHTML="";
 list.forEach(([name,key])=>{
   const value=sets[key]?convert(text,sets[key]):decorate(text,key);
   const row=document.createElement("div");row.className="font-item";
   row.innerHTML=`<div class="font-name">${name}</div><div class="font-result">${escapeHtml(value)}</div><button class="copy">Copy</button>`;
   row.querySelector(".copy").onclick=()=>copy(value);
   results.appendChild(row);
 });
 resultCount.textContent=list.length;
}
function escapeHtml(s){return s.replace(/[&<>"]/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[m]))}
async function copy(text){try{await navigator.clipboard.writeText(text);show("✓ Berhasil disalin")}catch{const ta=document.createElement("textarea");ta.value=text;document.body.appendChild(ta);ta.select();document.execCommand("copy");ta.remove();show("✓ Berhasil disalin")}}
function show(msg){const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),1600)}
input.addEventListener("input",render);
document.getElementById("clearBtn").onclick=()=>{input.value="";input.focus();render()};
document.querySelectorAll(".cat").forEach(b=>b.onclick=()=>{document.querySelectorAll(".cat").forEach(x=>x.classList.remove("active"));b.classList.add("active");category=b.dataset.cat;render()});
document.getElementById("copyAll").onclick=()=>{const vals=[...document.querySelectorAll(".font-result")].map(x=>x.textContent).join("\n\n");copy(vals)};
render();