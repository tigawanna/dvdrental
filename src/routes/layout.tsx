import { Nprogress } from "@/components/navigation/nprogress/Nprogress";
import {
  ClientSuspense,
  LayoutProps,
  PageContext,
  useLocation,
} from "rakkasjs";


import "./index.css";
import React from "react";
import { Sidebar } from "@/components/navigation/bars/sidebar";
import { Toaster } from "@/components/shadcn/ui/sonner";


function Layout({ children }: LayoutProps) {
  const location = useLocation();

  // console.log(" page ctx ==== ",page_ctx.locals.pb)
  return (
    <div className="w-full min-h-screen h-full flex flex-col items-center ">
      {/* <Head description={"Resume building assistant"} /> */}
      <ClientSuspense fallback={<div></div>}>
        <Nprogress isAnimating={location && location?.pending ? true : false} />
      </ClientSuspense>
      <div className="w-full flex h-full gap-2">
        <div className="min-w-[5%] w-fit flex h-full gap-2">
          <Sidebar />
        </div>
        <div className="w-full flex flex-col gap-2 pt-2">
          {/* <div className="w-fit flex rounded-xl p-auto">
            <ClientSuspense fallback={<div className="h-5"></div>}>
              <BreadCrumbs />
            </ClientSuspense>
          </div> */}
          {children}
        </div>
      </div>
      <Toaster />
      {import.meta.env.DEV && <ReactQueryDevtoolsProduction />}
    </div>
  );
}
Layout.preload = (ctx: PageContext) => {
  return {
    head: {
      title: "DVD rental",
      description: " DVD rental service , build with Grahql + vite + rakkasjs ",
    },
  };
};

const ReactQueryDevtoolsProduction = React.lazy(() =>
  import("@tanstack/react-query-devtools/build/modern/production.js").then(
    (d) => ({
      default: d.ReactQueryDevtools,
    }),
  ),
);

export default Layout;
