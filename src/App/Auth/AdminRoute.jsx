import { useEffect, useState } from "react";
import { ProtectRoute } from "../services/authService";
import { useNavigate, Outlet } from "react-router-dom";
import { showLoader, hideLoader } from "../../ReduxToolkit/Store";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../SharedElements/spinner";

export default function AdminRoute() {
  const [authorized, setAuthorized] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loader.isLoading);

  useEffect(() => {
    const verifyAdmin = async () => {
      dispatch(showLoader());
      try {
        const result = await ProtectRoute();

        if (!result.authenticated) {
          navigate("/login");
        } else if (result.user.role !== "admin") {
          navigate("/not-found", { replace: true });
        } else {
          setAuthorized(true);
        }
      } catch (err) {
        console.error("Admin check failed:", err);
        navigate("/login");
      } finally {
        dispatch(hideLoader());
      }
    };

    verifyAdmin();
  }, [dispatch, navigate]);

  if (isLoading) return <Loader />;

  return authorized ? <Outlet /> : null;
}
