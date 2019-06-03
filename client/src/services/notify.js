import axios from 'axios'
export function notify(message,textEnabled,phoneNumber) {
    
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
      if(textEnabled){
        console.log(phoneNumber)

        axios.post('/api/twilio',{message: message.body,number: phoneNumber}).then(response => console.log(3))
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
      var notification = new Notification(message.body);
    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          var notification = new Notification(message.body);
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
    if(notification){
      notification.onclick = () => {
          window.focus();
          notification.close();
      };
    }
  }