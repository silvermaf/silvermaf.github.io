let dbPromised = idb.open("premier-sport", 1, function(upgradeDb) {
  let teamsObjectStore = upgradeDb.createObjectStore("teams", {
    keyPath: "id"
  });
  teamsObjectStore.createIndex("name", "name", { unique: false });
});

function saveForLater(team) {
  dbPromised
    .then(function(db) {
      let tx = db.transaction(["teams"], 'readwrite');
      let store = tx.objectStore("teams");
      console.log(team);
      store.put(team);
      return tx.complete;
    })
    .then(function() {
      console.log("Artikel berhasil di simpan.");
    });
}

function getAll() {
  return new Promise(function(resolve, reject) {
  dbPromised
    .then(function(db) {
      let tx = db.transaction(["teams"], 'readonly');
      let store = tx.objectStore("teams");
      return store.getAll();
    })
    .then(function(teams) {
      resolve(teams);
    });
  });
}

function getById(id) {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        let tx = db.transaction(["teams"], 'readonly');
        let store = tx.objectStore("teams");
        return store.get(id);
      })
      .then(function(team) {
        resolve(team);
      });
  });
}

function deleteTeam(teamId) {
  console.log(teamId);
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        let tx = db.transaction(["teams"], 'readwrite');
        let store = tx.objectStore("teams");
        store.delete(teamId);
        return tx.complete;
      })
      .then(function() {
        console.log('Item deleted');
        getSavedTeams();
      });
  })
};

function cekId(id) {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        let tx = db.transaction(["teams"], 'readonly');
        let store = tx.objectStore("teams");
        return store.count(id);
      })
      .then(function(team) {
        resolve(team);
      });
  });
}

function cekTeamFav() {
  return new Promise(function(resolve, reject) {
  dbPromised
    .then(function(db) {
      let tx = db.transaction(["teams"], 'readonly');
      let store = tx.objectStore("teams");
      return store.count();
    })
    .then(function(cek) {
      resolve(cek);
    });
  });
}
  