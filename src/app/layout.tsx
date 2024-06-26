import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cookies } from "next/headers";
import ReudxWrapper from "@/lib/ReduxWrapper";
import SideBarComponent from "./sidebar/SideBarComponent";

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
      <div className="flex w-[99vw]  no-scroll-bar flex-col-reverse lg:flex-row md:flex-row ">
        <div className="sticky z-40  lg:bg-transparent md:bg-transparent bg-[#00000e] bottom-4 left-0">
          <SideBarComponent cookie={hasCookies.value} />
        </div>
        <div className="lg:w-[40vw] no-scroll-bar w-[90vw]  border-l-[1px]  border-l-slate-500 box-border overflow-scroll ">
          {children}
        </div>
        <div className="hidden lg:block w-[30vw] sticky top-0 right-0 border-l-[1px] border-l-slate-700"></div>
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
        <ReudxWrapper>
          <SideBarWrapper>
            {children}
          </SideBarWrapper>
        </ReudxWrapper>

      </body>
    </html>
  );
}
