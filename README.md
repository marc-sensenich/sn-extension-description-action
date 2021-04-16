# Standard Notes Extension Description Generator Action

## Usage

Add the following step to your job when you need to generate your Standard Notes Extension Description

```yaml
- uses: marc-sensenich/sn-extension-description-action@v1
  with:
    identifier: com.example.example-component
    name: Example
    description: An example component.
    content_type: SN|Component
    area: editor_editor
    version: 0.1.0
    url: https://cdn.jsdelivr.net/gh/example/example-component@v0.1.0/dist/dist.css
    download_url: https://github.com/example/example-component/archive/refs/tags/v0.1.0.zip"
    # Optionally the description can be written to a file
    output_path: ./ext.json
```

## Inputs

Checkout [action.yml](./action.yml) for a full list of supported inputs.

## Outputs

### `extension_description`

The generated Standard Notes extension JSON description.
