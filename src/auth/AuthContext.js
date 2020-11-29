const { createContext } = require("react");

export const AuthContext = createContext({
    token: null,
    user: null,
    role: null,
    setToken: (data) => { },
    setUser: (data) => { },
    setRole: (data) => { }
});