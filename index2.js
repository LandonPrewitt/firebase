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


/* LOGIN PROCESS */
function loginProcess() {
	var email = $("#loginEmail").val();
	var password = $("#loginPassword").val();

	if(email != "" && password != "") {

		$("#loginProgress").show();
		$("#loginBtn").hide();
		$("#loginError").hide();

		firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
			$("#loginError").show().text(error);
			$("#loginProgress").hide();
			$("#loginBtn").show();
		});
	}
}

$("#loginBtn").click(function () {
	loginProcess();
});

$(document).keypress(function(e) {
    
    if(e.which == 13) {
    	if(firebase.auth().currentUser) {
    	} else {
    		loginProcess();
    	}
    }	
});


/* SIGN OUT PROCESS */
$("#signOutBtn").click(function () {

	firebase.auth().signOut().then(function() {
		// Sign-out successful
		$(".login-cover").show();
		$("#loginProgress").hide();
		$("#loginBtn").show();
		$("#loginPassword").val("");

	}, function(error) {
		// Sign-out failed
		alert(error);

	});


});