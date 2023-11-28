import { EmptyTemplate } from "@components/templates/Empty";
import { SignUpTemplate } from "@components/templates/SignUp";
import { onAuthStateChanged } from "@firebase/auth";
import { useLoadingState } from "@hooks/useLoading";
import { fb } from "@utils/firebase";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AppSingUp = () => {
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

  return <SignUpTemplate />;
};

export default AppSingUp;
