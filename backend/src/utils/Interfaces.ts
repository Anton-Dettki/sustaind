export interface LegalAct {
  id: string;
  title: string;
  titleShort: string;
  jurisdiction: string;
  enactmentDate: string;
}

export interface Obligation {
  id: string;
  title: string;
  legalActTitleShort: string;
  description: string;
  status: string;
}
