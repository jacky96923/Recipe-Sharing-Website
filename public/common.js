async function callAPI(method, url) {
  let res = await fetch(url, {
    method,
    headers: { Accept: "application/json" },
  });
  let json = await res.json();
  if (json.error) {
    alert(json.error);
    throw new Error(json.error);
  }
  return json;
}

function showSavedMessage(parent) {
  for (let span of parent.querySelectorAll(".saved-message")) {
    span.remove();
  }
  let span = document.createElement("span");
  span.classList.add("saved-message");
  span.textContent = "saved";
  span.textContent = `[${new Date().toLocaleTimeString(undefined, {
    hour12: false,
  })}] saved`;
  parent.appendChild(span);
  setTimeout(() => {
    span.remove();
  }, 2000);
}

let style = document.createElement("link");
style.rel = "stylesheet";
style.href = "/common.css";
document.body.append(style);
