import puppeteer from "puppeteer";
import { waitFor } from "../execute-workflow";
import { ExecutionEnvironment } from "@/types/executor";
import { LaunchBrowserTask } from "@/app/(protected)/workflow/_lib/tasks/launch-browser";

export const LaunchBrowserExecutor = async (
  environment: ExecutionEnvironment<typeof LaunchBrowserTask>
): Promise<boolean> => {
  try {
    const websiteUrl = environment.getInput("website url");
    console.log({ websiteUrl });
    const browser = await puppeteer.launch({
      headless: false, //for testing
    });
    environment.setBrowser(browser);
    const page = await browser.newPage();
    await page.goto(websiteUrl);
    environment.setPage(page);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
