import { ExecutionEnvironment } from "@/types/executor";
import { ReadPropertyFromJson } from "@/app/(protected)/workflow/_lib/tasks/read-property-from-json";

export const ReadPropertyFromJsonExecutor = async (
  environment: ExecutionEnvironment<typeof ReadPropertyFromJson>
): Promise<boolean> => {
  try {
    const jsonData = environment.getInput("JSON");
    const propertyPath = environment.getInput("Property path");
    if (!jsonData) {
      environment.log.error("jsonData is not defined");
      return false;
    }
    if (!propertyPath) {
      environment.log.error("property Path is not defined");
      return false;
    }

    const json = JSON.parse(jsonData);
    const propertyValue = json[propertyPath];
    if (!propertyValue) {
      environment.log.error("property not found");
      return false;
    }

    environment.setOutput("Property value", propertyValue);

    return true;
  } catch (e: any) {
    environment.log.error(e.message);
    return false;
  }
};
