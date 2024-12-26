import { publicRequest } from "../requestMethods";
import { loginFailure, loginStart, loginSuccess } from "./userRedux";

export const login = async (dispatch, user) => {
  try {
    dispatch(loginStart());
    const res = await publicRequest.post("/auth/login/", user);

    dispatch(loginSuccess(res.data));

    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    dispatch(loginFailure());
  }
};
