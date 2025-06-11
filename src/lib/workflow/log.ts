import {
  Log,
  LogCollector,
  LogFunction,
  LogLevel,
  LogLevels,
} from "@/types/executor";

export const createLogCollector = (): LogCollector => {
  const logs: Log[] = [];
  const getAll = () => logs;

  const logFunctions = {} as Record<LogLevel, LogFunction>;
  LogLevels.forEach(
    (level) =>
      (logFunctions[level] = (message: string) =>
        logs.push({ logLevel: level, message, timestamp: new Date() }))
  );

  return {
    getAll,
    ...logFunctions,
  };
};
