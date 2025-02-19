import { Grid, Typography, Card, CardContent, CardActions, Button } from '@mui/material'
import React from 'react'

function UserItem({ user, onEdit, onDelete }) {
  return (
   <Grid item xs={12} sm={6} md={4}>
    <Card style={{backgroundColor: 'peachpuff'}}>
        <CardContent>
            <Typography variant='h5' style={{color: 'black'}}>
                {user.name}
            </Typography>
            <Typography color="black">
                {user.email}
            </Typography> 
        </CardContent>
        <CardActions>
            <Button size='small' color='primary' onClick={()=>onEdit(user)}>Edit</Button>
            <Button size='small' color='secondary' onClick={()=>onDelete(user.id)}>Delete</Button>
        </CardActions>
    </Card>
   </Grid>
  )
}

export default UserItem