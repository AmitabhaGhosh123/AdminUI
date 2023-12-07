import * as React from 'react';
import { UsersTable } from '../Table/Userstable';
import { constants } from '../../constants/Constants';
import { useDispatch, useSelector } from 'react-redux';
import { setAllUsers, setAllUsersCopy, setColumnHeaderEmail, 
         setColumnHeaderName, setColumnHeaderRole, setMessage } from '../../redux-store/AppSlice';
import useApiClient from '../../ApiClient';
import "./styles/homepage.css";

export const HomePage = () => {
  let arr = [];
  const apiClient = useApiClient();
  const dispatch = useDispatch();
  const {message,allUsers,allUsersCopy} = useSelector((state) => state.apps);
  const [showErrorMessage,setShowErrorMessage] = React.useState(false);
  const [searchValue,setSearchValue] = React.useState('');

  React.useEffect(()=>{
    getAllUsers();
  },[]);

  // Function to get list of users from api
  const getAllUsers = () => {
    apiClient.get(constants.apiEndPointUrl + "/members.json")
     .then((resp)=> {
        const updatedUsers = resp.data.map((user) => {
        // Add new keys to each object
        return {
          ...user,
          showInput: false,
          showNormal: true,
        };
        });
        dispatch(setAllUsers(updatedUsers));
        dispatch(setAllUsersCopy(updatedUsers));
        setShowErrorMessage(false);
        modifyColumnNames(updatedUsers);
     })
     .catch((error)=>{
        setShowErrorMessage(true);
        dispatch(setAllUsers([]));
        dispatch(setAllUsersCopy([]));
        if(error.status === '404') 
          dispatch(setMessage('No records found'));
        else 
          dispatch(setMessage('Failed to load data'));
     })
  }

  // Function to change first letter of column name to uppercase
  const modifyColumnNames = (users) => {
    let str1 = (Object.keys(users[0])[1]).charAt(0).toUpperCase() + (Object.keys(users[0])[1]).slice(1);
    let str2 = (Object.keys(users[0])[2]).charAt(0).toUpperCase() + (Object.keys(users[0])[2]).slice(1);
    let str3 = (Object.keys(users[0])[3]).charAt(0).toUpperCase() + (Object.keys(users[0])[3]).slice(1);
    dispatch(setColumnHeaderName(str1));
    dispatch(setColumnHeaderEmail(str2));
    dispatch(setColumnHeaderRole(str3));
  }

  // Function to search user based on name,email or role
  const searchUser = (event) => {
    let str = event.target.value;
    setSearchValue(str);
    if (str) {
      if (allUsers.some((b) => (b['name'] != null && b['name'].includes(str))
        || (b['email'] != null && b['email'].toLowerCase().includes(str.toLowerCase()))
        || (b['role'] != null && b['role'].toLowerCase().includes(str.toLowerCase())))) {
         arr = allUsers.filter((b) => {
          return (b['name'] != null && b['name'].includes(str)) ||
            (b['email'] != null && b['email'].toLowerCase().includes(str)) ||
            (b['role'] != null && b['role'].toLowerCase().includes(str));
        })
        dispatch(setAllUsers(arr));
      }
      else {
        dispatch(setAllUsers(allUsersCopy));
      }
    }
    else {
      dispatch(setAllUsers(allUsersCopy));
    }
  }

  return (
    <>
      <section role="searchbox" className="search-container">
        <input 
         type="text" 
         className="search-box mt-2" 
         placeholder="Search by name,email or role"
         value={searchValue}
         onChange={(e)=>searchUser(e)} />
      </section>

      {
        !showErrorMessage ? <UsersTable /> : <span className="error-message">{message}</span> 
      }

    </>
  )
}