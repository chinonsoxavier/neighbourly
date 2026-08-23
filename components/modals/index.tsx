"use client";

import { CreateModal } from "./create-modal";
import { DonateModal } from "./donate-modal";
import { SearchModal } from "./search-modal";

export function AppModals() {
  return (
    <>
      <CreateModal />
      <DonateModal />
      <SearchModal />
    </>
  );
}
