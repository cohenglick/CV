<!DOCTYPE html>
<html lang="he" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>מחולל קודי גישה</title>
<style>body{font-family:Arial,sans-serif;max-width:720px;margin:20px auto;padding:0 14px;line-height:1.5}label{display:block;margin:12px 0 4px;font-size:14px;color:#444}input,textarea{width:100%;padding:8px;font:inherit;border:1px solid #ccc;border-radius:8px;box-sizing:border-box}textarea{min-height:110px;direction:ltr}button{padding:9px 16px;margin:6px 6px 0 0;border:0;border-radius:8px;background:#2563eb;color:#fff;font:inherit;cursor:pointer}.s{background:#e5e7eb;color:#222}.w{background:#fef3c7;border:1px solid #f59e0b;padding:10px;border-radius:8px;font-size:14px}</style></head>
<body>
<h1>מחולל קודי גישה</h1>
<p class="w">⚠ קובץ זה הוא לשימושך בלבד. אל תעלי אותו ל-GitHub ואל תפרסמי את רשימת הקודים. רק את הקובץ access.js מעלים לאתר.</p>
<label>כמה קודים ליצור</label><input id="n" type="number" value="50" min="1" max="1000">
<label>קישור תשלום PayBox (לא חובה, יוצג למשתמש במסך הנעילה)</label><input id="pay" dir="ltr" placeholder="https://...">
<label>מספר וואטסאפ לקבלת אישורי תשלום (פורמט בינלאומי בלי +, למשל 972501234567)</label><input id="wa" dir="ltr" placeholder="972501234567">
<label>כתובת ה-Worker של ה-AI (לא חובה, מתקבלת מ-Cloudflare, למשל https://cv-ai.xxx.workers.dev)</label><input id="ai" dir="ltr" placeholder="https://...workers.dev">
<label>מחיר להצגה</label><input id="price" value="25 ש&quot;ח">
<label>קודים קיימים שכבר יצרת (הדביקי את תוכן access.js הקיים כדי להוסיף אליו, לא חובה)</label><textarea id="old" placeholder="window.ACCESS={...}"></textarea>
<button id="go">צרי קודים</button>
<h3>1. הקודים לשליחה למשלמים (שמרי אותם אצלך)</h3>
<textarea id="codes" readonly></textarea><button class="s" id="dc">הורד רשימת קודים</button>
<h3>2. תוכן הקובץ access.js להעלאה ל-GitHub</h3>
<textarea id="out" readonly></textarea><button class="s" id="da">הורד access.js</button>
<script>
const $=s=>document.querySelector(s),AL="23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
async function sha(t){const b=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(t));return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,"0")).join("")}
function gen(){const a=new Uint8Array(8);crypto.getRandomValues(a);const c=[...a].map(x=>AL[x%AL.length]).join("");return c.slice(0,4)+"-"+c.slice(4)}
function save(name,txt){const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([txt],{type:"text/plain;charset=utf-8"}));a.download=name;a.click()}
$("#go").onclick=async()=>{
  const n=Math.max(1,Math.min(1000,+$("#n").value||1));let hashes=[];
  const old=$("#old").value.match(/[0-9a-f]{64}/g);if(old)hashes=[...old];
  const codes=[];
  for(let i=0;i<n;i++){const c=gen();codes.push(c);hashes.push(await sha(c.replace(/-/g,"")))}
  $("#codes").value=codes.join("\n");
  $("#out").value="window.ACCESS="+JSON.stringify({price:$("#price").value,payUrl:$("#pay").value.trim(),wa:$("#wa").value.trim(),aiUrl:$("#ai").value.trim(),hashes},null,1)+";";
};
$("#dc").onclick=()=>save("codes.txt",$("#codes").value);
$("#da").onclick=()=>save("access.js",$("#out").value);
</script></body></html>
