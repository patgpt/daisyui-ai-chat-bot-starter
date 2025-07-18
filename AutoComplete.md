import {Layout} from '@react-spectrum/docs';
export default Layout;

import docs from 'docs:react-aria-components';
import {PropTable, HeaderInfo, TypeLink, PageDescription, StateTable, ContextTable} from '@react-spectrum/docs';
import styles from '@react-spectrum/docs/src/docs.css';
import packageData from 'react-aria-components/package.json';
import ChevronRight from '@spectrum-icons/workflow/ChevronRight';
import statelyDocs from 'docs:@react-stately/autocomplete';
import {ExampleCard} from '@react-spectrum/docs/src/ExampleCard';
import {ExampleList} from '@react-spectrum/docs/src/ExampleList';
import SearchField from '@react-spectrum/docs/pages/assets/component-illustrations/SearchField.svg';
import TextField from '@react-spectrum/docs/pages/assets/component-illustrations/TextField.svg';
import Menu from '@react-spectrum/docs/pages/assets/component-illustrations/Menu.svg';
import ListBox from '@react-spectrum/docs/pages/assets/component-illustrations/ListBox.svg';
import Collections from '@react-spectrum/docs/pages/assets/component-illustrations/Collections.svg';
import Selection from '@react-spectrum/docs/pages/assets/component-illustrations/Selection.svg';
import {StarterKits} from '@react-spectrum/docs/src/StarterKits';

---

category: Pickers
keywords: [autocomplete, search, menu, command palette, aria]
type: component
preRelease: beta

---

# Autocomplete

## Example

```tsx example
import {
  Autocomplete,
  Button,
  Input,
  Label,
  Menu,
  MenuItem,
  SearchField,
  useFilter,
} from "react-aria-components";

function Example() {
  let { contains } = useFilter({ sensitivity: "base" });
  return (
    <div className="autocomplete">
      <Autocomplete filter={contains}>
        <SearchField>
          <Label>Commands</Label>
          <Input placeholder="Search commands...." />
          <Button>✕</Button>
        </SearchField>
        <Menu>
          <MenuItem>Create new file...</MenuItem>
          <MenuItem>Create new folder...</MenuItem>
          <MenuItem>Assign to...</MenuItem>
          <MenuItem>Assign to me</MenuItem>
          <MenuItem>Change status...</MenuItem>
          <MenuItem>Change priority...</MenuItem>
          <MenuItem>Add label...</MenuItem>
          <MenuItem>Remove label...</MenuItem>
        </Menu>
      </Autocomplete>
    </div>
  );
}
```

## Features

`Autocomplete` can be used to build UI patterns such as command palettes, searchable menus, and filterable selects.

- **Flexible** – Support for multiple input types and collection types, controlled and uncontrolled state, and custom filter functions.
- **Keyboard navigation** – Autocomplete can be navigated using the arrow keys, along with page up/down, home/end, etc. The list of options is filtered while typing into the input, and items can be selected with the enter key.
- **Accessible** – Follows the [ARIA autocomplete pattern](https://w3c.github.io/aria/#aria-autocomplete), with support for items and sections, and slots for label and description elements within each item.
- **Styleable** – Items include builtin states for styling, such as hover, press, focus, selected, and disabled.

**Note**: Autocomplete supports experiences where the text input and suggestion lists are siblings. For an input combined with a separate popover suggestion list, see the [ComboBox](ComboBox.html) component.

## Anatomy

`Autocomplete` is a controller for a child text input, such as a [TextField](TextField.html) or [SearchField](SearchField.html), and a collection component such as a [Menu](Menu.html) or [ListBox](ListBox.html). It enables the user to filter a list of items, and navigate via the arrow keys while keeping focus on the input.

```tsx
import { Autocomplete, SearchField, Menu } from "react-aria-components";

<Autocomplete>
  <SearchField /> or <TextField />
  <Menu /> or <ListBox />
</Autocomplete>;
```

### Concepts

`Autocomplete` makes use of the following concepts:

<section className={styles.cardGroup} data-size="small">

<ExampleCard
  url="collections.html"
  title="Collections"
  description="Defining collections of items, async loading, and updating items over time.">
<Collections />
</ExampleCard>

<ExampleCard
  url="selection.html"
  title="Selection"
  description="Interactions and data structures to represent selection.">
<Selection />
</ExampleCard>

</section>

### Composed components

An `Autocomplete` can use the following components, which may also be used standalone or reused in other components.

<section className={styles.cardGroup} data-size="small">

<ExampleCard
  url="TextField.html"
  title="TextField"
  description="A text field allows a user to enter a plain text value with a keyboard.">
<TextField />
</ExampleCard>

<ExampleCard
  url="SearchField.html"
  title="SearchField"
  description="A search field allows a user to enter and clear a search query.">
<SearchField />
</ExampleCard>

<ExampleCard
  url="Menu.html"
  title="Menu"
  description="A menu displays a list of actions or options that a user can choose.">

  <Menu />
</ExampleCard>

<ExampleCard
  url="ListBox.html"
  title="ListBox"
  description="A listbox allows a user to select one or more options from a list.">
<ListBox />
</ExampleCard>

</section>

## Examples

<ExampleList tag="autocomplete" />

## Starter kits

To help kick-start your project, we offer starter kits that include example implementations of all React Aria components with various styling solutions. All components are fully styled, including support for dark mode, high contrast mode, and all UI states. Each starter comes with a pre-configured [Storybook](https://storybook.js.org/) that you can experiment with, or use as a starting point for your own component library.

<StarterKits component="autocomplete" />

## Reusable wrappers

If you will use an Autocomplete in multiple places in your app, you can wrap all of the pieces into a reusable component. This way, the DOM structure, styling code, and other logic are defined in a single place and reused everywhere to ensure consistency.

This example wraps `Autocomplete` and all of its children together into a single component which accepts a `label` prop and `children`, which are passed through to the right places. The `Item` component is also wrapped to apply class names based on the current state, as described in the [styling](#styling) section.

```tsx example export=true
import type { AutocompleteProps, Key } from "react-aria-components";
import { Menu, MenuItem } from "react-aria-components";
import { MySearchField } from "./SearchField";

interface MyAutocompleteProps<T extends object>
  extends Omit<AutocompleteProps, "children"> {
  label?: string;
  placeholder?: string;
  items?: Iterable<T>;
  children: React.ReactNode | ((item: T) => React.ReactNode);
  onAction?: (id: Key) => void;
}

function MyAutocomplete<T extends object>({
  label,
  placeholder,
  items,
  children,
  onAction,
  ...props
}: MyAutocompleteProps<T>) {
  let { contains } = useFilter({ sensitivity: "base" });
  return (
    <div className="my-autocomplete">
      <Autocomplete filter={contains} {...props}>
        <MySearchField label={label} placeholder={placeholder} />
        <Menu items={items} onAction={onAction}>
          {children}
        </Menu>
      </Autocomplete>
    </div>
  );
}

<MyAutocomplete label="Commands" placeholder="Search commands...">
  <MenuItem>Create new file...</MenuItem>
  <MenuItem>Create new folder...</MenuItem>
  <MenuItem>Assign to...</MenuItem>
  <MenuItem>Assign to me</MenuItem>
  <MenuItem>Change status...</MenuItem>
  <MenuItem>Change priority...</MenuItem>
  <MenuItem>Add label...</MenuItem>
  <MenuItem>Remove label...</MenuItem>
</MyAutocomplete>;
```

<details>
  <summary style={{fontWeight: 'bold'}}><ChevronRight size="S" /> Show CSS</summary>

```css
.my-autocomplete {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 300px;
  height: 180px;
  border: 1px solid var(--border-color);
  padding: 16px;
  border-radius: 10px;
  background: var(--overlay-background);
}

.react-aria-SearchField {
  width: 100%;
}

.react-aria-Label {
  margin-bottom: 0.5em;
}

.react-aria-Menu {
  &[data-empty] {
    align-items: center;
    justify-content: center;
    font-style: italic;
  }
}
```

</details>

## Value

An Autocomplete's `value` is empty by default, but an initial, uncontrolled, value can be provided using the `defaultInputValue` prop.
Alternatively, a controlled value can be provided using the `inputValue` prop. Note that the input value of the Autocomplete does not affect
the ComboBox's selected option.

```tsx example
function Example() {
  let options = [
    { id: 1, name: "Adobe Photoshop" },
    { id: 2, name: "Adobe XD" },
    { id: 3, name: "Adobe InDesign" },
    { id: 4, name: "Adobe AfterEffects" },
    { id: 5, name: "Adobe Illustrator" },
    { id: 6, name: "Adobe Lightroom" },
    { id: 7, name: "Adobe Premiere Pro" },
    { id: 8, name: "Adobe Fresco" },
    { id: 9, name: "Adobe Dreamweaver" },
  ];
  let [value, setValue] = React.useState("Adobe XD");

  return (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      <MyAutocomplete
        label="Adobe products (Uncontrolled)"
        items={options}
        /*- begin highlight -*/
        defaultInputValue="Adobe XD"
      >
        {/*- end highlight -*/}
        {(item) => <MenuItem>{item.name}</MenuItem>}
      </MyAutocomplete>

      <MyAutocomplete
        label="Adobe products (Controlled)"
        items={options}
        /*- begin highlight -*/
        inputValue={value}
        onInputChange={setValue}
      >
        {/*- end highlight -*/}
        {(item) => <MenuItem>{item.name}</MenuItem>}
      </MyAutocomplete>
    </div>
  );
}
```

## Async loading

This example uses the [useAsyncList](../react-stately/useAsyncList.html) hook to handle asynchronous loading
and filtering of data from a server. No `filter` prop is provided to `Autocomplete` since filtering is done on the server.

```tsx example
import { useAsyncList } from "@react-stately/data";

function AsyncLoadingExample() {
  let list = useAsyncList<{ name: string }>({
    async load({ signal, filterText }) {
      let res = await fetch(
        `https://swapi.py4e.com/api/people/?search=${filterText}`,
        { signal },
      );
      let json = await res.json();

      return {
        items: json.results,
      };
    },
  });

  return (
    <div className="my-autocomplete">
      <Autocomplete
        inputValue={list.filterText}
        onInputChange={list.setFilterText}
      >
        <MySearchField label="Star Wars Character Search" />
        <Menu items={list.items} renderEmptyState={() => "No results found."}>
          {(item) => (
            <MenuItem
              id={item.name}
              href={`https://www.starwars.com/databank/${item.name.toLowerCase().replace(/\s/g, "-")}`}
              target="_blank"
            >
              {item.name}
            </MenuItem>
          )}
        </Menu>
      </Autocomplete>
    </div>
  );
}
```

```css hidden
.react-aria-MenuItem[href] {
  text-decoration: none;
  cursor: pointer;
}
```

## Props

<PropTable component={docs.exports.Autocomplete} links={docs.links} />

## Styling

Since Autocomplete doesn't render any DOM elements itself, it doesn't offer any styling options. See the styling sections for [TextField](TextField.html#styling), [SearchField](SearchField.html#styling), [Menu](Menu.html#styling), and [ListBox](ListBox.html#styling) for more information on how to style components within the Autocomplete.

## Advanced customization

### Composition

If you need to customize one of the components within an `Autocomplete`, such as `TextField`, `SearchField`, `Menu` or `ListBox`, you can create a wrapper
component. This lets you customize the props passed to the component.

```tsx
function MyListBox(props) {
  return <ListBox {...props} className="my-listbox" />;
}
```

### Contexts

All React Aria Components export a corresponding context that can be used to send props to them from a parent element. This enables you to build your own compositional APIs similar to those found in React Aria Components itself. You can send any prop or ref via context that you could pass to the corresponding component. The local props and ref on the component are merged with the ones passed via context, with the local props taking precedence (following the rules documented in [mergeProps](mergeProps.html)).

<ContextTable components={['Autocomplete']} docs={docs} />

### State

Autocomplete provides an <TypeLink links={statelyDocs.links} type={statelyDocs.exports.AutocompleteState} /> object to its children via `AutocompleteStateContext`. This can be used to access and manipulate the autocomplete's state.

### Hooks

If you need to customize things even further, such as accessing internal state, intercepting events, or customizing the DOM structure, you can drop down to the lower level Hook-based API. See [useAutocomplete](useAutocomplete.html) for more details.
