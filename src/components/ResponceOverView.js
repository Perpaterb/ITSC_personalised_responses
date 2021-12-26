import React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function copy(text, name) {

const greating  = "Hi ______, \n \n"
const sightOff = "\n \nKind regards,\n" + name + "\nIT Support Centre"
const allText = greating + text + sightOff
navigator.clipboard.writeText(allText)
}


export default function ResponceOverView(props) {


  const titles = props.responses

  const refs = titles.reduce((titles, value) => {
    titles[value.id] = React.createRef();
    return titles;
  }, {});

  console.log(refs)

  const handleClick = id =>
  refs[id].current.scrollIntoView({
    behavior: 'smooth',
  });

  return (
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
            {props.titles.map((item) => (
                <ListItem key={item} component="div" disablePadding>
                    <ListItemButton>
                    <ListItemText onClick={() => handleClick(props.responses[item].id)} primary={<Typography variant="h5" style={{ color: '#ff6f00' }}> {props.responses[item].title} </Typography>}/>
                    </ListItemButton>
                </ListItem>
            ))}
        </Box>
        <Box sx={{ width: '75%', maxWidth: '800px' }}>
            {props.titles.map((item) => (
                <ListItem key={item.id} ref={refs[props.responses[item].id]} component="div" disablePadding>
                    <ListItem>
                        <Box>
                            <h2 dangerouslySetInnerHTML={{ __html: props.responses[item].title}}/>
                            <p dangerouslySetInnerHTML={{ __html: props.responses[item].body}}/>
                            <Button 
                                onClick={() => {copy(props.responses[item].body.replace(/<[^>]+>/g, '\n'), props.userName)}} 
                                style={{height: '40px' , backgroundColor: '#205055',position: 'absolute', right: '10px',top: '20px'}}>
                                <h4>Copy</h4>
                            </Button>
                        </Box>
                    </ListItem>
                </ListItem>
            ))}
        </Box>
    </Box>
  );
}
