import { makeStyles, fade } from '@material-ui/core/styles';
import colors from '../colors';
const useStyles = makeStyles((theme) => ({
    main:{
        backgroundColor: colors.primary200,
        width:'90%',
        margin:'auto',
        color:colors.neutralWhite,
        justifyContent: 'space-evenly',
        padding: theme.spacing(3),
    },
    searchLocation:{
        display:'flex',
        position: 'relative',
        width: '100%',
        backgroundColor: fade(theme.palette.common.white, 0.10),
        '&:hover':{
            backgroundColor: fade(theme.palette.common.white, 0.20)
        } ,
        padding: 0
    },
    searchIcon:{
        position:'absolute',
        padding: theme.spacing(0,1),
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchInput:{
        padding: theme.spacing(0,1,0,0),
        paddingLeft: '3em',
        color: 'inherit',
        width:'100%',
        border: '1px solid white'
    },
    dates:{
        padding: theme.spacing(1,0)
    },
    datesPicker:{
        color:colors.neutralWhite,
    },
    addButton:{
        color: colors.primary100,
        margin: theme.spacing(3,0,0,0)
    },
    searchCurrentLocation:{
        width: 300,
        padding:0,
        paddingLeft: '2em',

    },
    inputText:{
        color: colors.neutralWhite,
        margin: theme.spacing(0,2)
    },
    oneSelected:{
        margin:theme.spacing(0,0,1,0),
        color: colors.primary100,
        justifyContent:'flex-end',
        cursor: 'pointer',
    },
    closeSelectedLocations:{
        background:colors.red,
        display: 'block',
        color: colors.neutralWhite,
        borderRadius: '50%',
        padding: theme.spacing(0,1),
        paddingTop: '5px',
        paddingBottom:'5px',
        cursor: 'pointer',
        float:'right',
        fontWeight: 'bold',
        fontSize:'20px'
    },
    citiesSelected:{
        background:colors.neutralWhite,
        display:"block",
        padding: theme.spacing(1),
        borderRadius: '3px 15px 3px 3px',
        margin: theme.spacing(1),

    }
}))

export default useStyles;