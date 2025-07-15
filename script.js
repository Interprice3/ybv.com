
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchBar");
  const products = Array.from(document.querySelectorAll(".product"));

  searchInput.addEventListener("input", () => {
    const term = searchInput.value.toLowerCase();
    products.forEach(product => {
      const name = product.querySelector("h3").textContent.toLowerCase();
      const match = name.includes(term);
      product.style.display = match ? "block" : "none";
    });
  });
});
