"use client";
import store from "@/app/redux/app/store";
import { Provider } from "react-redux";

export default function ReudxWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}
