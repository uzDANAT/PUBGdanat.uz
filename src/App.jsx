import { useState } from "react";

const initStore = () => ({
  users: [],
  orders: [],
  packages: [
    { id:1, uc:60,   bonus:0,    price:15000,   popular:false },
    { id:2, uc:325,  bonus:0,    price:72000,   popular:false },
    { id:3, uc:660,  bonus:60,   price:140000,  popular:true  },
    { id:4, uc:1800, bonus:300,  price:370000,  popular:false },
    { id:5, uc:3850, bonus:750,  price:770000,  popular:false },
    { id:6, uc:8100, bonus:1800, price:1550000, popular:false },
  ],
  settings: {
    adminLogin: "admin",
    adminPassword: "admin123",
    cards: [],
    telegram: "@yourname",
    announcement: "🎉 Tez va xavfsiz xizmat!",
  },
});

const G = `
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Nunito:wght@400;500;600;700&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Nunito',sans-serif;background:#07090f;color:#dde6ff;min-height:100vh}
::-webkit-scrollbar{width:5px}::-webkit-scrollbar-thumb{background:#f59e0b;border-radius:4px}
.app{min-height:100vh;background:#07090f}
.nb{display:flex;align-items:center;justify-content:space-between;padding:14px 28px;background:#0b0f1c;border-bottom:1px solid rgba(245,158,11,.25);position:sticky;top:0;z-index:100}
.logo{font-family:'Rajdhani',sans-serif;font-size:22px;font-weight:700;color:#f59e0b;letter-spacing:2px}
.logo em{color:#fff;font-style:normal}
.nbtns{display:flex;gap:8px;align-items:center;flex-wrap:wrap}
.nbtn{background:none;border:1px solid rgba(245,158,11,.35);color:#f59e0b;padding:7px 14px;border-radius:5px;cursor:pointer;font-size:13px;font-family:'Nunito',sans-serif;font-weight:600;display:flex;align-items:center;gap:5px;transition:.2s}
.nbtn:hover{background:rgba(245,158,11,.12);border-color:#f59e0b}
.nbtn.filled{background:rgba(245,158,11,.15)}
.ann{background:linear-gradient(90deg,rgba(245,158,11,.15),rgba(245,158,11,.05));border-bottom:1px solid rgba(245,158,11,.2);padding:10px 28px;font-size:13px;color:#fcd34d;text-align:center}
.hero{text-align:center;padding:50px 20px 30px}
.hero h1{font-family:'Rajdhani',sans-serif;font-size:clamp(32px,5vw,58px);font-weight:700;line-height:1.1;margin-bottom:12px}
.hero h1 .gold{color:#f59e0b;text-shadow:0 0 25px rgba(245,158,11,.4)}
.hero p{color:#7a8aaa;font-size:15px;max-width:460px;margin:0 auto}
.shop-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:18px;max-width:1100px;margin:32px auto;padding:0 24px 60px}
.pcard{background:linear-gradient(145deg,#0f1726,#0b0f1c);border:1px solid rgba(245,158,11,.18);border-radius:14px;padding:24px 20px;position:relative;overflow:hidden;transition:.3s;cursor:pointer}
.pcard::after{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,rgba(245,158,11,.4),transparent);opacity:0;transition:.3s}
.pcard:hover{border-color:rgba(245,158,11,.6);transform:translateY(-3px);box-shadow:0 10px 35px rgba(245,158,11,.12)}
.pcard:hover::after{opacity:1}
.pcard.pop{border-color:rgba(245,158,11,.45)}
.pop-badge{position:absolute;top:10px;right:10px;background:#f59e0b;color:#07090f;font-size:10px;font-weight:800;padding:2px 8px;border-radius:20px;letter-spacing:.8px}
.uc-num{font-family:'Rajdhani',sans-serif;font-size:40px;font-weight:700;color:#f59e0b;line-height:1}
.uc-lbl{font-size:12px;color:#5a6a88;margin-bottom:2px;font-weight:600;letter-spacing:.5px;text-transform:uppercase}
.bonus{color:#34d399;font-size:12px;font-weight:600;margin-top:3px;min-height:16px}
.prc{font-size:20px;font-weight:700;color:#fff;margin:14px 0 16px}
.prc small{font-size:12px;color:#5a6a88;font-weight:400}
.buybtn{width:100%;background:linear-gradient(135deg,#f59e0b,#d97706);color:#07090f;border:none;padding:11px;border-radius:7px;font-weight:800;font-size:14px;cursor:pointer;font-family:'Nunito',sans-serif;transition:.2s;letter-spacing:.3px}
.buybtn:hover{box-shadow:0 4px 18px rgba(245,158,11,.4);transform:scale(1.02)}
.mbg{position:fixed;inset:0;background:rgba(0,0,0,.85);backdrop-filter:blur(5px);display:flex;align-items:center;justify-content:center;z-index:200;padding:16px}
.modal{background:linear-gradient(145deg,#0f1726,#0b0f1c);border:1px solid rgba(245,158,11,.3);border-radius:16px;padding:32px;width:100%;max-width:420px;position:relative;max-height:90vh;overflow-y:auto}
.modal h2{font-family:'Rajdhani',sans-serif;font-size:24px;font-weight:700;color:#f59e0b;margin-bottom:22px;text-align:center}
.tabs{display:flex;border:1px solid rgba(245,158,11,.2);border-radius:6px;overflow:hidden;margin-bottom:20px}
.tab{flex:1;background:none;border:none;color:#7a8aaa;padding:9px;cursor:pointer;font-family:'Nunito',sans-serif;font-weight:700;font-size:13px;transition:.2s}
.tab.on{background:rgba(245,158,11,.15);color:#f59e0b}
.fld{margin-bottom:15px}
.fld label{display:block;font-size:12px;color:#7a8aaa;margin-bottom:5px;font-weight:700;text-transform:uppercase;letter-spacing:.4px}
.fld input,.fld select,.fld textarea{width:100%;background:rgba(255,255,255,.04);border:1px solid rgba(245,158,11,.18);color:#dde6ff;padding:10px 13px;border-radius:6px;font-family:'Nunito',sans-serif;font-size:14px;outline:none;transition:.2s;resize:vertical}
.fld input:focus,.fld select:focus,.fld textarea:focus{border-color:#f59e0b;background:rgba(245,158,11,.05)}
.fld select option{background:#0f1726}
.sbtn{width:100%;background:linear-gradient(135deg,#f59e0b,#d97706);color:#07090f;border:none;padding:13px;border-radius:7px;font-weight:800;font-size:15px;cursor:pointer;margin-top:6px;font-family:'Nunito',sans-serif;transition:.2s}
.sbtn:hover{box-shadow:0 4px 18px rgba(245,158,11,.4)}
.clsbtn{position:absolute;top:14px;right:14px;background:none;border:none;color:#5a6a88;cursor:pointer;font-size:20px;line-height:1;padding:4px;transition:.2s}
.clsbtn:hover{color:#fff}
.err{color:#f87171;font-size:13px;text-align:center;margin-top:8px}
.suc{color:#34d399;font-size:13px;text-align:center;margin-top:8px}
.paybox{background:rgba(245,158,11,.06);border:1px solid rgba(245,158,11,.2);border-radius:10px;padding:16px;margin:14px 0;font-size:14px;line-height:1.8}
.paybox b{color:#f59e0b}
.cnum{font-family:'Rajdhani',sans-serif;font-size:17px;letter-spacing:1px;color:#fff;display:flex;align-items:center;justify-content:space-between;margin:4px 0}
.copybtn{background:none;border:1px solid rgba(245,158,11,.3);color:#f59e0b;padding:3px 8px;border-radius:4px;cursor:pointer;font-size:11px;font-family:'Nunito',sans-serif;transition:.2s}
.copybtn:hover{background:rgba(245,158,11,.15)}
.adwrap{max-width:1100px;margin:0 auto;padding:28px 20px}
.adtabs{display:flex;gap:6px;margin-bottom:24px;flex-wrap:wrap}
.atab{background:#0f1726;border:1px solid rgba(245,158,11,.18);color:#7a8aaa;padding:9px 18px;border-radius:6px;cursor:pointer;font-family:'Nunito',sans-serif;font-weight:700;font-size:13px;transition:.2s}
.atab.on{background:rgba(245,158,11,.15);border-color:#f59e0b;color:#f59e0b}
.sec-title{font-family:'Rajdhani',sans-serif;font-size:20px;font-weight:700;color:#f59e0b;margin-bottom:18px;display:flex;align-items:center;justify-content:space-between}
.stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:14px;margin-bottom:24px}
.stat{background:#0f1726;border:1px solid rgba(245,158,11,.18);border-radius:10px;padding:18px}
.stat-v{font-family:'Rajdhani',sans-serif;font-size:30px;font-weight:700;color:#f59e0b}
.stat-l{font-size:12px;color:#5a6a88;margin-top:3px;font-weight:600}
table{width:100%;border-collapse:collapse;background:#0b0f1c;border-radius:10px;overflow:hidden;font-size:13px}
th{background:rgba(245,158,11,.1);color:#f59e0b;padding:11px 14px;text-align:left;font-weight:700;font-size:12px;text-transform:uppercase;letter-spacing:.4px;border-bottom:1px solid rgba(245,158,11,.12)}
td{padding:11px 14px;border-bottom:1px solid rgba(255,255,255,.03);color:#c0cfeb}
tr:last-child td{border-bottom:none}
tr:hover td{background:rgba(245,158,11,.02)}
.badge{padding:3px 9px;border-radius:20px;font-size:11px;font-weight:700}
.b-pend{background:rgba(251,191,36,.12);color:#fbbf24}
.b-done{background:rgba(52,211,153,.12);color:#34d399}
.b-rej{background:rgba(248,113,113,.12);color:#f87171}
.abtn{border:1px solid;padding:4px 9px;border-radius:4px;cursor:pointer;font-size:11px;font-weight:700;display:inline-flex;align-items:center;gap:3px;transition:.2s;background:none;font-family:'Nunito',sans-serif}
.ab-ok{border-color:rgba(52,211,153,.4);color:#34d399}.ab-ok:hover{background:rgba(52,211,153,.08)}
.ab-no{border-color:rgba(248,113,113,.4);color:#f87171}.ab-no:hover{background:rgba(248,113,113,.08)}
.ab-ed{border-color:rgba(245,158,11,.4);color:#f59e0b}.ab-ed:hover{background:rgba(245,158,11,.08)}
.ab-del{border-color:rgba(248,113,113,.3);color:#f87171}.ab-del:hover{background:rgba(248,113,113,.06)}
.ab-add{display:flex;align-items:center;gap:5px;background:rgba(245,158,11,.1);border:1px solid rgba(245,158,11,.3);color:#f59e0b;padding:8px 14px;border-radius:6px;cursor:pointer;font-family:'Nunito',sans-serif;font-weight:700;font-size:13px;transition:.2s}
.ab-add:hover{background:rgba(245,158,11,.2)}
.ptbl{display:grid;gap:12px}
.prow{background:#0f1726;border:1px solid rgba(245,158,11,.15);border-radius:10px;padding:16px 20px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px}
.prow-uc{font-family:'Rajdhani',sans-serif;font-size:22px;font-weight:700;color:#f59e0b}
.prow-meta{font-size:13px;color:#7a8aaa}
.crd-row{background:#0f1726;border:1px solid rgba(245,158,11,.15);border-radius:10px;padding:16px 20px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;margin-bottom:10px}
.crd-num{font-family:'Rajdhani',sans-serif;font-size:20px;letter-spacing:1px;color:#fff}
.crd-meta{font-size:12px;color:#7a8aaa;margin-top:2px}
.sbox{background:#0f1726;border:1px solid rgba(245,158,11,.15);border-radius:10px;padding:22px;margin-bottom:18px}
.sbox-title{font-size:14px;font-weight:700;color:#f59e0b;margin-bottom:16px;text-transform:uppercase;letter-spacing:.5px}
.ordwrap{max-width:900px;margin:0 auto;padding:28px 20px}
.empty{text-align:center;color:#5a6a88;padding:48px;font-size:15px}
.utag{background:rgba(245,158,11,.1);border:1px solid rgba(245,158,11,.25);padding:4px 12px;border-radius:20px;color:#f59e0b;font-size:12px;font-weight:700}
.acts{display:flex;gap:5px;flex-wrap:wrap}
@media(max-width:580px){.nb{padding:12px 14px}.modal{padding:22px 16px}.adwrap{padding:16px 12px}}
`;

const uid = () => Date.now() + Math.floor(Math.random()*9999);
const fmt = n => Number(n).toLocaleString("uz-UZ");
const copy = t => navigator.clipboard?.writeText(t);

export default function App() {
  const [S, setS] = useState(initStore);
  const [session, setSession] = useState(null);
  const [modal, setModal] = useState(null);
  const [page, setPage] = useState("shop");
  const [adminTab, setAdminTab] = useState("orders");
  const [form, setForm] = useState({});
  const [err, setErr] = useState("");
  const [suc, setSuc] = useState("");
  const [editTarget, setEditTarget] = useState(null);
  const [buyPkg, setBuyPkg] = useState(null);
  const [copied, setCopied] = useState("");

  const upd = fn => setS(prev => { const n={...prev,settings:{...prev.settings},packages:[...prev.packages],users:[...prev.users],orders:[...prev.orders]}; fn(n); return n; });
  const openModal = (m,extra={}) => { setModal(m); setErr(""); setSuc(""); setForm(extra); setEditTarget(null); };
  const closeModal = () => { setModal(null); setErr(""); setSuc(""); setEditTarget(null); setBuyPkg(null); };
  const fld = (k,v) => setForm(f=>({...f,[k]:v}));
  const doCopy = (t,k) => { copy(t); setCopied(k); setTimeout(()=>setCopied(""),1500); };

  const doLogin = () => {
    if(form.u===S.settings.adminLogin && form.p===S.settings.adminPassword){
      setSession({type:"admin",username:"admin"}); setPage("admin"); closeModal(); return;
    }
    const u=S.users.find(u=>u.username===form.u&&u.password===form.p);
    if(!u){setErr("Login yoki parol noto'g'ri!");return;}
    setSession({type:"user",...u}); closeModal();
  };

  const doRegister = () => {
    if(!form.u||!form.p||!form.pid){setErr("Barcha maydonlar to'ldirilsin!");return;}
    if(form.p.length<6){setErr("Parol kamida 6 belgi!");return;}
    if(S.users.find(u=>u.username===form.u)){setErr("Bu username band!");return;}
    const nu={id:uid(),username:form.u,password:form.p,pubgId:form.pid,createdAt:new Date().toLocaleDateString("uz-UZ")};
    upd(s=>{s.users=[...s.users,nu];});
    setSession({type:"user",...nu});
    setSuc("✅ Muvaffaqiyatli!"); setTimeout(closeModal,900);
  };

  const doBuy = () => {
    if(!form.proof){setErr("To'lov isbotini kiriting!");return;}
    const ord={id:uid(),userId:session.id,username:session.username,pubgId:session.pubgId,pkg:buyPkg,proof:form.proof,status:"pending",date:new Date().toLocaleString("uz-UZ")};
    upd(s=>{s.orders=[...s.orders,ord];});
    setSuc("📨 Buyurtma yuborildi!"); setTimeout(closeModal,1100);
  };

  const setStatus = (id,status) => upd(s=>{s.orders=s.orders.map(o=>o.id===id?{...o,status}:o);});

  const savePkg = () => {
    if(!form.uc||!form.price){setErr("UC va narx majburiy!");return;}
    const pkg={uc:+form.uc,bonus:+(form.bonus||0),price:+form.price,popular:form.pop==="1"};
    if(editTarget) upd(s=>{s.packages=s.packages.map(p=>p.id===editTarget.id?{...pkg,id:editTarget.id}:p);});
    else upd(s=>{s.packages=[...s.packages,{...pkg,id:uid()}];});
    closeModal();
  };

  const delPkg = id => { if(confirm("O'chirasizmi?")) upd(s=>{s.packages=s.packages.filter(p=>p.id!==id);}); };

  const saveCard = () => {
    if(!form.bank||!form.num||!form.owner){setErr("Barcha maydonlar to'ldirilsin!");return;}
    const card={bank:form.bank,number:form.num,owner:form.owner};
    if(editTarget) upd(s=>{s.settings={...s.settings,cards:s.settings.cards.map(c=>c.id===editTarget.id?{...card,id:editTarget.id}:c)};});
    else upd(s=>{s.settings={...s.settings,cards:[...s.settings.cards,{...card,id:uid()}]};});
    closeModal();
  };

  const delCard = id => { if(confirm("Kartani o'chirasizmi?")) upd(s=>{s.settings={...s.settings,cards:s.settings.cards.filter(c=>c.id!==id)};}); };
  const delUser = id => { if(confirm("O'chirasizmi?")) upd(s=>{s.users=s.users.filter(u=>u.id!==id);}); };

  const saveSettings = () => {
    if(!form.al||!form.ap){setErr("Login va parol majburiy!");return;}
    upd(s=>{s.settings={...s.settings,adminLogin:form.al,adminPassword:form.ap,telegram:form.tg||s.settings.telegram,announcement:form.ann||s.settings.announcement};});
    setSuc("✅ Saqlandi!"); setTimeout(()=>setSuc(""),1200);
  };

  const myOrders=S.orders.filter(o=>o.userId===session?.id);
  const pendCount=S.orders.filter(o=>o.status==="pending").length;
  const revenue=S.orders.filter(o=>o.status==="done").reduce((a,o)=>a+o.pkg.price,0);
  const statusLabel=s=>s==="pending"?"⏳ Kutilmoqda":s==="done"?"✅ Tasdiqlandi":"❌ Rad etildi";
  const statusCls=s=>s==="pending"?"b-pend":s==="done"?"b-done":"b-rej";

  return (<>
    <style>{G}</style>
    <div className="app">
      <nav className="nb">
        <div className="logo">🎮 <em>OTAW</em> UC SHOP</div>
        <div className="nbtns">
          {session?(<>
            <span className="utag">👤 {session.username}</span>
            {session.type==="user"&&<button className="nbtn filled" onClick={()=>setPage(p=>p==="myorders"?"shop":"myorders")}>📋 Buyurtmalarim</button>}
            {session.type==="admin"&&<button className="nbtn filled" onClick={()=>setPage(p=>p==="admin"?"shop":"admin")}>🛡 Admin</button>}
            <button className="nbtn" onClick={()=>{setSession(null);setPage("shop");}}>Chiqish</button>
          </>):(<>
            <button className="nbtn" onClick={()=>openModal("auth")}>Kirish</button>
            <button className="nbtn filled" onClick={()=>openModal("reg")}>Ro'yxatdan o'tish</button>
          </>)}
        </div>
      </nav>

      {S.settings.announcement&&<div className="ann">{S.settings.announcement}</div>}

      {page==="shop"&&<>
        <div className="hero">
          <h1>PUBG UC <span className="gold">arzon</span> va tez!</h1>
          <p>Ro'yxatdan o'ting, paket tanlang, to'lovni tasdiqlating!</p>
        </div>
        <div className="shop-grid">
          {S.packages.map(pkg=>(
            <div key={pkg.id} className={`pcard${pkg.popular?" pop":""}`}
              onClick={()=>{if(!session){openModal("auth");return;}setBuyPkg(pkg);openModal("buy");}}>
              {pkg.popular&&<div className="pop-badge">🔥 TOP</div>}
              <div className="uc-lbl">UC miqdori</div>
              <div className="uc-num">{fmt(pkg.uc)}</div>
              <div className="bonus">{pkg.bonus>0?`+${fmt(pkg.bonus)} bonus UC`:""}</div>
              <div className="prc">{fmt(pkg.price)} <small>so'm</small></div>
              <button className="buybtn">💎 Sotib olish</button>
            </div>
          ))}
        </div>
      </>}

      {page==="myorders"&&session?.type==="user"&&(
        <div className="ordwrap">
          <div className="sec-title">📋 Mening buyurtmalarim</div>
          {myOrders.length===0?<div className="empty">Hali buyurtma yo'q.</div>:(
            <table><thead><tr><th>Paket</th><th>Narx</th><th>Sana</th><th>Holat</th></tr></thead>
            <tbody>{[...myOrders].reverse().map(o=>(
              <tr key={o.id}>
                <td><b>{fmt(o.pkg.uc)} UC</b>{o.pkg.bonus>0&&<span style={{color:"#34d399",fontSize:11}}> +{fmt(o.pkg.bonus)}</span>}</td>
                <td>{fmt(o.pkg.price)} so'm</td>
                <td style={{color:"#5a6a88",fontSize:12}}>{o.date}</td>
                <td><span className={`badge ${statusCls(o.status)}`}>{statusLabel(o.status)}</span></td>
              </tr>
            ))}</tbody></table>
          )}
        </div>
      )}

      {page==="admin"&&session?.type==="admin"&&(
        <div className="adwrap">
          <div className="sec-title">🛡 Admin Panel — OTAW UC SHOP</div>
          <div className="stats">
            <div className="stat"><div className="stat-v">{S.users.length}</div><div className="stat-l">👤 Foydalanuvchilar</div></div>
            <div className="stat"><div className="stat-v">{S.orders.length}</div><div className="stat-l">📦 Buyurtmalar</div></div>
            <div className="stat"><div className="stat-v" style={{color:"#fbbf24"}}>{pendCount}</div><div className="stat-l">⏳ Kutilmoqda</div></div>
            <div className="stat"><div className="stat-v" style={{color:"#34d399"}}>{fmt(revenue)}</div><div className="stat-l">💰 Daromad</div></div>
          </div>
          <div className="adtabs">
            {[["orders","📦 Buyurtmalar"],["packages","💎 Paketlar"],["cards","💳 Kartalar"],["users","👥 Foydalanuvchilar"],["settings","⚙️ Sozlamalar"]].map(([k,v])=>(
              <button key={k} className={`atab${adminTab===k?" on":""}`} onClick={()=>setAdminTab(k)}>{v}</button>
            ))}
          </div>

          {adminTab==="orders"&&<>
            <div className="sec-title"><span>Buyurtmalar</span></div>
            {S.orders.length===0?<div className="empty">Hali buyurtma yo'q</div>:(
              <table><thead><tr><th>Foydalanuvchi</th><th>PUBG ID</th><th>Paket</th><th>Narx</th><th>Isboti</th><th>Sana</th><th>Holat</th><th>Amal</th></tr></thead>
              <tbody>{[...S.orders].reverse().map(o=>(
                <tr key={o.id}>
                  <td>{o.username}</td>
                  <td style={{color:"#f59e0b",fontWeight:700}}>{o.pubgId}</td>
                  <td><b>{fmt(o.pkg.uc)} UC</b></td>
                  <td>{fmt(o.pkg.price)}</td>
                  <td style={{maxWidth:120,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",fontSize:12}}>{o.proof}</td>
                  <td style={{color:"#5a6a88",fontSize:12}}>{o.date}</td>
                  <td><span className={`badge ${statusCls(o.status)}`}>{statusLabel(o.status)}</span></td>
                  <td>{o.status==="pending"&&<
