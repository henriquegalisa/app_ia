export declare type FileUploaderModelValue = File | undefined | null;
export declare type CsvEntity = {
  id: string;
  [key: string]: string;

  //   price?: number;
  //   price_feb?: number;
};

export const csvContants = {
  lineBreak: "\r",
  cellSplit: ",",
};
export const apiConfigurations = {
  baseUrl: "http://localhost:8000",
};
