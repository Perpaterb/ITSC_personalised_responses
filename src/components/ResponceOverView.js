import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

export default function ResponceOverView(props) {
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
        <Box sx={{ width: '15%'}}>
            {props.titles.map((item) => (
                <ListItem key={item} component="div" disablePadding>
                    <ListItemButton>
                    <ListItemText primary={props.responses[item].title}/>
                    </ListItemButton>
                </ListItem>
            ))}
        </Box>
        <Box sx={{ width: '75%', maxWidth: '800px' }}>
            {props.titles.map((item) => (
                <ListItem key={item} component="div" disablePadding>
                    <ListItemButton>
                     <p dangerouslySetInnerHTML={{ __html: props.responses[item].body }}/>
                    </ListItemButton>
                </ListItem>
            ))}
        </Box>
    </Box>
  );
}
