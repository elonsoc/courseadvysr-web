import React from 'react';

const UserContext = React.createContext()
const UserDispatchContext = React.createContext()

function changeUsername(state, action) {
    return {user: action.user}
}

function UserProvider({children}) {
    const [state, dispatch] = React.useReducer(changeUsername, {user: ""})
    return (
        <UserContext.Provider value={state}>
            <UserDispatchContext.Provider value={dispatch}>
                {children}
            </UserDispatchContext.Provider>
        </UserContext.Provider>
    )
}

function useUserState() {
    const context = React.useContext(UserContext)
    if (context === undefined) {
        throw new Error('useUserState must be used within a UserProvider')
    }

    return context
}

function useUserDispatch() {
    const context = React.useContext(UserDispatchContext)
    if (context === undefined) {
        throw new Error('useUserDispath mut be used within a UserProvider')
    }

    return context
}

export {UserProvider, useUserState, useUserDispatch}