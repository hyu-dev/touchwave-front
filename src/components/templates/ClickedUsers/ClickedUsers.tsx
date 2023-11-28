import { Heading } from "@components/common/Heading";
import { Loading } from "@components/common/Loading";
import { Spacing } from "@components/common/Spacing";
import { Text } from "@components/common/Text";
import { FirestoreError, collection, onSnapshot, orderBy, query, where } from "@firebase/firestore";
import { TNotificationData } from "@hooks/useAccount";
import { Alert } from "@utils/Alert";
import { rankingColor } from "@utils/constant";
import { fb } from "@utils/firebase";
import dayjs from "dayjs";
import { memo, useEffect, useState } from "react";

type TProps = {
  teamDocId: string;
};

export const ClickedUsersModal = memo(({ teamDocId }: TProps) => {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState<TNotificationData[] | null>();

  const callList = (teamDocId: string) => {
    try {
      const notifyQuery = query(
        collection(fb.db, "notifications"),
        where("teamDocId", "==", teamDocId),
        where("sendDate", "==", dayjs().format("YYYY.MM.DD")),
        orderBy("timer")
      );

      // 실시간 구독
      return onSnapshot(notifyQuery, (snapshot) => {
        const notifications = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            teamDocId: data.teamDocId,
            userDocId: data.userDocId,
            sendDate: data.sendDate,
            sendTime: data.sendTime,
            textBody: data.textBody,
            timer: data.timer,
          };
        });
        setList(notifications);
      });
    } catch (e) {
      if (e instanceof FirestoreError) {
        Alert.error({ text: fb.errors(e.code) });
      }
      setList(null);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = callList(teamDocId);

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  return (
    <div className="w-[220px] min-h-[200px] max-h-[300px] flex flex-col items-center">
      <Heading as="h1" className="text-lg text-cs-text">
        List of clicked users
      </Heading>
      <Spacing className="h-[10px]" />
      {list === undefined || loading ? (
        <Loading />
      ) : list === null ? (
        <EmptyList />
      ) : (
        <UserList list={list} />
      )}
    </div>
  );
});

const EmptyList = () => {
  return (
    <div className="flex flex-col items-center">
      <Spacing className="h-[20px]" />
      <Text as="em" className="text-[30px] text-cs-disabled">
        NULL
      </Text>
      <Spacing className="h-[10px]" />
      <Text as="p" className="text-cs-disabled">
        No one clicked.
      </Text>
      <Text as="p" className="text-cs-disabled">
        You press it first.
      </Text>
    </div>
  );
};

type TUserListProps = {
  list: TNotificationData[];
};

const UserList = memo(({ list }: TUserListProps) => {
  return (
    <ul className="w-full flex flex-col items-center gap-[10px] py-[10px]">
      {list.map((data, index) => (
        <li key={data.userDocId} className="w-[80%] text-center">
          <Text
            as="p"
            className="whitespace-pre-wrap text-md  py-[10px] rounded-[10px]"
            style={{
              backgroundColor:
                rankingColor[index > rankingColor.length - 1 ? rankingColor.length - 1 : index],
            }}
          >
            {data.textBody}
          </Text>
        </li>
      ))}
    </ul>
  );
});
