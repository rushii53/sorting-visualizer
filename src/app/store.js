import { configureStore } from "@reduxjs/toolkit";
import animation from "../reducers/animation";
import interaction from "../reducers/interaction";

export const store=configureStore({
    reducer:{
        animate:animation,
        interact:interaction,
    }
})