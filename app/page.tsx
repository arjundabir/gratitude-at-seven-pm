import Footer from "@/components/footer";
import GratitudeContextProvider from "@/components/gratitude-context";
import GratitudeInput from "@/components/gratitude-input";
import HelperText from "@/components/helper-text";
import db from "@/lib/db";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  const anonId = cookieStore.get("id");
  if (!anonId) return;
  const message: string | undefined = db.find(anonId.value);

  return (
    <div className="h-svh w-full flex flex-col overflow-y-clip">
      <GratitudeContextProvider message={message}>
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="flex items-start justify-center">
            <p className="mr-1">I&apos;m grateful for</p>
            <GratitudeInput />
          </div>
          <HelperText />
        </div>
      </GratitudeContextProvider>
      <Footer />
    </div>
  );
}
