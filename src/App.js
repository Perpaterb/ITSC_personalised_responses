import React, {useEffect, useState} from "react";
import {app} from './componenTS/firebase'
import { collection, getDocs, addDoc} from 'firebase/firestore';
import { getFirestore } from "@firebase/firestore";
import GoogleAuth from "./componenTS/GoogleAuth"
import ResponceOverView from "./componenTS/ResponceOverView"
import ScrollToTop from "./componenTS/ScrollToTop"

import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
//import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from "@mui/material/FormControl";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';

import RefreshButton from "./componenTS/refreshButton";
import AddGoogleAnalytics from "./componenTS/googleAnalyitics"; //(action, category, label, user)

const db = getFirestore(app)

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoinTS.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvenTS: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoinTS.up('md')]: {
      width: '20ch',
    },
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function App() {  

    // if (window.localStorage.getItem("matthewMode") === null) {
    //   window.localStorage.setItem("matthewMode", false)
    // }
    
    const [matthewMode, setMatthewMode] = useState(0)
      
    const [tabValue, setTabValue] = useState(0)

    // const [db, setdb] = useState(getFirestore(app))

    const [newResponsesbody, setnewResponsesbody] = useState("")
    const [newResponsesClass, setnewResponsesClass] = useState("")
    const [newResponsesTitle, setnewResponsesTitle] = useState("")

    const [canBeCreated, setCanBeCreated] = useState(false)
    const [error, setError] = useState("")

    const [searchValue, seTSearchValue] = useState("")

    const [userEmail, setUserEmail] = useState("")
    const [userName, setUserName] = useState("")

    const [responses, setResponses] = useState([])
    const responsesCollectionRef = collection(db, "responses")

    const [allTabLable, setAllTabLable] = useState("All")
    const [JSTabLable, setJSTabLable] = useState("JS")
    const [TSTabLable, setTSTabLable] = useState("TS")
    const [ReactTabLable, setReactTabLable] = useState("React")
    const [NotesTabLable, setNotesTabLable] = useState("Notes")
    const [OtherTabLable, setOtherTabLable] = useState("Other")


    const [JSTitles, setJSTitles] = useState([])
    const [TSTitles, setTSTitles] = useState([])
    const [ReactTitles, setReactTitles] = useState([])
    const [NotesTitles, setNotesTitles] = useState([])
    const [OtherTitles, setOtherTitles] = useState([])
    const [allTitles, setAllTitles] = useState([])


    const createResponses = async () => {
      if (canBeCreated === false){
        await addDoc(responsesCollectionRef, {body: newResponsesbody, class: newResponsesClass, title: newResponsesTitle , active: true, updatedBy: userEmail})
        
        AddGoogleAnalytics("create new", newResponsesClass, newResponsesTitle, userEmail) //(action, category, label, user)
        //forceUpdateDB()
        setnewResponsesTitle("")
        setnewResponsesbody("")
        getAllCounTS("")
        seTSearchValue("")
        
        //console.log("matthewMode: ", matthewMode, "     tabValue: ",tabValue)

        if (matthewMode === 0) {
          setTabValue(0)
        } else if( matthewMode === 1){
          setTabValue(51)
        } else {
          setTabValue(52)
        }
        
      }
    }

    function updateFromDB(){
      forceUpdateDB()

      // //if (userEmail !== null){
      //   //if (userEmail.endsWith('zcarss@gmail.com')){
      //     if (window.localStorage.getItem("responsesAge") === null) {
      //       const getResponses = async () => {
      //         const data = await getDocs(responsesCollectionRef)
      //         const tempdata = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
      //         setResponses(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
      //         window.localStorage.setItem("responses", JSON.stringify(tempdata))
      //         const d = new Date()
      //         window.localStorage.setItem("responsesAge", d.getTime()/1000)
      //         console.log("First time getting DB from server")
      //       }
      //       getResponses();
      //     } else {
      //       const tempTime = new Date()
      //       if (((parseInt(window.localStorage.getItem("responsesAge")) +60) < tempTime.getTime()/1000)) {
      //         const getResponses = async () => {
      //           const data = await getDocs(responsesCollectionRef)
      //           const tempdata = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
      //           setResponses(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
      //           window.localStorage.setItem("responses", JSON.stringify(tempdata))
      //           const d = new Date()
      //           window.localStorage.setItem("responsesAge", d.getTime()/1000)
      //         }
      //         getResponses();
      //         console.log("update response from DB")
 
      //       } else {           
      //         setResponses(JSON.parse(window.localStorage.getItem("responses")))
      //         console.log("get response from local: time left ",((parseInt(window.localStorage.getItem("responsesAge")) +60) - tempTime.getTime()/1000) , "secs")
      //       }
      //     }

      //   }
      // //}// 
    }

   function forceUpdateDB (){
    const getResponses = async () => {
      const data = await getDocs(responsesCollectionRef)
      const tempdata = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
      setResponses(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
      window.localStorage.setItem("responses", JSON.stringify(tempdata))
      const d = new Date()
      window.localStorage.setItem("responsesAge", d.getTime()/1000)
    }
    getResponses();
    console.log("Force update response from DB")
   }

    const handleTabChange = (event, newValue) => {
      let tabName = ""
      switch(newValue){
        case 0:
          tabName = "All"
          break;
        case 1:
          tabName = "JS"
          break;
        case 2:
          tabName = "TS"
          break;
        case 3:
          tabName = "React"
          break;
        case 4:
          tabName = "Notes"
          break;
        case 5:
          tabName = "Other"
          break;
        case 99:
          tabName = "Create New"
          break;
        default:
      }
      setTabValue(newValue);
      AddGoogleAnalytics("tab view", tabName, null, userEmail) //(action, category, label, user)
    }

    function handleSearch(e) {
      getAllCounTS(e)
      seTSearchValue(e)

      let pageName = ""
      if (matthewMode === 0) {
        pageName = "respoonse"
      }else if (matthewMode === 1){
        pageName = "support"
      } else {
        pageName = "contacTS"
      }
      AddGoogleAnalytics("search", pageName, e, userEmail) //(action, category, label, user)
    }

    function changeMode(e) {
      setMatthewMode(e)
      window.localStorage.setItem("matthewMode", e)
      let pageName = ""
      if (e === 0) {
        setTabValue(0)
        pageName = "responses"
      }else if (e === 1){
        setTabValue(51)
        pageName = "support"
      } else {
        setTabValue(52)
        pageName = "contacTS"
      }
      AddGoogleAnalytics("page view", pageName, null, userEmail) //(action, category, label, user)
    }
    
    function getAllCounTS(search) {
    
      const JSTitlesTemp = []
      const TSTitlesTemp = []
      const ReactTitlesTemp = []
      const NotesTitlesTemp = []
      const OtherTitlesTemp = []


      const JSTitlesIndexTemp = []
      const TSTitlesIndexTemp = []
      const ReactTitlesIndexTemp = []
      const NotesTitlesIndexTemp = []
      const OtherTitlesIndexTemp = []

    
      responses.sort((a, b) => a.title.localeCompare(b.title))
      
      responses.map((responses , i) => {
        if (responses.class === "JS" & responses.active === true) {
          JSTitlesTemp.push(responses.title)
          JSTitlesIndexTemp.push(i)
        } else if (responses.class === "TS" & responses.active === true) {
          TSTitlesTemp.push(responses.title)
          TSTitlesIndexTemp.push(i)
        } else if (responses.class === "React" & responses.active === true) {
          ReactTitlesTemp.push(responses.title)
          ReactTitlesIndexTemp.push(i)
        } else if (responses.class === "Notes" & responses.active === true) {
          NotesTitlesTemp.push(responses.title)
          NotesTitlesIndexTemp.push(i)
        } else if (responses.class === "Other" & responses.active === true) {
          OtherTitlesTemp.push(responses.title)
          OtherTitlesIndexTemp.push(i)
        } 
        return (<></>)
      })

      let JSTitlesTemp2 = JSTitlesIndexTemp
      let TSTitlesTemp2 = TSTitlesIndexTemp
      let ReactTitlesTemp2 = ReactTitlesIndexTemp
      let NotesTitlesTemp2 = NotesTitlesIndexTemp
      let OtherTitlesTemp2 = OtherTitlesIndexTemp

      
      if (search !== "") {
        JSTitlesTemp2 = []
        for (let i in JSTitlesTemp){
          if (JSTitlesTemp[i].toLowerCase().includes(search.toLowerCase())) {
            JSTitlesTemp2.push(JSTitlesIndexTemp[i])
          }
        }

        TSTitlesTemp2 = []
        for (let i in TSTitlesTemp){
          if (TSTitlesTemp[i].toLowerCase().includes(search.toLowerCase())) {
            TSTitlesTemp2.push(TSTitlesIndexTemp[i])
          }
        }

        ReactTitlesTemp2 = []
        for (let i in ReactTitlesTemp){
          if (ReactTitlesTemp[i].toLowerCase().includes(search.toLowerCase())) {
            ReactTitlesTemp2.push(ReactTitlesIndexTemp[i])
          }
        }

        NotesTitlesTemp2 = []
        for (let i in NotesTitlesTemp){
          if (NotesTitlesTemp[i].toLowerCase().includes(search.toLowerCase())) {
            NotesTitlesTemp2.push(NotesTitlesIndexTemp[i])
          }
        }

        OtherTitlesTemp2 = []
        for (let i in OtherTitlesTemp){
          if (OtherTitlesTemp[i].toLowerCase().includes(search.toLowerCase())) {
            OtherTitlesTemp2.push(OtherTitlesIndexTemp[i])
          }
        }

      }

      setJSTitles(JSTitlesTemp2)
      setTSTitles(TSTitlesTemp2)
      setReactTitles(ReactTitlesTemp2)
      setNotesTitles(NotesTitlesTemp2)
      setOtherTitles(OtherTitlesTemp2)
      
      setAllTitles(JSTitlesTemp2.concat(TSTitlesTemp2).concat(ReactTitlesTemp2).concat(NotesTitlesTemp2).concat(OtherTitlesTemp2))

      setAllTabLable("All (" + (JSTitlesTemp2.length + TSTitlesTemp2.length + ReactTitlesTemp2.length + NotesTitlesTemp2.length + OtherTitlesTemp2.length) + ")")
      setJSTabLable("JS (" +  JSTitlesTemp2.length + ")")
      setTSTabLable("TS (" +  TSTitlesTemp2.length + ")")
      setReactTabLable("React (" +  ReactTitlesTemp2.length + ")")
      setNotesTabLable("Notes (" +  NotesTitlesTemp2.length + ")")
      setOtherTabLable("Other (" +  OtherTitlesTemp2.length + ")")
    }

    useEffect(() => {
      if (newResponsesbody !== "" && newResponsesClass !== "" && newResponsesTitle !== ""){
        setCanBeCreated(false)
        // setError("")
      } else {
        setCanBeCreated(true)
        // setError("")
      }
    }, [newResponsesbody, newResponsesClass, newResponsesTitle])

    useEffect(() => {
      let sameSameError = 0
      for (var i in responses){
        if (newResponsesTitle === responses[i].title){
          if (responses[i].active === true) {
            sameSameError = 1
          }
        } 
      }
      if (sameSameError === 1) {
        setCanBeCreated(true)
        setError("Title already used")
      } else {
        setError("")
      }
    }, [newResponsesTitle])

    useEffect(() => {
      updateFromDB()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
      getAllCounTS("")
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [responses])

    useEffect(() => {
      const interval = setInterval(() => {
        setUserEmail(localStorage.getItem('email'))
        setUserName(localStorage.getItem('name'))
      }, 1000);
      return () => clearInterval(interval);
    }, []);

    return (
      <div>
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
           
              <FormControl sx={{ m: 1, minWidth: 120 }}>
              </FormControl>
              <RefreshButton refreshDBFunction={forceUpdateDB}/>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <FormControl>
                  <StyledInputBase
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    value={searchValue}
                  />
                </FormControl>
              </Search>
              <Box sx={{ flexGrow: 1 }}/>
              <GoogleAuth/>
            </Toolbar>
          </Container>
        </AppBar>
        
        <Box sx={{ width: '100%' }}>
          <Box display="flex" justifyContent="center" alignItems="center" sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="Class">
              {(() => { if (matthewMode === 0){  return ( <Tab value={0} label={allTabLable} {...a11yProps(0)} />) } })()}
              {(() => { if (matthewMode === 0){  return ( <Tab value={1} label={JSTabLable} {...a11yProps(1)} />) } })()}
              {(() => { if (matthewMode === 0){  return ( <Tab value={2} label={TSTabLable} {...a11yProps(2)} />) } })()}
              {(() => { if (matthewMode === 0){  return ( <Tab value={3} label={ReactTabLable} {...a11yProps(3)} />) } })()}
              {(() => { if (matthewMode === 0){  return ( <Tab value={4} label={NotesTabLable} {...a11yProps(4)} />) } })()}
              {(() => { if (matthewMode === 0){  return ( <Tab value={5} label={OtherTabLable} {...a11yProps(5)} />) } })()}

              {(() => {
                if (userEmail !== null){
                  if (userEmail === 'zcarss@gmail.com'){
                    return (<Tab value={99} label="Create New" {...a11yProps(99)} />)
                  }
                } 
              })()}
            </Tabs>
          </Box>
        
          <TabPanel value={tabValue} index={0}>
            <ResponceOverView type={"respoonse"} titles={allTitles} responses={responses} userName={userName} userEmail={userEmail} db={db}/>
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <ResponceOverView type={"respoonse"} titles={JSTitles} responses={responses} userName={userName} userEmail={userEmail} db={db}/>
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            <ResponceOverView type={"respoonse"} titles={TSTitles} responses={responses} userName={userName} userEmail={userEmail} db={db}/>
          </TabPanel>
          <TabPanel value={tabValue} index={3}>
            <ResponceOverView type={"respoonse"} titles={ReactTitles} responses={responses} userName={userName} userEmail={userEmail} db={db}/>
          </TabPanel>
          <TabPanel value={tabValue} index={4}>
            <ResponceOverView type={"respoonse"} titles={NotesTitles} responses={responses} userName={userName} userEmail={userEmail} db={db}/>
          </TabPanel>
          <TabPanel value={tabValue} index={5}>
            <ResponceOverView type={"respoonse"} titles={OtherTitles} responses={responses} userName={userName} userEmail={userEmail} db={db}/>
          </TabPanel>

          <TabPanel value={tabValue} index={99}>
            <Box
                sx={{
                display: 'flex',
                justifyContent: 'center',
                p: 1,
                m: 1,
                bgcolor: 'background.paper',
                }}
            >
                <Box sx={{ width: '20%'}}>
                    <FormControl sx={{ width: '80%' }}>
                    
                      <FormHelperText>Class</FormHelperText>
                      <Select
                          labelId="Title-select-label"
                          id="select"
                          value={newResponsesClass}
                          onChange={(event) => {setnewResponsesClass(event.target.value)}}
                          inputProps={{ 'aria-label': 'Class' }}
                      >
                        <MenuItem value="JS">JS</MenuItem>
                        <MenuItem value="TS">TS</MenuItem>
                        <MenuItem value="React">React</MenuItem>
                        <MenuItem value="Notes">Notes</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                      </Select>
                      
                      <FormHelperText>Title</FormHelperText>
                      <OutlinedInput onChange={(event) => {setnewResponsesTitle(event.target.value)}} />
                      <span sx={{ m: 1}}> </span>
                      <span>{error}</span>
                    </FormControl>
                </Box>

                <Box sx={{ width: '75%', maxWidth: '800px' }}>
                  <TextareaAutosize
                    aria-label="textarea"
                    placeholder="Empty"
                    style={{ width: "100%" }}
                    onChange={(event) => {setnewResponsesbody(event.target.value.replace(/\n/g, '<br>'))}}
                  />
                </Box>
            </Box>
          </TabPanel>
        </Box>
        <ScrollToTop/> 
      </div>
    )
    
}
