export function notify(message,textEnabled) {
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
      if(textEnabled){
        axios.post('/twilio',{message: ''}).then(response => console.log(response))
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
      var notification = new Notification("A friend is available to talk:",{
            body: message,
            vibrate: 200,
            badge: 'https://img.icons8.com/dusk/64/000000/phonelink-ring.png',
            image: 'https://media.istockphoto.com/photos/happy-laughing-man-picture-id544358212?k=6&m=544358212&s=612x612&w=0&h=odURMNz2hty8LIfpVahaaUKpGU4vd-UlZx4jy-OAnJA='
          });
      
    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          var notification = new Notification("A friend is available to talk:",{
            body: message,
            vibrate: 200,
            badge: 'https://img.icons8.com/dusk/64/000000/phonelink-ring.png',
            image: 'https://media.istockphoto.com/photos/happy-laughing-man-picture-id544358212?k=6&m=544358212&s=612x612&w=0&h=odURMNz2hty8LIfpVahaaUKpGU4vd-UlZx4jy-OAnJA='

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