import * as React from "react";
import { Box, Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import { GridCloseIcon } from "@mui/x-data-grid";
import CustomAvatar from 'src/@core/components/mui/avatar'
import { getInitials } from 'src/@core/utils/get-initials'

export default function DetailModal({
  detailModalFlag,
  img,
  handleClose,
}) {
  const renderClient = row => {
    const baseUrl = window.localStorage.getItem("baseUrl")
    if (row.avatar) {
      return <CustomAvatar src={`${baseUrl}/${row.avatar}`} sx={{ mr: 3, width: 30, height: 30 }} />
    } else {
      return (
        <CustomAvatar
          skin='light'
          color={row.avatarColor || 'primary'}
          sx={{ mr: 3, width: 30, height: 30, fontSize: '.875rem' }}
        >
          {getInitials(row.username ? row.username : 'John Doe')}
        </CustomAvatar>
      )
    }
  }

  return (
    <>
      {img &&
        (<Dialog open={detailModalFlag} onClose={handleClose}>
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography>Image Id: {img.id}</Typography>
            <IconButton onClick={() => handleClose()}>
              <GridCloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <img src={img?.image_url} alt="image_detail" width="100%" />
            <Box sx={{ display: 'flex', alignItems: 'center', my: 5 }}>
              {renderClient(img.creators[0])}
              <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                <Typography variant='caption'>
                  {`Created by ${img.creators[0].username} ${img.creators[1] ? "with " + img.creators[1].username : ""}`}
                </Typography>
                <Typography variant='caption'>
                  {`${img.created.split("T")[0]} ${img.created.split("T")[1].split(".")[0]}`}
                </Typography>
              </Box>
            </Box>
            <Typography>
              <strong>Image Description</strong> :
            </Typography>
            <Typography id="modal-modal-description" sx={{ my: 5 }}>
              {img?.image_description}
            </Typography>
          </DialogContent>
        </Dialog>
        )
      }
    </>
  );
}
