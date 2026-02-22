export type ValidationIssue = {
  path: string;
  message: string;
};

export class HttpError extends Error {
  public readonly statusCode?: number;
  public readonly validationIssues?: ValidationIssue[];

  constructor(
    message: string,
    statusCode?: number,
    validationIssues?: ValidationIssue[],
  ) {
    super(message);
    this.statusCode = statusCode;
    this.validationIssues = validationIssues;
    this.name = "HttpError";
  }
}
