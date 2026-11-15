"use client";

import { useState } from "react";

const networks = [
  { name: "MTN", color: "#ffcc00", text: "#171717" },
  { name: "Airtel", color: "#ed1c24", text: "#ffffff" },
  { name: "Glo", color: "#008b45", text: "#ffffff" },
  { name: "9mobile", color: "#006b3f", text: "#ffffff" },
];

const services = [
  { name: "Buy Data", icon: "📶", desc: "Buy affordable data bundles" },
  { name: "Buy Airtime", icon: "📱", desc: "Recharge any network" },
  { name: "Cable TV", icon: "📺", desc: "DStv, GOtv and Startimes" },
  { name: "Electricity", icon: "💡", desc: "Pay your electricity bills" },
];

export default function Home() {
  const [network, setNetwork] = useState("MTN");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("Buy Data");

  return (
    <main style={{
      minHeight: "100vh",
      background: "#f4f6fb",
      color: "#172033",
      fontFamily: "Arial, sans-serif",
      paddingBottom: 40
    }}>
      <header style={{
        background: "#071b35",
        color: "white",
        padding: "22px 18px",
        borderRadius: "0 0 24px 24px"
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <div>
            <h2 style={{ color: "#20d6a0", fontSize: 23 }}>
              KING MK DATA
            </h2>
            <p style={{ fontSize: 12, color: "#cbd5e1" }}>
              Your trusted VTU platform
            </p>
          </div>
          <div style={{
            background: "#173451",
            padding: 12,
            borderRadius: 14,
            fontSize: 24
          }}>👑</div>
        </div>

        <div style={{
          marginTop: 25,
          background: "#12304d",
          padding: 18,
          borderRadius: 17
        }}>
          <p style={{ color: "#cbd5e1", fontSize: 13 }}>
            Welcome to KING MK DATA
          </p>
          <h2 style={{ marginTop: 8 }}>Fast. Easy. Reliable.</h2>
          <p style={{ color: "#cbd5e1", marginTop: 8, fontSize: 13 }}>
            Data, airtime and bill payments in one place.
          </p>
        </div>
      </header>

      <section style={{ padding: 18 }}>
        <h3 style={{ marginBottom: 13 }}>Our Services</h3>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12
        }}>
          {services.map((item) => (
            <button
              key={item.name}
              onClick={() => setService(item.name)}
              style={{
                textAlign: "left",
                padding: 16,
                border: service === item.name
                  ? "2px solid #07966c"
                  : "1px solid #e2e8f0",
                borderRadius: 16,
                background: "white",
                cursor: "pointer"
              }}
            >
              <div style={{ fontSize: 27 }}>{item.icon}</div>
              <h4 style={{ marginTop: 10 }}>{item.name}</h4>
              <p style={{
                color: "#64748b",
                fontSize: 11,
                marginTop: 6
              }}>{item.desc}</p>
            </button>
          ))}
        </div>
      </section>

      <section style={{
        margin: "0 18px",
        background: "white",
        padding: 18,
        borderRadius: 18,
        boxShadow: "0 4px 18px #00000008"
      }}>
        <h3>Make a Purchase</h3>
        <p style={{
          color: "#64748b",
          fontSize: 13,
          marginTop: 6,
          marginBottom: 18
        }}>{service}</p>

        <label style={{ fontSize: 13, fontWeight: 600 }}>
          Select Network
        </label>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 7,
          marginTop: 10,
          marginBottom: 20
        }}>
          {networks.map((item) => (
            <button
              key={item.name}
              onClick={() => setNetwork(item.name)}
              style={{
                padding: "12px 3px",
                borderRadius: 10,
                border: network === item.name
                  ? "3px solid #071b35"
                  : "1px solid #e2e8f0",
                background: item.color,
                color: item.text,
                fontWeight: "bold",
                fontSize: 11
              }}
            >
              {item.name}
            </button>
          ))}
        </div>

        <label style={{ fontSize: 13, fontWeight: 600 }}>
          Phone Number
        </label>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter phone number"
          type="tel"
          maxLength={11}
          style={{
            width: "100%",
            padding: 14,
            border: "1px solid #cbd5e1",
            borderRadius: 10,
            marginTop: 9,
            marginBottom: 18,
            outlineColor: "#07966c"
          }}
        />

        <div style={{
          background: "#eafaf4",
          padding: 13,
          borderRadius: 10,
          color: "#087451",
          fontSize: 12
        }}>
          Selected service: {service}
          <br />
          Selected network: {network}
        </div>

        <button
          onClick={() => alert("Purchase will be enabled after supplier API integration.")}
          style={{
            width: "100%",
            padding: 15,
            marginTop: 18,
            border: "none",
            borderRadius: 11,
            background: "#07966c",
            color: "white",
            fontWeight: "bold",
            fontSize: 15
          }}
        >
          Continue
        </button>
      </section>

      <footer style={{
        textAlign: "center",
        padding: 25,
        color: "#64748b",
        fontSize: 12
      }}>
        © 2026 KING MK DATA. All rights reserved.
      </footer>
    </main>
  );
}
