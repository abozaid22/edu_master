import { Navigate } from 'react-router-dom'

export default function ProtectedRouteGuard(props) {

  if ( localStorage.getItem("token") ) {
    return <Navigate to={'/'} />
  } else {
    return props.children
  }  
}

