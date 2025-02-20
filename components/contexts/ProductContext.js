"use client"

import { createContext, useReducer } from "react";

export const sneakerContext =  createContext()

export const sneakerContextProvider = () => {

    return (
        <sneakerContext.Provider>

        </sneakerContext.Provider>
    )
}

const [state, action] = useReducer(changeSneakerAction, {})