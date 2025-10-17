import {
  ChangeEvent,
  isValidElement,
  MouseEventHandler,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Col, Row } from "./Container";
import useDebounce from "@hooks/Debounce";
import { Button } from "./Button";

interface TagSelectProps {
  tags: string[];
  onActiveTagsChange?: (tags: string[]) => void;
}

export function TagSelect({
  tags,
  onActiveTagsChange = () => {},
}: TagSelectProps) {
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const onChipClick = (text: string, active: boolean) => {
    setActiveTags((tags) => {
      if (active) {
        return [...tags, text].sort();
      } else {
        return tags.filter((existing) => existing != text);
      }
    });
  };

  useEffect(() => {
    onActiveTagsChange(activeTags);
  }, [activeTags, onActiveTagsChange]);

  return (
    <>
      <Col className="space-0">
        <span className="text-neutral-500 dark:text-gray-400 text-xs">Tags</span>
        <Row className="mt-1">
          {tags.map((tag, index) => (
            <Chip text={tag} onClick={onChipClick} key={index} />
          ))}
        </Row>
      </Col>
    </>
  );
}

interface ChipProps {
  text: string;
  className?: string;
  onClick?: (text: string, active: boolean) => void;
}

function Chip({ text, className = "", onClick = () => {} }: ChipProps) {
  const [active, setActive] = useState(false);
  const onChipClick: MouseEventHandler = () => {
    setActive((prev) => !prev);
    onClick(text, !active);
  };

  return (
    <>
      <input
        type="button"
        className={`${
          active 
            ? "bg-blue-500 text-white" 
            : "bg-gray-100 dark:bg-gray-600 hover:bg-blue-300 dark:hover:bg-blue-700 hover:text-white text-gray-700 dark:text-gray-200"
        } border-none text-sm m-1 p-2 rounded-full cursor-pointer transition-colors ${className}`}
        onClick={onChipClick}
        value={text}
      />
    </>
  );
}

interface DebounceTextInputProps {
  placeholder?: string;
  delayMs?: number;
  onValueChange: (value: string) => void;
}

export function DebounceTextInput({
  placeholder = "",
  onValueChange,
  delayMs = 0,
}: DebounceTextInputProps) {
  const [inputText, setInputText] = useState<string>("");
  const debouncedText = useDebounce<string>(inputText, delayMs);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.currentTarget.value);
  };

  useEffect(() => {
    onValueChange(debouncedText);
  }, [debouncedText, onValueChange]);

  return (
    <>
      <input
        type="text"
        placeholder={placeholder}
        onChange={handleInputChange}
        className="w-full bg-white dark:bg-gray-700 border border-slate-300 dark:border-gray-600 rounded-md p-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </>
  );
}

interface TextInputProps {
  name: string;
  onChange: (value: string, name: string) => void;
  value?: string;
  delay?: number;
  placeholder?: string;
}

export function TextInput({
  name,
  onChange,
  value = "",
  placeholder = "",
}: TextInputProps) {
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange(event.currentTarget.value, name);
    },
    [onChange, name],
  );

  return (
    <>
      <input
        type="text"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={handleChange}
      />
    </>
  );
}

interface MultiItemInputProps<T> {
  label: string;
  max?: number;
  itemRenderer: (
    handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void,
    removeCallback: () => void,
  ) => ReactNode;
  onDataChange: (data: T[]) => void;
}

export function MultiItemInput<T>({
  label,
  max = 100,
  itemRenderer,
  onDataChange,
}: MultiItemInputProps<T>) {
  const [data, setData] = useState<Map<string, T>>(new Map());
  const [items, setItems] = useState<React.ReactNode[]>([]);
  const maxReached = useMemo<boolean>(
    () => items.length >= max,
    [max, items.length],
  );
  const addEmptyData = useCallback((key: string) => {
    setData((prev) => {
      const newData = new Map(prev);
      newData.set(key, {} as T);
      return newData;
    });
  }, []);
  const modifyData = useCallback(
    (key: string, modifier: (data: T) => T) => {
      setData((prev) => {
        const newData = new Map(prev);
        newData.set(key, modifier(newData.get(key) || ({} as T)));
        return newData;
      });
    },
    [setData],
  );
  const removeData = (key: string) =>
    setData((prev) => {
      const newData = new Map(prev);
      newData.delete(key);
      return newData;
    });
  const removeItem = useCallback((key: string) => {
    removeData(key);
    setItems((prev) => {
      return prev.filter((form) => isValidElement(form) && form.key !== key);
    });
  }, []);
  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>, key: string) => {
      const target = event.currentTarget;
      modifyData(key, (data) => {
        return { ...data, [target.name]: target.value };
      });
    },
    [modifyData],
  );
  const appendNewForm = useCallback(() => {
    setItems((prev) => {
      if (prev.length < max) {
        const itemId = prev.length.toString();
        const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
          handleInputChange(event, itemId);
        };
        const handleRemove = () => {
          removeItem(itemId);
        };

        addEmptyData(itemId);
        return [
          ...prev,
          <div key={itemId}>{itemRenderer(changeHandler, handleRemove)}</div>,
        ];
      }
      return prev;
    });
  }, [addEmptyData, handleInputChange, itemRenderer, max, removeItem]);
  const handleAdd = useCallback(() => {
    appendNewForm();
  }, [appendNewForm]);

  useEffect(() => {
    if (items.length < 1) {
      appendNewForm();
    }
  }, [appendNewForm, items.length]);

  useEffect(() => {
    onDataChange([...data.values()]);
    console.count("Address Changed: ");
  }, [data, onDataChange]);

  return (
    <div>
      <span className="flex justify-between align-center">
        {label}
        {maxReached ? null : (
          <Button
            onClick={(e) => {
              e.preventDefault();
              handleAdd();
            }}
          >
            Add
          </Button>
        )}
      </span>
      {items}
    </div>
  );
}
