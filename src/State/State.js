import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    trainings: [],
    customers: [],
    editCustomer : null
}

export const trainerSlice = createSlice({
    name: "trainer",
    initialState,
    reducers: {
        setCustomers: (state,actions) => {
        
              state.customers = actions.payload.customers
        },
        setTrainer : (state,actions) => {
            state.trainings = actions.payload.trainings
        },
        SetEditCustomer: (state,actions) => {
            state.customers = actions.payload.editCustomer
        }

    }
})
export const {setCustomers,setTrainer,SetEditCustomer} = trainerSlice.actions ;
export default trainerSlice.reducer ;