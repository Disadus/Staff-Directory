import { Transition } from "@headlessui/react";
import { MailIcon, TagIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { Fragment, useContext, useEffect, useState } from "react";
import CommunityContext from "../Helpers/Contexts/CommunityContext";
import UserContext from "../Helpers/Contexts/UserContext";
import { useStaffMembers } from "../Helpers/Hooks/StaffMembersHook";
import Fuse from "fuse.js";
import { StaffMember } from "../Helpers/StaffTypes";
import { useVirtual } from "react-virtual";
import { MonogramPFP } from "../components/Monogram";
export const EliminationPage = () => {
  const user = useContext(UserContext);
  const community = useContext(CommunityContext);
  const staff = useStaffMembers(community?.id);
  const router = useRouter();
  const [searchResults, setSearchResults] = useState([] as StaffMember[]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    if (!staff) return;
    if (!searchTerm) return setSearchResults([]);
    const fuse = new Fuse(staff, {
      keys: ["name", "occupation", "email", "bio", "schedule"],
    });
    setSearchResults(fuse.search(searchTerm).map((x) => x.item));
  }, [staff, searchTerm]);
  return (
    <div className={`w-full flex flex-col items-center`}>
      <div
        className={` flex flex-auto items-stretch flex-col gap-8 w-auto p-8`}
      >
        <div
          className={`flex flex-row gap-8 h-20 sticky top-0 items-center justify-end`}
        >
          <input
            className={`w-64 h-12 backdrop-blur-3xl bg-transparent border dark:border-gray-600 px-4 rounded-lg focus:bg-gray-500/20 !outline-none transition-all`}
            type="text"
            placeholder="Search for staff..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className={`grid grid-cols-4 2.5xl:grid-cols-3 xl:grid-cols-2 lg:grid-cols-1 gap-8`}>
          {((!!searchResults.length && searchResults) || staff)?.map(
            (member) => (
              <div
                key={member.id}
                className={`w-96 dark:bg-gray-750 p-4 rounded-xl shadow-md flex flex-row items-center gap-4 md:max-w-full`}
              >
                <div>
                  <MonogramPFP firstName={member.name.charAt(0)} lastName={member.name.split(" ").pop()!.charAt(0)} className={`w-16 h-16`} />
                </div>
                <div className={`flex flex-col items-start`}>
                  <span className={`text-xl`}>{member.name}</span>
                  <span className={`text-sm flex items-center gap-2`}>
                    <TagIcon className={`w-6 h-6`} /> {member.occupation || `Unspecified Department/Occupation`}
                  </span>
                  <span className={`text-sm flex items-center gap-2`}>
                    <MailIcon className={`w-6 h-6`} /> {member.email || `Email not Avalible`}
                  </span>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
export default EliminationPage;
