import {} from "@Disadus/disadus-plugin-api/dist/types/DisadusTypes";
import localforage from "localforage";
import { useEffect, useState } from "react";
import APIClient from "../../Global/APIClient";
import { APIDOMAIN } from "../constants";
import { StaffMember } from "../StaffTypes";
import staffData from "./TempData";

export const useStaffMembers = (communityID?: string) => {
  const [staffMembers, setStaffMembers] = useState(
    null as null | StaffMember[]
  );
  useEffect(() => {
    if (!communityID) return setStaffMembers(null);
    localforage
      .getItem(`staff-${communityID}`)
      .then((data) => data && setStaffMembers(data as StaffMember[]));
    APIClient!.waitForToken().then(async (token) => {
      const staff = JSON.parse(staffData)
      
      // await fetch(`${APIDOMAIN}/${communityID}/staffDirectory`)
      //   .then((x) => x.json())
      //   .catch((e) => {
      //     console.log(e);
      //     return [null];
      //   });
      setStaffMembers(staff);
      localforage.setItem(`staff-${communityID}`, staff);
    });
  }, [communityID]);
  return staffMembers;
};
