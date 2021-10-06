import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'user',
  initialState: {
    isLoading: true,
    data: {},
  },

  reducers: {
    fetchUser: () => ({
      isLoading: true,
    }),

    updateUser: (state, action) => ({
      isLoading: false,
      data: action.payload,
    }),

    removeUser: () => ({
      isLoading: false,
      data: {},
    }),
  },
});

export const { fetchUser, updateUser, removeUser } = slice.actions;

export const selectUserLoading = state => state.user.isLoading;
export const selectUser = state => state.user.data;
export const selectLocalID = state => state.user.data?.localId;

export const getUserUpdateAsynch = () => async dispatch => {
  const idToken = localStorage.getItem('idToken');

  if (idToken) {
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        idToken,
      }),
    };

    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyB1Joem4NeY62Hl7loHiQebU8mWNTFjsB4',
      requestOptions
    ).then(res => res.json());

    if (response.hasOwnProperty('error')) {
      localStorage.removeItem('idToken');
      dispatch(removeUser());
    } else {
      dispatch(updateUser(response.users[0]));
    }
  } else {
    dispatch(removeUser());
  }
};

export const getUserAsynch = () => dispatch => {
  dispatch(fetchUser());
  dispatch(getUserUpdateAsynch());
};

export default slice.reducer;
