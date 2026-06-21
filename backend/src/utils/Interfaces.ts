export interface LegalAct {
  title: string;
  titleShort: string;
  jurisdiction: string;
  enactmentDate: string;
}

export interface Obligation {
  title: string;
  legalActTitleShort: string;
  description: string;
  status: string;
}
