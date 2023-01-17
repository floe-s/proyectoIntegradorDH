let fLog = document.getElementById("formLog");

fLog.addEventListener("submit", function(event) {
  event.preventDefault();
  
  let e = document.getElementById("email").value;
  let p = document.getElementById("password").value;

  if((e == "") || (p == "") || (!e.includes("@"))) {

    alert("Completar los campos correctamente");
    return;
  } 

  fLog.submit();

});
