"use client";

import { Public_Sans } from "next/font/google";

import {
  AuthCard,
  AuthType,
  DemoSet,
  useAuthError,
  useAuthModal,
  useUser,
} from "@account-kit/react";
// eslint-disable-next-line import/extensions
import { ChevronRight } from "@/src/components/icons/chevron";
import { MailIcon } from "@/src/components/icons/mail";
import { Input, useLogout } from "@account-kit/react";
import { useMemo } from "react";
import { TopNav } from "../components/topnav/TopNav";
import { Button } from "../components/shared/Button";
import { PhoneIcon } from "lucide-react";
import { ArrowUpRightIcon } from "../components/icons/arrow";
import { Configuration } from "../components/configuration";

const publicSans = Public_Sans({
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  const sections = useMemo<AuthType[][]>(
    () => [[{ type: "email", hideButton: true }], [{ type: "passkey" }]],
    []
  );

  const { openAuthModal } = useAuthModal();
  const error = useAuthError();
  const user = useUser();
  const { logout } = useLogout();

  return (
    <>
      <main
        className={`flex bg-gray-50 flex-col min-h-screen ${publicSans.className}`}
      >
        <TopNav />
        <div className="flex flex-col flex-1 px-10 py-6 gap-6 w-full max-w-screen-2xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-xl">Demo</h2>
            <div className="flex gap-4">
              <Button>
                Integration call
                <PhoneIcon className="ml-2 h-4 w-4" />
              </Button>
              <Button>
                Quickstart guide
                <ArrowUpRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-1 gap-6">
            <div className="flex flex-col flex-1 bg-white border border-static rounded-lg p-6">
              <Configuration />
            </div>
            <div className="flex-[2] bg-white border border-static rounded-lg">

            </div>
          </div>
        </div>
      </main>
    </>
  );
}
