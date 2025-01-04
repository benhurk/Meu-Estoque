import ListItemType from './ListItemType';

export type FormMode = 'add' | 'edit';
export type FormState = Omit<ListItemType, 'id' | 'options'>;
