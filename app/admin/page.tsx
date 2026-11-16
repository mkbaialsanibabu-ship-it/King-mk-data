"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    async function checkAdmin() {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/auth");
        return;
      }

      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .single();

      if (error || data?.role !== "admin") {
        router.replace("/");
        return;
      }

      setAllowed(true);
      setChecking(false);
    }

    checkAdmin();
  }, [router]);

  if (checking) {
    return <main style={{ background: "#080808", color: "#d4af37", minHeight: "100vh", padding: 30 }}>Ana tabbatar da izinin Admin...</main>;
  }

  if (!allowed) return null;

  return (
    <main style={{ background: "#080808", color: "white", minHeight: "100vh", padding: 24 }}>
      <h1 style={{ color: "#d4af37", fontSize: 30, fontWeight: "bold" }}>
        KING MK DATA
      </h1>
      <h2 style={{ marginTop: 20 }}>Admin Dashboard</h2>
      <p style={{ color: "#aaa", marginTop: 8 }}>
        Barka da zuwa shafin kula da tsarin KING MK DATA.
      </p>

      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginTop: 28 }}>
        {["Masu Amfani", "Data Plans", "Transactions", "Wallets", "Services", "Support Messages"].map((item) => (
          <div key={item} style={{ background: "#171717", border: "1px solid #80651c", borderRadius: 12, padding: 20 }}>
            <h3 style={{ color: "#d4af37", fontWeight: "bold" }}>{item}</h3>
            <p style={{ color: "#aaa", marginTop: 8, fontSize: 13 }}>Kula da {item.toLowerCase()}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
