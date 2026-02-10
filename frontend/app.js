const output = document.getElementById("output");

async function callApi(path) {
  output.textContent = `Calling ${path}...`;
  try {
    const res = await fetch(path, {
      headers: { "Content-Type": "application/json" },
    });
    const text = await res.text();
    output.textContent = `status=${res.status}\n${text}`;
  } catch (err) {
    output.textContent = `error: ${err.message}`;
  }
}

document.getElementById("healthBtn").addEventListener("click", () => {
  callApi("/api/health");
});

document.getElementById("usersBtn").addEventListener("click", () => {
  callApi("/api/users");
});
