import { Quantity } from "./ListItem";

type ItemForm = {
    nameField: string;
    typeField: Quantity;
    qtdField: number;
    alertField: number;
}

export type FormMode = 'add' | 'edit';

export default ItemForm;