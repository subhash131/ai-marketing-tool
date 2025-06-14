import { ExecutionEnvironment } from "@/types/executor";
import { ClickElementTask } from "@/app/(protected)/workflow/_lib/tasks/click-element";
import { DeliverViaWebhook } from "@/app/(protected)/workflow/_lib/tasks/deliver-via-webhook";

export const DeliverViaWebhookExecutor = async (
  environment: ExecutionEnvironment<typeof DeliverViaWebhook>
): Promise<boolean> => {
  try {
    const url = environment.getInput("Target URL");
    if (!url) {
      environment.log.error("input url is not defined");
      return false;
    }
    const body = environment.getInput("Body");
    if (!url) {
      environment.log.error("input body is not defined");
      return false;
    }
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const statusCode = res.status;
    const statusText = res.statusText;
    if (statusCode !== 200) {
      environment.log.error("Status code::" + statusCode);
      environment.log.error("Webhook delivery failed ::" + statusText);
      return false;
    }
    const responseBody = await res.json();
    environment.log.info(JSON.stringify(responseBody, null, 2));
    return true;
  } catch (e: any) {
    environment.log.error(e.message);
    return false;
  }
};
