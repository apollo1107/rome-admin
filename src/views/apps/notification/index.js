// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import FormControlLabel from '@mui/material/FormControlLabel'
import { useDispatch } from 'react-redux'
import { addNotification } from 'src/store/apps/notification'

const TableHeader = props => {
  // ** Props
  const { value, handleFilter } = props

  // ** State
  const [open, setOpen] = useState(false)
  const handleDialogToggle = () => setOpen(!open)
  const [contentObj, setContentObj] = useState({ notification_name: '', notification_title: '', notification_description: '' })

  const handleChange = (e, type) => {
    setContentObj(prev => {
      let content = Object.assign({}, prev)
      content[type] = e.target.value
      return content
    })
  }

  const dispatch = useDispatch()

  const onSubmit = async e => {
    setOpen(false)
    e.preventDefault()
    await dispatch(addNotification(contentObj))
  }

  return (
    <>
      <Box
        sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <TextField
          size='small'
          value={value}
          sx={{ mr: 4, mb: 2 }}
          placeholder='Search Permission'
          onChange={e => handleFilter(e.target.value)}
        />
        <Button sx={{ mb: 2 }} variant='contained' onClick={handleDialogToggle}>
          Add Notification
        </Button>
      </Box>
      <Dialog fullWidth maxWidth='sm' onClose={handleDialogToggle} open={open}>
        <DialogTitle sx={{ pt: 12, mx: 'auto', textAlign: 'center' }}>
          <Typography variant='h5' component='span' sx={{ mb: 2 }}>
            Add New Notification Content
          </Typography>
          <Typography variant='body2'>Contents you may use and assign to your users.</Typography>
        </DialogTitle>
        <DialogContent sx={{ pb: 12, mx: 'auto' }}>
          <Box
            component='form'
            onSubmit={e => onSubmit(e)}
            sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
          >
            <TextField
              fullWidth
              label='Notification Name'
              sx={{ mb: 1, maxWidth: 360 }}
              placeholder='Enter Notification Name'
              value={contentObj.notification_name}
              onChange={e => handleChange(e, 'notification_name')}
            />
            <TextField
              fullWidth
              label='Notification Title'
              sx={{ mb: 1, maxWidth: 360 }}
              placeholder='Enter Notification Title'
              value={contentObj.notification_title}
              onChange={e => handleChange(e, 'notification_title')}
            />
            <TextField
              fullWidth
              label='Notification Description'
              sx={{ mb: 1, maxWidth: 360 }}
              placeholder='Enter Notification Description'
              value={contentObj.notification_description}
              onChange={e => handleChange(e, 'notification_description')}
            />
            {/* <FormControlLabel control={<Checkbox />} label='Set as core permission' /> */}
            <Box className='demo-space-x' sx={{ '& > :last-child': { mr: '0 !important' } }}>
              <Button size='large' type='submit' variant='contained'>
                Create Permission
              </Button>
              <Button type='reset' size='large' variant='outlined' color='secondary' onClick={handleDialogToggle}>
                Discard
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default TableHeader
