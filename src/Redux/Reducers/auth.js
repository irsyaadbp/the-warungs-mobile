const initialState = {
  registerResponse: {},
  loginResponse: {},
  user: null,
  isLoading: false,
  isRejected: false,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_REGISTER_PENDING':
      return {
        ...state,
        isLoading: true,
        isRejected: false,
      };
    case 'USER_REGISTER_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    case 'USER_REGISTER_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isRejected: false,
        registerResponse: action.payload.data,
      };
    case 'USER_LOGIN_PENDING':
      return {
        ...state,
        isLoading: true,
        isRejected: false,
      };
    case 'USER_LOGIN_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    case 'USER_LOGIN_FULFILLED':
      // console.log(action.payload.data, "uye")
      return {
        ...state,
        isLoading: false,
        isRejected: false,
        loginResponse: action.payload.data,
        user:
          action.payload.data.status === 200
            ? action.payload.data.result
            : null,
      };
    case 'GET_USER_PENDING':
      return {
        ...state,
        isLoading: true,
        isRejected: false,
      };
    case 'GET_USER_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    case 'GET_USER_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isRejected: false,
        user: !action.payload ? null : JSON.parse(action.payload),
      };
    default:
      return state;
  }
};

export default auth;
