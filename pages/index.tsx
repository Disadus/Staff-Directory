import { Transition } from "@headlessui/react";
import { MailIcon, TagIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { Fragment, useContext, useEffect, useState } from "react";
import CommunityContext from "../Helpers/Contexts/CommunityContext";
import UserContext from "../Helpers/Contexts/UserContext";
import { useStaffMembers } from "../Helpers/Hooks/StaffMembersHook";

export const EliminationPage = () => {
  const user = useContext(UserContext);
  const community = useContext(CommunityContext);
  const staff = useStaffMembers(community?.id);
  return (
    <div className={`w-full flex flex-col items-center`}>
      <div
        className={`max-w-[80%] flex flex-col items-center gap-8 w-full p-8`}
      >
        hello {user?.firstName}, part of {community?.name} i see
        <div className={`flex flex-row gap-8 flex-wrap justify-center`}>
          {staff?.map((member) => (
            <div
              key={member.id}
              className={`w-80 dark:bg-gray-750 p-4 rounded-xl shadow-md`}
            >
              <div className={`flex flex-col items-start`}>
                <span className={`text-xl`}>{member.name}</span>
                <span className={`text-sm flex items-center gap-2`}>
                  <TagIcon className={`w-6 h-6`} /> {member.occupation}
                </span>
                <span className={`text-sm flex items-center gap-2`}>
                  <MailIcon className={`w-6 h-6`} /> {member.email}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default EliminationPage;
