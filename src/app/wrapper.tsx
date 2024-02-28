"use client";
import { AppProgressBar } from "next-nprogress-bar";

export function Wrapper() {
  return (
    <AppProgressBar
      height="4px"
      color="#0284C7"
      options={{ showSpinner: false }}
      shallowRouting
    />
  );
}
