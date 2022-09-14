import Home from "./components/home";
import { useEffect, useState } from "react";
import { RootContext } from "./contexts/rootContext";
import axios from "axios";
import { jsonPlaceHolderAPIRoot } from "./utilities/constants";
import { RootStateStruct } from "./dtos/rootState.dto";
import { userSortParams } from "./dtos/userSortParams.dto";

function App() {
  const [rootState, setRootState] = useState({
    isError: false,
    isLoading: false,
    users: [],
    searchedUsers: [],
  } as RootStateStruct);

  const fetchUsers = async () => {
    try {
      await setRootState({ ...rootState, isLoading: true, isError: false });
      const apiResponse = await axios(`${jsonPlaceHolderAPIRoot}/users`);
      const users = apiResponse.data;
      await setRootState({
        ...rootState,
        isLoading: false,
        isError: false,
        users,
        searchedUsers: users,
      });
    } catch (err) {
      await setRootState({ ...rootState, isError: true });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const sortUsers = async (options: userSortParams) => {
    const { direction, sortBy } = options;
    const sortedUsers = rootState.users.sort((a, b) => {
      if (direction === "asc") {
        return sortBy === "name"
          ? a.name.localeCompare(b.name)
          : a.username.localeCompare(b.username);
      }
      return sortBy === "name"
        ? b.name.localeCompare(a.name)
        : b.username.localeCompare(a.username);
    });
    await setRootState({
      ...rootState,
      users: sortedUsers,
      searchedUsers: sortedUsers,
    });
  };

  const searchUsers = async (queryString: string) => {
    let foundUsers = [...rootState.users].filter(
      (_user) =>
        _user.name
          .toLocaleLowerCase()
          .includes(queryString.toLocaleLowerCase()) ||
        _user.username
          .toLocaleLowerCase()
          .includes(queryString.toLocaleLowerCase())
    );

    foundUsers =
      foundUsers.length > 0 || queryString.length > 0
        ? foundUsers
        : rootState.users;

    await setRootState({ ...rootState, searchedUsers: foundUsers });
  };

  return (
    <RootContext.Provider
      value={{ rootState, sortUsers, searchUsers, fetchUsers }}
    >
      <Home />
    </RootContext.Provider>
  );
}

export default App;
