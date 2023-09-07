import { logout } from "@store/reducers/authSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useMultiTabLogout = (onLogout: () => void) => {
  const dispatch = useDispatch();

  const handleLogoutAcrossTabs = () => {
    // Clear the user's authentication tokens or session on the server
    // ...

    // Set the logout token in browser storage
    localStorage.setItem("logout", Date.now().toString());

    // Broadcast the logout event to other tabs
    window.postMessage({ type: "logout" }, window.location.origin);

    // Dispatch the logout action from Redux
    dispatch(logout());

    // Execute the callback function passed from the component
    if (typeof onLogout === "function") {
      onLogout();
    }
  };

  useEffect(() => {
    // Check for the logout event in each tab
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "logout") {
        // Handle the logout event in this tab
        // Clear local user data, redirect, or perform any other necessary actions
        console.log("User logged out in another tab");

        // Execute the callback function passed from the component
        if (typeof onLogout === "function") {
          onLogout();
        }
      }
    };

    // Attach event listeners and return a cleanup function
    window.addEventListener("storage", handleStorageChange);

    return () => {
      // Cleanup: Remove event listeners
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [onLogout]);

  return { handleLogoutAcrossTabs };
};

export default useMultiTabLogout;
