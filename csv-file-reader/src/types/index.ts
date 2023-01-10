export declare type FileUploaderModelValue = File | undefined | null;
export declare type CsvEntity = {
  //id: string;
  [key: string]: string;

  //   price?: number;
  //   price_feb?: number;
};

export declare type ProcessedCsvFile = {
  headers: string[];
  body: CsvEntity[];
};
export const csvContants = {
  lineBreak: "\r",
  cellSplit: ",",
};
export const apiConfigurations = {
  baseUrl: "http://localhost:8000",
};
export enum Events {
  onFetched = "onFetched",
  onConverted = "onConverted",
  onSelected = "onSelected",
  onAddClicked = "onAddClicked",
  onSearch = "onSearch",
  onScroll = "onScroll",
  onLoadMore = "onLoadMore",
  onScrollDelayed = "onScrollDelayed",
  onModelValueUpdate = "update:modelValue",
  onModelValid = "update:valid",
  onConfirmClicked = "onConfirmClicked",
  onCancelClicked = "onCancelClicked",
  onOutsideClicked = "onOutsideClicked",
  onSaveClicked = "onSaveClicked",
  onDeleteClicked = "onDeleteClicked",
  onContinueClicked = "onContinueClicked",
  onPreviewClicked = "onPreviewClicked",
  onApplyClicked = "onApplyClicked",
  onClick = "onClick",
  onDismissClicked = "onDismissClicked",
  onValidationChanged = "onValidationChanged",
  onValidChanged = "onValidChanged",
  click = "click",
  change = "change",
  blur = "blur",
}
export enum EventTypesEnum {
  View = "view",
  Cart = "cart",
  RemoveFromCart = "remove_from_cart",
}
export enum MatrixResultTypes {
  EventType = "event_type",
}
