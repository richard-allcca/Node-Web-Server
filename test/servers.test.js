const assert = require("node:assert/strict");
const { spawn } = require("node:child_process");
const { once } = require("node:events");
const net = require("node:net");
const os = require("node:os");
const path = require("node:path");
const { test } = require("node:test");

const projectRoot = path.resolve(__dirname, "..");

async function getAvailablePort() {
  const server = net.createServer();
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  const { port } = server.address();
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
  return port;
}

async function withServer(entry, callback) {
  const port = await getAvailablePort();
  const child = spawn(process.execPath, [path.join(projectRoot, entry)], {
    cwd: os.tmpdir(),
    env: { ...process.env, PORT: String(port) },
    stdio: ["ignore", "ignore", "pipe"],
  });
  let stderr = "";
  child.stderr.setEncoding("utf8");
  child.stderr.on("data", (chunk) => {
    stderr += chunk;
  });

  const baseUrl = `http://127.0.0.1:${port}`;
  let ready = false;
  for (let attempt = 0; attempt < 40; attempt += 1) {
    if (child.exitCode !== null) {
      throw new Error(`${entry} exited before listening: ${stderr}`);
    }
    try {
      const response = await fetch(baseUrl);
      await response.arrayBuffer();
      ready = true;
      break;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  }

  if (!ready) {
    child.kill();
    throw new Error(`${entry} did not start: ${stderr}`);
  }

  try {
    await callback(baseUrl);
  } finally {
    child.kill();
    await once(child, "exit");
  }
}

test("native HTTP server returns JSON", async () => {
  await withServer("server-http.js", async (baseUrl) => {
    const response = await fetch(baseUrl);
    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type"), /application\/json/);
    assert.equal((await response.json()).url, "/");
  });
});

test("Handlebars server serves its home, assets, and 404 status", async () => {
  await withServer("server-express-hbs.js", async (baseUrl) => {
    const home = await fetch(baseUrl);
    assert.equal(home.status, 200);
    const homeHtml = await home.text();
    assert.match(homeHtml, /data-bs-toggle="collapse"/);
    assert.doesNotMatch(homeHtml, /data-toggle="collapse"/);
    assert.equal((await fetch(`${baseUrl}/images/banner.jpg`)).status, 200);
    assert.equal((await fetch(`${baseUrl}/images/pic01.jpg`)).status, 200);
    const about = await fetch(`${baseUrl}/about`);
    assert.equal(about.status, 200);
    assert.match(await about.text(), /src="\/images\/pic01\.jpg"/);
    const missing = await fetch(`${baseUrl}/__missing_test_route__`);
    assert.equal(missing.status, 404);
    assert.match(await missing.text(), /src="\/images\/pic01\.jpg"/);
  });
});

test("static server serves its home and returns 404 for missing routes", async () => {
  await withServer("server-express-static.js", async (baseUrl) => {
    assert.equal((await fetch(baseUrl)).status, 200);
    assert.equal((await fetch(`${baseUrl}/generic`)).status, 200);
    assert.equal((await fetch(`${baseUrl}/__missing_test_route__`)).status, 404);
  });
});

test("React build server serves its home", async () => {
  await withServer("server-react-angular.js", async (baseUrl) => {
    assert.equal((await fetch(baseUrl)).status, 200);
  });
});

test("app.js serves the Handlebars home", async () => {
  await withServer("app.js", async (baseUrl) => {
    assert.equal((await fetch(baseUrl)).status, 200);
  });
});