import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    trainig: [],
    customers: []
}

export const trainerSlice = createSlice({
    name: "trainer",
    initialState,
    reducers: {
        setCustomers: (state,actions) => {
        
              state.customers = actions.payload.customers
        },
        setTrainer : (state,actions) => {
            state.trainer = actions.payload.trainer
        }

    }
})
export const {setCustomers,setTrainer} = trainerSlice.actions ;
export default trainerSlice.reducer ;