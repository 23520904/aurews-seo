import "dotenv/config";

async function testSearch() {
  try {
    const res = await fetch("http://localhost:3000/search");
    console.log("Status:", res.status);
    console.log("Status Text:", res.statusText);
    const text = await res.text();
    console.log("Response Body (first 500 chars):", text.substring(0, 500));
  } catch (err) {
    console.error("Fetch failed:", err);
  }
}

testSearch();
