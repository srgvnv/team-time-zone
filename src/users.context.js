import { createContext } from "react";

const usersContext = createContext({
    users: [],
    setUsers: (users) => {}
});

export default usersContext;
