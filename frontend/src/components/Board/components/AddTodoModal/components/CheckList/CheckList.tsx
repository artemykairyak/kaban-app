import s from './styles.module.scss';
import { Label } from '@/components/ui/Label/Label';
import { Checkbox } from '@/components/ui/Checkbox/Checkbox';
import { Input } from '@/components/ui/Input/Input';
import { SVG } from '@/components/ui/SVG/SVG';
import { ListItems } from '@commonTypes/Task';
import { FC } from 'react';
import AddIcon from '@/images/icons/addTaskIcon.svg';
import DeleteIcon from '@/images/icons/deleteIcon.svg';

interface CheckListProps {
  listItems: ListItems;
  setListItems: (v: ListItems) => void;
  onAddListItem: VoidFunction;
}

export const CheckList: FC<CheckListProps> = ({
  listItems,
  setListItems,
  onAddListItem,
}) => {
  const onChangeListItem = (id: string, value: string | boolean) => {
    const newItems = { ...listItems };

    if (typeof value === 'string') {
      newItems[id] = { ...newItems[id], text: value };
    } else {
      newItems[id] = { ...newItems[id], checked: value };
    }

    setListItems(newItems);
  };

  const onDeleteListItem = (id: string) => {
    const newItems = { ...listItems };
    delete newItems[id];

    setListItems(newItems);
  };

  if (!listItems) {
    return null;
  }

  return Object.entries(listItems).map(([id, item], index, array) => {
    return (
      <div className={s.listItem} key={id}>
        <Label className={s.label} htmlFor={`listItem${id}`}>
          <Checkbox
            checked={item.checked}
            id={`listItem${id}`}
            onChange={({ target }) => onChangeListItem(id, target.checked)}
          />
          <Input
            name={`listItemInput${id}`}
            value={item.text}
            onChange={(v) => onChangeListItem(id, v)}
            className={s.checkboxInput}
          />
        </Label>
        <button onClick={() => onDeleteListItem(id)}>
          <SVG src={DeleteIcon} className={s.deleteIcon} />
        </button>
        {index === array.length - 1 && (
          <button type="button" onClick={onAddListItem}>
            <SVG src={AddIcon} className={s.addListItemIcon} />
          </button>
        )}
      </div>
    );
  });
};
