import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { Delete } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

export default function DeleteButton(handleDelete) {
  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <IconButton color="primary" aria-label="upload picture" component="span" {...bindTrigger(popupState)} >
            <Delete />
          </IconButton>
          <Popover {...bindPopover(popupState)} anchorOrigin={{vertical: 'bottom',horizontal: 'center',}} transformOrigin={{vertical: 'top',horizontal: 'center',}}>
            <Box p={2}>
              <Button type="button" color="secondary" variant="contained" onClick={handleDelete()} style={{margin:'0 5px'}}>Delete</Button>
              <Button type="button" color="primary" style={{margin:'0 5px'}} onClick={popupState.close}>Cancel</Button>
            </Box>
          </Popover>
        </div>
      )}
    </PopupState>
  );
}
