(() => {
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // web/api/snapshots.ts
  var getSnapshotFilePaths = () => __async(void 0, null, function* () {
    try {
      const result = yield fetch("test/results/snapshots");
      const json = yield result.json();
      return JSON.parse(json);
    } catch (err) {
      console.log(err.message);
    }
  });

  // web/views/snapshots.ts
  var snapshot = (src) => {
    const theSnapshotContainer = document.createElement("li");
    theSnapshotContainer.className = `${theSnapshotContainer.className} test-result-snapshot-child`;
    const theSnapshot = document.createElement("img");
    theSnapshot.className = `${theSnapshot.className} test-result-snapshot-child-image`;
    theSnapshot.src = src;
    theSnapshotContainer.appendChild(theSnapshot);
    return theSnapshotContainer;
  };
  var snapshots = () => __async(void 0, null, function* () {
    const theSnapshots = document.createElement("ul");
    theSnapshots.className = `${theSnapshots.className} test-result-snapshots-list`;
    const snapshotFilepaths = yield getSnapshotFilePaths();
    for (const snapshotFilepath of snapshotFilepaths) {
      const theSnapshot = snapshot(snapshotFilepath);
      theSnapshots.appendChild(theSnapshot);
    }
    return theSnapshots;
  });

  // web/root/index.ts
  (function() {
    const startButton = document.querySelector("[data-selenium-start-btn]");
    startButton.addEventListener("click", (_event) => __async(this, null, function* () {
      const snapshotsElement = document.querySelector("[data-selenium-snapshots]");
      const theSnapshots = yield snapshots();
      snapshotsElement.appendChild(theSnapshots);
    }));
  })();
})();
