import { useEffect } from "react";
import { db } from "../firebase/config.js";
import { collection, addDoc } from "firebase/firestore";

export default function VisitorTracker() {

  useEffect(() => {
    const alreadyTracked = sessionStorage.getItem("tracked");

    if (alreadyTracked) return;

    const trackVisitor = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();

        await addDoc(collection(db, "visitors"), {
          ip: data.ip || "unknown",
          city: data.city || "unknown",
          country: data.country_name || "unknown",
          device: navigator.userAgent,
          browser:data.browser,
          time: new Date()
        });

        sessionStorage.setItem("tracked", "true");

      } catch (err) {
        console.log(err);
      }
    };

    trackVisitor();
  }, []);

  return null; // 👈 nothing visible to user
}

