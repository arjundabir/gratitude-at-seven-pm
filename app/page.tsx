import GratitudeContextProvider from "@/components/gratitude-context";
import GratitudeInput from "@/components/gratitude-input";
import HelperText from "@/components/helper-text";
import NavigationBar from "@/components/navigation-bar";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  const gratitudeCookie = cookieStore.get("gm");
  const publicCookie = cookieStore.get("public");
  const message = gratitudeCookie
    ? decodeURIComponent(gratitudeCookie.value)
    : undefined;
  const isPublic = publicCookie ? publicCookie.value === "true" : false;

  return (
    <div className="flex-1 w-full flex flex-col">
      <GratitudeContextProvider message={message} isPublic={isPublic}>
        <NavigationBar />
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="flex items-start justify-center">
            <p className="mr-1">I&apos;m grateful for</p>
            <GratitudeInput />
          </div>
          <HelperText />
        </div>
      </GratitudeContextProvider>
    </div>
  );
}
