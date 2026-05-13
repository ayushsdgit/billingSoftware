import React from 'react'

import UserForm from '../../components/UserForm/UserForm';
import UserList from '../../components/UserList/UserList';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { fetchUsers } from '../../Service/UserService';




import './ManageUsers.css';

const ManageUsers = () => {

  const[users, setUsers] = React.useState([]);
  const[loading, setLoading] = React.useState(false);

  useEffect(() => {
    // Fetch users when the component mounts
    async function loadUsers() {
      
      try {
        setLoading(true);
        const response = await fetchUsers();
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        toast.error('Failed to load users');
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);
  return (
    <div className='manage-users'>
      <div className='left-Col'>
        <UserForm setUsers={setUsers} />
      </div>

      <div className='right-Col'>
          <UserList users={users} setUsers={setUsers} />
      </div>
    
    </div>
  )
}

export default ManageUsers
