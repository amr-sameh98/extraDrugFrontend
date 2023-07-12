export interface Idrug {
  id: number;
  ar_Name: string;
  en_Name: string
  parcode: string,
  purpose: string;
  isTradingPermitted: boolean;
  companyId: number;
  companyName: string
  typeId: number;
  categoryId: number;
  effectiveMatrials: string[];
}
