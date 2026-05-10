async function api(path, opts={}){
  const res = await fetch(path, opts);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

async function refresh(){
  const plants = await api('/api/plants');
  const schedules = await api('/api/schedules');
  const waterings = await api('/api/waterings');

  document.getElementById('plantSelect').innerHTML = plants.map(p=>`<option value="${p.id}">${p.name}</option>`).join('');
  document.getElementById('plantSelect2').innerHTML = document.getElementById('plantSelect').innerHTML;

  const lists = document.getElementById('lists');
  const upcoming = schedules.map(s=>{
    const plant = plants.find(p=>p.id===s.plantId)?.name||s.plantId;
    return `<div class="card"><strong>${plant}</strong> — every ${s.frequencyDays} days @ ${s.timeOfDay}</div>`
  }).join('');

  const logs = waterings.map(w=>{
    const plant = plants.find(p=>p.id===w.plantId)?.name||w.plantId;
    return `<div class="card">${new Date(w.at).toLocaleString()} — <strong>${plant}</strong> ${w.note?('- '+w.note):''}</div>`
  }).join('');

  lists.innerHTML = (upcoming || '<p>No schedules.</p>') + '<h3>Logs</h3>' + (logs || '<p>No logs yet.</p>');
}

document.getElementById('plantForm').addEventListener('submit', async e=>{
  e.preventDefault();
  const fd = new FormData(e.target);
  await api('/api/plants', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ name: fd.get('name') }) });
  e.target.reset();
  refresh();
});

document.getElementById('schedForm').addEventListener('submit', async e=>{
  e.preventDefault();
  const fd = new FormData(e.target);
  await api('/api/schedules', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ plantId: fd.get('plantId'), frequencyDays: parseInt(fd.get('frequencyDays'),10), timeOfDay: fd.get('timeOfDay') }) });
  e.target.reset();
  refresh();
});

document.getElementById('waterForm').addEventListener('submit', async e=>{
  e.preventDefault();
  const fd = new FormData(e.target);
  await api('/api/waterings', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ plantId: fd.get('plantId'), note: fd.get('note') }) });
  e.target.reset();
  refresh();
});

window.addEventListener('load', ()=>{ refresh().catch(err=>{document.getElementById('lists').innerText = 'Failed to load: '+err.message}) });
