let fLog = document.getElementById("formLog");

fLog.addEventListener("submit", function(event) {
  event.preventDefault();
  
  let e = document.getElementById("email").value;
  let p = document.getElementById("password").value;

  if(e == "" || p == "") {

    alert("Completar los campos vacios");
    return;
  } 

  fLog.submit();

});
