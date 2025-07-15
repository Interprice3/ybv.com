
const products = [
  { id: "CE-01", name: "Celular POCO M7 PRO", price: 7899, desc: "Smartphone potente, ótimo para jogos e fotos.", category: "Telemóveis", images: ["CE-01.jpg"] },
  { id: "BTW-05", name: "Head Fones P47", price: 400, desc: "Fones bluetooth com ótima qualidade de som.", category: "Acessórios", images: ["BTW-05.jpg"] },
  { id: "CBC-01", name: "Cabo USB", price: 145, desc: "Cabo universal para carregamento rápido.", category: "Acessórios", images: ["CBC-01.jpg"] },
  { id: "CLR-01", name: "REDMI 14C (256GB)", price: 8500, desc: "Celular moderno com bastante armazenamento.", category: "Telemóveis", images: ["CLR-01.jpg"] }
];

function shuffleProducts() {
  const info = JSON.parse(localStorage.getItem("shuffleInfo") || "{}");
  const now = Date.now();
  if (!info.time || now - info.time > 5 * 3600 * 1000) {
    products.sort(() => Math.random() - 0.5);
    localStorage.setItem("shuffleInfo", JSON.stringify({ time: now }));
  }
}

function renderHome() {
  shuffleProducts();
  const list = document.getElementById("productList");
  const search = document.getElementById("searchBar").value.toLowerCase();
  const cat = document.getElementById("categoryFilter").value;

  list.innerHTML = "";
  products.forEach(p => {
    if ((p.name.toLowerCase().includes(search) || p.desc.toLowerCase().includes(search)) &&
        (cat === "" || p.category === cat)) {
      const div = document.createElement("div");
      div.className = "product";
      div.innerHTML = \`
        <a href="produto.html?id=\${p.id}">
          <img src="\${p.images[0]}" alt="\${p.name}">
          <h3>\${p.name}</h3>
          <p>Preço: \${p.price}MZN</p>
        </a>\`;
      list.appendChild(div);
    }
  });
}

function initFilters() {
  const select = document.getElementById("categoryFilter");
  const cats = [...new Set(products.map(p => p.category))];
  cats.forEach(c => select.innerHTML += `<option>\${c}</option>`);
  select.addEventListener("change", renderHome);
}

function renderProductPage() {
  const id = new URLSearchParams(location.search).get("id");
  const p = products.find(p => p.id === id);
  if (!p) return;
  const cont = document.getElementById("productDetails");
  cont.innerHTML = \`
    <div class="images">\${p.images.map(img => \`<img src="\${img}" alt="">\`).join("")}</div>
    <h1>\${p.name}</h1>
    <p>Preço: \${p.price}MZN</p>
    <p>\${p.desc}</p>
    <a class="buy-btn" href="https://wa.me/258834406339?text=Olá,%20preciso%20do%20produto%20\${p.id}" target="_blank">Comprar no WhatsApp</a>
  \`;
  const related = document.getElementById("relatedProducts");
  products.filter(r => r.category === p.category && r.id !== p.id).forEach(r => {
    const d = document.createElement("div");
    d.className = "product";
    d.innerHTML = \`
      <a href="produto.html?id=\${r.id}">
        <img src="\${r.images[0]}" alt="\${r.name}">
        <h3>\${r.name}</h3>
        <p>Preço: \${r.price}MZN</p>
      </a>\`;
    related.appendChild(d);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (location.pathname.includes("index")) {
    initFilters();
    document.getElementById("searchBar").addEventListener("input", renderHome);
    renderHome();
  } else if (location.pathname.includes("produto")) {
    renderProductPage();
  }
});
