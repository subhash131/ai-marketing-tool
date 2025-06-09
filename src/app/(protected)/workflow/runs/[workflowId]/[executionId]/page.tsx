import { getWorkflowExecutionWithPhases } from "@/actions/workflow/get-workflow-execution-with-phases";
import TopBar from "./_components/top-bar";
import ExecutionViewer from "./_components/execution-viewer";

type Props = {
  params: Promise<{
    workflowId: string;
    executionId: string;
  }>;
};

export default async function RunPage({ params }: Props) {
  const p = await params;

  let workflowExecution;

  try {
    workflowExecution = await getWorkflowExecutionWithPhases(p.executionId);
  } catch (e) {
    console.log(e);
  }

  if (!workflowExecution) return <div>404 Not Found</div>;

  return (
    <div className="flex flex-col max-w-screen h-full overflow-x-hidden bg-background">
      <TopBar executionId={p.executionId} workflowId={p.workflowId} />
      <section className="flex size-full text-wrap">
        <ExecutionViewer initialData={workflowExecution} />
      </section>
    </div>
  );
}
