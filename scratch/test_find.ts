import "dotenv/config";

async function testFind() {
  try {
    const res = await fetch("http://localhost:3000/find");
    const text = await res.text();
    console.log("Status:", res.status);
    console.log("Body contains FIND?", text.includes("SEARCH PAGE TEST"));
  } catch (err) {
    console.error("Fetch failed:", err);
  }
}

testFind();
