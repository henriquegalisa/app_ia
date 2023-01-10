import {
  CsvEntity,
  csvContants,
  FileUploaderModelValue,
  ProcessedCsvFile,
} from "@/types";
import { v4 as uuidv4 } from "uuid";
export async function useCsvParser(file: FileUploaderModelValue) {
  return await parseCsvFile(file);
}
export async function useCsvWriter(
  processedFile: ProcessedCsvFile
): FileUploaderModelValue {
  return await writeCsvFile(processedFile);
}
export async function writeCsvFile(
  processedFile: ProcessedCsvFile
): FileUploaderModelValue {
  const { headers, body } = processedFile;
  const headerLine = headers.slice(1).join(csvContants.cellSplit);
  const bodyLines = body.map((item, bodyIndex) => {
    let values = [];
    headers.slice(1).forEach((header, headerIndex) => {
      values.push(item[header]);
    });
    if (values.length === 0) return;
    return values.join(csvContants.cellSplit);
  });
  const csvContent = [headerLine, ...bodyLines].join(csvContants.lineBreak);
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  return new File([blob], "file.csv", { type: "text/csv" });
}
export async function parseCsvFile(file: FileUploaderModelValue) {
  if (!file) return;
  const csvFullContent = await file.text();
  const lines = csvFullContent.split(csvContants.lineBreak);
  if (!lines || lines.length === 0) return;
  const { headers } = await parseHeaders(lines[0]);
  const { items } = await parseBody(lines.slice(1), headers);
  return { headers, body: items };
}
export async function parseHeaders(headerLine: string) {
  const headers = headerLine.split(csvContants.cellSplit);
  return { headers: ["id", ...(headers ?? [])] };
}
export async function parseBody(bodyLines: string[], headers: string[] = []) {
  const items = bodyLines
    .slice(0, -1)
    .map((line) => line.split(csvContants.cellSplit))
    .map((item) => {
      const entity: CsvEntity = {
        id: uuidv4(),
      };
      headers.slice(1).forEach((header, index) => {
        entity[header] = item[index];
      });
      return entity;
    });
  return { items: items ?? [] };
}
