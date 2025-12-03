import { LayoutWithSidebar } from "@/components/page/LayoutWithSidebar";
import { getServices } from "@/services/services";

export default async function OutsourcingPage() {
  const data = await getServices();

  return (
    <LayoutWithSidebar
      title={data?.data ? data.data[5].title : ""}
      third={data?.data ? data.data[5].title : ""}
    >
      <div
        className="select-inner"
        dangerouslySetInnerHTML={{
          __html: data ? data.data[5].content : "",
        }}
      />
    </LayoutWithSidebar>
  );
}
