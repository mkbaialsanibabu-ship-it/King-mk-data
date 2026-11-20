
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Tab =
  | "customers"
  | "wallets"
  | "transactions"
  | "plans"
  | "services"
  | "support";

const tabs: { id: Tab; label: string }[] = [
  { id: "customers", label: "Customers" },
  { id: "wallets", label: "Wallets" },
  { id: "transactions", label: "Transactions" },
  { id: "plans", label: "Data Plans" },
  { id: "services", label: "Services" },
  { id: "support", label: "Support" },
];

const tables: Record<Tab, string> = {
  customers: "profile",
  wallets: "wallets",
  transactions: "transactions",
  plans: "data_plans",
  services: "services",
  support: "support_messages",
};

export default function AdminPage() {
  const router = useRouter();

  const [checking, setChecking] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [tab, setTab] = useState<Tab>("customers");
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function checkAdmin() {
      try {
        const { data: { user }, error } =
          await supabase.auth.getUser();

        if (error || !user) {
          router.replace("/auth");
          return;
        }

        const { data, error: roleError } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", user.id)
          .single();

        if (
          roleError ||
          data?.role?.trim().toLowerCase() !== "admin"
        ) {
          setMessage(
            "Admin verification failed: " +
            (roleError?.message || "Role is not admin")
          );
          setChecking(false);
          return;
        }

        setAuthorized(true);
        setChecking(false);
      } catch {
        setMessage("An error occurred while checking admin access.");
        setChecking(false);
      }
    }

    checkAdmin();
  }, [router]);

  useEffect(() => {
    if (authorized) {
      loadData();
    }
  }, [tab, authorized]);

  async function loadData() {
    setLoading(true);
    setMessage("");

    try {
      const { data, error } = await supabase
        .from(tables[tab])
        .select("*")
        .order(
          tab === "customers" ? "Created at" : "created_at",
          { ascending: false }
        )
        .limit(100);

      if (error) {
        setRows([]);
        setMessage(error.message);
      } else {
        setRows(data || []);

        if (!data?.length) {
          setMessage("No records found in this section yet.");
        }
      }
    } catch {
      setRows([]);
      setMessage("Unable to load data.");
    } finally {
      setLoading(false);
    }
  }

  if (checking) {
    return (
      <main style={{
        background: "#080808",
        color: "#d4af37",
        minHeight: "100vh",
        padding: 30
      }}>
        Checking Admin permission...
      </main>
    );
  }

  if (!authorized) {
    return (
      <main style={{
        background: "#080808",
        color: "white",
        minHeight: "100vh",
        padding: 30
      }}>
        <h2 style={{ color: "#d4af37" }}>
          KING MK DATA
        </h2>
        <h3>Admin Access Error</h3>
        <p style={{ color: "#ffaaaa", marginTop: 15 }}>
          {message}
        </p>
        <button
          onClick={() => router.replace("/")}
          style={{
            marginTop: 20,
            padding: 12,
            background: "#d4af37",
            borderRadius: 8
          }}
        >
          Back to Dashboard
        </button>
      </main>
    );
  }

  return (
    <main style={{
      background: "#080808",
      color: "white",
      minHeight: "100vh",
      padding: 20
    }}>
      <h1 style={{
        color: "#d4af37",
        fontSize: 28,
        fontWeight: "bold"
      }}>
        KING MK DATA
      </h1>

      <h2 style={{ marginTop: 12, fontSize: 23 }}>
        Admin Dashboard
      </h2>

      <p style={{ color: "#aaa", marginTop: 8 }}>
        Gudanar da ainihin bayanan kasuwancinka.
      </p>

      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 8,
        marginTop: 25
      }}>
        {tabs.map((item) => (
          <button
            key={item.id}
            onClick={() => setTab(item.id)}
            style={{
              padding: "11px 14px",
              borderRadius: 8,
              border: "1px solid #80651c",
              background: tab === item.id ? "#d4af37" : "#171717",
              color: tab === item.id ? "#080808" : "white",
              fontWeight: "bold"
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      <section style={{
        background: "#171717",
        border: "1px solid #80651c",
        borderRadius: 12,
        padding: 16,
        marginTop: 24
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 10
        }}>
          <h3 style={{ color: "#d4af37", fontSize: 19 }}>
            {tabs.find((item) => item.id === tab)?.label}
          </h3>

          <button
            onClick={loadData}
            style={{
              background: "#d4af37",
              color: "#080808",
              padding: "9px 13px",
              borderRadius: 7,
              fontWeight: "bold"
            }}
          >
            Refresh
          </button>
        </div>

        {loading && (
          <p style={{ color: "#d4af37", marginTop: 20 }}>
            Ana ɗauko bayanai...
          </p>
        )}

        {message && !loading && (
          <p style={{ color: "#aaa", marginTop: 20 }}>
            {message}
          </p>
        )}

        {!loading && rows.length > 0 && (
          <>
            <p style={{ color: "#aaa", marginTop: 15 }}>
              An samo {rows.length} bayanai (har zuwa 100).
            </p>

            <div style={{
              overflowX: "auto",
              marginTop: 15
            }}>
              <table style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: 13
              }}>
                <thead>
                  <tr>
                    {Object.keys(rows[0]).map((key) => (
                      <th key={key} style={{
                        padding: 10,
                        textAlign: "left",
                        color: "#d4af37",
                        borderBottom: "1px solid #80651c"
                      }}>
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {rows.map((row, index) => (
                    <tr key={row.id || row.user_id || index}>
                      {Object.keys(rows[0]).map((key) => (
                        <td key={key} style={{
                          padding: 10,
                          borderBottom: "1px solid #333",
                          color: "#eee",
                          maxWidth: 220,
                          wordBreak: "break-word"
                        }}>
                          {row[key] === null
                            ? "—"
                            : typeof row[key] === "object"
                            ? JSON.stringify(row[key])
                            : String(row[key])}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </section>

      <button
        onClick={async () => {
          await supabase.auth.signOut();
          router.replace("/auth");
        }}
        style={{
          marginTop: 25,
          padding: 12,
          background: "#292020",
          color: "#ffaaaa",
          borderRadius: 8
        }}
      >
        Logout
      </button>
    </main>
  );
}

