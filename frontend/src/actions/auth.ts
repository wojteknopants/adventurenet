// import axios from "axios";
// import {
//   LOGIN_SUCCESS,
//   LOGIN_FAIL,
//   USER_LOADED_SUCCESS,
//   USER_LOADED_FAIL,
// } from "./types";

// export const load_user = () => async (dispatch: any) => {
//   if (localStorage.getItem("access")) {
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `JWT ${localStorage.getItem("access")}`,
//         Accept: "application/json",
//       },
//     };

//     try {
//       const res = await axios.get(
//         `${process.env.REACT_APP_API_URL}/auth/users/me/`,
//         config
//       );

//       dispatch({
//         type: USER_LOADED_SUCCESS,
//         payload: res.data,
//       });
//     } catch (err) {
//       dispatch({
//         type: USER_LOADED_FAIL,
//       });
//     }
//   } else {
//     dispatch({
//       type: USER_LOADED_FAIL,
//     });
//   }
// };

// export const login =
//   (email: String, password: String) => async (dispatch: any) => {
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };
//     console.log("Iam in login async");
//     const body = JSON.stringify({ email, password });

//     try {
//       const res = await axios.post(
//         `${process.env.REACT_APP_API_URL}/auth/jwt/create/`,
//         body,
//         config
//       );

//       console.log("Iam in login async + in try post");

//       dispatch({
//         type: LOGIN_SUCCESS,
//         payload: res.data,
//       });

//       dispatch(load_user());
//     } catch (err) {
//       console.log("Iam in login async + catch");
//       dispatch({
//         type: LOGIN_FAIL,
//       });
//     }
//   };
