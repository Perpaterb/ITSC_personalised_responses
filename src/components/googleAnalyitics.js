import ReactGA from "react-ga";

export default function AddGoogleAnalytics(category, action, label, user){
    ReactGA.event({
        category: category,  //string.. PR SN Contact
        action: action, //string.. Copy, Edit,  Delete, Search, create , view
        label: label, //string.. Title
        dimension1: user, //string.. email address of user doing the event
    })
    console.log("Google Analytics sent: ", [category, action, label, user])
}