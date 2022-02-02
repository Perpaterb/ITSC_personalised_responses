import React, {useEffect, useState} from "react";
import {app} from './components/firebase'
import { collection, getDocs, addDoc} from 'firebase/firestore';
import { getFirestore } from "@firebase/firestore";
import GoogleAuth from "./components/GoogleAuth"
import ResponceOverView from "./components/ResponceOverView"
import ScrollToTop from "./components/ScrollToTop"

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

//import { TurnedInNot } from "@mui/icons-material";
//import Avatar from '@mui/material/Avatar';
//import merry from './static/Meredith.png';


//const db = getFirestore(app)



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
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
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
    [theme.breakpoints.up('md')]: {
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
          <Typography>{children}</Typography>
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

    if (window.localStorage.getItem("matthewMode") === null) {
      window.localStorage.setItem("matthewMode", false)
    }
    
    const [matthewMode, setMatthewMode] = useState(false)
      
    const [tabValue, setTabValue] = useState(0)

    const [db, setdb] = useState(getFirestore(app))

    const [newResponsesbody, setnewResponsesbody] = useState("")
    const [newResponsesClass, setnewResponsesClass] = useState("")
    const [newResponsesTitle, setnewResponsesTitle] = useState("")

    const [canBeCreated, setCanBeCreated] = useState(false)
    const [error, setError] = useState("")

    const [userEmail, setUserEmail] = useState("")
    const [userName, setUserName] = useState("")

    const [responses, setResponses] = useState([])
    const responsesCollectionRef = collection(db, "responses")

    const [allTabLable, setAllTabLable] = useState("All")
    const [staffTabLable, setStaffTabLable] = useState("Staff")
    const [studentTabLable, setStudentTabLable] = useState("Student")
    const [toCloseTabLable, setToCloseTabLable] = useState("To Close")
    const [postItsTabLable, setPostItsTabLable] = useState("Post-its")
    const [referToCatalogueTabLable, setReferToCatalogueTabLable] = useState("Refer To Catalogue")
    const [insearchTabLable, setInsearchTabLable] = useState("Insearch")
    const [outageTabLable, setOutageTabLable] = useState("Outage")
    const [supportTabLable, setSupportTabLable] = useState("Support")

    const [staffTitles, setStaffTitles] = useState([])
    const [studentTitles, setStudentTitles] = useState([])
    const [toCloseTitles, setToCloseTitles] = useState([])
    const [postItsTitles, setPostItsTitles] = useState([])
    const [referToCatalogueTitles, setReferToCatalogueTitles] = useState([])
    const [insearchTitles, setInsearchTitles] = useState([])
    const [outageTitles, setOutageTitles] = useState([])
    const [supportTitles, setSupportTitles] = useState([])
    const [allTitles, setAllTitles] = useState([])


    const createResponses = async () => {
      if (canBeCreated === false){
        await addDoc(responsesCollectionRef, {body: newResponsesbody, class: newResponsesClass, title: newResponsesTitle , active: true, updatedBy: userEmail})
        forceUpdateDB()
        if (matthewMode) {
          setTabValue(0)
        } else{
          setTabValue(51)
        }
      }
    }

    function updateFromDB(){
      forceUpdateDB()

      // //if (userEmail !== null){
      //   //if (userEmail.endsWith('@uts.edu.au')){
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


    function handleTabChange (event, newValue) {
      setTabValue(newValue)
    };

    function handleSearch(e) {
      getAllCounts(e)
    }

    function changeMode(e) {
      setMatthewMode(e.target.value)
      window.localStorage.setItem("matthewMode", e.target.value)
      if (e.target.value) {
        setTabValue(51)
      }else{
        setTabValue(0)
      }
    }
    
    function getAllCounts(search) {
    
      const staffTitlesTemp = []
      const studentTitlesTemp = []
      const toCloseTitlesTemp = []
      const postItsTitlesTemp = []
      const referToCatalogueTitlesTemp = []
      const insearchTitlesTemp = []
      const outageTitlesTemp = []
      const supportTitlesTemp = []

      const staffTitlesIndexTemp = []
      const studentTitlesIndexTemp = []
      const toCloseTitlesIndexTemp = []
      const postItsTitlesIndexTemp = []
      const referToCatalogueTitlesIndexTemp = []
      const insearchTitlesIndexTemp = []
      const outageTitlesIndexTemp = []
      const supportTitlesIndexTemp = []
    
      responses.sort((a, b) => a.title.localeCompare(b.title))
      
      responses.map((responses , i) => {
        if (responses.class === "Staff" & responses.active === true) {
          staffTitlesTemp.push(responses.title)
          staffTitlesIndexTemp.push(i)
        } else if (responses.class === "Student" & responses.active === true) {
          studentTitlesTemp.push(responses.title)
          studentTitlesIndexTemp.push(i)
        } else if (responses.class === "To Close" & responses.active === true) {
          toCloseTitlesTemp.push(responses.title)
          toCloseTitlesIndexTemp.push(i)
        } else if (responses.class === "Post-its" & responses.active === true) {
          postItsTitlesTemp.push(responses.title)
          postItsTitlesIndexTemp.push(i)
        } else if (responses.class === "Refer To Catalogue" & responses.active === true) {
          referToCatalogueTitlesTemp.push(responses.title)
          referToCatalogueTitlesIndexTemp.push(i)
        } else if (responses.class === "Insearch" & responses.active === true) {
          insearchTitlesTemp.push(responses.title)
          insearchTitlesIndexTemp.push(i)
        } else if (responses.class === "Outage" & responses.active === true) {
          outageTitlesTemp.push(responses.title)
          outageTitlesIndexTemp.push(i)
        } else if (responses.class === "Support Note" & responses.active === true) {
          supportTitlesTemp.push(responses.title)
          supportTitlesIndexTemp.push(i)
        } 
        return (<></>)
      })

      let staffTitlesTemp2 = staffTitlesIndexTemp
      let studentTitlesTemp2 = studentTitlesIndexTemp
      let toCloseTitlesTemp2 = toCloseTitlesIndexTemp
      let postItsTitlesTemp2 = postItsTitlesIndexTemp
      let referToCatalogueTitlesTemp2 = referToCatalogueTitlesIndexTemp
      let insearchTitlesTemp2 = insearchTitlesIndexTemp
      let outageTitlesTemp2 = outageTitlesIndexTemp 
      let supportTitlesTemp2 = supportTitlesIndexTemp 
      
      if (search !== "") {
        staffTitlesTemp2 = []
        for (let i in staffTitlesTemp){
          if (staffTitlesTemp[i].toLowerCase().includes(search.toLowerCase())) {
            staffTitlesTemp2.push(staffTitlesIndexTemp[i])
          }
        }

        studentTitlesTemp2 = []
        for (let i in studentTitlesTemp){
          if (studentTitlesTemp[i].toLowerCase().includes(search.toLowerCase())) {
            studentTitlesTemp2.push(studentTitlesIndexTemp[i])
          }
        }

        toCloseTitlesTemp2 = []
        for (let i in toCloseTitlesTemp){
          if (toCloseTitlesTemp[i].toLowerCase().includes(search.toLowerCase())) {
            toCloseTitlesTemp2.push(toCloseTitlesIndexTemp[i])
          }
        }

        postItsTitlesTemp2 = []
        for (let i in postItsTitlesTemp){
          if (postItsTitlesTemp[i].toLowerCase().includes(search.toLowerCase())) {
            postItsTitlesTemp2.push(postItsTitlesIndexTemp[i])
          }
        }

        referToCatalogueTitlesTemp2 = []
        for (let i in referToCatalogueTitlesTemp){
          if (referToCatalogueTitlesTemp[i].toLowerCase().includes(search.toLowerCase())) {
            referToCatalogueTitlesTemp2.push(referToCatalogueTitlesIndexTemp[i])
          }
        }

        insearchTitlesTemp2 = []
        for (let i in insearchTitlesTemp){
          if (insearchTitlesTemp[i].toLowerCase().includes(search.toLowerCase())) {
            insearchTitlesTemp2.push(insearchTitlesIndexTemp[i])
          }
        }

        outageTitlesTemp2 = []
        for (let i in outageTitlesTemp){
          if (outageTitlesTemp[i].toLowerCase().includes(search.toLowerCase())) {
            outageTitlesTemp2.push(outageTitlesIndexTemp[i])
          }
        }

        supportTitlesTemp2 = []
        for (let i in supportTitlesTemp){
          if (supportTitlesTemp[i].toLowerCase().includes(search.toLowerCase())) {
            supportTitlesTemp2.push(supportTitlesIndexTemp[i])
          }
        }
      }

      setStaffTitles(staffTitlesTemp2)
      setStudentTitles(studentTitlesTemp2)
      setToCloseTitles(toCloseTitlesTemp2)
      setPostItsTitles(postItsTitlesTemp2)
      setReferToCatalogueTitles(referToCatalogueTitlesTemp2)
      setInsearchTitles(insearchTitlesTemp2)
      setOutageTitles(outageTitlesTemp2)
      setSupportTitles(supportTitlesTemp2)
      setAllTitles(staffTitlesTemp2.concat(studentTitlesTemp2).concat(toCloseTitlesTemp2).concat(postItsTitlesTemp2).concat(referToCatalogueTitlesTemp2).concat(insearchTitlesTemp2).concat(outageTitlesTemp2))

      setAllTabLable("All (" + (staffTitlesTemp2.length + studentTitlesTemp2.length + toCloseTitlesTemp2.length + postItsTitlesTemp2.length + referToCatalogueTitlesTemp2.length + insearchTitlesTemp2.length + outageTitlesTemp2.length) + ")")
      setStaffTabLable("Staff (" +  staffTitlesTemp2.length + ")")
      setStudentTabLable("Student (" +  studentTitlesTemp2.length + ")")
      setToCloseTabLable("To Close (" +  toCloseTitlesTemp2.length + ")")
      setPostItsTabLable("Post-its (" +  postItsTitlesTemp2.length + ")")
      setReferToCatalogueTabLable("Refer To Catalogue (" +  referToCatalogueTitlesTemp2.length + ")")
      setInsearchTabLable("Insearch (" +  insearchTitlesTemp2.length + ")")
      setOutageTabLable("Outage (" +  outageTitlesTemp2.length + ")")
      setSupportTabLable("Support Notes (" +  supportTitlesTemp2.length + ")")
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
      getAllCounts("")
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
                <Select
                  value={matthewMode}
                  onChange={changeMode}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                  sx={{fontSize: 20, backgroundColor: "#ffffff", minWidth: 300, textAlign: "center"}}
                >
                  <MenuItem value={false}>Personalised Responses</MenuItem>
                  <MenuItem value={true}>Support Notes</MenuItem>
                </Select>
              </FormControl>
                  <Search>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                      onChange={(e) => handleSearch(e.target.value)}
                      placeholder="Search…"
                      inputProps={{ 'aria-label': 'search' }}
                    />
                  </Search>
              <Box sx={{ flexGrow: 1 }}/>
              <GoogleAuth/>
            </Toolbar>
          </Container>
        </AppBar>
        
        <Box sx={{ width: '100%' }}>
          <Box display="flex" justifyContent="center" alignItems="center" sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="Class">
              {(() => { if (matthewMode === false){  return ( <Tab value={0} label={allTabLable} {...a11yProps(0)} />) } })()}
              {(() => { if (matthewMode === false){  return ( <Tab value={1} label={staffTabLable} {...a11yProps(1)} />) } })()}
              {(() => { if (matthewMode === false){  return ( <Tab value={2} label={studentTabLable} {...a11yProps(2)} />) } })()}
              {(() => { if (matthewMode === false){  return ( <Tab value={3} label={toCloseTabLable} {...a11yProps(3)} />) } })()}
              {(() => { if (matthewMode === false){  return ( <Tab value={4} label={postItsTabLable} {...a11yProps(4)} />) } })()}
              {(() => { if (matthewMode === false){  return ( <Tab value={5} label={referToCatalogueTabLable} {...a11yProps(5)} />) } })()}
              {(() => { if (matthewMode === false){  return ( <Tab value={6} label={insearchTabLable} {...a11yProps(6)} />) } })()}
              {(() => { if (matthewMode === false){  return ( <Tab value={7} label={outageTabLable} {...a11yProps(7)} />) } })()}

              {(() => { if (matthewMode === true){  return ( <Tab value={51} label={supportTabLable} {...a11yProps(51)} />) } })()}

              {(() => {
                if (userEmail !== null){
                  if (userEmail.endsWith('@uts.edu.au')){
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
            <ResponceOverView type={"respoonse"} titles={staffTitles} responses={responses} userName={userName} userEmail={userEmail} db={db}/>
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            <ResponceOverView type={"respoonse"} titles={studentTitles} responses={responses} userName={userName} userEmail={userEmail} db={db}/>
          </TabPanel>
          <TabPanel value={tabValue} index={3}>
            <ResponceOverView type={"respoonse"} titles={toCloseTitles} responses={responses} userName={userName} userEmail={userEmail} db={db}/>
          </TabPanel>
          <TabPanel value={tabValue} index={4}>
            <ResponceOverView type={"respoonse"} titles={postItsTitles} responses={responses} userName={userName} userEmail={userEmail} db={db}/>
          </TabPanel>
          <TabPanel value={tabValue} index={5}>
            <ResponceOverView type={"respoonse"} titles={referToCatalogueTitles} responses={responses} userName={userName} userEmail={userEmail} db={db}/>
          </TabPanel>
          <TabPanel value={tabValue} index={6}>
            <ResponceOverView type={"respoonse"} titles={insearchTitles} responses={responses} userName={userName} userEmail={userEmail} db={db}/>
          </TabPanel>
          <TabPanel value={tabValue} index={7}>
            <ResponceOverView type={"respoonse"} titles={outageTitles} responses={responses} userName={userName} userEmail={userEmail} db={db}/>
          </TabPanel>

          <TabPanel value={tabValue} index={51}>
            <ResponceOverView type={"support"} titles={supportTitles} responses={responses} userName={userName} userEmail={userEmail} db={db}/>
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
                        <MenuItem value="Staff">Staff</MenuItem>
                        <MenuItem value="Student">Student</MenuItem>
                        <MenuItem value="To Close">To Close</MenuItem>
                        <MenuItem value="Post-its">Post-its</MenuItem>
                        <MenuItem value="Refer To Catalogue">Refer To Catalogue</MenuItem>
                        <MenuItem value="Insearch">Insearch</MenuItem>
                        <MenuItem value="Outage">Outage</MenuItem>
                        <MenuItem value="Support Note">Support Note</MenuItem>
                      </Select>
                      
                      <FormHelperText>Title</FormHelperText>
                      <OutlinedInput onChange={(event) => {setnewResponsesTitle(event.target.value)}} />
                      <p sx={{ m: 1}}> </p>
                      {(() => {
                        if (newResponsesClass !== "Support Note"){
                          return (
                            <Button disabled={canBeCreated} variant="outlined" onClick={createResponses}>Create New Personalised Responses</Button>
                          )
                        } else {
                          return (
                            <Button disabled={canBeCreated} variant="outlined" onClick={createResponses}>Create Support Note</Button>
                          )
                        }
                      })()}
                      <p>{error}</p>
                    </FormControl>
                </Box>

                {(() => {
                  if (newResponsesClass !== "Support Note"){
                    return (
                      <Box sx={{ width: '75%', maxWidth: '800px' }}>
                        <p>Hi ______,<b/></p>
                        <TextareaAutosize
                          aria-label="textarea"
                          placeholder="Empty"
                          style={{ width: "100%" }}
                          onChange={(event) => {setnewResponsesbody(event.target.value.replace(/\n/g, '<br>'))}}
                        />
                        <p>Kind regards,</p>
                        <p>{userName}</p>
                        <p>IT Support Centre</p>
                        </Box>
                    )
                  } else {
                    return (
                      <Box sx={{ width: '75%', maxWidth: '800px' }}>
                        <TextareaAutosize
                          aria-label="textarea"
                          placeholder="Empty"
                          style={{ width: "100%" }}
                          onChange={(event) => {setnewResponsesbody(event.target.value.replace(/\n/g, '<br>'))}}
                        />
                      </Box>
                    )
                  }
                })()}
            </Box>
          </TabPanel>
        </Box>
        <ScrollToTop/> 
      </div>
    )
    
}
