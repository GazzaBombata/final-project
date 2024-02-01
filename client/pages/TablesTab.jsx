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

  const [formState, setFormState] = useState({
    CapacityMin: '',
    CapacityMax: '',
    Quantity: '',
    TableNumber: '',
  });

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
    },
  });

  console.log(mutationOnDelete)

  const mutationOnCreation = useMutation(createTable, {
    onSuccess: () => {
      queryClient.refetchQueries(['tables', restaurantId]);
    },
  });

  const handleDelete = (tableId) => {
    mutationOnDelete.mutate (tableId);
  };

  const handleAdd = () => {
    setShowPopup(true);
  };

  const handleAddTable = () => {
    mutationOnCreation.mutate (restaurantId, formState)
    setShowPopup(false);
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
          <div>Popup content goes here</div>
            <form onSubmit={handleSubmit}>
              <VerticalContainer fitContent maxWidth="800px">
                {['CapacityMin', 'CapacityMax', 'Quantity', 'TableNumber'].map((key) => (
                  <HorizontalContainer key={key}>
                    <StyledLabel htmlFor={key}>{key}</StyledLabel>
                    <StyledInput 
                      type="number" 
                      id={key} 
                      name={key} 
                      value={formState[key]} 
                      onChange={handleChange} 
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
          <StyledTableRow>
            <th>Table Number</th>
            <th>Capacity Min</th>
            <th>Capacity Max</th>
            <th>Quantity</th>
            <th>Actions</th>
          </StyledTableRow>
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