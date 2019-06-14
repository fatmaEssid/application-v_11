<?php
include('login.php'); // Includes Login Script
if(isset($_SESSION['login_user'])){
header("location: profile.php"); // Redirecting To Profile Page
}
?> 
<!DOCTYPE html>
<html lang="fr">
<head>
  <title>Connectez-vous</title>
  <link href="style.css" rel="stylesheet" type="text/css" media="screen">
  <link rel="icon" type="image/x-icon" href="login_icon.ico">
</head>
<body><!--id="login"-->
 <div class="infobox">
  <!--<h2>
Formulaire de connexion</h2>
 
  <form action="" method="post" autocomplete="off">
   <label> :</label>
   <input id="name" name="username" placeholder="nom" type="text">
   <label>Mot de passe :</label>
   <input id="password" name="password" placeholder="**********" type="password"><br><br>
   <input name="submit" type="submit" value=" S'identifiez ">
   
  </form>
 </div>-->
 
 <form action="" method="post" autocomplete="off">
 
 <center><h3><p>Formulaire de connexion</p></h4> <span><?php echo $error; ?></h4></center>
  <input type="text" placeholder="Votre Nom" class="question" id="name" name="username" required autocomplete="off" />
  <label for="nme" ><span ></span></label>
  <br>
  <input  name="password" rows="1" type="password" placeholder="Mot de passe" class="question" id="msg" required autocomplete="off"/>
  <label for="msg"><span></span></label>
  <br>
  <input name="submit"type="submit" value="S'identifiez!" />
  <br>
</form>
</div>
</body>
</html>
