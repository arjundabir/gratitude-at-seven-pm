import { supabase } from "@/lib/supabase";
import GratitudeMessages from "@/components/gratitude-messages";

export const revalidate = 0;

const GratitudesPage = async () => {
  const { data, error } = await supabase
    .from("gratitudeatsevenpm")
    .select("id, message");

  if (error) {
    console.error("Error fetching messages:", error);
    return;
  }

  return (
    <div className="h-[calc(100svh-60px)] w-full flex flex-col justify-center max-w-2xl mx-auto p-2">
      <p className="mr-1 max-w-lg text-left mb-1">I&apos;m grateful for:</p>
      <GratitudeMessages data={data} />
    </div>
  );
};

export default GratitudesPage;
