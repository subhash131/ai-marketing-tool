import puppeteer from "puppeteer";
import { ExecutionEnvironment } from "@/types/executor";
import { LaunchBrowserTask } from "@/app/(protected)/workflow/_lib/tasks/launch-browser";

export const LaunchBrowserExecutor = async (
  environment: ExecutionEnvironment<typeof LaunchBrowserTask>
): Promise<boolean> => {
  try {
    const websiteUrl = environment.getInput("website url");
    console.log({ websiteUrl });
    const browser = await puppeteer.launch({
      headless: false,
    });
    environment.log.info("Browser launched");
    environment.setBrowser(browser);
    const page = await browser.newPage();
    await page.goto(websiteUrl);
    environment.setPage(page);
    environment.log.info(`opened page at ${websiteUrl}`);
    return true;
  } catch (e: any) {
    environment.log.error(e.message);
    return false;
  }
};
