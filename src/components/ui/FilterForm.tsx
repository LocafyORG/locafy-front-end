import { useMemo, useState } from "react";
import { Paper, Row } from "@components/Container";
import { DebounceTextInput, TagSelect } from "@components/Form";
import styles from "@styles/components/ui/FilterForm.module.scss";

interface FilterFormProps {
  initialValues?: FilterFormValues;
  onSearchTermChange?: (searchTerm: string) => void;
  onActiveTagsChange?: (tags: string[]) => void;
}

export class FilterFormValues {
  tags: string[] = [];
  search: string = "";
  cities: string[] = [];
  date: number = Date.now();
  contact: string = "";
}

export default function FilterForm({
  initialValues = new FilterFormValues(),
  onSearchTermChange = () => {},
  onActiveTagsChange = () => {},
}: FilterFormProps) {
  const [formValues] = useState<FilterFormValues>(initialValues);
  const tags = useMemo(() => formValues.tags, [formValues.tags]);

  return (
    <Paper className={`${styles["filter-form"]}`}>
      <Row>
        <DebounceTextInput
          delayMs={800}
          placeholder="Search"
          onValueChange={onSearchTermChange}
          name="Search"
        />
      </Row>
      <Row>
        <select
          className="bg-white border-1 border-slate-300 rounded-md p-2"
          onChange={(e) => {
            console.log(e.currentTarget.value);
          }}
        >
          <option>Newest</option>
          <option>Oldest</option>
        </select>
        <input type="datetime-local" />
      </Row>
      <Row>
        <TagSelect tags={tags} onActiveTagsChange={onActiveTagsChange} />
      </Row>
    </Paper>
  );
}
