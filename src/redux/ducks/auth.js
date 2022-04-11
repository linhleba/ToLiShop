export const AUTHENTICATION = 'ADMIN_PANEL/settings/AUTHENTICATION';
export const LOGOUT = 'ADMIN_PANEL/settings/LOGOUT';

const initialState = {
  authData: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATION:
      console.log(action?.data);
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));

      return { ...state, authData: action.data, loading: false, errors: null };
    case LOGOUT:
      localStorage.clear();

      return { ...state, authData: null, loading: false, errors: null };
    default:
      return state;
  }
};

export const authenticate = (data) => ({
  type: AUTHENTICATION,
  data,
});

export const logout = () => ({
  type: LOGOUT,
});
