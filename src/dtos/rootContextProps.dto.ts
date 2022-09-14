import { RootStateStruct } from "./rootState.dto";
import { userSortParams } from "./userSortParams.dto";

export interface RootContextProps {
  rootState: RootStateStruct;
  sortUsers: (options: userSortParams) => Promise<void>;
  searchUsers: (queryString: string) => Promise<void>;
  fetchUsers: () => Promise<void>;
}
