import { DehydratedState } from "@tanstack/react-query";
import { NextPageContext } from "next";
import type { AppProps } from "next/app";

export type PageProps = {
  dehydratedState?: DehydratedState;
};

export type ExtendedAppProps<P = {}> = {
  err?: NextPageContext["err"];
} & AppProps<P>;
