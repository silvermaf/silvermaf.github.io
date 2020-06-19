document.addEventListener("DOMContentLoaded", function() {
    let urlParams = new URLSearchParams(window.location.search);
    let isFromSaved = urlParams.get("saved");
    let idParam = urlParams.get("id");
    let id = parseInt(idParam);
    let btnSave = document.getElementById("save");
    let btnDelete = document.getElementById("delete");
    let cekData = cekId(id).then(function(team){
      if(team != 0){
        btnDelete.style.display = 'block';
      }
    });

    if (isFromSaved) {
      btnSave.style.display = 'none';
      getSavedTeamById();
    } else {
      btnDelete.style.display = 'none';
      getTeamById();
    } 
    let item = getTeamById();

    btnSave.onclick = function() {
      console.log("Tombol FAB save di klik.");
      item.then(function(team) {
        saveForLater(team);
        window.location.reload();
      });
      M.toast({html: 'Added to Saved'})
    };

    btnDelete.onclick = function() {
      console.log("Tombol FAB delete di klik.");
      let teamId = id;
      console.log(teamId);
      deleteTeam(teamId);
      window.location.replace("index.html");
      M.toast({html: 'Deleted from saved'})
    };
});