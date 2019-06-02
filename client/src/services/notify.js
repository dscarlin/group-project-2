export function notify(message,receiverName,textEnabled,phoneNumber) {
    
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
      if(textEnabled){
        let messageConcat = `Hey ${receiverName}! I'm free until ${message.time}. ${message.body}`
        axios.post('/twilio',{message: messageConcat,number: phoneNumber}).then(response => console.log(response))
      }
      else{
        alert(
            "This browser does not support desktop notification.\n " +
            "Please use one of these approved browsers: Chrome, Edge, Opera or Firefox.\n" +
            "ios users may select \"Receive Text Notifications\" in profile settings");
      }
     
      console.log('no notification')
    }
    
    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
      // If it's okay let's create a notification
      var notification = new Notification(`Hey ${receiverName}! I'm free until ${message.time}`,{
        body: message.body,
        vibrate: 200,
        badge: 'https://img.icons8.com/dusk/64/000000/phonelink-ring.png',
        icon: message.icon
      });
      
    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          var notification = new Notification(`Hey ${message.myName}! I'm free until ${message.time}`,{
            body: message.body,
            vibrate: 200,
            badge: 'https://img.icons8.com/dusk/64/000000/phonelink-ring.png',
            icon: message.icon
          });
          
        }
        else{
            console.log('not denied or granted')
        }
      });
    }
    else if (Notification.permission == "denied") {
      console.log('denied')
      alert('notifications denied')
    }
    else {
      console.log('else should text')
      axios.post('/twilio',{message: ''}).then(response => console.log(response))

    }
    notification.onclick = () => {
        window.focus();
        notification.close();
    }
  }