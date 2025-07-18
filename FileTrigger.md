{/_ Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License. _/}

import {Layout} from '@react-spectrum/docs';
export default Layout;

import docs from 'docs:@react-spectrum/filetrigger';
import typesDocs from 'docs:@react-types/shared/src/events.d.ts';
import {PropTable, HeaderInfo, TypeLink, PageDescription, StateTable} from '@react-spectrum/docs';
import styles from '@react-spectrum/docs/src/docs.css';
import packageData from '@react-spectrum/filetrigger/package.json';
import ChevronRight from '@spectrum-icons/workflow/ChevronRight';
import {Divider} from '@react-spectrum/divider';
import {ExampleCard} from '@react-spectrum/docs/src/ExampleCard';
import {Keyboard} from '@react-spectrum/text';
import Button from '@react-spectrum/docs/pages/assets/component-illustrations/ActionButton.svg';
import Link from '@react-spectrum/docs/pages/assets/component-illustrations/Link.svg';

---

## category: Buttons

# FileTrigger

## Example

```tsx example
import { FileTrigger, Button } from "@adobe/react-spectrum";

function Example() {
  let [file, setFile] = React.useState(null);

  return (
    <>
      <FileTrigger
        onSelect={(e) => {
          let files = Array.from(e);
          let filenames = files.map((file) => file.name);
          setFile(filenames);
        }}
      >
        <Button variant="accent">Select a file</Button>
      </FileTrigger>
      {file && file}
    </>
  );
}
```

## Content

A `FileTrigger` wraps around a pressable child such as a button, and includes a visually hidden input element that allows the user to select files from their device.

```tsx
import { FileTrigger, Button } from "@adobe/react-spectrum";

<FileTrigger>
  <Button />
</FileTrigger>;
```

If a visual label is not provided on the pressable child, then an `aria-label` or `aria-labelledby` prop must be passed to identify the file trigger to assistive technology.

## Accepted file types

By default, the file trigger will accept any file type. To support only certain file types, pass an array of the [mime type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types) of files via the `acceptedFileTypes` prop.

```tsx example
<FileTrigger acceptedFileTypes={["image/png"]}>
  <Button variant="primary">Select files</Button>
</FileTrigger>
```

## Multiple files

A file trigger can accept multiple files by passsing the `allowsMultiple` property.

```tsx example
<FileTrigger allowsMultiple>
  <Button variant="primary">Upload your files</Button>
</FileTrigger>
```

## Directory selection

To enable selecting directories instead of files, use the `acceptDirectory` property.

This reflects the [webkitdirectory](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/webkitdirectory) HTML attribute and allows users to select directories and their contents. Please note that support for this feature varies from browser to browser.

```tsx example
function Example() {
  let [files, setFiles] = React.useState([]);

  return (
    <>
      <FileTrigger
        acceptDirectory
        onSelect={(e) => {
          if (e) {
            let fileList = [...e].map((file) =>
              file.webkitRelativePath !== ""
                ? file.webkitRelativePath
                : file.name,
            );
            setFiles(fileList);
          }
        }}
      >
        <Button variant="accent">Upload</Button>
      </FileTrigger>
      {files && (
        <ul>
          {files.map((file, index) => (
            <li key={index}>{file}</li>
          ))}
        </ul>
      )}
    </>
  );
}
```

## Media capture

To specify the media capture mechanism to capture media on the spot, pass `user` for the user-facing camera or `environment` for the outward-facing camera via the `defaultCamera` prop.

This behavior only works on mobile devices. On desktop devices, it will open the file system like normal. [Read more about capture](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/capture).

```tsx example
<FileTrigger defaultCamera="environment">
  <Button variant="accent">Open Camera</Button>
</FileTrigger>
```

## Props
