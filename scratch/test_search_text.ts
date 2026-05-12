import "dotenv/config";

async function testSearch() {
  try {
    const res = await fetch("http://localhost:3000/search");
    const text = await res.text();
    console.log("Contains 404?", text.includes("404"));
    console.log("Contains LOST?", text.includes("LOST"));
    console.log("Contains Search Archive?", text.includes("Search Archive"));
  } catch (err) {
    console.error("Fetch failed:", err);
  }
}

testSearch();
