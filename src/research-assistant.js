import { ASSISTANT_KEY, emptyResearch, parseResearch, mergeResearch, answerResearch, safeLink } from './assistant-core.js';

const esc = s => String(s ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const uid = () => crypto.randomUUID();
const SESSION_KEY = 'gp-research-assistant-session-v1';

export function mountAssistant() {
  if(document.querySelector('#gp-assistant')) return;
  const root=document.createElement('div');root.id='gp-assistant';
  root.innerHTML=`<button id="ra-launch" type="button" aria-expanded="false" aria-controls="ra-panel">✦ <span>Research assistant</span> <small>TEST</small></button>
  <button id="ra-selection" type="button" hidden>Research selected text ↗</button>
  <aside id="ra-panel" aria-labelledby="ra-title" hidden>
    <header class="ra-header"><div><p class="ra-kicker">GEOPOLYMER / RESEARCH TOOLS</p><h2 id="ra-title">Research assistant <small>TEST</small></h2></div><button type="button" id="ra-close" aria-label="Close research assistant">✕</button></header>
    <div class="ra-scroll">
      <p class="ra-disclosure">Working preview · catalog search, not a connected AI model. No web search or data sent to an AI service.</p>
      <label class="ra-mode"><input type="checkbox" id="ra-mode"> Highlight assist mode</label>
      <p class="ra-help">Turn on, then select text on this page and choose “Research selected text”. On a phone, long-press to select. You can also paste text below.</p>
      <details id="ra-folders"><summary>Research folders <span id="ra-saved-count"></span></summary>
        <label for="ra-folder">Folder</label><select id="ra-folder"></select>
        <form id="ra-folder-form" class="ra-row"><label class="sr-only" for="ra-folder-name">New folder name</label><input id="ra-folder-name" maxlength="80" placeholder="New folder name" required><button type="submit">Create</button></form>
        <div id="ra-saved"></div><div class="ra-row"><button type="button" id="ra-export">Export all folders</button><label class="ra-import">Import backup<input id="ra-import" type="file" accept=".json,application/json"></label></div>
        <p class="ra-help">Saved on this browser only. Export a backup to keep or move your research. Imports create copies.</p>
      </details>
      <div class="ra-section-heading"><h3>Your research</h3><button type="button" id="ra-new">New thread</button></div>
      <label for="ra-excerpt">Selected text or research topic</label><textarea id="ra-excerpt" rows="3" maxlength="5000" placeholder="Select text on the page, or paste a topic here…"></textarea>
      <p id="ra-origin" class="ra-help"></p>
      <div class="ra-row ra-prompts"><button type="button" data-prompt="Deep dive into this text">Deep dive</button><button type="button" data-prompt="Find related studies">Find studies</button><button type="button" data-prompt="Help me find related products">Find products</button></div>
      <div id="ra-messages" aria-label="Research conversation"></div>
      <form id="ra-question-form"><label for="ra-question">Ask a follow-up</label><div class="ra-row"><input id="ra-question" maxlength="1500" placeholder="Try: What about durability?" required><button type="submit" id="ra-ask">Ask</button></div></form>
      <label for="ra-notes">Your notes</label><textarea id="ra-notes" rows="2" maxlength="10000" placeholder="What do you want to investigate next?"></textarea>
      <div class="ra-row"><button type="button" id="ra-save" class="ra-primary">Save to folder</button><button type="button" id="ra-export-thread">Download thread</button></div>
      <p class="ra-help">Save keeps this excerpt, page link, notes and conversation in the selected folder. Save again to update it.</p>
      <p id="ra-status" role="status" aria-live="polite"></p>
    </div>
  </aside>`;
  document.body.append(root);
  const q=s=>root.querySelector(s), panel=q('#ra-panel'), status=s=>{q('#ra-status').textContent=s;};
  let data=emptyResearch(), baseline=null, blocked=false, selected=null, returnFocus=null, busy=false, sessionError=false;
  const fresh=()=>({id:uid(),folder:data.folders[0],excerpt:'',notes:'',title:document.title.slice(0,300),url:location.pathname,savedAt:new Date().toISOString(),messages:[]});
  try {baseline=localStorage.getItem(ASSISTANT_KEY);if(baseline)data=parseResearch(baseline);} catch {blocked=true;status('Saved folders could not be loaded. Existing storage is untouched. New work can be downloaded; restore a valid backup in a working browser.');}
  let thread=fresh();
  try {
    const session=JSON.parse(sessionStorage.getItem(SESSION_KEY)||'null');
    if(session) {thread=parseResearch(session.research).clips[0]||thread;q('#ra-mode').checked=session.enabled===true;}
  } catch {sessionError=true;status('The previous working thread could not be restored. Saved folders are unchanged.');}
  function remember() {
    try {sessionStorage.setItem(SESSION_KEY,JSON.stringify({enabled:q('#ra-mode').checked,research:{version:1,folders:[thread.folder],clips:[thread]}}));}
    catch {sessionError=true;status('Working-thread recovery is unavailable. Save to a folder or download before leaving this page.');}
  }
  function commit(next) {
    parseResearch(next);
    data=next;
    try {
      if(blocked)throw new Error('Storage unavailable');
      if(localStorage.getItem(ASSISTANT_KEY)!==baseline) {blocked=true;throw new Error('Folders changed in another tab');}
      const raw=JSON.stringify(data);localStorage.setItem(ASSISTANT_KEY,raw);baseline=raw;return true;
    } catch {status('Not saved to browser storage. Work remains in this panel: export all folders now. Another tab may have changed the folders, or storage is unavailable.');return false;}
  }
  function download(value,name) {
    const url=URL.createObjectURL(new Blob([JSON.stringify(value,null,2)],{type:'application/json'}));
    const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  function sourceLink(url,title) {return safeLink(url)?`<a href="${esc(url)}" ${url.startsWith('https://')?'target="_blank" rel="noopener noreferrer"':''}>${esc(title)} ↗</a>`:esc(title);}
  function renderMessages() {
    q('#ra-messages').innerHTML=thread.messages.map(m=>m.role==='user'?`<article class="ra-message ra-user"><strong>You</strong><p>${esc(m.text)}</p></article>`:`<article class="ra-message"><strong>Test assistant · ${esc(m.title)}</strong><p>${esc(m.text)}</p>${m.sources.map((s,i)=>`<div class="ra-source"><h4>${i+1}. ${sourceLink(s.url,s.title)}</h4><p>${esc(s.summary)}</p><small>${esc(s.evidence)}</small></div>`).join('')}<details><summary>Questions for your deep dive</summary><ol>${m.questions.map(t=>`<li>${esc(t)}</li>`).join('')}</ol></details></article>`).join('');
  }
  function renderFolders() {
    const folder=data.folders.includes(thread.folder)?thread.folder:data.folders[0];thread.folder=folder;
    q('#ra-folder').innerHTML=data.folders.map(f=>`<option ${f===folder?'selected':''}>${esc(f)}</option>`).join('');
    q('#ra-saved-count').textContent=`(${data.clips.length})`;
    const clips=data.clips.filter(c=>c.folder===folder);
    q('#ra-saved').innerHTML=clips.length?clips.map(c=>`<article class="ra-saved-item"><button type="button" data-open="${esc(c.id)}">${esc((c.excerpt||c.messages.find(m=>m.role==='user')?.text||c.title).slice(0,100))}</button><small>${new Date(c.savedAt).toLocaleDateString()}</small><button type="button" data-delete="${esc(c.id)}" aria-label="Delete saved research: ${esc((c.excerpt||c.title).slice(0,80))}">Delete</button></article>`).join(''):'<p class="ra-help">No saved research in this folder yet.</p>';
  }
  function renderThread() {
    q('#ra-excerpt').value=thread.excerpt;q('#ra-notes').value=thread.notes;
    q('#ra-origin').innerHTML='Captured from '+sourceLink(thread.url,thread.title);
    renderMessages();renderFolders();
  }
  function open() {returnFocus=document.activeElement;panel.hidden=false;q('#ra-launch').setAttribute('aria-expanded','true');q('#ra-selection').hidden=true;q('#ra-excerpt').focus({preventScroll:true});}
  function close() {panel.hidden=true;q('#ra-launch').setAttribute('aria-expanded','false');(returnFocus?.isConnected&&!returnFocus.hidden?returnFocus:q('#ra-launch')).focus({preventScroll:true});}
  q('#ra-launch').onclick=()=>panel.hidden?open():close();q('#ra-close').onclick=close;
  root.addEventListener('keydown',e=>{if(e.key==='Escape'&&!panel.hidden){e.preventDefault();close();}});
  q('#ra-mode').onchange=()=>{selected=null;q('#ra-selection').hidden=true;remember();q('#ra-launch').classList.toggle('ra-active',q('#ra-mode').checked);status(q('#ra-mode').checked?'Highlight mode is on. Select text on the page, then choose Research selected text.':'Highlight mode is off.');};
  q('#ra-launch').classList.toggle('ra-active',q('#ra-mode').checked);
  function captureSelection() {
    if(!q('#ra-mode').checked)return;
    const s=window.getSelection();
    if(!s||s.isCollapsed||!s.rangeCount){q('#ra-selection').hidden=true;return;}
    const range=s.getRangeAt(0), main=document.querySelector('main');
    if(!main.contains(range.startContainer)||!main.contains(range.endContainer))return;
    const el=range.startContainer.nodeType===1?range.startContainer:range.startContainer.parentElement;
    if(el.closest('input,textarea,[contenteditable]'))return;
    const text=s.toString().trim();if(!text)return;
    selected={excerpt:text.slice(0,5000),title:document.title.slice(0,300),url:location.pathname};
    q('#ra-selection').hidden=false;
  }
  document.addEventListener('selectionchange',captureSelection);
  document.addEventListener('pointerup',captureSelection);
  q('#ra-selection').addEventListener('pointerdown',e=>e.preventDefault());
  q('#ra-selection').onclick=()=>{
    if(!selected)return;
    if((thread.excerpt||thread.messages.length||thread.notes)&&!confirm('Research a new excerpt? Save or download your current thread first if you want to keep its latest changes.'))return;
    const selection=selected;thread={...fresh(),...selection};remember();renderThread();open();
    status('Excerpt captured. Choose Deep dive, ask a question or save it to a folder.');
  };
  q('#ra-excerpt').oninput=()=>{thread.excerpt=q('#ra-excerpt').value;remember();};
  q('#ra-notes').oninput=()=>{thread.notes=q('#ra-notes').value;remember();};
  q('#ra-new').onclick=()=>{if((thread.excerpt||thread.messages.length||thread.notes)&&!confirm('Start a new working thread? Save or download this one first if you want to keep its latest changes.'))return;thread=fresh();renderThread();remember();status('New thread started.');q('#ra-excerpt').focus();};
  async function ask(question) {
    if(busy)return;
    if(!thread.excerpt.trim()&&!question.trim())return;
    if(thread.messages.length>=58){status('This thread is full. Save it and start a new thread.');return;}
    busy=true;q('#ra-ask').disabled=true;
    try {
      const response=await answerResearch({excerpt:thread.excerpt,question,history:thread.messages});
      thread.messages.push({role:'user',text:question},response);renderMessages();remember();
      q('#ra-question').value='';status('Catalog response ready. Save to keep the updated conversation.');
      q('#ra-messages').lastElementChild?.scrollIntoView({block:'nearest',behavior:'auto'});
    } catch {status('The assistant could not respond. Your excerpt and saved research are unchanged.');}
    finally {busy=false;q('#ra-ask').disabled=false;}
  }
  q('#ra-question-form').onsubmit=e=>{e.preventDefault();ask(q('#ra-question').value.trim());};
  root.querySelectorAll('[data-prompt]').forEach(b=>b.onclick=()=>{if(!thread.excerpt.trim()){status('Select or enter a research topic first.');q('#ra-excerpt').focus();return;}ask(b.dataset.prompt);});
  q('#ra-folder').onchange=()=>{thread.folder=q('#ra-folder').value;renderFolders();remember();};
  q('#ra-folder-form').onsubmit=e=>{
    e.preventDefault();const name=q('#ra-folder-name').value.trim();if(!name)return;
    if(data.folders.includes(name)){thread.folder=name;renderFolders();status('Selected existing folder.');return;}
    if(data.folders.length>=100){status('Folder limit reached. Export a backup before reorganizing.');return;}
    const next=structuredClone(data);next.folders.push(name);const saved=commit(next);thread.folder=name;renderFolders();remember();q('#ra-folder-name').value='';if(saved)status('Folder created.');
  };
  q('#ra-save').onclick=()=>{
    if(!thread.excerpt.trim()&&!thread.messages.length&&!thread.notes.trim()){status('Add an excerpt, question or note before saving.');return;}
    const next=structuredClone(data), index=next.clips.findIndex(c=>c.id===thread.id);
    if(index<0&&next.clips.length>=200){status('Saved research limit reached. Export a backup before deleting old entries.');return;}
    thread.savedAt=new Date().toISOString();if(index<0)next.clips.push(structuredClone(thread));else next.clips[index]=structuredClone(thread);
    const saved=commit(next);renderFolders();remember();if(saved)status(`Saved to “${thread.folder}” on this browser.`);
  };
  q('#ra-saved').onclick=e=>{
    const openButton=e.target.closest('[data-open]'),del=e.target.closest('[data-delete]');
    if(openButton){if((thread.excerpt||thread.messages.length||thread.notes)&&!confirm('Open saved research? Unsaved changes to the working thread will be replaced.'))return;thread=structuredClone(data.clips.find(c=>c.id===openButton.dataset.open));renderThread();remember();status('Saved research reopened.');}
    if(del&&confirm('Delete this saved research entry? Export a backup first if needed.')){const next=structuredClone(data);next.clips=next.clips.filter(c=>c.id!==del.dataset.delete);const saved=commit(next);renderFolders();if(saved)status('Saved entry deleted.');}
  };
  q('#ra-export').onclick=()=>download(data,'geopolymer-research-folders.json');
  q('#ra-export-thread').onclick=()=>download({version:1,folders:[thread.folder],clips:[thread]},'geopolymer-research-thread.json');
  q('#ra-import').onchange=async e=>{
    const file=e.target.files[0];if(!file)return;
    try {if(file.size>5_000_000)throw new Error('Backup exceeds 5 MB.');const next=mergeResearch(data,await file.text(),uid);const saved=commit(next);renderFolders();if(saved)status('Backup imported as new copies.');}
    catch(error){status('Import rejected: '+error.message+' Existing research is unchanged.');}finally{e.target.value='';}
  };
  renderThread();
  if(sessionError)status('Working-thread recovery is unavailable. Saved folders are separate; export a backup before leaving.');
}
