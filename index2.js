firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    $(".login-cover").hide();
    var dialog = document.querySelector('#loginDialog');
    if (! dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }
    dialog.close();

  } else {
    // No user is signed in.
  
    var dialog = document.querySelector('#loginDialog');
    if (! dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }
    dialog.showModal();
  
  }
});


$("#loginBtn").click(function () {

	var email = $("#loginEmail").val();
	var password = $("#loginPassword").val();

	if(email != "" && password != "") {

		$("#loginProgress").show();
		$("#loginBtn").hide();


		firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
			$("#loginError").show().text(error);
		});

	}

});

$("#signOutBtn").click(function () {

	firebase.auth().signOut();
	$(".login-cover").show();
	$("#loginProgress").hide();
	$("#loginBtn").show();

});