import { LoadingTemplate } from "@components/templates/Loading";
import { ToastListTemplate } from "@components/templates/ToastList";
import { router } from "@routers/router";
import { memo } from "react";
import { RouterProvider } from "react-router-dom";

const App = memo(() => {
  return (
    <div className="relative mx-auto flex flex-col items-center w-[360px] min-h-[600px]">
      <LoadingTemplate />
      <ToastListTemplate />
      <RouterProvider router={router} fallbackElement={<LoadingTemplate />} />
    </div>
  );
});

export default App;
