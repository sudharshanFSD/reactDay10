import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container, Grid, Snackbar, Typography, Paper, Button, Alert } from '@mui/material'
import UserItem from './UserItem';
import UserForm from './UserForm';
function UserList() {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [snackbar, setSnackbar] = useState({open: false, message: '', severity: 'success'});

  useEffect(() => {
    fetchUsers();
  }, [])
  const fetchUsers = async () => {
    try{
      const response = await axios.get("https://jsonplaceholder.typicode.com/users");
      setUsers(response.data)
    }catch(error){
      console.log('Error fetching Users:' , error)
      snackbar('Error Fetching Users', 'error')
    }
  }
  const addUser = async(user) => {
    try {
      const response = await axios.post("https://jsonplaceholder.typicode.com/users/", user);
      // setUsers(response.data);
      setUsers([...users, response.data]);
      showSnackbar('users Added successfully', 'success');
      setEditingUser(null);
    } catch (error) {
      console.log('Error Adding Users:' , error)
      showSnackbar('Error Adding Users', 'error')
    }      
  }
  const updateUser = async(user) => {
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/users/${user.id}`, user);
      setUsers(users.map((u)=>(u.id === user.id ? user : u)));
      setEditingUser(null);
      showSnackbar('users Updated successfully', 'success')
    } catch (error) {
      console.log('Error Updating Users:', error);
      showSnackbar('Error Updating Users', 'error')
    }      
  }
  const deleteUser = async(id) => {
    try {
      await axios.delete("https://jsonplaceholder.typicode.com/users/${id}");
      setUsers(users.filter((user)=>user.id !== id));
      showSnackbar('users Deleted successfully', 'success')
    } catch (error) {
      console.log('Error Deleting Users:' , error)
      showSnackbar('Error Deleting Users', 'error')
    }
  }
  const showSnackbar = (message, severity) =>{
    setSnackbar({open: true, message, severity})
  }
  const handleSnackbarClose = () => {
    setSnackbar({...snackbar, open: false})
  }
  return (
  <Container>
    <Paper elevation={3} style={{padding: '20px', margin: '20px'}}>
    <Typography variant='h4' gutterBottom style={{textAlign: 'center', color: 'orange'}}>
    Users Management
    </Typography>
    <Grid container spacing={3}>
      {users.map((user)=>(
      <UserItem key={user.id} user={user} onEdit={setEditingUser} onDelete={deleteUser}/>
    ))}
    </Grid>
    <Button variant='contained' style={{marginTop: '20px'}} onClick={()=>setEditingUser({})}>Add user</Button>
    {editingUser && (
      <UserForm user={editingUser} onSave={editingUser.id ? updateUser : addUser} onCancel={ ()=>setEditingUser(null)}/>
    )}
    </Paper>
    <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleSnackbarClose}>
      <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{width: "100%"}}>
      {snackbar.message}
      </Alert>
    </Snackbar>
  </Container>
  )
}

export default UserList