import { User as ApiUser } from "../clients/usersClient";

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: string;
  company: string;
};

export interface UsersState {
  users: {
    [key: string]: User;
  };
  list: {
    isLoading: boolean;
    users?: number[];
    failed?: string;
  };
  currentUser: {
    isLoading: boolean;
    userId: number;
    failed?: string;
  };
}

type Action =
  | {
      type: "listLoadingStarted";
    }
  | {
      type: "listLoadingFinished";
      payload: ApiUser[];
    }
  | {
      type: "listLoadingFailed";
      payload: string;
    }
  | {
      type: "currentUserLoadingStarted";
      payload: number;
    }
  | {
      type: "currentUserLoadingFinished";
      payload: ApiUser;
    }
  | {
      type: "currentUserLoadingFailed";
      payload: string;
    };

const initialState: UsersState = {
  users: {},
  list: {
    isLoading: false,
  },
  currentUser: {
    isLoading: false,
    userId: 0,
  },
};
export const userReducer = (state: UsersState = initialState, action: Action): UsersState => {
  switch (action.type) {
    case "listLoadingStarted": {
      return {
        ...state,
        list: {
          isLoading: true,
        },
      };
    }
    case "listLoadingFinished": {
      return {
        ...state,
        users: action.payload.reduce((acc: UsersState["users"], user) => {
          
          acc[user.id] = {
            id: user.id,
            name: user.name,
            email: user.email,
            username: user.username,
            address: [user.address.city, user.address.street, user.address.suite].join(', '),
            company: user.company.name
          };
          return acc;
        }, {}),
        list: {
          isLoading: false,
          users: action.payload.map((user) => user.id),
        },
      };
    }
    case "listLoadingFailed": {
      return {
        ...state,
        list: {
          isLoading: false,
          failed: action.payload,
        },
      };
    }
    case "currentUserLoadingStarted": {
      return {
        ...state,
        currentUser: {
          isLoading: true,
          userId: action.payload,
        },
      };
    }

    case "currentUserLoadingFinished": {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          isLoading: false,
        },
      };
    }
    case "currentUserLoadingFailed": {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          isLoading: false,
          failed: action.payload,
        },
      };
    }
  }
  return state;
};
