

export default function AddGoogleAnalytics(action, category, label, user){
    
    window.gtag("event", action, {
        category: category,  //string.. PR SN Contact
        label: label, //string.. Title
        dimension1: user, //string.. email address of user doing the even
      });

    console.log("Google Analytics sent: ", [action, category, label, user])
}