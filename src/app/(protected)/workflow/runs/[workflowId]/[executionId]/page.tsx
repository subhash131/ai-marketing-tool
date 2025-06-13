import TopBar from "./_components/top-bar";
import ExecutionViewer from "./_components/execution-viewer";
import { use } from "react";

type Props = {
  params: Promise<{
    workflowId: string;
    executionId: string;
  }>;
};

export default function RunPage({ params }: Props) {
  const { executionId, workflowId } = use(params);

  return (
    <div className="flex flex-col max-w-screen h-full overflow-x-hidden bg-background">
      <TopBar executionId={executionId} workflowId={workflowId} />
      <section className="flex size-full text-wrap">
        <ExecutionViewer executionId={executionId} />
      </section>
    </div>
  );
}
