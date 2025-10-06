// import { useState } from "react";
// import { createContext } from "react";

// export const TokenContext = createContext();

// export default function TokenContextProvider({children}) {
//     const [token, setToken] = useState(null)

//   return (
//     <TokenContext.Provider value={{token, setToken}}>
//       {children}
//     </TokenContext.Provider>
//   )
// }

import { useState, useEffect } from "react";
import { createContext } from "react";
import LoaderSpinner from "../Components/LoaderSpinner";

export const TokenContext = createContext();

export default function TokenContextProvider({ children }) {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // 👈 عشان نمنع الفلاش المؤقت

  useEffect(() => {
    // 👇 نقرأ التوكن أول ما الصفحة تفتح
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
    setLoading(false); // 👈 خلصنا تحميل التوكن
  }, []);

  if (loading) {
    return <LoaderSpinner /> }

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
}
