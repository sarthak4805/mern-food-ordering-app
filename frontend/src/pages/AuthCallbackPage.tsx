import { useCreateMyUser } from "@/api/MyUserApi";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth0();
  const { createUser } = useCreateMyUser();
  const hasCreatedUser = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const returnTo = params.get("returnTo") || "/";

    if (user?.sub && user?.email && !hasCreatedUser.current) {
      hasCreatedUser.current = true;

      createUser({ auth0Id: user.sub, email: user.email })
        .finally(() => {
          navigate(returnTo, { replace: true });
        });
    }
  }, [createUser, location.search, navigate, user]);

  return <>Loading...</>;
};

export default AuthCallbackPage;
