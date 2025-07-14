document.getElementById('searchBox').addEventListener('input', function(e) {
  const val = e.target.value.toLowerCase();
  document.querySelectorAll('.produto').forEach(el => {
    el.style.display = el.innerText.toLowerCase().includes(val) ? '' : 'none';
  });
});