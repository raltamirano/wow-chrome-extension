// Saves options to localStorage.
function save_options() {
  localStorage["wowMappings"] = document.getElementById("wowMappings").value;

  // Update status to let user know options were saved.
  var status = document.getElementById("status");
  status.innerHTML = "Options Saved.";
  setTimeout(function() {
    status.innerHTML = "";
  }, 750);
}

// Restores saved value from localStorage.
function restore_options() {
  var wowMappingsSaved = localStorage["wowMappings"];
  if (!wowMappingsSaved) {
    return;
  }
  document.getElementById("wowMappings").value = wowMappingsSaved;
}

document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);

