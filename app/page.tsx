"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";
import {
  LayoutDashboard, Wallet, ArrowDownToLine, Smartphone, RadioTower,
  Tv, Lightbulb, History, UserRound, Headset, Settings, Bell,
  Eye, EyeOff, Menu, X, ChevronRight, Plus, ShieldCheck, LogOut,
  CreditCard, ArrowUpRight, CircleHelp, Crown
} from "lucide-react";

type Service = "data" | "airtime" | "tv" | "electricity";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "My Wallet", icon: Wallet },
  { label: "Fund Wallet", icon: ArrowDownToLine },
  { label: "Transactions", icon: History },
  { label: "Profile", icon: UserRound },
  { label: "Support", icon: Headset },
];

const services: { key: Service; title: string; detail: string; icon: typeof Smartphone }[] = [
  { key: "data", title: "Buy Data", detail: "Affordable data bundles", icon: Smartphone },
  { key: "airtime", title: "Buy Airtime", detail: "Instant airtime top-up", icon: RadioTower },
  { key: "tv", title: "Cable TV", detail: "DStv, GOtv & StarTimes", icon: Tv },
  { key: "electricity", title: "Electricity", detail: "Pay your power bills", icon: Lightbulb },
];

export default function Home() {
    const router = useRouter();

  useEffect(() => {
    let active = true;

    supabase.auth.getSession().then(({ data, error }) => {
      if (active && (error || !data.session)) {
        router.replace("/auth");
      }
    });

    const { data: { subscription } } =
      supabase.auth.onAuthStateChange((_event, session) => {
        if (!session) router.replace("/auth");
      });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [router]);const [balanceVisible, setBalanceVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("Dashboard");
  const [notice, setNotice] = useState("");

  function chooseService(service: Service) {
    const names: Record<Service, string> = {
      data: "Buy Data", airtime: "Buy Airtime", tv: "Cable TV", electricity: "Electricity",
    };
    setNotice(`${names[service]}: supplier integration is the next step. No payment has been made.`);
  }

  function selectNav(label: string) {
    setActive(label);
    setMenuOpen(false);
    if (label !== "Dashboard") setNotice(`${label} will be connected to your secure customer account in the next integration step.`);
    else setNotice("");
  }

  return (
    <main className="mk-shell">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Playfair+Display:wght@600;700;800&display=swap');
        *{box-sizing:border-box} body{margin:0;background:#090909;color:#f7f3e9;font-family:'DM Sans',sans-serif}
        button{font:inherit;cursor:pointer}.mk-shell{min-height:100vh;background:radial-gradient(ellipse at 80% 0%,#29200d 0%,#11100d 32%,#090909 72%);color:#f7f3e9}
        .mk-layout{max-width:1440px;margin:auto;display:grid;grid-template-columns:260px 1fr;min-height:100vh}
        .mk-side{border-right:1px solid #3a301b;padding:28px 18px;background:rgba(8,8,8,.78)}
        .mk-brand{display:flex;align-items:center;gap:12px;padding:5px 10px 30px;border-bottom:1px solid #342b19}
        .mk-crown{width:43px;height:43px;border:1px solid #c8a44d;border-radius:14px;display:grid;place-items:center;color:#e2bf69;background:linear-gradient(145deg,#30250d,#111)}
        .mk-brand strong{display:block;font-family:'Playfair Display',serif;letter-spacing:1.2px;font-size:17px}.mk-brand small{color:#b99b58;font-size:10px;letter-spacing:2.5px}
        .mk-navlabel{color:#82785f;font-size:10px;letter-spacing:2px;font-weight:800;padding:27px 12px 12px}
        .mk-nav{display:flex;align-items:center;gap:12px;width:100%;border:0;background:transparent;color:#aaa18d;padding:13px 14px;border-radius:12px;text-align:left;margin:3px 0;font-size:13px}
        .mk-nav.active,.mk-nav:hover{background:linear-gradient(90deg,#3b2d10,#211a0c);color:#f3d27b;box-shadow:inset 2px 0 #d4ad54}
        .mk-secure{margin:38px 5px 0;padding:15px;border:1px solid #42351c;border-radius:14px;background:#15120b;color:#bdb39e;font-size:11px;line-height:1.6}
        .mk-secure b{display:flex;align-items:center;gap:7px;color:#e6c66f;margin-bottom:5px}
        .mk-main{padding:27px 34px 50px;min-width:0}.mk-top{display:flex;align-items:center;justify-content:space-between;gap:14px;margin-bottom:35px}
        .mk-crumb{color:#a69a7d;font-size:12px}.mk-crumb b{color:#f1d17c;font-weight:600}.mk-topright{display:flex;align-items:center;gap:12px}
        .mk-iconbtn{width:40px;height:40px;border:1px solid #40351f;background:#15130e;color:#e8d8ad;border-radius:12px;display:grid;place-items:center}
        .mk-avatar{width:39px;height:39px;border-radius:50%;display:grid;place-items:center;background:linear-gradient(145deg,#e6c66f,#8b6725);color:#17120a;font-weight:800}
        .mk-welcome{display:flex;justify-content:space-between;align-items:end;gap:20px;margin-bottom:25px}.mk-eyebrow{color:#d2ad59;font-size:10px;letter-spacing:3px;font-weight:800;text-transform:uppercase}
        h1{font-family:'Playfair Display',serif;font-size:clamp(28px,4vw,39px);margin:7px 0 6px;font-weight:700;letter-spacing:.2px}.mk-sub{color:#a79e8a;font-size:13px}
        .mk-date{color:#b6a77f;font-size:12px;border:1px solid #40351f;border-radius:30px;padding:10px 14px;white-space:nowrap}
        .mk-balance{position:relative;overflow:hidden;border:1px solid #a9853d;border-radius:20px;padding:25px 27px;background:linear-gradient(115deg,#29200e 0%,#17140e 50%,#0e0e0c 100%);box-shadow:0 18px 50px #0008;margin-bottom:26px}
        .mk-balance:after{content:'♛';position:absolute;right:35px;top:-48px;font-size:210px;color:#d4b45d;opacity:.055;pointer-events:none}
        .mk-balancehead{display:flex;align-items:center;justify-content:space-between;position:relative;z-index:1}.mk-balancehead span{color:#d2c4a1;font-size:12px;letter-spacing:.5px}
        .mk-balancevalue{font-family:'Playfair Display',serif;font-size:clamp(32px,5vw,44px);font-weight:700;margin:13px 0 19px;position:relative;z-index:1;color:#f5d987}
        .mk-balanceactions{display:flex;gap:10px;position:relative;z-index:1;flex-wrap:wrap}.mk-goldbtn,.mk-darkbtn{border-radius:10px;padding:11px 16px;border:1px solid #c6a14d;font-weight:700;font-size:12px;display:inline-flex;align-items:center;gap:8px}
        .mk-goldbtn{background:linear-gradient(135deg,#f0d486,#b88a34);color:#171208}.mk-darkbtn{background:#17140e;color:#e8cf8c}
        .mk-sectionhead{display:flex;justify-content:space-between;align-items:center;margin:29px 0 14px}.mk-sectionhead h2{font-family:'Playfair Display',serif;font-size:20px;margin:0}.mk-sectionhead span{font-size:11px;color:#a99b79}
        .mk-services{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:13px}.mk-service{border:1px solid #3e331e;background:linear-gradient(150deg,#19160f,#10100e);border-radius:16px;padding:19px 15px;text-align:left;color:#f5efdf;transition:.2s;min-height:145px}
        .mk-service:hover{transform:translateY(-3px);border-color:#c6a14d;background:linear-gradient(150deg,#28200f,#12110d)}
        .mk-serviceicon{width:42px;height:42px;display:grid;place-items:center;border-radius:13px;background:#342810;color:#e6c56f;margin-bottom:14px}
        .mk-service strong{display:block;font-size:13px;margin-bottom:5px}.mk-service small{color:#9e957f;font-size:10px}
        .mk-lower{display:grid;grid-template-columns:1.35fr 1fr;gap:15px;margin-top:23px}.mk-panel{border:1px solid #39301e;border-radius:16px;background:#11110f;padding:19px}.mk-panel h3{font-family:'Playfair Display',serif;font-size:17px;margin:0 0 15px}
        .mk-empty{border:1px dashed #45391f;border-radius:12px;padding:23px;text-align:center;color:#968b72;font-size:12px;line-height:1.7}.mk-empty svg{color:#c6a14d;margin-bottom:6px}
        .mk-quickrow{display:flex;align-items:center;justify-content:space-between;padding:11px 0;border-bottom:1px solid #2a261d;font-size:12px;color:#bdb39e}.mk-quickrow:last-child{border:0}.mk-quickrow b{color:#e8d18e;font-size:11px}
        .mk-notice{margin:15px 0 0;border:1px solid #705b2b;background:#211b0e;color:#e8d18e;border-radius:11px;padding:12px 14px;font-size:12px;line-height:1.5}
        .mk-mobilemenu{display:none}.mk-footer{text-align:center;color:#766e5b;font-size:10px;margin-top:28px;letter-spacing:.5px}
        @media(max-width:900px){.mk-layout{grid-template-columns:1fr}.mk-side{display:none}.mk-main{padding:20px 18px 40px}.mk-services{grid-template-columns:repeat(2,minmax(0,1fr))}.mk-lower{grid-template-columns:1fr}.mk-mobilemenu{display:grid}.mk-welcome{align-items:start;flex-direction:column}.mk-date{display:none}}
        @media(max-width:420px){.mk-main{padding:17px 13px 32px}.mk-balance{padding:21px 18px}.mk-service{padding:15px 12px;min-height:135px}.mk-top{margin-bottom:27px}}
      `}</style>

      <div className="mk-layout">
        <aside className="mk-side">
          <div className="mk-brand"><div className="mk-crown"><Crown size={23}/></div><div><strong>KING MK DATA</strong><small>PREMIUM VTU SERVICES</small></div></div>
          <div className="mk-navlabel">MAIN MENU</div>
          {navItems.map(({label,icon:Icon})=><button key={label} className={`mk-nav ${active===label?'active':''}`} onClick={()=>selectNav(label)}><Icon size={17}/>{label}</button>)}
          <div className="mk-navlabel">PREFERENCES</div>
          <button className="mk-nav" onClick={()=>setNotice("Settings will be available when customer accounts are connected.")}><Settings size={17}/>Settings</button>
          <div className="mk-secure"><b><ShieldCheck size={15}/> Secure platform</b>Your account and transactions will be protected with verified payment and supplier connections.</div>
        </aside>

        <section className="mk-main">
          <header className="mk-top">
            <div className="mk-crumb"><span style={{color:'#d2ad59'}}>KING MK</span> / <b>{active}</b></div>
            <div className="mk-topright">
              <button className="mk-iconbtn mk-mobilemenu" aria-label="Open menu" onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen?<X size={18}/>:<Menu size={18}/>}</button>
              <button className="mk-iconbtn" aria-label="Notifications" onClick={()=>setNotice("You have no new notifications.")}><Bell size={17}/></button>
              <div className="mk-avatar">MK</div>
            </div>
          </header>
          {menuOpen && <div className="mk-panel" style={{marginBottom:18}}>{navItems.map(({label,icon:Icon})=><button key={label} className="mk-nav" onClick={()=>selectNav(label)}><Icon size={17}/>{label}</button>)}</div>}

          <div className="mk-welcome"><div><div className="mk-eyebrow">Welcome to your premium dashboard</div><h1>Good day, King.</h1><div className="mk-sub">Manage your wallet, airtime, data and bill payments in one place.</div></div><div className="mk-date">♛ &nbsp; KING MK DATA</div></div>

          <section className="mk-balance">
            <div className="mk-balancehead"><span>WALLET BALANCE</span><button className="mk-iconbtn" style={{width:34,height:34}} onClick={()=>setBalanceVisible(!balanceVisible)} aria-label="Toggle balance">{balanceVisible?<Eye size={16}/>:<EyeOff size={16}/>}</button></div>
            <div className="mk-balancevalue">{balanceVisible?"₦ --,--":"••••••••"}</div>
            <div style={{color:'#a99c7d',fontSize:11,marginTop:-12,marginBottom:18,position:'relative',zIndex:1}}>Your verified available balance</div>
            <div className="mk-balanceactions"><button className="mk-goldbtn" onClick={()=>setNotice("Fund Wallet will activate after PayVessel virtual account and webhook verification are connected.")}><Plus size={15}/> Fund Wallet</button><button className="mk-darkbtn" onClick={()=>setNotice("Wallet statement will appear here after secure customer login is connected.")}><CreditCard size={15}/> Wallet Statement</button></div>
          </section>

          <div className="mk-sectionhead"><h2>Our Services</h2><span>Choose a service to continue</span></div>
          <section className="mk-services">
            {services.map(({key,title,detail,icon:Icon})=><button className="mk-service" key={key} onClick={()=>chooseService(key)}><span className="mk-serviceicon"><Icon size={21}/></span><strong>{title}</strong><small>{detail}</small></button>)}
          </section>

          <div className="mk-lower">
            <section className="mk-panel"><h3>Recent Transactions</h3><div className="mk-empty"><History size={23}/><br/>No transactions to display yet.<br/>Your verified transactions will appear here.</div></section>
            <section className="mk-panel"><h3>Account Overview</h3><div className="mk-quickrow"><span>Account status</span><b>Setup pending</b></div><div className="mk-quickrow"><span>Wallet funding</span><b>PayVessel pending</b></div><div className="mk-quickrow"><span>VTU supplier</span><b>Bilal Sada Sub pending</b></div><div className="mk-quickrow"><span>Customer support</span><b>Coming soon</b></div><button className="mk-darkbtn" style={{marginTop:15,width:'100%',justifyContent:'center'}} onClick={()=>setNotice("Support will be connected to the KING MK DATA customer-care channel.")}><CircleHelp size={15}/> Get Help</button></section>
          </div>
          {notice && <div className="mk-notice" role="status">{notice}</div>}
          <div className="mk-footer">© {new Date().getFullYear()} KING MK DATA · PREMIUM DIGITAL SERVICES</div>
        </section>
      </div>
    </main>
  );
}

