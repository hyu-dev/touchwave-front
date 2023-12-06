import { collection, doc, getDoc, getDocs, query, where } from "@firebase/firestore";
import { getToken } from "@firebase/messaging";
import { TAccount } from "@hooks/useAccount";
import { TTeam } from "@hooks/useTeam";
import { fb } from "@utils/firebase";

// 유저 정보 불러오기
export const getUser = async (uid: string) => {
  const userQuery = query(collection(fb.db, "accounts"), where("userId", "==", uid));
  const snapshot = await getDocs(userQuery);

  if (!snapshot.size) {
    return null;
  }

  const doc = snapshot.docs[0];
  const data = doc.data() as Omit<TAccount, "id">;

  return { id: doc.id, ...data };
};

// email 로 유저 등록여부 확인
export const verifyUserByEmail = async (email: string) => {
  const userQuery = query(collection(fb.db, "accounts"), where("email", "==", email));
  const snapshot = await getDocs(userQuery);

  return !!snapshot.size;
};

// invitationCode로 팀찾기
export const getTeamFromInviteCode = async (invitationCode: string) => {
  const teamQuery = query(
    collection(fb.db, "teams"),
    where("invitationCode", "==", invitationCode)
  );

  const snapshot = await getDocs(teamQuery);

  if (!snapshot.size) {
    return null;
  }

  const docsData = snapshot.docs[0];
  const data = docsData.data() as Omit<TTeam, "id">;

  return { id: docsData.id, ...data };
};

type TTeamUserLink = {
  userDocId: string;
  teamDocId: string;
};

// userDocId로 팀 찾기
export const getTeamFromUserDocId = async (userDocId: string) => {
  const teamUserLinkQuery = query(collection(fb.db, "links"), where("userDocId", "==", userDocId));

  const snapshot = await getDocs(teamUserLinkQuery);

  if (!snapshot.size) {
    return null;
  }

  const docsData = snapshot.docs[0];
  const data = docsData.data() as TTeamUserLink;

  const docRef = doc(fb.db, "teams", data.teamDocId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return null;
  }

  const team = docSnap.data() as Omit<TTeam, "id">;

  return { id: docSnap.id, ...team };
};

// 팀 docId 로 linkDocIds 찾기
export const getLinkDocIdsFromTeamDocId = async (teamDocId: string) => {
  const teamUserLinkQuery = query(collection(fb.db, "links"), where("teamDocId", "==", teamDocId));

  const snapshot = await getDocs(teamUserLinkQuery);

  if (!snapshot.size) {
    return null;
  }

  return snapshot.docs.map((doc) => doc.id);
};

// 유저 docId 로 linkDocId 찾기
export const getLinkDocIdFromUserDocId = async (userDocId: string) => {
  const teamUserLinkQuery = query(collection(fb.db, "links"), where("userDocId", "==", userDocId));

  const snapshot = await getDocs(teamUserLinkQuery);

  if (!snapshot.size) {
    return null;
  }

  const docsData = snapshot.docs[0];
  return docsData.id;
};

export const registerServiceworker = async () => {
  if ("serviceWorker" in navigator) {
    await navigator.serviceWorker.register("firebase-messaging-sw.js", {
      scope: "firebase-cloud-messaging-push-scope",
    });
  }
};

export const isNotification = async () => {
  if ("Notification" in window) {
    return Notification.requestPermission().then((permission) => {
      if (permission === "default") {
        throw new Error("Please allow notifications to use the app.");
      } else if (permission === "denied") {
        throw new Error(
          `Notifications are not allowed.\nPlease allow notifications to use the app.`
        );
      }
    });
  } else {
    throw new Error("This browser does not support desktop notification.");
  }
};

// fcm 토큰 가져오기
const vapidKey = process.env.FIREBASE_VAPID_KEY;
export const getFCMToken = async () => {
  return getToken(fb.messaging, { vapidKey: vapidKey });
};

// 버튼 클릭해서 fcm 알림 보내기
type TSendMessageProps = {
  teamDocId: string;
  teamName: string;
  buttonName: string;
  userDocId: string;
  nickname: string;
  sendTime: string;
  timer: number;
};

const serverPath = process.env.SERVER_PATH + "" + process.env.SERVER_PROXY_PARAMETER;
export const sendMessage = async (sendData: TSendMessageProps) => {
  try {
    const response = await fetch(serverPath, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sendData),
    });

    return response.json();
  } catch (e: any) {
    throw new Error(e);
  }
};

// 유저 알림 정보 가져오기
export const getUserNotification = async (
  userDocId: string,
  teamDocId: string,
  sendDate: string
) => {
  const notifyQuery = query(
    collection(fb.db, "notifications"),
    where("userDocId", "==", userDocId),
    where("teamDocId", "==", teamDocId),
    where("sendDate", "==", sendDate)
  );

  const snapshot = await getDocs(notifyQuery);

  if (!snapshot.size) {
    return null;
  }

  const data = snapshot.docs[0].data();

  return {
    teamDocId: data.teamDocId,
    userDocId: data.userDocId,
    sendDate: data.sendDate,
    sendTime: data.sendTime,
    textBody: data.textBody,
  };
};
