import Footer from "@/components/footer";
import GratitudeContextProvider from "@/components/gratitude-context";
import GratitudeInput from "@/components/gratitude-input";
import HelperText from "@/components/helper-text";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  const gratitudeMessage = cookieStore.get("gratitudeMessage");

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-between p-2">
      <div />

      <GratitudeContextProvider
        gratitudeMessageCookie={gratitudeMessage?.value.replace(/"/g, "")}
      >
        <div className="flex items-center justify-center">
          <p className="mr-1">I&apos;m grateful for</p>
          <GratitudeInput />
        </div>
        <HelperText />
      </GratitudeContextProvider>
      <Footer />
    </div>
  );
}
