'use client'
import Scanner from "./components/Scanner";
import { useState } from "react";
import { searchOfficer } from "@/lib/database";
import Information from "./components/Information";
import { store } from '@/lib/zustand'

export default function Home() {
  const [openModal, setOpenModal] = useState(false);
  const { officerData, setOfficer } = store()
  return (
    <div className="p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main>
        <p className="text-3xl font-bold">Officer Validator</p>
        <p>This application scans the barcodes included in every CTRL+ALT Club ID for officers, 
          and matches it on a database to prove it&apos;s validity and to provide officer information<br />
          It shows informations such as names, images, grade level, class section and date of expiry. 
          </p>
          <div className="mt-4">
            <Scanner onBarcodeScan={(result) => {
              searchOfficer(result).then((res) => {
                setOfficer(res)
                setOpenModal(true)
              })
            }} />
          </div>
          <Information open={openModal} onOpenChange={setOpenModal} data={officerData}  />
      </main>
    </div>
  );
}
