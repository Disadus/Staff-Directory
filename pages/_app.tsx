import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Suspense } from "react";
import { useCurrentDisadusUser } from "../Helpers/Hooks/CurrentDisadusUserHook";
import { DUserContextProvider } from "../Helpers/Contexts/DisadusUserContext";
import { useCommunity } from "../Helpers/Hooks/CommunityHook";
import { CommunityContextProvider } from "../Helpers/Contexts/CommunityContext";
import { UserContextProvider } from "../Helpers/Contexts/UserContext";

function MyApp({ Component, pageProps }: AppProps) {
  const currentDisadusUser = useCurrentDisadusUser();
  const currentCommunity = useCommunity(currentDisadusUser?.primaryCommunity);
  return (
    <div
      className={`${
        currentDisadusUser?.theme && `dark`
      } w-full h-full relative`}
      id="themeContainer"
    >
      <div
        className={`dark:text-white w-full h-full flex flex-row dark:bg-gray-850 bg-gray-150`}
      >
          <UserContextProvider value={currentDisadusUser}>
            <CommunityContextProvider value={currentCommunity}>
              <div
                className={`flex flex-grow break-words whitespace-pre-wrap relative`}
              >
                <div className={`w-full h-full absolute top-0 left-0`}>
                  <Component {...pageProps} />
                </div>
              </div>
            </CommunityContextProvider>
          </UserContextProvider>
      </div>
    </div>
  );
}

export default MyApp;
