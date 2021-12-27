import React, {useEffect, useState} from "react";
import {app} from './components/firebase'
import { collection, getDocs, addDoc} from 'firebase/firestore';
import { getFirestore } from "@firebase/firestore";
import GoogleAuth from "./components/GoogleAuth"
import ResponceOverView from "./components/ResponceOverView"


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
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from "@mui/material/FormControl";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';


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

    const [staffTitles, setStaffTitles] = useState([])
    const [studentTitles, setStudentTitles] = useState([])
    const [toCloseTitles, setToCloseTitles] = useState([])
    const [postItsTitles, setPostItsTitles] = useState([])
    const [referToCatalogueTitles, setReferToCatalogueTitles] = useState([])
    const [insearchTitles, setInsearchTitles] = useState([])
    const [allTitles, setAllTitles] = useState([])


    const createResponses = async () => {
      if (canBeCreated === false){
        await addDoc(responsesCollectionRef, {body: newResponsesbody, class: newResponsesClass, title: newResponsesTitle})
        updateFromDB()
        setTabValue(0)
      }
    }

    function updateFromDB(){
        const getResponses = async () => {
          const data = await getDocs(responsesCollectionRef)
          setResponses(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
      }
      getResponses();
    }

    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event, newValue) => {
      setTabValue(newValue);
    };

    function handleSearch(e) {
      getAllCounts(e)
    }
    
    function getAllCounts(search) {
    
      const staffTitlesTemp = []
      const studentTitlesTemp = []
      const toCloseTitlesTemp = []
      const postItsTitlesTemp = []
      const referToCatalogueTitlesTemp = []
      const insearchTitlesTemp = []

      const staffTitlesIndexTemp = []
      const studentTitlesIndexTemp = []
      const toCloseTitlesIndexTemp = []
      const postItsTitlesIndexTemp = []
      const referToCatalogueTitlesIndexTemp = []
      const insearchTitlesIndexTemp = []
    
    
      responses.map((responses , i) => {
        if (responses.class === "Staff") {
          staffTitlesTemp.push(responses.title)
          staffTitlesIndexTemp.push(i)
        } else if (responses.class === "Student") {
          studentTitlesTemp.push(responses.title)
          studentTitlesIndexTemp.push(i)
        } else if (responses.class === "To Close") {
          toCloseTitlesTemp.push(responses.title)
          toCloseTitlesIndexTemp.push(i)
        } else if (responses.class === "Post-its") {
          postItsTitlesTemp.push(responses.title)
          postItsTitlesIndexTemp.push(i)
        } else if (responses.class === "Refer To Catalogue") {
          referToCatalogueTitlesTemp.push(responses.title)
          referToCatalogueTitlesIndexTemp.push(i)
        } else if (responses.class === "Insearch") {
          insearchTitlesTemp.push(responses.title)
          insearchTitlesIndexTemp.push(i)
        }
        return (<></>)
      })

      let staffTitlesTemp2 = staffTitlesIndexTemp
      let studentTitlesTemp2 = studentTitlesIndexTemp
      let toCloseTitlesTemp2 = toCloseTitlesIndexTemp
      let postItsTitlesTemp2 = postItsTitlesIndexTemp
      let referToCatalogueTitlesTemp2 = referToCatalogueTitlesIndexTemp
      let insearchTitlesTemp2 = insearchTitlesIndexTemp  
      
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
      }

      setStaffTitles(staffTitlesTemp2)
      setStudentTitles(studentTitlesTemp2)
      setToCloseTitles(toCloseTitlesTemp2)
      setPostItsTitles(postItsTitlesTemp2)
      setReferToCatalogueTitles(referToCatalogueTitlesTemp2)
      setInsearchTitles(insearchTitlesTemp2)
      setAllTitles(staffTitlesTemp2.concat(studentTitlesTemp2).concat(toCloseTitlesTemp2).concat(postItsTitlesTemp2).concat(referToCatalogueTitlesTemp2).concat(insearchTitlesTemp2))

      setAllTabLable("All (" + (staffTitlesTemp2.length + studentTitlesTemp2.length + toCloseTitlesTemp2.length + postItsTitlesTemp2.length + referToCatalogueTitlesTemp2.length + insearchTitlesTemp2.length) + ")")
      setStaffTabLable("Staff (" +  staffTitlesTemp2.length + ")")
      setStudentTabLable("Student (" +  studentTitlesTemp2.length + ")")
      setToCloseTabLable("To Close (" +  toCloseTitlesTemp2.length + ")")
      setPostItsTabLable("Post-its (" +  postItsTitlesTemp2.length + ")")
      setReferToCatalogueTabLable("Refer To Catalogue (" +  referToCatalogueTitlesTemp2.length + ")")
      setInsearchTabLable("Insearch0 (" +  insearchTitlesTemp2.length + ")")
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
          sameSameError = 1
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
                <Typography
                  variant="h6"
                  noWrap
                  component="span"
                  sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                >
                ITSC Personalised Responses
                </Typography>
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
              <Tab label={allTabLable} {...a11yProps(0)} />
              <Tab label={staffTabLable} {...a11yProps(1)} />
              <Tab label={studentTabLable} {...a11yProps(2)} />
              <Tab label={toCloseTabLable} {...a11yProps(3)} />
              <Tab label={postItsTabLable} {...a11yProps(4)} />
              <Tab label={referToCatalogueTabLable} {...a11yProps(5)} />
              <Tab label={insearchTabLable} {...a11yProps(6)} />
              {(() => {
                if (userEmail !== null){
                  if (userEmail.endsWith('@uts.edu.au')){
                    return (<Tab label="Create New" {...a11yProps(7)} />)
                  }
                } 
              })()}
            </Tabs>
          </Box>
        
          <TabPanel value={tabValue} index={0}>
            <ResponceOverView titles={allTitles} responses={responses} userName={userName} userEmail={userEmail} />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <ResponceOverView titles={staffTitles} responses={responses} userName={userName} userEmail={userEmail} />
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            <ResponceOverView titles={studentTitles} responses={responses} userName={userName} userEmail={userEmail} />
          </TabPanel>
          <TabPanel value={tabValue} index={3}>
            <ResponceOverView titles={toCloseTitles} responses={responses} userName={userName} userEmail={userEmail} />
          </TabPanel>
          <TabPanel value={tabValue} index={4}>
            <ResponceOverView titles={postItsTitles} responses={responses} userName={userName} userEmail={userEmail} />
          </TabPanel>
          <TabPanel value={tabValue} index={5}>
            <ResponceOverView titles={referToCatalogueTitles} responses={responses} userName={userName} userEmail={userEmail} />
          </TabPanel>
          <TabPanel value={tabValue} index={6}>
            <ResponceOverView titles={insearchTitles} responses={responses} userName={userName} userEmail={userEmail} />
          </TabPanel>
          <TabPanel value={tabValue} index={7}>
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
                      <InputLabel id="selest-lable">Class</InputLabel>
                      <Select
                          labelId="Title-select-label"
                          id="select"
                          value={newResponsesClass}
                          label="Class"
                          onChange={(event) => {setnewResponsesClass(event.target.value)}}
                      >
                        <MenuItem value="Staff">Staff</MenuItem>
                        <MenuItem value="Student">Student</MenuItem>
                        <MenuItem value="To Close">To Close</MenuItem>
                        <MenuItem value="Post-its">Post-its</MenuItem>
                        <MenuItem value="Refer To Catalogue">Refer To Catalogue</MenuItem>
                        <MenuItem value="Insearch">Insearch</MenuItem>
                      </Select>
                      <OutlinedInput placeholder="Title" onChange={(event) => {setnewResponsesTitle(event.target.value)}} />
                      <Button disabled={canBeCreated} variant="outlined" onClick={createResponses}>Create New Personalised Responses</Button>
                      <p>{error}</p>
                    </FormControl>
                </Box>

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
            </Box>
          </TabPanel>
        </Box>
        
      </div>
    )
    
}
