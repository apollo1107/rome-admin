import { Card, CardContent, CardHeader, Grid, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { deleteReport, fetchData } from 'src/store/apps/report'
import ReportCard from 'src/views/apps/report/ReportCard'

const ReportPage = () => {

  const dispatch = useDispatch()
  const store = useSelector(state => state.report)
  useEffect(() => {
    dispatch(
      fetchData()
    )
  }, [dispatch])

  const notify = (msg) => toast(msg);

  const handleReportImage = async (item, type) => {
    await dispatch(deleteReport({ item, type }))
    notify(`Report ${item.id} ${type === "deny" ? "deni" : type}ed successfully`)
  }
  return (
    <>
      <Card sx={{ mb: 4 }}>
        <CardHeader
          title='Report OverView'
          titleTypographyProps={{
            sx: {
              mb: 2.25,
              lineHeight: '2rem !important',
              letterSpacing: '0.15px !important'
            }
          }}
        />
        <CardContent sx={{ pt: theme => `${theme.spacing(0.75)} !important` }}>
          <Grid container spacing={[5, 0]}>
            {/* {renderStats()} */}
          </Grid>
        </CardContent>
      </Card >
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {store.data.length > 0 ?
          (store.data.map((item, idx) => (
            <ReportCard key={idx} item={item} reportAction={handleReportImage} />
          ))) :
          (<>
            <Typography sx={{ p: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>There is no report</Typography>
          </>)
        }
      </Grid>
    </>
  )
}

export default ReportPage
