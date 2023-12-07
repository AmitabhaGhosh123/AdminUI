import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allUsers: [],
  allUsersCopy: [],
  message: '',
  columnHeaderName: '',
  columnHeaderEmail: '',
  columnHeaderRole: ''
}

export const AppsSlice = createSlice({
  name: 'apps',
  initialState,
  reducers: {
    setAllUsers: (state,action)=>{
      state.allUsers = action.payload
    },
    setAllUsersCopy: (state,action)=>{
      state.allUsersCopy = action.payload
    },
    setMessage: (state,action)=>{
      state.message = action.payload
    },
    setColumnHeaderName: (state,action)=>{
      state.columnHeaderName = action.payload
    },
    setColumnHeaderEmail: (state,action)=>{
      state.columnHeaderEmail = action.payload
    },
    setColumnHeaderRole: (state,action)=>{
      state.columnHeaderRole = action.payload
    }
  },
})

export const { 
  setAllUsers,setAllUsersCopy,setMessage,
  setColumnHeaderName,setColumnHeaderEmail,setColumnHeaderRole,
  setUpdateShowProperties
  } = AppsSlice.actions

export default AppsSlice.reducer
