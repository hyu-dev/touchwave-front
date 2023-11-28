import { Button } from "@components/common/Button";
import { Spacing } from "@components/common/Spacing";
import { Text } from "@components/common/Text";
import { MainHeader } from "@components/templates/Header";
import { useLoadingState } from "@hooks/useLoading";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

export const NotFoundTemplate = () => {
  const { loading, onChangeLoading } = useLoadingState();
  const intervalId = useRef<NodeJS.Timeout | null>(null);
  const timer = useRef(5);
  const [_, forceUpdate] = useState({});

  const navigate = useNavigate();

  const goHome = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const clearTimer = useCallback(() => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    clearTimer();
    intervalId.current = setInterval(() => {
      const currTimer = timer.current - 1;
      if (currTimer < 1) {
        goHome();
      } else {
        timer.current = currTimer;
        forceUpdate({});
      }
    }, 1000);
  }, [timer, goHome, forceUpdate]);

  useEffect(() => {
    startTimer();

    return () => {
      clearTimer();
    };
  }, []);

  useEffect(() => {
    if (loading) {
      onChangeLoading(false);
    }
  }, [loading]);

  return (
    <Fragment>
      <MainHeader />
      <main>
        <section>
          <div className="w-full flex-1 flex flex-col justify-center items-center">
            <Text as="strong" className="text-sub-title">
              Oops!
            </Text>
            <Spacing className="h-[30px]" />
            <Text as="p" className="text-lg text-cs-disabled">
              Sorry, an unexpected error has occurred.
            </Text>
            <Spacing className="h-[10px]" />
            <Text as="i" className="text-md text-[#ccc] text-center">
              After {timer.current} seconds,
              <br />
              you will be moved to the main screen.
            </Text>
            <Spacing className="h-[20px]" />
            <Text as="i" className="text-lg text-[#ccc]">
              Not Found
            </Text>
          </div>
          <div className="w-full flex flex-col justify-center items-center">
            <Button type="button" className="btn-md-style" onClick={goHome}>
              GO HOME
            </Button>
          </div>
        </section>
      </main>
    </Fragment>
  );
};
