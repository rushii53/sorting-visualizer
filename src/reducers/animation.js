import { createSlice } from "@reduxjs/toolkit";

const animations={
    speed:null,
    pivote:null,
    array:[],
    swaparray:[],
    sortedarray:[],
    comparearray:[],
    heapcompare:[],
};

export const animation=createSlice(
    {
        name:'animation',
        initialState:animations,
        reducers:
        {
            setSpeed:(state,action)=>{
               state.speed = action.payload<=10?'600':action.payload<=20?'300':action.payload<=50?'100':action.payload<=100?'50':action.payload<=150?'30':'10';
            },
            setArray:(state,action)=>{
                state.array=action.payload
            },
            setSwapArray:(state,action)=>{
                state.swaparray=action.payload;
            },
            setSortedArray:(state,action)=>{
                state.sortedarray=action.payload;
            },
            setCompareArray:(state,action)=>{
                state.comparearray=action.payload;
            },
            setPivote:(state,action)=>{
                state.pivote=action.payload;
            },
            setSwapCompare:(state,action)=>{
                state.swaparray=action.payload;
                state.comparearray=action.payload;
            },
            setHeapCompare:(state,action)=>{
                state.heapcompare=action.payload;
            }
        }
    }
)

export const {setSpeed,setArray,setCompareArray,setSortedArray,setSwapArray,setPivote,setSwapCompare,setHeapCompare} = animation.actions;
export default animation.reducer;