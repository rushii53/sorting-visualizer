import { createSlice } from "@reduxjs/toolkit"

const interact = {
    isRunning: false,
    speed:""
}

export const interaction=createSlice(
    {
        name:'interaction',
        initialState:interact,
        reducers:
        {
            setRunning:(state,action)=>{
                state.isRunning=action.payload
            }
        }
    }
)

export const {setRunning}=interaction.actions;
export default interaction.reducer;