import { Box, Button, Card, CardActions, CardContent, CardHeader, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import DetailModal from 'src/@core/components/modals/ImageDetailModal'
import CustomAvatar from 'src/@core/components/mui/avatar'

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


const ReportCard = ({ item, reportAction }) => {
  const [detailModalFlag, setDetailModalFlag] = useState(false)

  const handleImageDetailModalOpen = () => {
    setDetailModalFlag(true)
  }

  const handleImageDetailModalClose = () => {
    setDetailModalFlag(false)
  }

  return (
    <>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card>
          <CardHeader title={`Report Id: ${item.id}`} />
          <CardContent>
            <img src={item.image.image_url} width="100%" onClick={() => handleImageDetailModalOpen()} style={{ cursor: 'pointer' }} />
            <Box sx={{ display: 'flex', alignItems: 'center', verticalAlign: "center" }}>
              {renderClient(item.user)}
              <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                <Typography variant='caption'>
                  {`Reported by ${item.user.username}`}
                </Typography>
                <Typography variant='caption'>
                  {`${item.image.created.split("T")[0]}`}
                </Typography>
              </Box>
            </Box>
            <Typography><strong>Content</strong> : {item.content}</Typography>
          </CardContent>
          <CardActions>
            <Button onClick={() => reportAction(item, 'allow')}>Allow</Button>
            <Button onClick={() => reportAction(item, 'deny')}>Deny</Button>
          </CardActions>
        </Card>
      </Grid>
      <DetailModal
        detailModalFlag={detailModalFlag}
        img={item.image}
        handleClose={handleImageDetailModalClose}
      />
    </>
  )
}

export default ReportCard
