
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import { Crown, Lock, Mail, Phone, User } from "lucide-react";

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("register");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (mode === "register") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
              phone: phone,
            },
          },
        });

        if (error) throw error;

      
if (data.session) {
  router.push("/");
  router.refresh();
} else {
  setMessage("An aika maka sabon email. Ka duba inbox domin tabbatar da account ɗinka.");
}



      
          
          
        
        
        
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        router.push("/");
        router.refresh();
      }
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "An samu kuskure. Ka sake gwadawa."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at top,#29200d,#090909 65%)",
      color: "#f7f3e9",
      display: "grid",
      placeItems: "center",
      padding: "24px",
      fontFamily: "Arial,sans-serif"
    }}>
      <section style={{
        width: "100%",
        maxWidth: "430px",
        background: "#11110f",
        border: "1px solid #705b2b",
        borderRadius: "20px",
        padding: "30px",
        boxShadow: "0 20px 60px #0009"
      }}>
        <div style={{textAlign:"center",marginBottom:"27px"}}>
          <div style={{
            width:"55px",height:"55px",margin:"auto auto 12px",
            display:"grid",placeItems:"center",borderRadius:"16px",
            background:"#342810",color:"#e6c56f"
          }}>
            <Crown size={28}/>
          </div>
          <h1 style={{color:"#f1d17c",fontSize:"25px",margin:"0 0 8px"}}>
            KING MK DATA
          </h1>
          <p style={{color:"#aaa18d",fontSize:"13px"}}>
            {mode === "register" ? "Create your customer account" : "Welcome back"}
          </p>
        </div>

        <div style={{display:"flex",gap:"10px",marginBottom:"22px"}}>
          <button type="button" onClick={()=>{setMode("register");setMessage("");}}
            style={tabStyle(mode==="register")}>Register</button>
          <button type="button" onClick={()=>{setMode("login");setMessage("");}}
            style={tabStyle(mode==="login")}>Login</button>
        </div>

        <form onSubmit={handleSubmit}>
          {mode === "register" && <>
            <Field icon={<User size={17}/>} placeholder="Full name"
              value={name} onChange={setName} required/>
            <Field icon={<Phone size={17}/>} placeholder="Phone number"
              value={phone} onChange={setPhone} required/>
          </>}

          <Field icon={<Mail size={17}/>} placeholder="Email address"
            type="email" value={email} onChange={setEmail} required/>
          <Field icon={<Lock size={17}/>} placeholder="Password"
            type="password" value={password} onChange={setPassword} required/>

          {message && <p role="status" style={{
            background:"#211b0e",border:"1px solid #705b2b",
            padding:"12px",borderRadius:"10px",color:"#f1d17c",
            fontSize:"12px",lineHeight:1.5
          }}>{message}</p>}

          <button disabled={loading} type="submit" style={{
            width:"100%",padding:"14px",marginTop:"12px",
            border:0,borderRadius:"10px",
            background:"linear-gradient(135deg,#f0d486,#b88a34)",
            color:"#171208",fontWeight:800,cursor:"pointer",
            opacity:loading?0.6:1
          }}>
            {loading ? "Please wait..." : mode==="register" ? "Create Account" : "Login"}
          </button>
        </form>

        <p style={{textAlign:"center",color:"#82785f",fontSize:"11px",marginTop:"22px"}}>
          Secure customer access · KING MK DATA
        </p>
      </section>
    </main>
  );
}

function tabStyle(active:boolean): React.CSSProperties {
  return {
    flex:1,padding:"11px",borderRadius:"9px",
    border:active?"1px solid #c6a14d":"1px solid #39301e",
    background:active?"#342810":"#15130e",
    color:active?"#f1d17c":"#aaa18d",
    fontWeight:700,cursor:"pointer"
  };
}

function Field({
  icon, placeholder, value, onChange, type="text", required=false
}:{
  icon:React.ReactNode;
  placeholder:string;
  value:string;
  onChange:(value:string)=>void;
  type?:string;
  required?:boolean;
}) {
  return (
    <label style={{
      display:"flex",alignItems:"center",gap:"10px",
      border:"1px solid #40351f",borderRadius:"10px",
      padding:"0 13px",marginBottom:"13px",
      background:"#090909",color:"#d2ad59"
    }}>
      {icon}
      <input type={type} placeholder={placeholder} value={value}
        onChange={e=>onChange(e.target.value)} required={required}
        style={{
          width:"100%",padding:"14px 0",border:0,outline:0,
          background:"transparent",color:"#f7f3e9",fontSize:"13px"
        }}/>
    </label>
  );
}
