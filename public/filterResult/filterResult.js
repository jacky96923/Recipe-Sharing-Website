// const socket = io.connect();

{
}

async function loadFilterResults() {
  let res = await fetch("/results");
  let json = await res.json();
  results.textContent = json.results;
}
loadFilterResults();
// window.addEventListener('mouseover', loadFilterResults)
//  window.addEventListener('visibilitychange', loadFilterResults)
// setInterval(loadCounter, 1000)
//   async function inc() {
//     let res = await fetch('/counter/inc', {
//       method: 'POST',
//     })
