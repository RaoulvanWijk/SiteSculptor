# the api docs

Find here what you need to get to interact with the api!

---

## editor

All the endpoints for the editor

### site

<details>
<summary><code>GET</code> <code><b>/</b></code> <code>Get all the sites</code> </summary>

#### example response

```json
[
    {
        "id": "gurrxthut2q4b1rp2asdas",
        "ownerId": "b4122b98-2d17-4015-9b22-de72b02b12421",
        "name": "WebsiteName",
        "createdAt": "2024-03-27T11:54:03.000Z",
        "updatedAt": "2024-03-27T11:54:03.000Z"
    }
]
```

</details>

<details>
<summary><code>GET</code> <code><b>/[id]</b></code> <code>Get a site by id</code></summary>

#### example response

```json
{
    "id": "gurrxthut2q4b1rp2asdas",
    "ownerId": "b4122b98-2d17-4015-9b22-de72b02b12421",
    "name": "WebsiteName",
    "createdAt": "2024-03-27T11:54:03.000Z",
    "updatedAt": "2024-03-27T11:54:03.000Z"
}
```

</details>

<br/>

<details>
<summary><code>POST</code> <code><b>/create</b></code> <code>Create a new site</code></summary>

#### body

```json
{
    "name": "WebsiteName"
}
```

#### example response

```json
{
    "status": 200,
    "id": "gurrxthut2q4b1rp2asdas"
}
```

</details>

<br/>

<details>
<summary><code>PUT</code> <code><b>/update/[id]</b></code> <code>Update a site by id</code></summary>

#### body

```json
{
    "name": "WebsiteName"
}
```

#### example response

```json
{
    "status": 200
}
```

</details>

<br/>

<details>
<summary><code>DELETE</code> <code><b>/delete/[id]</b></code> <code>Delete a site by id</code></summary>

#### example response

```json
{
    "status": 200
}
```

</details>

### pages

<details>
<summary><code>GET</code> <code><b>/</b></code> <code>Get all the pages from a site</code></summary>

#### example response

```json
[
    {
        "id": "gurrxthut2q4b1rp2asdas",
        "title": "Title",
        "slug": "Slug",
        "navbar_id": 123,
        "footer_id": 123,
        "site_id": "gurrxthut2q4b1rp2asdas",
        "createdAt": "2024-03-27T11:54:03.000Z",
        "updatedAt": "2024-03-27T11:54:03.000Z"
    }
]
```

</details>

<details>
<summary><code>GET</code> <code><b>/[id]</b></code> <code>Get a page by id</code></summary>

#### example response

```json
{
    "id": "gurrxthut2q4b1rp2asdas",
    "title": "Title",
    "slug": "Slug",
    "navbar_id": 123,
    "footer_id": 123,
    "site_id": "gurrxthut2q4b1rp2asdas",
    "createdAt": "2024-03-27T11:54:03.000Z",
    "updatedAt": "2024-03-27T11:54:03.000Z"
}
```

</details>

<details>

<summary><code>GET</code> <code><b>/site_id/[id]</b></code> <code>Get pages by site id</code></summary>

#### example response

```json
[
    {
        "id": "gurrxthut2q4b1rp2asdas",
        "title": "Title",
        "slug": "Slug",
        "navbar_id": 123,
        "footer_id": 123,
        "site_id": "gurrxthut2q4b1rp2asdas",
        "createdAt": "2024-03-27T11:54:03.000Z",
        "updatedAt": "2024-03-27T11:54:03.000Z"
    }
]
```

</details>

<br/>

<details>
<summary><code>POST</code> <code><b>/create</b></code> <code>Create a new page</code></summary>

#### body

```json
{
    "title": "Title",
    "slug": "Slug",
    "navbar_id": 123,
    "footer_id": 123,
    "site_id": "gurrxthut2q4b1rp2asdas"
}
```

#### example response

```json
{
    "status": 200
}
```

</details>

<br/>

<details>
<summary><code>PUT</code> <code><b>/update/[id]</b></code> <code>Update a page by id</code></summary>

#### body

```json
{
    "title": "Title",
    "slug": "Slug",
    "navbar_id": 123,
    "footer_id": 123,
    "site_id": "gurrxthut2q4b1rp2asdas"
}
```

#### example response

```json
{
    "status": 200
}
```

</details>

<details>
<summary><code>DELETE</code> <code><b>/delete/[id]</code> <code>deletea site by id</code></summary>

#### example response

```json
{
    "status": 200
}
```

</details>

### page_components

<details>
<summary><code>GET</code> <code><b>/</b></code> <code>Get all the page components from a page</code></summary>

#### example response

```json
[
    {
        "id": "gurrxthut2q4b1rp2asdas",
        "page_id": "gurrxthut2q4b1rp2asdas",
        "component_id": "gurrxthut2q4b1rp2asdas",
        "parent_id": "gurrxthut2q4b1rp2asdas",
        "index": 1,
        "props": { "prop1": "prop1" },
        "styles": { "styles1": "styles1" },
        "createdAt": "2024-03-27T11:54:03.000Z",
        "updatedAt": "2024-03-27T11:54:03.000Z"
    }
]
```

</details>

<details>
<summary><code>GET</code> <code><b>/[id]</b></code> <code>Get a page component by id</code></summary>

#### example response

```json
{
    "id": "gurrxthut2q4b1rp2asdas",
    "page_id": "gurrxthut2q4b1rp2asdas",
    "component_id": "gurrxthut2q4b1rp2asdas",
    "parent_id": "gurrxthut2q4b1rp2asdas",
    "index": 1,
    "props": { "prop1": "prop1" },
    "styles": { "styles1": "styles1" },
    "createdAt": "2024-03-27T11:54:03.000Z",
    "updatedAt": "2024-03-27T11:54:03.000Z"
}
```

</details>

<details>
<summary><code>GET</code> <code><b>/page_id/[id]</b></code> <code>Get page components by page id</code></summary>

#### example response

```json
[
    {
        "id": "gurrxthut2q4b1rp2asdas",
        "page_id": "gurrxthut2q4b1rp2asdas",
        "component_id": "gurrxthut2q4b1rp2asdas",
        "parent_id": "gurrxthut2q4b1rp2asdas",
        "index": 1,
        "props": { "prop1": "prop1" },
        "styles": { "styles1": "styles1" },
        "createdAt": "2024-03-27T11:54:03.000Z",
        "updatedAt": "2024-03-27T11:54:03.000Z"
    }
]
```

</details>

<br/>

<details>
<summary><code>POST</code> <code><b>/create</b></code> <code>Create a new page component</code></summary>

#### body

```json
{
    "page_id": "gurrxthut2q4b1rp2asdas",
    "component_id": "gurrxthut2q4b1rp2asdas",
    "parent_id": "gurrxthut2q4b1rp2asdas",
    "index": 1,
    "props": { "prop1": "prop1" },
    "styles": { "styles1": "styles1" }
}
```

#### example response

```json
{
    "status": 200
}
```

</details>

<br/>

<details>
<summary><code>PUT</code> <code><b>/update/[id]</b></code> <code>Update a page component by id</code></summary>

#### body

```json
{
    "page_id": "gurrxthut2q4b1rp2asdas",
    "component_id": "gurrxthut2q4b1rp2asdas",
    "parent_id": "gurrxthut2q4b1rp2asdas",
    "index": 1,
    "props": { "prop1": "prop1" },
    "styles": { "styles1": "styles1" }
}
```

#### example response

```json
{
    "status": 200
}
```

</details>

<br/>

<details>
<summary><code>DELETE</code> <code><b>/delete/[id]</code> <code>deletea site by id</code></summary>

#### example response

```json
{
    "status": 200
}
```

</details>
