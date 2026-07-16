const STORAGE_KEY="focusbloom-v1";
const defaultState={
  profile:{name:"Diana",major:"Pharmacy Student",university:"Applied Science Private University"},
  settings:{dailyGoal:120,focusMinutes:25,shortBreak:5,longBreak:15,dark:false},
  subjects:[
    {id:"sub1",name:"الصيدلانيات",color:"#7c5ce7",targetHours:20},
    {id:"sub2",name:"الكيمياء العضوية",color:"#4c9bd8",targetHours:15}
  ],
  tasks:[],sessions:[],events:[]
};
let state=loadState();
let currentPage="dashboard";
let timerMode="pomodoro",timerRunning=false,timerInterval=null,timerSeconds=state.settings.focusMinutes*60;
let stopwatchBase=0,stopwatchStartedAt=null;
let calendarDate=new Date();

function loadState(){try{return {...defaultState,...JSON.parse(localStorage.getItem(STORAGE_KEY)||"{}")}}catch{return structuredClone(defaultState)}}
function saveState(){localStorage.setItem(STORAGE_KEY,JSON.stringify(state))}
const $=id=>document.getElementById(id);
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
const fmt=m=>{m=Math.round(m);return m<60?`${m}د`:`${Math.floor(m/60)}س ${m%60}د`};
const sessionMinutes=s=>Math.max(1,Math.round(s.durationSeconds/60));
function toast(msg){const el=$("toast");el.textContent=msg;el.classList.add("show");setTimeout(()=>el.classList.remove("show"),1800)}
function startOfDay(d=new Date()){const x=new Date(d);x.setHours(0,0,0,0);return x}
function startOfWeek(d=new Date()){const x=startOfDay(d);const day=x.getDay();x.setDate(x.getDate()-(day===0?6:day-1));return x}
function totals(){
  const today=startOfDay(),week=startOfWeek();
  return{
    total:state.sessions.reduce((a,s)=>a+sessionMinutes(s),0),
    today:state.sessions.filter(s=>new Date(s.endedAt)>=today).reduce((a,s)=>a+sessionMinutes(s),0),
    week:state.sessions.filter(s=>new Date(s.endedAt)>=week).reduce((a,s)=>a+sessionMinutes(s),0)
  }
}
function streak(){
  const days=new Set(state.sessions.map(s=>startOfDay(new Date(s.endedAt)).toISOString()));
  let c=startOfDay(),n=0;if(!days.has(c.toISOString()))c.setDate(c.getDate()-1);
  while(days.has(c.toISOString())){n++;c.setDate(c.getDate()-1)}return n
}
function subjectMinutes(id){return state.sessions.filter(s=>s.subjectId===id).reduce((a,s)=>a+sessionMinutes(s),0)}
function plantInfo(total){
  if(total<30)return{icon:"🌱",stage:"بذرة",next:30,from:0,msg:"ابدئي أول جلسة حتى تنمو نبتتك."};
  if(total<120)return{icon:"🌿",stage:"برعم",next:120,from:30,msg:"أكملي ساعتين لتصبح نبتة صغيرة."};
  if(total<600)return{icon:"🪴",stage:"نبتة صغيرة",next:600,from:120,msg:"أكملي 10 ساعات لتتفتح الزهرة."};
  if(total<3000)return{icon:"🌸",stage:"زهرة",next:3000,from:600,msg:"أكملي 50 ساعة لتصبح شجرة."};
  return{icon:"🌳",stage:"شجرة",next:total,from:total,msg:"رائع! بنيتِ عادة دراسة قوية."}
}
function navigate(page){
  currentPage=page;
  document.querySelectorAll(".page").forEach(p=>p.classList.toggle("active",p.id===page));
  document.querySelectorAll(".nav-link").forEach(n=>n.classList.toggle("active",n.dataset.page===page));
  const titles={dashboard:"مرحبًا بكِ 👋",timer:"جلسة تركيز",subjects:"المواد",tasks:"المهام",planner:"المخطط",stats:"الإحصائيات",achievements:"الإنجازات",profile:"الملف الشخصي"};
  $("pageTitle").textContent=titles[page]||"FocusBloom";
  window.scrollTo({top:0,behavior:"smooth"})
}
function render(){
  applyTheme();renderProfile();renderSubjectOptions();renderDashboard();renderSubjects();renderTasks();renderSessions();renderPlanner();renderStats();renderAchievements();renderSettings()
}
function applyTheme(){document.body.classList.toggle("dark",state.settings.dark);$("themeToggle").textContent=state.settings.dark?"☀️ الوضع الفاتح":"🌙 الوضع الداكن"}
function renderProfile(){
  const p=state.profile;const initial=(p.name||"D").trim().charAt(0).toUpperCase();
  $("miniAvatar").textContent=$("profileAvatar").textContent=initial;
  $("miniName").textContent=$("profileDisplayName").textContent=p.name;
  $("miniMajor").textContent=$("profileDisplayMajor").textContent=p.major;
  $("profileDisplayUniversity").textContent=p.university;
  $("profileName").value=p.name;$("profileMajor").value=p.major;$("profileUniversity").value=p.university
}
function renderDashboard(){
  const t=totals(),s=streak(),pending=state.tasks.filter(x=>!x.completed).length,plant=plantInfo(t.total);
  $("todayFocus").textContent=fmt(t.today);$("currentStreak").textContent=`${s} يوم`;$("totalStudy").textContent=fmt(t.total);$("pendingTasks").textContent=pending;
  $("plantVisual").textContent=plant.icon;$("plantStage").textContent=plant.stage;$("plantMessage").textContent=plant.msg;
  $("plantLevel").textContent=`المستوى ${Math.floor(t.total/600)+1}`;
  const pp=plant.next===plant.from?100:Math.min(100,((t.total-plant.from)/(plant.next-plant.from))*100);
  $("plantProgress").style.width=`${pp}%`;$("plantNext").textContent=plant.next===plant.from?"وصلتِ لأعلى مرحلة":`${fmt(plant.next-t.total)} للمرحلة التالية`;
  $("goalLabel").textContent=`${t.today} / ${state.settings.dailyGoal} دقيقة`;$("goalProgress").style.width=`${Math.min(100,t.today/state.settings.dailyGoal*100)}%`;
  $("goalMessage").textContent=t.today>=state.settings.dailyGoal?"أحسنتِ! حققتِ هدف اليوم.":"ابدئي الآن وخذي أول خطوة.";
  const dTasks=state.tasks.filter(x=>!x.completed).slice(0,4);
  $("dashboardTasks").innerHTML=dTasks.length?dTasks.map(x=>`<div class="item"><span>${esc(x.title)}</span><small>${priorityLabel(x.priority)}</small></div>`).join(""):'<div class="muted">لا توجد مهام حاليًا.</div>';
  $("dashboardSubjects").innerHTML=state.subjects.length?state.subjects.slice(0,4).map(s=>`<div class="item"><span><b style="color:${s.color}">●</b> ${esc(s.name)}</span><strong>${fmt(subjectMinutes(s.id))}</strong></div>`).join(""):'<div class="muted">أضيفي أول مادة.</div>';
  renderWeeklyBars();$("weekTotalPill").textContent=fmt(t.week)
}
function renderWeeklyBars(){
  const days=[],labels=["أحد","اثنين","ثلاثاء","أربعاء","خميس","جمعة","سبت"];
  for(let i=6;i>=0;i--){const d=startOfDay();d.setDate(d.getDate()-i);const next=new Date(d);next.setDate(next.getDate()+1);const m=state.sessions.filter(s=>{const x=new Date(s.endedAt);return x>=d&&x<next}).reduce((a,s)=>a+sessionMinutes(s),0);days.push({label:labels[d.getDay()],minutes:m})}
  const max=Math.max(1,...days.map(d=>d.minutes));
  $("weeklyBars").innerHTML=days.map(d=>`<div class="day-bar"><strong>${d.minutes?fmt(d.minutes):""}</strong><div class="bar" style="height:${Math.max(6,d.minutes/max*120)}px"></div><small>${d.label}</small></div>`).join("")
}
function renderSubjectOptions(){
  const opts=state.subjects.map(s=>`<option value="${s.id}">${esc(s.name)}</option>`).join("");
  $("timerSubject").innerHTML=opts||'<option value="">بدون مادة</option>';
  $("taskSubject").innerHTML='<option value="">بدون مادة</option>'+opts;
  const taskOpts=state.tasks.filter(t=>!t.completed).map(t=>`<option value="${t.id}">${esc(t.title)}</option>`).join("");
  $("timerTask").innerHTML='<option value="">بدون مهمة</option>'+taskOpts
}
function renderSubjects(){
  $("subjectsCount").textContent=`${state.subjects.length} مواد`;
  $("subjectsList").innerHTML=state.subjects.length?state.subjects.map(s=>{
    const m=subjectMinutes(s.id),target=(s.targetHours||0)*60,p=target?Math.min(100,m/target*100):0;
    return`<div class="card subject-card"><div class="subject-color" style="background:${s.color}"></div><div><div class="card-head"><strong>${esc(s.name)}</strong><small>${fmt(m)}</small></div><div class="progress subject-progress"><div style="width:${p}%;background:${s.color}"></div></div><small class="muted">${target?`${Math.round(p)}% من الهدف`:"لا يوجد هدف"}</small></div><button class="danger-btn" onclick="deleteSubject('${s.id}')">حذف</button></div>`
  }).join(""):'<div class="muted">لا توجد مواد بعد.</div>'
}
function priorityLabel(p){return{low:"منخفضة",medium:"متوسطة",high:"عالية"}[p]||""}
function renderTasks(){
  const filter=$("taskFilter").value,today=startOfDay(),tomorrow=new Date(today);tomorrow.setDate(tomorrow.getDate()+1);
  let tasks=[...state.tasks];
  if(filter==="today")tasks=tasks.filter(t=>t.dueDate&&new Date(t.dueDate)>=today&&new Date(t.dueDate)<tomorrow);
  if(filter==="upcoming")tasks=tasks.filter(t=>t.dueDate&&new Date(t.dueDate)>=tomorrow&&!t.completed);
  if(filter==="completed")tasks=tasks.filter(t=>t.completed);
  $("tasksList").innerHTML=tasks.length?tasks.map(t=>{const s=state.subjects.find(x=>x.id===t.subjectId);return`<div class="item" style="${t.completed?'opacity:.55;text-decoration:line-through':''}"><div style="display:flex;gap:10px;align-items:center"><input style="width:auto" type="checkbox" ${t.completed?'checked':''} onchange="toggleTask('${t.id}')"><div class="item-main"><strong>${esc(t.title)}</strong><small>${s?esc(s.name):"بدون مادة"} · ${priorityLabel(t.priority)} ${t.dueDate?`· ${t.dueDate}`:""}</small></div></div><button class="danger-btn" onclick="deleteTask('${t.id}')">حذف</button></div>`}).join(""):'<div class="muted">لا توجد مهام مطابقة.</div>'
}
function renderSessions(){
  const list=[...state.sessions].reverse().slice(0,10);
  $("sessionList").innerHTML=list.length?list.map(s=>{const sub=state.subjects.find(x=>x.id===s.subjectId);return`<div class="item"><div class="item-main"><strong>${sub?esc(sub.name):"جلسة دراسة"}</strong><small>${s.type==="pomodoro"?"Pomodoro":"مؤقت عادي"} · ${new Date(s.endedAt).toLocaleDateString("ar-JO")}</small></div><strong>${fmt(sessionMinutes(s))}</strong></div>`}).join(""):'<div class="muted">لم تسجلي جلسات بعد.</div>'
}
function renderPlanner(){
  const y=calendarDate.getFullYear(),m=calendarDate.getMonth(),monthNames=["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"];
  $("calendarTitle").textContent=`${monthNames[m]} ${y}`;const first=new Date(y,m,1).getDay(),days=new Date(y,m+1,0).getDate();let html="";
  for(let i=0;i<first;i++)html+='<div class="calendar-day empty"></div>';
  for(let d=1;d<=days;d++){const date=`${y}-${String(m+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`,ev=state.events.filter(e=>e.date===date);const isToday=date===new Date().toISOString().slice(0,10);html+=`<div class="calendar-day ${isToday?"today":""}"><strong>${d}</strong><div>${ev.map(e=>`<span class="event-dot ${e.type}" title="${esc(e.title)}"></span>`).join("")}</div></div>`}
  $("calendarGrid").innerHTML=html;
  const upcoming=[...state.events].filter(e=>e.date>=new Date().toISOString().slice(0,10)).sort((a,b)=>a.date.localeCompare(b.date)).slice(0,8);
  $("eventList").innerHTML=upcoming.length?upcoming.map(e=>`<div class="item"><div class="item-main"><strong>${esc(e.title)}</strong><small>${e.date} · ${eventTypeLabel(e.type)}</small></div><button class="danger-btn" onclick="deleteEvent('${e.id}')">حذف</button></div>`).join(""):'<div class="muted">لا توجد مواعيد قادمة.</div>'
}
function eventTypeLabel(t){return{study:"جلسة دراسة",exam:"امتحان",assignment:"واجب"}[t]}
function renderStats(){
  const t=totals(),longest=state.sessions.length?Math.max(...state.sessions.map(sessionMinutes)):0;
  $("weekStudy").textContent=fmt(t.week);$("longestSession").textContent=fmt(longest);$("pomodoroCount").textContent=state.sessions.filter(s=>s.type==="pomodoro").length;
  const vals=state.subjects.map(s=>({...s,minutes:subjectMinutes(s.id)})),max=Math.max(1,...vals.map(v=>v.minutes));
  $("subjectStats").innerHTML=vals.length?vals.map(v=>`<div class="bar-row"><span>${esc(v.name)}</span><div class="bar-track"><div class="bar-fill" style="width:${v.minutes/max*100}%;background:${v.color}"></div></div><strong>${fmt(v.minutes)}</strong></div>`).join(""):'<div class="muted">أضيفي مواد وجلسات حتى تظهر الإحصائيات.</div>'
}
function achievementDefs(){
  const t=totals(),s=streak(),pom=state.sessions.filter(x=>x.type==="pomodoro").length,done=state.tasks.filter(x=>x.completed).length;
  return[
    {icon:"🌱",title:"الخطوة الأولى",desc:"إكمال أول جلسة",ok:state.sessions.length>=1},
    {icon:"⏱️",title:"ساعة تركيز",desc:"دراسة ساعة كاملة",ok:t.total>=60},
    {icon:"📚",title:"طالب ملتزم",desc:"دراسة 10 ساعات",ok:t.total>=600},
    {icon:"🔥",title:"3 أيام متتالية",desc:"سلسلة 3 أيام",ok:s>=3},
    {icon:"🏆",title:"7 أيام متتالية",desc:"سلسلة 7 أيام",ok:s>=7},
    {icon:"🍅",title:"Pomodoro Starter",desc:"إكمال 5 جلسات",ok:pom>=5},
    {icon:"✅",title:"Task Master",desc:"إكمال 10 مهام",ok:done>=10},
    {icon:"🌳",title:"Focus Tree",desc:"دراسة 50 ساعة",ok:t.total>=3000}
  ]
}
function renderAchievements(){const defs=achievementDefs(),count=defs.filter(x=>x.ok).length;$("achievementSummary").textContent=`${count} / ${defs.length}`;$("achievementGrid").innerHTML=defs.map(a=>`<div class="achievement ${a.ok?"":"locked"}"><div class="achievement-icon">${a.icon}</div><h3>${a.title}</h3><p class="muted">${a.desc}</p><strong>${a.ok?"تم الفتح ✅":"مقفل 🔒"}</strong></div>`).join("")}
function renderSettings(){
  $("dailyGoal").value=state.settings.dailyGoal;$("focusMinutes").value=state.settings.focusMinutes;$("shortBreakMinutes").value=state.settings.shortBreak;$("longBreakMinutes").value=state.settings.longBreak
}
document.querySelectorAll(".nav-link").forEach(b=>b.addEventListener("click",()=>navigate(b.dataset.page)));
document.querySelectorAll("[data-jump]").forEach(b=>b.addEventListener("click",()=>navigate(b.dataset.jump)));
$("todayDate").textContent=new Date().toLocaleDateString("ar-JO",{weekday:"long",year:"numeric",month:"long",day:"numeric"});
$("themeToggle").onclick=()=>{state.settings.dark=!state.settings.dark;saveState();applyTheme()};
$("subjectForm").onsubmit=e=>{e.preventDefault();state.subjects.push({id:crypto.randomUUID(),name:$("subjectName").value.trim(),color:$("subjectColor").value,targetHours:Number($("subjectTarget").value)||0});e.target.reset();$("subjectColor").value="#7c5ce7";saveState();render();toast("تمت إضافة المادة")};
window.deleteSubject=id=>{if(!confirm("حذف المادة؟"))return;state.subjects=state.subjects.filter(s=>s.id!==id);saveState();render()};
$("taskForm").onsubmit=e=>{e.preventDefault();state.tasks.push({id:crypto.randomUUID(),title:$("taskTitle").value.trim(),subjectId:$("taskSubject").value,dueDate:$("taskDue").value,priority:$("taskPriority").value,completed:false});e.target.reset();saveState();render();toast("تمت إضافة المهمة")};
window.toggleTask=id=>{const t=state.tasks.find(x=>x.id===id);if(t)t.completed=!t.completed;saveState();render()};
window.deleteTask=id=>{state.tasks=state.tasks.filter(t=>t.id!==id);saveState();render()};
$("taskFilter").onchange=renderTasks;
$("eventForm").onsubmit=e=>{e.preventDefault();state.events.push({id:crypto.randomUUID(),title:$("eventTitle").value.trim(),date:$("eventDate").value,type:$("eventType").value});e.target.reset();saveState();renderPlanner();toast("تمت إضافة الموعد")};
window.deleteEvent=id=>{state.events=state.events.filter(e=>e.id!==id);saveState();renderPlanner()};
$("prevMonth").onclick=()=>{calendarDate.setMonth(calendarDate.getMonth()-1);renderPlanner()};$("nextMonth").onclick=()=>{calendarDate.setMonth(calendarDate.getMonth()+1);renderPlanner()};
$("profileForm").onsubmit=e=>{e.preventDefault();state.profile={name:$("profileName").value.trim(),major:$("profileMajor").value.trim(),university:$("profileUniversity").value.trim()};state.settings.dailyGoal=Math.max(10,Number($("dailyGoal").value)||120);saveState();render();toast("تم حفظ التغييرات")};
$("focusMinutes").onchange=e=>{state.settings.focusMinutes=Math.max(1,Number(e.target.value)||25);saveState();if(!timerRunning&&timerMode==="pomodoro")resetTimer(false)};
$("shortBreakMinutes").onchange=e=>{state.settings.shortBreak=Math.max(1,Number(e.target.value)||5);saveState()};
$("longBreakMinutes").onchange=e=>{state.settings.longBreak=Math.max(1,Number(e.target.value)||15);saveState()};
document.querySelectorAll(".tab").forEach(tab=>tab.onclick=()=>{if(timerRunning)return;document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));tab.classList.add("active");timerMode=tab.dataset.mode;resetTimer(false)});
$("startTimer").onclick=startTimer;$("pauseTimer").onclick=pauseTimer;$("resetTimer").onclick=()=>resetTimer(false);$("finishTimer").onclick=finishTimer;
$("clearSessions").onclick=()=>{if(confirm("مسح جميع الجلسات؟")){state.sessions=[];saveState();render()}};
function formatTimer(sec){const m=Math.floor(sec/60).toString().padStart(2,"0"),s=Math.floor(sec%60).toString().padStart(2,"0");return`${m}:${s}`}
function updateTimerDisplay(){$("timerDisplay").textContent=formatTimer(timerSeconds)}
function startTimer(){
  if(timerRunning)return;timerRunning=true;$("timerStatus").textContent="جلسة تركيز جارية...";
  if(timerMode==="stopwatch"&&!stopwatchStartedAt)stopwatchStartedAt=Date.now();
  timerInterval=setInterval(()=>{if(timerMode==="pomodoro"){timerSeconds--;if(timerSeconds<=0){saveSession(state.settings.focusMinutes*60,"pomodoro");toast("أحسنتِ! انتهت الجلسة");resetTimer(false)}}else timerSeconds=Math.floor((stopwatchBase+(Date.now()-stopwatchStartedAt))/1000);updateTimerDisplay()},250)
}
function pauseTimer(){if(!timerRunning)return;clearInterval(timerInterval);timerRunning=false;if(timerMode==="stopwatch"&&stopwatchStartedAt){stopwatchBase+=Date.now()-stopwatchStartedAt;stopwatchStartedAt=null}$("timerStatus").textContent="متوقف مؤقتًا"}
function finishTimer(){
  let sec=timerMode==="pomodoro"?state.settings.focusMinutes*60-timerSeconds:timerSeconds;
  if(timerMode==="stopwatch"&&timerRunning&&stopwatchStartedAt)sec=Math.floor((stopwatchBase+(Date.now()-stopwatchStartedAt))/1000);
  if(sec<1){toast("لا يوجد وقت لحفظه");return}saveSession(sec,timerMode);resetTimer(false);toast("تم حفظ الجلسة")
}
function resetTimer(){clearInterval(timerInterval);timerRunning=false;stopwatchBase=0;stopwatchStartedAt=null;timerSeconds=timerMode==="pomodoro"?state.settings.focusMinutes*60:0;$("timerStatus").textContent="جاهزة للتركيز";updateTimerDisplay()}
function saveSession(durationSeconds,type){state.sessions.push({id:crypto.randomUUID(),subjectId:$("timerSubject").value,taskId:$("timerTask").value,durationSeconds,type,endedAt:new Date().toISOString()});saveState();render()}
render();updateTimerDisplay();