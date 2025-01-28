import ListItemType from './ListItemTypes';

export type FormMode = 'add' | 'edit';
export type FormState = Omit<ListItemType, 'id' | 'options' | 'selected'>;
