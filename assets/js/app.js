var startPage,startEditor;

function myFunction() {
    startPage = setTimeout(showPage, 5000);
    startEditor = setTimeout(starteditor, 9000);
}

function showPage() {
  $("#loader").fadeOut("50");
  $("#loading").fadeOut("50");
  //$("#newform").css("opacity", "0");
  document.getElementById("Hexagon").style.animation = "spinHexagonQ 2.5s ease-out";
  //document.getElementById("newform").style.animation = "loadnewform 10s ease-out";
  $("#Hexagon").delay("2750").fadeOut("slow");
  $("#newform").css("opacity", "1");
}
