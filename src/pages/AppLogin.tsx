import { EmptyTemplate } from "@components/templates/Empty";
import { LoginTemplate } from "@components/templates/Login";
import { onAuthStateChanged } from "@firebase/auth";
import { useLoadingState } from "@hooks/useLoading";
import { fb } from "@utils/firebase";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AppLogin = () => {
  const loadingState = useLoadingState();
  const navigate = useNavigate();

  useEffect(() => {
    loadingState.onChangeLoading(true);
    onAuthStateChanged(fb.auth, async (user) => {
      if (user !== null) {
        navigate("/");
      }
      loadingState.onChangeLoading(false);
    });
  }, []);

  if (loadingState.loading) {
    return <EmptyTemplate />;
  }

  return <LoginTemplate />;
};

export default AppLogin;
