import { useEffect, useState } from "react";
import { ProtectRoute } from "../services/authService";
import { useNavigate, Outlet } from "react-router-dom";
import { showLoader, hideLoader } from "../../ReduxToolkit/Store";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../SharedElements/spinner";

export default function ProtectedRoute() {
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loader.isLoading);

  useEffect(() => {
    const verifyUser = async () => {
      dispatch(showLoader());
      try {
        const result = await ProtectRoute();

        if (!result.authenticated) {
          navigate("/login");
        } else {
          setAuthenticated(true);
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        navigate("/login");
      } finally {
        dispatch(hideLoader());
      }
    };

    verifyUser();
  }, [dispatch, navigate]);

  if (isLoading) return <Loader />;

  return authenticated ? <Outlet /> : null;
}
