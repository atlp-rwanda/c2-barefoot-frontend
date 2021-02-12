import React from 'react'
import DashboardIcon from '@material-ui/icons/Dashboard';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import GroupIcon from '@material-ui/icons/Group';
import CommuteIcon from '@material-ui/icons/Commute';

export const sideBarData = [
    {
        title:"Dashboard",
        icon:<DashboardIcon />,
        link:"/home"
    },
      {
         title:"Accomodation",
        icon:<AddLocationIcon />,
        link:"/accomodation"
    },
    {
        title:"Travel requests",
        icon:<CommuteIcon />,
        link:"/managerTravel"
    }
]


