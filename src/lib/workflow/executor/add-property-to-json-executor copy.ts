import { ExecutionEnvironment } from "@/types/executor";
import { AddPropertyToJson } from "@/app/(protected)/workflow/_lib/tasks/add-property-to-json";

export const AddPropertyToJsonExecutor = async (
  environment: ExecutionEnvironment<typeof AddPropertyToJson>
): Promise<boolean> => {
  try {
    const jsonData = environment.getInput("JSON");
    const propertyName = environment.getInput("Property name");
    const propertyValue = environment.getInput("Property value");
    if (!jsonData) {
      environment.log.error("jsonData is not defined");
      return false;
    }
    if (!propertyName) {
      environment.log.error("property name is not defined");
      return false;
    }
    if (!propertyValue) {
      environment.log.error("property value is not defined");
      return false;
    }
    const json = JSON.parse(jsonData);
    json[propertyName] = propertyValue;

    environment.setOutput("Updated JSON", JSON.stringify(json));

    return true;
  } catch (e: any) {
    environment.log.error(e.message);
    return false;
  }
};
