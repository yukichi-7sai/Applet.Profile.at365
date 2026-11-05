const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");
const root = path.resolve(__dirname, "..");
const host = path.resolve(root, "../AppDock.at365");
const { readManifest } = require(
  path.join(host, "out/main/main/core/extensions"),
);
const { hostResources, configureHostLanguage } = require(
  path.join(host, "out/main/main/core/host-translation-source"),
);

test("Profile resolves all declared display text in Japanese and English while preserving data and ribbon behavior", (t) => {
  const prior = hostResources.en;
  hostResources.en = {};
  t.after(() => {
    configureHostLanguage(() => "ja");
    if (prior === undefined) delete hostResources.en;
    else hostResources.en = prior;
  });
  const manifest = readManifest(root);
  const dictionaries = ["applet.json", "applet_en.json"].map((file) =>
    JSON.parse(
      fs.readFileSync(path.join(root, "resources/translations", file)),
    ),
  );
  assert.deepEqual(
    Object.keys(dictionaries[0]).sort(),
    Object.keys(dictionaries[1]).sort(),
  );
  for (const [index, language] of ["ja", "en"].entries()) {
    configureHostLanguage(() => language);
    const dictionary = dictionaries[index];
    assert.equal(manifest.displayName, dictionary["applet.displayName"]);
    assert.equal(manifest.description, dictionary["applet.description"]);
    assert.equal(manifest.tagline, dictionary["applet.tagline"]);
    for (const field of manifest.settings) {
      assert.equal(field.title, dictionary[`settings.${field.key}.title`]);
      assert.equal(
        field.description,
        dictionary[`settings.${field.key}.description`],
      );
    }
    assert.equal(
      manifest.settingSections[0].title,
      dictionary["settings.profile.title"],
    );
    assert.equal(
      manifest.ribbonItems[0].title,
      dictionary["ribbon.main.title"],
    );
    assert.equal(manifest.settings[0].default, "ユーザー");
    assert.equal(manifest.settings[1].default, null);
    assert.equal(manifest.id, "at365.profile");
    assert.deepEqual(manifest.ribbonItems[0], {
      id: "main",
      title: "Profile",
      action: "settings",
      icon: "user",
      imageSetting: "avatar",
      imageShape: "circle",
      iconOnly: true,
      defaultPlacement: "bottom",
    });
  }
});

test("a host without English stays in its base language despite the bundled English dictionary", () => {
  const prior = hostResources.en;
  delete hostResources.en;
  configureHostLanguage(() => "en");
  try {
    assert.equal(readManifest(root).settings[0].title, "ユーザー名");
  } finally {
    configureHostLanguage(() => "ja");
    if (prior !== undefined) hostResources.en = prior;
  }
});

test("the updater plans both Profile dictionaries under its own external directory without writing them", (t) => {
  fs.mkdirSync(path.join(root, ".artifacts"), { recursive: true });
  const base = fs.mkdtempSync(path.join(root, ".artifacts/localization-plan-"));
  t.after(() => fs.rmSync(base, { recursive: true, force: true }));
  const source = path.join(base, "package");
  const destination = path.join(base, "host");
  fs.mkdirSync(source);
  fs.mkdirSync(destination);
  for (const file of ["extension.json", "index.cjs", "resources"])
    fs.cpSync(path.join(root, file), path.join(source, file), {
      recursive: true,
    });
  const result = spawnSync(
    path.join(host, ".artifacts/updater/AppDock.Updater.exe"),
    ["--plan-applet-translations", source, destination],
    { encoding: "utf8", windowsHide: true },
  );
  assert.equal(result.status, 0, result.stderr);
  const plan = JSON.parse(result.stdout);
  assert.deepEqual(plan.map((item) => path.basename(item.destination)).sort(), [
    "applet.json",
    "applet_en.json",
  ]);
  for (const item of plan) {
    assert.equal(item.kind, "applet-resource");
    assert.equal(item.id, "at365.profile");
    assert.equal(item.operation, "install");
    assert.equal(
      path.dirname(item.destination),
      path.join(destination, "translations/applets/at365.profile"),
    );
  }
  assert.equal(fs.existsSync(path.join(destination, "translations")), false);
});
