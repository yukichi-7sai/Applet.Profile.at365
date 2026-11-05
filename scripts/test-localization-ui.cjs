const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const root = path.resolve(__dirname, "..");
const host = path.resolve(root, "../AppDock.at365");
const { launch, until, hash } = require(
  path.join(host, "scripts/page-test-host.cjs"),
);
const { ribbonPage } = require(
  path.join(host, "scripts/shell-overlay-helper.cjs"),
);
const { settingsPage } = require(
  path.join(host, "scripts/settings-host-helper.cjs"),
);
const portable = process.argv[2] && path.resolve(process.argv[2]);
assert(portable, "Pass the fixed AppDock executable");
const source = process.argv[3] ? path.resolve(process.argv[3]) : root;
const artifacts = path.join(root, ".artifacts");
fs.mkdirSync(artifacts, { recursive: true });
const profile = fs.mkdtempSync(path.join(artifacts, "localization-ui-"));
const write = (file, value) => {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(value));
};
const id = "at365.profile";
const settings = require(
  path.join(host, "out/main/shared/settings-schema"),
).createDefaultSettings();
Object.assign(settings.host, {
  language: "ja",
  theme: "light",
  hardwareAcceleration: false,
  closeToTray: false,
  soundEnabled: false,
  notifications: false,
});
Object.assign(settings.updates, {
  checkHostOnStartup: false,
  checkAppletsOnStartup: false,
  checkHostOnAboutOpen: false,
});
settings.gestures.enabled = settings.touchpadGestures.enabled = false;
settings.keybindings = settings.globalShortcutCommands = [];
const originalName = "Saved {{name}} %settings.name.title%";
settings.extensions[id] = {
  enabled: true,
  settings: { name: originalName, avatar: null },
};
write(
  require(path.join(host, "scripts/test-settings.cjs")).file(profile),
  settings,
);
write(path.join(profile, "configs/applets.json"), { applets: [] });
// The product ships only a host base dictionary today. Supply an isolated partial host pack.
write(path.join(profile, "translations/host_en.json"), {
  "language.label": "Display language",
});
const folder = path.join(profile, "extensions", id);
fs.mkdirSync(folder, { recursive: true });
for (const file of ["extension.json", "index.cjs", "resources"])
  fs.cpSync(path.join(source, file), path.join(folder, file), {
    recursive: true,
  });
const image = path.join(profile, "data/assets/images/avatar.svg");
fs.mkdirSync(path.dirname(image), { recursive: true });
fs.writeFileSync(
  image,
  '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><circle cx="32" cy="32" r="30" fill="#5276bf"/></svg>',
);
const imageHash = hash(image);
const result = {
  profile,
  source,
  portable,
  sourceManifestSha256: hash(path.join(source, "extension.json")),
  checks: [],
  success: false,
};
const errors = [];
let instance, rail;
const snapshot = () => instance.main.evaluate(() => window.dock.snapshot());
const extension = async () =>
  (await snapshot()).extensions.find((item) => item.id === id);
const value = async () =>
  (await snapshot()).settings.value.extensions[id].settings;
const button = () =>
  rail.locator('[data-ribbon-id="applet:at365.profile:main"]');
async function start() {
  instance = await launch(profile, portable, {}, artifacts);
  instance.app
    .context()
    .on("page", (page) =>
      page.on("pageerror", (error) => errors.push(String(error))),
    );
  instance.main.on("pageerror", (error) => errors.push(String(error)));
  await instance.main.evaluate(() =>
    window.dock.executeCommand("appdock.open"),
  );
  await until(
    async () => (await extension())?.state === "running",
    "Profile running",
  );
  rail = await ribbonPage(instance.main);
  await button().click();
  await settingsPage(instance.main);
}
(async () => {
  try {
    await start();
    assert.equal(
      fs.existsSync(path.join(profile, "translations/applets")),
      false,
    );
    assert.equal(await button().getAttribute("aria-label"), "Profile");
    const field = instance.main.getByLabel("ユーザー名", { exact: true });
    assert.equal(await field.inputValue(), originalName);
    await field.evaluate((node) => {
      window.profileInput = node;
    });
    const draft = "Draft {{name}} %settings.name.title%";
    await field.fill(draft);
    await instance.save({ host: { language: "en" } });
    const english = instance.main.getByLabel("User name", { exact: true });
    await english.waitFor();
    assert.equal(await english.inputValue(), draft);
    assert.equal(
      await english.evaluate((node) => node === window.profileInput),
      true,
    );
    assert.equal((await value()).name, originalName);
    assert.equal(
      (await extension()).settingSections[0].title,
      "Name and image",
    );
    await english.press("Enter");
    await until(async () => (await value()).name === draft, "name saved");
    await instance.main.screenshot({
      path: path.join(profile, "english-light.png"),
    });
    await instance.save({ host: { language: "ja" } });
    await field.waitFor();
    assert.equal(await field.inputValue(), draft);
    result.checks.push(
      "Manual placement uses bundled Japanese/English; switching preserves the same input and unsaved draft, then saves the literal value",
    );
    await instance.main
      .getByRole("button", { name: "アバター画像を選択", exact: true })
      .click();
    const picker = instance.main.getByRole("dialog", {
      name: "画像を選択",
      exact: true,
    });
    await picker
      .locator(".ad-gallery-card")
      .filter({ hasText: "avatar.svg" })
      .locator(".ad-gallery-image")
      .click();
    await picker
      .getByRole("button", { name: "画像を使う", exact: true })
      .click();
    await until(
      async () => (await value()).avatar?.file.startsWith("@assigned/"),
      "avatar stored",
    );
    const saved = await value();
    await button().locator("img, .ribbon-svg-icon").waitFor();
    await instance.save({ host: { language: "en", theme: "dark" } });
    await english.waitFor();
    assert.deepEqual(await value(), saved);
    assert.equal(await button().getAttribute("aria-label"), "Profile");
    assert.equal(await button().locator(".rail-label").count(), 0);
    assert.equal(hash(image), imageHash);
    await instance.resize(900, 680);
    await english.scrollIntoViewIfNeeded();
    assert.equal(await english.inputValue(), draft);
    await instance.main.screenshot({
      path: path.join(profile, "english-dark-narrow.png"),
    });
    await rail.screenshot({ path: path.join(profile, "ribbon.png") });
    result.checks.push(
      "Avatar selection keeps its assigned image and original bytes across language changes; the icon-only ribbon retains its fixed label",
    );
    await instance.main.evaluate(
      (id) => window.dock.toggleExtension(id, false),
      id,
    );
    await until(
      async () => (await extension()).state === "stopped",
      "Profile stopped",
    );
    await button().waitFor({ state: "detached" });
    await instance.save({ host: { language: "ja" } });
    assert.equal((await extension()).settings[0].title, "ユーザー名");
    assert.deepEqual(await value(), saved);
    await instance.main.evaluate(
      (id) => window.dock.toggleExtension(id, true),
      id,
    );
    await until(
      async () => (await extension()).state === "running",
      "Profile enabled",
    );
    await instance.save({ host: { language: "en" } });
    await instance.close();
    instance = undefined;
    write(path.join(profile, "translations/applets", id, "applet_en.json"), {
      "settings.name.title": "Display name override",
    });
    await start();
    assert.equal(
      await instance.main
        .getByLabel("Display name override", { exact: true })
        .inputValue(),
      draft,
    );
    assert.equal((await extension()).settings[1].title, "Avatar image");
    assert.deepEqual(await value(), saved);
    await button().locator("img, .ribbon-svg-icon").waitFor();
    result.checks.push(
      "Stopped metadata follows language; enablement, saved name and avatar survive restart; partial external dictionaries override per key",
    );
    assert.deepEqual(errors, []);
    result.hostSha256 = instance.hash;
    result.success = true;
  } catch (error) {
    result.error = String(error.stack || error);
    process.exitCode = 1;
    if (instance) {
      result.state = await snapshot().catch(() => undefined);
      await instance.main
        .screenshot({ path: path.join(profile, "failure.png") })
        .catch(() => {});
    }
  } finally {
    if (instance) await instance.close();
    fs.writeFileSync(
      path.join(profile, "result.json"),
      JSON.stringify(result, null, 2),
    );
    console.log(
      JSON.stringify(
        {
          ...result,
          state: result.state ? "(saved in result.json)" : undefined,
        },
        null,
        2,
      ),
    );
  }
})();
