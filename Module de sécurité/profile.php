<?php
include('session.php'); 
if(!isset($_SESSION['login_user'])){ 
  header("location: index.php"); // Redirecting To Home Page 
}
?>
<!DOCTYPE html>
<meta charset="UTF-8">
<html lang="fr">
<head>
 <title>Welcome</title>
 <link href="style.css" rel="stylesheet" type="text/css">
 <link rel="icon" type="image/x-icon" href="o.ico">
</head>
<body>
<main id="main" class="loading"> 
  <h1>Welcome <b><?php echo $login_session; ?></b></h1>
</main>


 <div id="profile" class="loading" >
<center>
 &nbsp;&nbsp;<a href="logout.php" class="tag loading" lang="fr">Déconnectez vous!</a>
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
 <a href="http://localhost:4200/page-accuiel" class="tag loading">Accée vers l'application</a>
</center>
</div>

<script>function init() {  
  main.classList.add("loading");
  setTimeout(function() { main.classList.remove("loading"); }, 1800); 
}
window.onload = function() {
  document.body.addEventListener('click', () => init());
	init();
};


</script>




</body>
</html>