import { makeStyles, fade } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container:{
        justifyContent: 'center',
        alignItems: 'center'

    },
    insideGrid:{
        margin: theme.spacing(2,0,0,2)
    },
    title:{
        padding: theme.spacing(1),
        flexDirection:'column',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textFieldGrid:{
        justifyContent:'center',
        alignItems:'center',
        margin: theme.spacing(3,0),
        flexDirection: 'column'
    },
    buttons:{
        margin: theme.spacing(3),
        justifyContent: 'space-between'
    },
    cancelButton:{
        margin:theme.spacing(0,3)
    },
    textField:{
        width:'60%',
        [theme.breakpoints.down('sm')]:{
            width: '90%'
        }
    }
}))
 
export default useStyles;