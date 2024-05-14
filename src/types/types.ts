import { CardDef } from '@/app/db/schema';

export enum Columns {
  IDEAS,
  IN_PROGRESS,
  DONE,
  DONEEE,
  DONEEEE,
  DONEEEEE,
  DONEEEEEE,
}

export type Card = {
  id: string;
  title: string;
  tags?: string[];
  users?: string[];
};

export type CardsState = { [key in Columns]: Card[] };

export type ColumnProps = {
  title: string;
  id: string;
  cards: CardDef[] | undefined;
  onDrop: (column: string, index: number, dropAreaColumn: number) => void;
  index: number;
};
