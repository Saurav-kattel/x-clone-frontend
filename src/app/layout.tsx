import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cookies } from "next/headers";
import SideBar from "./sidebar/page";
import ReudxWrapper from "@/lib/ReduxWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "X clone",
  description: "x social media clone",
};

function SideBarWrapper({ children }: { children: React.ReactNode }) {
  const cookie = cookies();
  const hasCookies = cookie.get("auth_token_x_clone");
  if (hasCookies) {
    return (
      <div className="flex flex-row">
        <SideBar />
        <div className="w-[40vw] box-border overflow-scroll h-[100vh]">
          {children}

        </div>
        <div className="w-[30vw] sticky top-0 right-0 border-l-[1px] border-l-slate-700"></div>
      </div>
    );
  }
  return children;
}

export default function RelationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SideBarWrapper>
          <ReudxWrapper>{children}</ReudxWrapper>
        </SideBarWrapper>
      </body>
    </html>
  );
}
