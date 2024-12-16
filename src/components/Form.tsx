import { ChangeEvent, MouseEventHandler, useEffect, useState } from "react";
import { Col, Row } from "./Container";
import useDebounce from "@hooks/Debounce";

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
        <span className="text-neutral-500 text-xs">Tags</span>
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
        className={`${active ? "bg-primary-500 text-white" : "bg-neutral-100 hover:bg-primary-300 hover:text-white"} border-none text-sm m-1 p-2 rounded-full cursor-pointer transition-colors ${className}`}
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
  delayMs = 1000,
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
      />
    </>
  );
}
