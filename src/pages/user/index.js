// ** React Imports
import { useState, useEffect, useCallback } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import { DataGrid } from '@mui/x-data-grid'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import Select from '@mui/material/Select'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Actions Imports
import { fetchData, deleteUser, updateUser } from 'src/store/apps/user'

// ** Custom Table Components Imports
import TableHeader from 'src/views/apps/user/list/TableHeader'
import AddUserDrawer from 'src/views/apps/user/list/AddUserDrawer'
import { Button } from '@mui/material'
import IOSSwitch from 'src/@core/components/switch'
import ConfirmModal from 'src/@core/components/modals/ConfirmModal'
import { useAuth } from 'src/hooks/useAuth'

// ** Vars
const userRoleObj = {
  staff: { icon: 'mdi:laptop', color: 'error.main' },
  user: { icon: 'mdi:cog-outline', color: 'warning.main' }
}

// ** renders client column
const renderClient = row => {
  const baseUrl = window.localStorage.getItem('baseUrl')
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

const overlayStyle = {
  position: 'fixed', // Overlay fixed to cover the whole screen
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent background
  zIndex: 1000, // High z-index to cover everything else
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

const loaderStyle = {
  // Style your loader
}

const UserList = ({ apiData }) => {
  // ** State
  const [role, setRole] = useState('')
  const [value, setValue] = useState('')
  const [status, setStatus] = useState('')
  const [pageSize, setPageSize] = useState(10)
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [actionLoading, setActionLoading] = useState(false)
  const [selUser, setSelUser] = useState(null)
  const [confirmModalFlag, setConfirmModalFlag] = useState(false)

  const auth = useAuth()
  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector(state => state.user)
  useEffect(() => {
    dispatch(
      fetchData({
        role,
        status,
        username: value
      })
    )
  }, [dispatch, role, status, value])

  const handleFilter = useCallback(val => {
    setValue(val)
  }, [])

  const handleRoleChange = useCallback(e => {
    setRole(e.target.value)
  }, [])

  const handleStatusChange = useCallback(e => {
    setStatus(e.target.value)
  }, [])

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)

  const handleConfirmModalOpen = user => {
    setConfirmModalFlag(true)
    setSelUser(user)
  }

  const handleConfirmModalClose = () => {
    setConfirmModalFlag(false)
    setSelUser(null)
  }

  const handleUpdateUser = async (id, value, type) => {
    setActionLoading(true)
    await dispatch(updateUser({ user_id: id, [type]: value }))
    setActionLoading(false)
  }

  const handleDeleteUser = async () => {
    // setActionLoading(true)
    await dispatch(deleteUser({ user_id: selUser.id }))
    // setActionLoading(false)
    handleConfirmModalClose()
  }

  const columns = [
    {
      flex: 0.2,
      minWidth: 230,
      field: 'username',
      headerName: 'User',
      renderCell: ({ row }) => {
        const { fullName, username } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderClient(row)}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography noWrap variant='caption'>
                {`@${username}`}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 250,
      field: 'email',
      headerName: 'Email',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap variant='body2'>
            {row.email}
          </Typography>
        )
      }
    },
    {
      flex: 0.15,
      field: 'is_staff',
      minWidth: 150,
      sortable: false,
      headerName: 'Role',
      renderCell: ({ row }) => {
        return auth.user.is_superuser ? (
          <IOSSwitch checked={row.is_staff} onChange={e => handleUpdateUser(row.id, e.target.checked, 'is_staff')} />
        ) : (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              '& svg': { mr: 3, color: userRoleObj[row.is_staff ? 'staff' : 'user'].color }
            }}
          >
            <Icon icon={userRoleObj[row.is_staff ? 'staff' : 'user'].icon} fontSize={20} />
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              {row.is_superuser ? 'Admin' : row.is_staff ? 'Viewer' : 'User'}
            </Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 110,
      field: 'is_active',
      headerName: 'Status',
      renderCell: ({ row }) => {
        // return (
        //   <IOSSwitch checked={row.is_active} onChange={e => handleUpdateUser(row.id, e.target.checked, 'is_active')} />
        // )
        return auth.user.is_superuser ? (
          <IOSSwitch checked={row.is_active} onChange={e => handleUpdateUser(row.id, e.target.checked, 'is_active')} />
        ) : (
          <Typography>-</Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 110,
      field: 'created',
      headerName: 'Created',
      renderCell: ({ row }) => {
        return <Typography>{row.created}</Typography>
      }
    },
    {
      flex: 0.1,
      minWidth: 110,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      align: 'center',
      renderCell: ({ row }) =>
        auth.user.is_superuser ? (
          <Button id={row.id} variant='contained' onClick={() => handleConfirmModalOpen(row)}>
            Delete
          </Button>
        ) : (
          <Typography>-</Typography>
        )
    }
  ]

  return (
    <>
      {actionLoading && (
        <div style={overlayStyle}>
          <div style={loaderStyle}>
            {/* Loading spinner or message */}
            Loading...
          </div>
        </div>
      )}
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Search Filters' />
            <CardContent>
              <Grid container spacing={6}>
                <Grid item sm={6} xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id='role-select'>Select Role</InputLabel>
                    <Select
                      fullWidth
                      value={role}
                      id='select-role'
                      label='Select Role'
                      labelId='role-select'
                      onChange={handleRoleChange}
                      inputProps={{ placeholder: 'Select Role' }}
                    >
                      <MenuItem value=''>Select Role</MenuItem>
                      <MenuItem value='staff'>Staff</MenuItem>
                      <MenuItem value='user'>User</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id='status-select'>Select Status</InputLabel>
                    <Select
                      fullWidth
                      value={status}
                      id='select-status'
                      label='Select Status'
                      labelId='status-select'
                      onChange={handleStatusChange}
                      inputProps={{ placeholder: 'Select Status' }}
                    >
                      <MenuItem value=''>Select Status</MenuItem>
                      <MenuItem value='active'>Active</MenuItem>
                      <MenuItem value='inactive'>Inactive</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <TableHeader value={value} handleFilter={handleFilter} toggle={toggleAddUserDrawer} />
            <DataGrid
              autoHeight
              rows={store.data}
              columns={columns}
              checkboxSelection
              pageSize={pageSize}
              disableSelectionOnClick
              rowsPerPageOptions={[10, 25, 50]}
              onPageSizeChange={newPageSize => setPageSize(newPageSize)}
            />
          </Card>
        </Grid>

        <AddUserDrawer open={addUserOpen} toggle={toggleAddUserDrawer} />
        <ConfirmModal
          confirmModalFlag={confirmModalFlag}
          content={`Are you sure you want to delete this user (${selUser?.username})?`}
          handleConfirm={handleDeleteUser}
          handleClose={handleConfirmModalClose}
        />
      </Grid>
    </>
  )
}

export default UserList
