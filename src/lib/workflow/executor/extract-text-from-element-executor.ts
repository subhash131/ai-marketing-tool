import { ExecutionEnvironment } from "@/types/executor";
import { ExtractTextFromElementTask } from "@/app/(protected)/workflow/_lib/tasks/extract-text-from-element-task";
import * as cheerio from "cheerio";

export const ExtractTextFromElement = async (
  environment: ExecutionEnvironment<typeof ExtractTextFromElementTask>
): Promise<boolean> => {
  try {
    const selector = environment.getInput("Selector");
    if (!selector) {
      environment.log.error("Selector is not defined");
      return false;
    }

    const html = environment.getInput("HTML");

    const $ = cheerio.load(html);
    const element = $(selector);
    if (!element) {
      environment.log.error("Element is not defined");
      return false;
    }
    const extractedText = $.text(element);
    if (!extractedText) {
      environment.log.error("Extracted text is empty, check selector.");
      return false;
    }

    environment.setOutput("Extracted text", extractedText || "");

    return true;
  } catch (e: any) {
    environment.log.error(e.message);
    return false;
  }
};
