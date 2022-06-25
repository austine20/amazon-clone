import React, { createContext, useContext, useReducer } from 'react';


//create a  data layer to push or dispatch items to
export const StateContext = createContext();


//wrap our app and provide the data layer to every component
export const StateProvider = ({reducer, initialState, children}) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

//puuling the item from the data layer/store
export const useStateValue = () => useContext(StateContext);
