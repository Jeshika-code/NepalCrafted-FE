// import React from "react";
// import { useSelector } from "react-redux";
// import { Navigate, Route } from "react-router-dom";

// const ProtectedRoute = ({  component: Component, ...rest }) => {
//   const { loading, isAuthenticated, user } = useSelector((state) => state.user);

//   return (
//     <>
//       {!loading && (
//         <Route
//           {...rest}
//           render={(props) => {
//             if (!isAuthenticated) {
//               return <Navigate to="/login" />;
//             }

          

//             return <Component {...props} />;
//           }}
//         />
//       )}
//     </>
//   );
// };

// export default ProtectedRoute;import React, { Fragment } from "react";
import React,{Fragment} from "react";
import { useSelector } from "react-redux";
import { Navigate, Redirect, Route } from "react-router-dom";

// const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
//   const { loading, isAuthenticated, user } = useSelector((state) => state.user);

//   return (
//     <Fragment>
//       {loading === false && (
//         <Route
//           {...rest}
//           render={(props) => {
//             if (!loading && isAuthenticated === false) {
//               return <Navigate to="/login" />;
//             }

//             if (!loading&& isAdmin === true && user.role !== "admin") {
//               return <Navigate to="/login" />;
//             }

//             return <Component {...props} />;
//           }}
//         />
//       )}
//     </Fragment>
//   );
// };
const ProtectedRoute = ({ isAdmin, component: Component, ...routeProps }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  if (!loading && isAuthenticated === false) {
    return <Navigate to="/login" />;
  }

  if (!loading && isAdmin === true && user?.role !== "admin") {
    return <Navigate to="/login" />;
  }

  return (
    <Fragment>
      {loading === false ? (
       <Component {...routeProps} />
      ) : null}
    </Fragment>
  );
};

export default ProtectedRoute;