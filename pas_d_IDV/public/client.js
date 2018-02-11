(function($){

  var socket = io.connect('http://localhost:3000');


  $('#loginform').submit(function(event){
    event.preventDefault();
    socket.emit('login', {
      username  : $('#username').val(),
      mail    : $('#mail').val()
    });
  })
	
	socket.on('newusr', function(user) {
		$('#listusers').append('<li id=' +user.id +'>'+ user.username + '</li>'); //on modifie le code de la liste en ajoutant un id pour la suppression
	});

	socket.on('disusr', function(user) {
		$('#' + user.id).remove(); //on supprime l'utilisateur de la liste
	});
	  
	socket.on('logged',function(){
		$('#login').fadeOut();
		$('#message').focus(); //met le focus pour la saisie du message
	});
	
	$('#form').submit(function(event) {
		event.preventDefault();
		socket.emit('newmsg', {message: $('#message').val()});
		$('#message').val(''); //pour éviter le flood...
		$('#message').focus(); //pour remettre le focus
	});
	
	socket.on('newmsg', function(message){
		alert(JSON.stringify(message));
		var msgtpl = $('#msgtpl').html();
		
		$('#messages').append('<div class="message">' + Mustache.render(msgtpl,message) + '</div>');
		
		// suppression s'il y a plus de 10 messages
		var nombre_message_historique = 10;
		var div_message = $('div.message');
		if (div_message.length > (nombre_message_historique + 1)) { // +1 car il y a une div caché pour mustacki
			
			for (i=0; i<=div_message.length-nombre_message_historique; i++) {
				div_message.eq(i).fadeOut();
			}
		}
	});
	
})(jQuery); 

