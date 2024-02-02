import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { createTable } from '../api/createTable.js';
import { deleteTable } from '../api/deleteTable.js';
import { fetchTables } from '../api/fetchTables.js';
import { CenteredSection, VerticalContainer, StyledH1, PrimaryButton, LeftAlignSection, StyledLabel, StyledInput, HorizontalContainer, StyledTable, StyledTableRow, StyledTableCell, StyledTableHeader  } from '../components/styles.js';
import {  useSelector } from 'react-redux';


const TablesTab = () => {
  const queryClient = useQueryClient();
  const [showPopup, setShowPopup] = useState(false);
  const restaurantId = useSelector(state => state.restaurantId);
  const [validationError, setValidationError] = useState(false);
  
  const initialFormState = {
    CapacityMin: '',
    CapacityMax: '',
    TableNumber: '',
  };
  
  // Use the initial form state when creating the formState state variable
  const [formState, setFormState] = useState(initialFormState);

  const handleChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const { data: tables, isLoading, isError } = useQuery(['tables', restaurantId], () => fetchTables(restaurantId));

  const mutationOnDelete = useMutation(deleteTable, {
    onSuccess: () => {
      queryClient.refetchQueries(['tables', restaurantId]);
      alert("Table Deleted");
    },
  });


  const mutationOnCreation = useMutation(createTable, {
    onSuccess: () => {
      queryClient.refetchQueries(['tables', restaurantId]);
      alert("Table Created");
      setShowPopup(false);
      setFormState(initialFormState);
    },
    onError: () => {
      console.log('error');
    },
  });

  const handleDelete = (tableId) => {
    mutationOnDelete.mutate (tableId);
  };

  const handleAdd = () => {
    setShowPopup(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formState.CapacityMax < formState.CapacityMin) {
      // Show an alert and stop the function
      alert("CapacityMax Must be equal or higher then CapacityMin");
      setValidationError(true);
      return;
    }

    const tInt = parseInt(formState.TableNumber, 10);
    if (tables.some(table => table.TableNumber === tInt)) {
      alert("A table with this number already exists.");
      return;
    }
  
    setValidationError(false);
    mutationOnCreation.mutate({ restaurantId, formState });
  };

  const handleClose = () => {
    setShowPopup(false);
  };

  if (isLoading) return 'Loading...';
  if (isError) return 'An error occurred';

  return (
    <div>
      <h1>Tables <button onClick={handleAdd}>Add</button></h1>

      {showPopup && (
        <div className="popup">
          <button onClick={handleClose}>Close</button>
          {/* <div>Popup content goes here</div> */}
            <form onSubmit={handleSubmit}>
              <VerticalContainer $fitContent={true} $maxWidth={"800px"}>
                {['CapacityMin', 'CapacityMax', 'TableNumber'].map((key) => (
                  <HorizontalContainer key={key}>
                    <StyledLabel htmlFor={key}>{key}</StyledLabel>
                    <StyledInput 
                      type="number" 
                      id={key} 
                      name={key} 
                      value={formState[key]} 
                      onChange={handleChange} 
                      isError={key === 'CapacityMax' && validationError}
                    />
                  </HorizontalContainer>
                ))}
                <HorizontalContainer>
                  <PrimaryButton type="submit">Submit</PrimaryButton>
                </HorizontalContainer>
              </VerticalContainer>
            </form>
        </div>
      )}

      <StyledTable>
      <StyledTableHeader>
        <tr>
          <th>Table Number</th>
          <th>Capacity Min</th>
          <th>Capacity Max</th>
          <th>Quantity</th>
          <th>Actions</th>
        </tr>
      </StyledTableHeader>
        <tbody>
          {tables.map((table) => (
            <StyledTableRow key={table.TableID}>
              <StyledTableCell>{table.TableNumber}</StyledTableCell>
              <StyledTableCell>{table.CapacityMin}</StyledTableCell>
              <StyledTableCell>{table.CapacityMax}</StyledTableCell>
              <StyledTableCell>{table.Quantity}</StyledTableCell>
              <StyledTableCell>
                <button onClick={() => handleDelete(table.TableID)}>Delete</button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </tbody>
      </StyledTable>
    </div>
  );
};

export default TablesTab;