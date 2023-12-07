import * as React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit,faTrash,faCheck } from '@fortawesome/free-solid-svg-icons';
import  Pagination  from '../TablePagination/TablePagination';
import { setAllUsers } from '../../redux-store/AppSlice';
import "./styles/tablerow.css";

export const TableRow = () => {
    let pageSize = 10;
    const dispatch = useDispatch();
    const {columnHeaderName,columnHeaderEmail,columnHeaderRole,allUsers} = useSelector((state) => state.apps);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [selectAllChecked,setSelectAllChecked] = React.useState(false);
    const [checkboxes, setCheckboxes] = React.useState(Array(pageSize).fill(false));
    const [name,setName] = React.useState('');
    const [email,setEmail] = React.useState('');
    const [role,setRole] = React.useState('');

    // Displaying only 10 records in each page
    const currentTableData = React.useMemo(() => {
      if (!allUsers || allUsers.length === 0) 
        return [];

      const firstPageIndex = (currentPage - 1) * pageSize;
      const lastPageIndex = firstPageIndex + pageSize;
      const newCheckboxes = allUsers.slice(firstPageIndex, lastPageIndex).map(() => false);

      setCheckboxes(newCheckboxes);
      setSelectAllChecked(false);

      return allUsers.slice(firstPageIndex, lastPageIndex);
    }, [currentPage,allUsers]);

    // Function to toggle the "Select All" checkbox for the current page
    const handleSelectAllChange = () => {
      
      setSelectAllChecked(!selectAllChecked);
      const updatedCheckboxes = checkboxes.map(() => !selectAllChecked);
      setCheckboxes(updatedCheckboxes);
    }

    // Function to handle individual checkbox selection
    const handleIndividualCheckboxChange = (event,index) => {

      const updatedCheckboxes = [...checkboxes];
      updatedCheckboxes[index] = !updatedCheckboxes[index];
      setCheckboxes(updatedCheckboxes);

      if (event.target.checked) {
        event.target.parentElement.parentElement.classList.add("selected");
      }
      else {
        event.target.parentElement.parentElement.classList.remove("selected");
      }
    }

    // Function to initialize state variables from allUsers array
    const initializeEdit = (index) => {
      const userToEdit = allUsers[index];
      setName(userToEdit.name);
      setEmail(userToEdit.email);
      setRole(userToEdit.role);
    }

    // Function to edit a single row
    const enableEdit = (index) => {

      initializeEdit(index); // Initialize state variables with user data

      const updatedAllUsers = [...allUsers];  // Clone the allUsers array to create a new array
      const updatedUser = { ...updatedAllUsers[index] };  // Clone the user object at the specified index to create a new object

      updatedUser.showNormal = !updatedUser.showNormal;   // Modify the cloned user object's showNormal property
      updatedUser.showInput = !updatedUser.showInput; // Modify the cloned user object's showInput property

      updatedAllUsers[index] = updatedUser;  // Replace the user object at the specified index with the updatedUser
      dispatch(setAllUsers(updatedAllUsers)); // Dispatch an action to update the state with the modified array
    }

    // Function to delete a single user
    const deleteUser = (id) => {
      const updatedUsers = [...allUsers]; // created copy of allUsers
      const updatedArr = updatedUsers.filter((value)=>{
        return (value.id !== id);
      }) // filter the updatedUsers array by comparing the id
      dispatch(setAllUsers(updatedArr)); // dispatch the updated state with the modified array
    }

    // Function to change name
    const changeName = (event) => {
      setName(event.target.value);
    }

    // Function to change email
    const changeEmail = (event) => {
      setEmail(event.target.value);
    }

    // Function to change role
    const changeRole = (event) => {
      setRole(event.target.value);
    }

    // Function to save changes
    const saveChanges = (index) => {
      const allUsersArr = [...allUsers]; // create copy of allUsers
      const editedUser = { ...allUsersArr[index] }; // create copy of user object at the specified index
      
      editedUser.name = name; // Modify the cloned user object's name property
      editedUser.email = email; // Modify the cloned user object's email property
      editedUser.role = role; // Modify the cloned user object's role property
      editedUser.showInput = false; // Modify the cloned user object's showInput property
      editedUser.showNormal = true; // Modify the cloned user object's showInput property

      allUsersArr[index] = editedUser; // Replace the user object at the specified index with the updatedUser
      dispatch(setAllUsers(allUsersArr)); // Dispatch an action to update the state with the modified array
    }

    // Function to delete selected users
    const deleteSelectedUsers = () => {

      const selectedUserIndices = [];   // Create an array to store the indices of selected users
    
      checkboxes.forEach((isChecked, index) => {   // Iterate through checkboxes to find selected users
        if (isChecked) {
          selectedUserIndices.push(index);
        }
      });
    
      const updatedUsers = [...allUsers];  // Create a copy of allUsers and remove selected users
      selectedUserIndices.sort((a, b) => b - a); // Sort in reverse order to avoid index shift

      selectedUserIndices.forEach((index) => {
        const rowElement = document.getElementById(`row-${index}`);   
        if (rowElement) {
          rowElement.classList.remove("selected");  // Remove the "selected" class from the row element
        }
        updatedUsers.splice(index, 1);
      });
    
      dispatch(setAllUsers(updatedUsers));  // Dispatch the updated state with the modified array
    
      setCheckboxes(Array(pageSize).fill(false)); // Reset checkboxes and selectAllChecked
      setSelectAllChecked(false);
    };    

    React.useEffect(() => {
      // Check if all checkboxes on the current page are selected
      const areAllSelected = checkboxes.every((checkbox) => checkbox);
      setSelectAllChecked(areAllSelected);
    }, [checkboxes]);

    return (
        <>
        <table className="users table table-responsive">
          <thead>
            <tr>
             <th className="selectall-checkbox-header">
               <input 
                type="checkbox" 
                id="selectAll" 
                checked={selectAllChecked}
                onChange={handleSelectAllChange} 
                data-testid="select-all-checkbox"/>
             </th>
             <th>{columnHeaderName}</th>
             <th>{columnHeaderEmail}</th>
             <th>{columnHeaderRole}</th>
             <th>Actions</th>
            </tr>
          </thead>
         
          <tbody>
           { currentTableData.map((user,index)=>{
            return (
              <tr key={index} id={`row-${index}`} >
                <td>
                   <input 
                    type="checkbox" 
                    id={`check-${index}`} 
                    checked={checkboxes[index]}
                    onChange={(e)=>handleIndividualCheckboxChange(e,index)} 
                    data-testid={`checkbox-${index}`} />
                </td>
                <td>
                    {
                      user.showNormal &&  <span>{user.name}</span>
                    }
                    {
                      user.showInput &&  
                      <input 
                       type="text" 
                       id={`name-${index}`} 
                       data-testid={`name-textbox-${user.id}`}
                       name={`name-${index}`} 
                       value={name}
                       onChange={(e)=>changeName(e)}
                       className="form-control" />
                    }
                </td>
                <td>
                    {
                      user.showNormal &&  <span>{user.email}</span>
                    }
                    {
                      user.showInput &&  
                      <input 
                       type="text" 
                       id={`email-${index}`} 
                       data-testid={`email-textbox-${user.id}`}
                       name={`email-${index}`} 
                       value={email}
                       onChange={(e)=>changeEmail(e)}
                       className="form-control" />
                    }
                </td>
                <td>
                    {
                      user.showNormal &&  <span>{user.role}</span>
                    }
                    {
                      user.showInput &&  
                      <input 
                       type="text" 
                       id={`role-${index}`} 
                       data-testid={`role-textbox-${user.id}`}
                       name={`role-${index}`} 
                       value={role}
                       onChange={(e)=>changeRole(e)}
                       className="form-control" />
                    }
                </td>
                <td>
                    <FontAwesomeIcon 
                     className={`icon ${allUsers[index].showInput ? 'd-none': ''}`} 
                     icon={faEdit} 
                     data-testid={`edit-icon-${user.id}`}
                     onClick={()=>enableEdit(index)} />
                    <FontAwesomeIcon 
                     className={`icon ${allUsers[index].showInput ? '': 'd-none'}`} 
                     icon={faCheck}
                     onClick={()=>saveChanges(index)} />
                    <FontAwesomeIcon 
                     className="delete-icon icon" 
                     data-testid={`delete-icon-${user.id}`}
                     icon={faTrash}
                     onClick={()=>deleteUser(user.id)} />
                </td>
              </tr>
            )
           })
        }
          </tbody>
        </table>
        
        <div className="d-flex flex-wrap">
          <div className="col-auto mt-2">
            <button 
             className="btn-delete"
             data-testid="delete-selected-users-button" 
             onClick={deleteSelectedUsers}>Delete Selected</button>
          </div>
          <div className="col">
            <Pagination 
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={allUsers.length}
            pageSize={pageSize}
            onPageChange={page => setCurrentPage(page)}/>
          </div>
        </div>
         
        </>
    )
}