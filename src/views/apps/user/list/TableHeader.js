// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const TableHeader = props => {
  // ** Props
  const { handleFilter, toggle, value } = props

  return (
    <Box sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-end' }}>
      <TextField
        size='small'
        value={value}
        sx={{ mr: 4, mb: 2 }}
        placeholder='Search User'
        onChange={e => handleFilter(e.target.value)}
      />

      {/* <Button sx={{ mb: 2 }} onClick={toggle} variant='contained'>
        Add User
      </Button> */}
    </Box>
  )
}

export default TableHeader
