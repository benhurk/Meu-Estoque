import ListItemType from './ListItemTypes';

export type ItemFormMode = 'add' | 'edit';
export type ItemFormState = Omit<ListItemType, 'id' | 'selected'>;
