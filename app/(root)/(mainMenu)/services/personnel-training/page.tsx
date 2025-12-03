import { LayoutWithSidebar } from "@/components/page/LayoutWithSidebar";
import { getServices } from "@/services/services";

export default async function PersonalTrainingPage() {
  const data = await getServices();

  return (
    <LayoutWithSidebar
      title={data?.data ? data.data[6].title : ""}
      third={data?.data ? data.data[6].title : ""}
    >
      <div
        className="select-inner"
        dangerouslySetInnerHTML={{
          __html: data ? data.data[6].content : "",
        }}
      />
    </LayoutWithSidebar>
  );
}
