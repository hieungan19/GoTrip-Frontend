import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  TextField,
  InputAdornment,
  Box,
} from '@mui/material';
import UserList from './UserList';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {
  STORE_FOLLOWEES,
  STORE_FOLLOWERS,
  STORE_USERS,
} from '../../redux/slice/userSlice';
import { selectToken } from '../../redux/slice/authSlice';

const SearchUserList = ({ openDialog, handleCloseDialog, isDialog = true }) => {
  const API_URL = process.env.REACT_APP_API_URL;
  const [users, setUsers] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [followees, setFollowees] = useState([]);
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');

  //search input
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/users`, {
        headers: {
          Accept: 'application/json',
          'ngrok-skip-browser-warning': '69420',
        },
      });
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchFollowers = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/user-relationships/followers`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const followers = response.data.followers;
      setFollowers(followers);
      dispatch(STORE_FOLLOWERS({ followers: followers }));
    } catch (error) {
      console.log(error.message);
    }
  };
  const fetchFollowees = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/user-relationships/followees`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const followees = response.data.followees;
      setFollowees(followees);
      dispatch(STORE_FOLLOWEES({ followees: followees }));
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchDataAndDispatch = async () => {
    const users = await fetchUsers();
    await fetchFollowees();
    await fetchFollowers();
    if (users) {
      setUsers(users);
      setFollowers(followers);
      setFollowees(followees);

      dispatch(STORE_USERS({ users: users }));
    }
  };

  useEffect(() => {
    fetchDataAndDispatch();
  }, []);

  const filteredUsers = users
    ? users.filter((u) =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  useEffect(() => {}, []);
  return isDialog ? (
    <>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth='sm'
        sx={{ height: '80%' }}
      >
        <DialogContent>
          <TextField
            label='Search'
            variant='outlined'
            fullWidth
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ marginBottom: '16px' }}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <UserList
            text={'Suggest Friend'}
            users={filteredUsers.slice(0, 8)}
            followees={followees}
          />
        </DialogContent>
      </Dialog>
    </>
  ) : (
    <Box mt={2} mx={4} width={'300px'}>
      <TextField
        label='Search'
        variant='outlined'
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ marginBottom: '16px' }}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <UserList
        text={'Suggest Friend'}
        users={filteredUsers.slice(0, 8)}
        followees={followees}
      />
    </Box>
  );
};

export default SearchUserList;
