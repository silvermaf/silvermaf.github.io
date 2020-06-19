const base_url = "https://api.football-data.org";
const API_KEY = "0525ad1db93f40c2aab5fa2677af0a69";
const fetchApi = url => {
  return fetch(url, {
    method: 'GET',
    headers: {
      'X-Auth-Token': API_KEY
    }
  })
  .then(status)
  .then(json)
  .catch(error)
};
// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}
// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}
// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}
// Blok kode untuk melakukan request data Team
function getTeams() {
  let url = base_url + "/v2/competitions/2021/teams";
  // Cek cache terlebih dahulu
  if ('caches' in window) {
    caches.match(url).then(function(response) {
      if (response) {
        response.json().then(function (data) {
          let teamsHTML = "";
          data.teams.forEach(function(team) {
            teamsHTML += `
            <div class="col m6 s12">
              <div class="card large">
                <div class="card-image">
                  <a href="./detail.html?id=${team.id}">
                    <img src="${team.crestUrl}">
                  </a>                    
                </div>
                <div class="card-content">    
                  <center><h4><b>${team.name}</b></h4></center>
                  <hr>
                </div>
                <div class="card-action">
                  Website : <a href="${team.website}" target="_blank">${team.website}</a>
                </div>
              </div>
            </div>`;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("teams").innerHTML = teamsHTML;
        })
      }
    })
  }
  // Lanjut ke jaringan
  fetchApi(url)
    .then(function(data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.
      // Menyusun komponen card artikel secara dinamis
      let teamsHTML = "";
      data.teams.forEach(function(team) {
        team = JSON.parse(JSON.stringify(team).replace(/http:/g, 'https'))
        teamsHTML += `
        <div class="col m6 s12">
          <div class="card large">
            <div class="card-image">
              <a href="./detail.html?id=${team.id}">
                <img src="${team.crestUrl}">
              </a>                    
            </div>
            <div class="card-content"> 
              <center><h4><b>${team.name}</b></h4></center>
              <hr>
            </div>
            <div class="card-action">
              Website : <a href="${team.website}" target="_blank">${team.website}</a>
            </div>
          </div>
        </div>`;
        });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("teams").innerHTML = teamsHTML;
    })
    .catch(error);
}
// Blok kode untuk melakukan request data Standing
function getStandings() {
  let url = base_url + "/v2/competitions/2021/standings?standingType=TOTAL";
  // Cek cache terlebih dahulu
  if ('caches' in window) {
    caches.match(url).then(function(response) {
      if (response) {
        response.json().then(function (data) {
          let standingTableHtml = ''
          let dataStandingTable = '' 
          data.standings.forEach(function (standing) {
              standing.table.forEach(function (club) {          
                dataStandingTable +=`
                  <tr>
                    <td class="center-align">${club.position}</td>
                    <td><img src="${club.team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="30px" alt="badge"/></td>
                    <td>${club.team.name}</td>
                    <td class="center-align">${club.playedGames}</td>
                    <td class="center-align">${club.won}</td>
                    <td class="center-align">${club.draw}</td>
                    <td class="center-align">${club.lost}</td>
                    <td class="center-align">${club.goalsFor}</td>
                    <td class="center-align">${club.goalsAgainst}</td>
                    <td class="center-align">${club.goalDifference}</td>
                    <td class="center-align">${club.points}</td>
                  </tr>`
              })

            standingTableHtml +=`
            <table class="responsive-table striped">
              <thead>
                <tr>
                  <th class="center-align">Position</th>
                  <th>Team</th>
                  <th></th>
                  <th class="center-align">Played</th>
                  <th class="center-align">Won</th>
                  <th class="center-align">Draw</th>
                  <th class="center-align">Lost</th>
                  <th class="center-align">GF</th>
                  <th class="center-align">GA</th>
                  <th class="center-align">GD</th>
                  <th class="center-align">Points</th>
                </tr>
              </thead>
              <tbody id="dataStanding"></tbody>
            </table>`
          })
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("standings").innerHTML = standingTableHtml;
          document.getElementById("dataStanding").innerHTML = dataStandingTable;
        })
      }
    })
  }
  // Lanjut ke jaringan
  fetchApi(url)
    .then(function(data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.
      // Menyusun komponen card artikel secara dinamis
      let standingTableHtml = ''
      let dataStandingTable = '' 
      data.standings.forEach(function (standing) { 
          standing.table.forEach(function (club) {         
            dataStandingTable +=`
              <tr>
                <td class="center-align">${club.position}</td>
                <td><img src="${club.team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="30px" alt="badge"/></td>
                <td>${club.team.name}</td>
                <td class="center-align">${club.playedGames}</td>
                <td class="center-align">${club.won}</td>
                <td class="center-align">${club.draw}</td>
                <td class="center-align">${club.lost}</td>
                <td class="center-align">${club.goalsFor}</td>
                <td class="center-align">${club.goalsAgainst}</td>
                <td class="center-align">${club.goalDifference}</td>
                <td class="center-align">${club.points}</td>
              </tr>`
          })
          
      standingTableHtml +=`
      <div class="card">
        <div class="card-content">
        <table class="responsive-table striped">
          <thead>
            <tr>
              <th class="center-align">Position</th>
              <th>Team</th>
              <th></th> 
              <th class="center-align">Played</th>
              <th class="center-align">Won</th>
              <th class="center-align">Draw</th>
              <th class="center-align">Lost</th>
              <th class="center-align">GF</th>
              <th class="center-align">GA</th>
              <th class="center-align">GD</th>
              <th class="center-align">Points</th>
            </tr>
          </thead>
          <tbody id="dataStanding"></tbody>
        </table>
        </div>
        </div>`
      })
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("standings").innerHTML = standingTableHtml;
      document.getElementById("dataStanding").innerHTML = dataStandingTable;
    })
    .catch(error);
}
// Blok kode untuk melakukan request data Schedule
function getSchedules() {
  let url = base_url + "/v2/competitions/2021/matches?status=SCHEDULED";
  // Cek cache terlebih dahulu
  if ('caches' in window) {
    caches.match(url).then(function(response) {
      if (response) {
        response.json().then(function (data) {
          let dataScheduleTable = '' 
          data.matches.forEach(function (match) {          
                dataScheduleTable +=`
                <div class="row">
                <div class="col s12">
                  <div class="card white">
                    <div class="card-content white-text">
                      <span class="card-title">MATCHDAY ${match.matchday}</span>
                        <div class="row">
                          <div class="col">
                            ${match.homeTeam.name}
                          </div>
                          <div class="col">
                            V
                          </div>
                          <div class="col">
                            ${match.awayTeam.name}
                          </div>
                        </div>
                        <div class="row">
                          <div class="col">
                          ${match.utcDate}
                          </div>
                        </div>
                    </div>
                  </div>
                </div>
              </div>`;
              })
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("dataSchedules").innerHTML = dataScheduleTable;
        })
      }
    })
  }
  // Lanjut ke jaringan
  fetchApi(url)
    .then(function(data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.
      // Menyusun komponen card artikel secara dinamis
      let dataScheduleTable = '' 
      data.matches.forEach(function (match) {          
            dataScheduleTable +=`
            <div class="row">
              <div class="col s12">
                <div class="card white">
                  <div class="card-content black-text">
                    <span class="card-title">MATCHDAY ${match.matchday}</span>
                    <hr>
                      <div class="row">
                        <div class="col m4 s12 center">
                          <h5>${match.homeTeam.name}</h5>
                        </div>
                        <div class="col m4 s12 center">
                          <h5>V</h5>
                        </div>
                        <div class="col m4 s12 center">
                          <h5>${match.awayTeam.name}</h5>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col s12 center">
                        ${match.utcDate}
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            </div>`;
          })
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("dataSchedules").innerHTML = dataScheduleTable;
    })
    .catch(error);
}
// Blok kode fungsi mengunduh detail team
function getTeamById() {
  return new Promise(function(resolve, reject) {
    // Ambil nilai query parameter (?id=)
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");
    let url = base_url + "/v2/teams/" + idParam
    if ("caches" in window) {
      caches.match(url).then(function(response) {
        if (response) {
          response.json().then(function(data) {
            let teamHtml = `
            <div class="row">
              <div class="col s12 m6">
                <div class="card">
                  <div class="card-image waves-effect waves-block waves-light">
                    <img src="${data.crestUrl}" class="responsive-img"/>
                  </div>
                  <div class="card-content">
                    <center><h4><b>${data.name}</b></h4></center>
                    <hr>
                    <h5>Club Information</h5>
                      <p>
                        <b>Short Name:</b> ${data.shortName}<br>
                        <b>TLA:</b> ${data.tla}<br>
                        <b>Stadium:</b> ${data.venue}<br>
                        <b>Club Colors:</b> ${data.clubColors}<br>
                        <b>Address:</b> ${data.address}<br>
                        <b>Phone:</b> ${data.phone}<br>
                      </p>
                  </div>
                </div>
              </div>
            </div>`;
            document.getElementById("body-content").innerHTML = teamHtml;
            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(data);
          });
        }
      });
    }
    // Lanjut ke jaringan
    fetchApi(url)
      .then(function(data) {
        // Objek JavaScript dari response.json() masuk lewat variabel data.
        console.log(data);
        // Menyusun komponen card artikel secara dinamis
        let teamHtml = `
        <div class="row">
          <div class="col s12 m6">
            <div class="card">
              <div class="card-image waves-effect waves-block waves-light">
                <img src="${data.crestUrl}" class="responsive-img"/>
              </div>
              <div class="card-content">
                <center><h4><b>${data.name}</b></h4></center>
                <hr>
                <h5>Club Information</h5>
                  <p>
                    <b>Short Name:</b> ${data.shortName}<br>
                    <b>TLA:</b> ${data.tla}<br>
                    <b>Stadium:</b> ${data.venue}<br>
                    <b>Club Colors:</b> ${data.clubColors}<br>
                    <b>Address:</b> ${data.address}<br>
                    <b>Phone:</b> ${data.phone}<br>
                  </p>
              </div>
            </div>
          </div>
        </div>
          `;
        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("body-content").innerHTML = teamHtml;
        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
        resolve(data);
      });
    });
}
// Blok kode fungsi menyimpan detail team
function getSavedTeams() {
  getAll().then(function(teams) {
    cekTeamFav().then(function(cek){
      if(teams != 0){
        let teamHtml = "";
      teams.forEach(function(team) {
        teamHtml += `
        <div class="row">
          <div class="col s12 m6">
            <div class="card">
              <a href="./detail.html?id=${team.id}&saved=true">
                <div class="card-image">
                  <img src="${team.crestUrl}" />
                </div>
              </a>
              <div class="card-content">
              <span class="card-title center-align"><b>${team.name}</b></span>
              </div>
            </div>
          </div>
        </div>`;
      }); 
      // Sisipkan komponen card ke dalam elemen dengan id #body-content
      document.getElementById("saved").innerHTML = teamHtml;
      }
      else {
        let teamHtml = "";
        teamHtml += `<h4 class="center">No data entries</h4>`; 
      // Sisipkan komponen card ke dalam elemen dengan id #body-content
      document.getElementById("saved").innerHTML = teamHtml;
      }
    });
  });
}

function getSavedTeamById() {
  let urlParams = new URLSearchParams(window.location.search);
  let idParam = urlParams.get("id");
  let id = parseInt(idParam);
  getById(id).then(function(teams) {
    console.log(teams);
    let teamHtml = '';
    teamHtml = `
    <div class="row">
      <div class="col s12 m6">
        <div class="card">
            <div class="card-image">
              <img src="${teams.crestUrl}">
            </div>
          </a>
          <div class="card-content">
          <span class="card-title center-align"><b>${teams.name}</b></span>
          <hr>
            <h6>Club Information</h6>
            <p>
              <b>Short Name :</b> ${teams.shortName}<br>
              <b>TLA        :</b> ${teams.tla}<br>
              <b>Stadium    :</b> ${teams.venue}<br>
              <b>Club Colors:</b> ${teams.clubColors}<br>
              <b>Address    :</b> ${teams.address}<br>
              <b>Phone      :</b> ${teams.phone}<br>
            </p>
          </div>
        </div>
      </div>
    </div>`;
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("body-content").innerHTML = teamHtml;
    });
}