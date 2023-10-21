import s from '@/components/Board/components/AddTodoModal/styles.module.scss';
import { Label } from '@/components/ui/Label/Label';
import { Checkbox } from '@/components/ui/Checkbox/Checkbox';
import { Input } from '@/components/ui/Input/Input';
import { Button } from '@/components/ui/Button/Button';
import { SVG } from '@/components/ui/SVG/SVG';
import CloseIcon from '@/images/closeIcon.svg';
import { ListItems } from '@commonTypes/Task';
import { FC } from 'react';

interface CheckListProps {
  listItems: ListItems;
  setListItems: (v: ListItems) => void;
}

export const CheckList: FC<CheckListProps> = ({ listItems, setListItems }) => {
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

  return Object.entries(listItems).map(([id, item]) => {
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
        <Button
          type="button"
          kind="secondary"
          square={true}
          className={s.deleteBtn}
          onClick={() => onDeleteListItem(id)}
        >
          <SVG src={CloseIcon} className={s.deleteIcon} />
        </Button>
      </div>
    );
  });
};
