import { useContext, useState } from "react";
import { RootContext } from "../contexts/rootContext";
import { RootContextProps } from "../dtos/rootContextProps.dto";
import { userSortParams } from "../dtos/userSortParams.dto";

export default function Home() {
  const { rootState, sortUsers, searchUsers, fetchUsers } = useContext(
    RootContext
  ) as RootContextProps;

  const { searchedUsers: users, isError, isLoading } = rootState;

  if (isError) {
    window.alert("Something Went Wrong While fetching Users");
  }

  const [sortOptions, setSortOptions] = useState({
    direction: "asc",
    sortBy: "username",
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    searchUsers(event.target.value);
  };

  const handleSelectChanges = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const options = { ...sortOptions };

    if (event.target.name === "sortBy") {
      if (event.target.value === "name") options.sortBy = "name";
      else options.sortBy = "username";
    }
    if (event.target.name === "sortDirection") {
      if (event.target.value === "asc") options.direction = "asc";
      else options.direction = "desc";
    }
    await setSortOptions(options);
    await sortUsers(options as userSortParams);
  };

  return (
    <main>
      <div className="fixed w-full px-8 h-40 bg-slate-800 items-center top-0 flex flex-wrap">
        <div className="w-full sm:w-full md:w-full lg:w-1/2">
          <input
            className=" p-2 rounded"
            placeholder="Search User"
            onChange={handleSearchChange}
          />
          <button className="text-white p-2 ml-4 border-solid border-2 border-white rounded">
            Search
          </button>
        </div>

        <div className="flex  w-full sm:w-full md:w-full lg:w-1/2">
          <div>
            <label className="text-white">Sort By: </label>
            <select
              onChange={handleSelectChanges}
              name="sortBy"
              className="p-1 rounded"
            >
              <option value={"name"}>Name</option>
              <option value={"username"}>Username</option>
            </select>
          </div>
          <div>
            <label className="text-white pl-2">Sort Direction: </label>
            <select
              onChange={handleSelectChanges}
              name="sortDirection"
              className="p-1 rounded"
            >
              <option value={"asc"}>Ascending</option>
              <option value={"desc"}>Descending</option>
            </select>
          </div>
        </div>
      </div>

      <div
        className="h-20  bg-slate-900 fixed right-10 bottom-10 rounded flex items-center p-4"
        onClick={fetchUsers}
      >
        <p className="text-white">Refresh Users</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center bg-slate-200 min-h-screen">
          <div className="bg-slate-900 rounded-lg p-4 ">
            <div
              className="spinner-border animate-spin inline-block w-20 h-20 border-4 rounded-full text-white fs-5"
              role="status"
            ></div>
            <p className="text-white pt-1">Loading......</p>
          </div>
        </div>
      ) : (
        <div className="p-8 bg-slate-200 mt-40 min-h-screen">
          {users.map((user: any) => (
            <div
              className=" bg-white text-slate-900 shadow mb-10 p-5 rounded-md"
              key={user.id}
            >
              <p>
                <span>
                  Name <b>{user.name}</b>
                </span>
              </p>
              <p>
                <span>
                  Username <b>{user.username}</b>
                </span>
              </p>
              <p>
                <span>
                  Company Name <b>{user.company.name}</b>
                </span>
              </p>

              <a
                href={`http://${user.website}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="p-2 bg-slate-900 rounded text-slate-200 mt-3">
                  Visit Website
                </button>
              </a>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
