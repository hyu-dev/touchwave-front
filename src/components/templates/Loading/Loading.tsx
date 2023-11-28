import { Loading } from "@components/common/Loading";
import { useLoadingState } from "@hooks/useLoading";

export const LoadingTemplate = () => {
  const { loading } = useLoadingState();

  if (!loading) return null;

  return (
    <div className="absolute top-0 left-0 z-20 w-full h-full flex justify-center items-center">
      <Loading />
    </div>
  );
};
