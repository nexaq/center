import React, {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
  useId, useLayoutEffect,
  useState,
} from 'react';
import { Checkbox } from 'antd';
import st from './AllCheckboxCheck.module.scss';
import cn from "classnames";

type Checked = Record<string, boolean | undefined>;

type AllCheckboxCheckContextType = {
  enabled: boolean;
  items: Set<string>;
  setItems: Dispatch<SetStateAction<Set<string>>>;
  checked: Checked;
  setChecked: Dispatch<SetStateAction<Checked>>;
  isError: boolean,
  setIsError: React.Dispatch<React.SetStateAction<boolean>>,
};

export const AllCheckboxCheckContext =
  createContext<AllCheckboxCheckContextType>({
    enabled: false,
    items: new Set(),
    checked: {},
    setChecked: () => {},
    setItems: () => {},
    isError: false,
    setIsError: () => {}
  });

export const LabelWithCheckbox = ({
  label,
}: {
  label: string;
}) => {
  const { isError } = useContext(AllCheckboxCheckContext);

  return (
    <div
      className={cn(st.labelWithCheckbox, isError && st.labelWithCheckboxError)}
    >
      <AllCheckedCheckBox />
      {label}
    </div>
  );
};

export const AllCheckedCheckBox = () => {
  const { checked, setItems, items, setChecked, enabled, isError } = useContext(
    AllCheckboxCheckContext,
  );

  const id = useId();
  const isChecked = checked[id] ?? false;

  useLayoutEffect(() => {
    if (enabled && !items.has(id)) {
      setItems((v) => {
        const newSet = new Set(v);
        newSet.add(id);
        return newSet;
      });
    }
  }, [enabled, items]);

  if (!enabled) {
    return;
  }

  return (
    <Checkbox
      className={isError && !isChecked ? st.checkbox : ''}
      defaultChecked={false}
      checked={isChecked}
      onChange={(e) => {
        setChecked((v) => ({
          ...v,
          [id]: e.target.checked,
        }));
      }}
    />
  );
};

const AllCheckboxCheckWrapper = ({ children }: { children: ReactNode }) => {
  const [checked, setChecked] = useState<Checked>({});
  const [items, setItems] = useState<Set<string>>(new Set());
  const [isError, setIsError] = useState(false);

  return (
    <AllCheckboxCheckContext
      value={{
        isError,
        setIsError,
        enabled: true,
        checked,
        setChecked,
        items,
        setItems,
      }}
    >
      {children}
    </AllCheckboxCheckContext>
  );
};

export default AllCheckboxCheckWrapper;
