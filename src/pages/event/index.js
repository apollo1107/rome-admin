// ** MUI Imports

import { Button, Grid } from "@mui/material"
import { apiClient, postRequest } from "src/configs/api"

const Event = () => {
  const syncData = async () => {
    try {
      const res = await apiClient.post("/admin/sync-data")
    } catch (error) {

    }
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Button onClick={() => { syncData() }}>sync data</Button>
      </Grid>

    </Grid>
  )
}

export default Event
