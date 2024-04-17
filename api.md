# the api docs

Find here what you need to get to interact with the api!

---

## editor

### site

<details>
 <summary><code>GET</code> <code><b>/</b></code> <code>Get all the sites</code></summary>

##### Parameters

> None

##### Responses

> | http code | content-type       | response                       |
> | --------- | ------------------ | ------------------------------ |
> | `200`     | `application/json` | `OK`                           |
> | `400`     | `application/json` | `{"code":"400","Invalid JSON"` |

##### Example response

> ```json
> [
>     {
>         "id": "gurrxthut2q4b1rp2asdas",
>         "ownerId": "b4122b98-2d17-4015-9b22-de72b02b12421",
>         "name": "WebsiteName",
>         "createdAt": "2024-03-27T11:54:03.000Z",
>         "updatedAt": "2024-03-27T11:54:03.000Z",
>     },
> ];
> ```

</details>

<details>
 <summary><code>GET</code> <code><b>/[userId]</b></code> <code>Get the sites from a user</code></summary>

##### Parameters

> | userId  |
> | ------- |
> | varchar |

##### Responses

> | http code | content-type       | response                       |
> | --------- | ------------------ | ------------------------------ |
> | `200`     | `application/json` | `OK`                           |
> | `400`     | `application/json` | `{"code":"400","Invalid JSON"` |

##### Example response

> ```json
> [{}];
> ```

</details>

<details>
 <summary><code>POST</code> <code><b>/create</b></code> <code>create a site</code></summary>

##### Parameters

> | Name    | ownerId |
> | ------- | ------- |
> | varchar | varchar |

##### Responses

> | http code | content-type       | response                       |
> | --------- | ------------------ | ------------------------------ |
> | `200`     | `application/json` | `OK`                           |
> | `400`     | `application/json` | `{"code":"400","Invalid JSON"` |

##### Example post request

> ```JSON
> {
>   "ownerId": "b4122b98-2d17-4015-9b22-de72b02bb4b0",
>   "name": "bip"
> }
> ```

</details>

### page

<details>
 <summary><code>GET</code> <code><b>/</b></code> <code>Get all the pages</code></summary>

##### Parameters

> None

##### Responses

> | http code | content-type       | response                       |
> | --------- | ------------------ | ------------------------------ |
> | `200`     | `application/json` | `OK`                           |
> | `400`     | `application/json` | `{"code":"400","Invalid JSON"` |

##### Example response

> ```json
> [
>   {
>       "id": "gurrxthut2q4b1rp2asdas",
>       "site_id":"b4122b98-2d17-4015-9b22-de72b02b12421",
>       "title": "WebsiteName",
>       "slug": "..."
>         "createdAt": "2024-03-27T11:54:03.000Z",
>         "updatedAt": "2024-03-27T11:54:03.000Z",
>   },
> ];
> ```

</details>

<details>
 <summary><code>GET</code> <code><b>/[id]</b></code> <code>Get a page from a page id</code></summary>

##### Parameters

> | id      |
> | ------- |
> | varchar |

##### Responses

> | http code | content-type       | response                       |
> | --------- | ------------------ | ------------------------------ |
> | `200`     | `application/json` | `OK`                           |
> | `400`     | `application/json` | `{"code":"400","Invalid JSON"` |

##### Example response

> ```json
> [
>   {
>       "id": "gurrxthut2q4b1rp2asdas",
>       "site_id":"b4122b98-2d17-4015-9b22-de72b02b12421",
>       "title": "WebsiteName",
>       "slug": "..."
>         "createdAt": "2024-03-27T11:54:03.000Z",
>         "updatedAt": "2024-03-27T11:54:03.000Z",
>   },
> ];
> ```

</details>

<details>
 <summary><code>GET</code> <code><b>/site_id/[id]</b></code> <code>Get a page from a site id</code></summary>

##### Parameters

> | site_id |
> | ------- |
> | varchar |

##### Responses

> | http code | content-type       | response                       |
> | --------- | ------------------ | ------------------------------ |
> | `200`     | `application/json` | `OK`                           |
> | `400`     | `application/json` | `{"code":"400","Invalid JSON"` |

##### Example response

> ```json
> [
>   {
>       "id": "gurrxthut2q4b1rp2asdas",
>       "site_id":"b4122b98-2d17-4015-9b22-de72b02b12421",
>       "title": "WebsiteName",
>       "slug": "..."
>         "createdAt": "2024-03-27T11:54:03.000Z",
>         "updatedAt": "2024-03-27T11:54:03.000Z",
>   },
> ];
> ```

</details>

<details>
 <summary><code>POST</code> <code><b>/create</b></code> <code>create a site</code></summary>

##### Parameters

> | title   | slug    | navbarid | footerId | siteId  |
> | ------- | ------- | -------- | -------- | ------- |
> | varchar | varchar | int      | int      | varchar |

##### Responses

> | http code | content-type       | response                       |
> | --------- | ------------------ | ------------------------------ |
> | `200`     | `application/json` | `OK`                           |
> | `400`     | `application/json` | `{"code":"400","Invalid JSON"` |

##### Example post request

> ```JSON
> {
>   "title": "blip",
>   "slug": "blip",
>   "navbarId": 123,
>   "footerId": 123,
>   "siteId": "e168zcpvl2q463r7teg03"
> }
> ```

</details>

### page_components

<details>
 <summary><code>GET</code> <code><b>/</b></code> <code>Get all the components of all the pages</code></summary>

##### Parameters

> None

##### Responses

> | http code | content-type       | response                       |
> | --------- | ------------------ | ------------------------------ |
> | `200`     | `application/json` | `OK`                           |
> | `400`     | `application/json` | `{"code":"400","Invalid JSON"` |

##### Example response

> ```json
> [
>     {
>         "id": "3lifg5lmgjbn9w5tfey2b",
>         "index": 1,
>         "props": {
>             "prop1": "prop1",
>         },
>         "styles": {
>             "style1": "style1",
>         },
>         "pageId": "gurrxthut2q4b1rp2aij7",
>         "parentId": null,
>         "createdAt": "2024-04-05T10:48:32.000Z",
>         "updatedAt": "2024-04-05T10:48:32.000Z",
>     },
> ];
> ```

</details>

<details>
 <summary><code>GET</code> <code><b>/[id]</b></code> <code>Get a page component by id</code></summary>

##### Parameters

> | id      |
> | ------- |
> | varchar |

##### Responses

> | http code | content-type       | response                       |
> | --------- | ------------------ | ------------------------------ |
> | `200`     | `application/json` | `OK`                           |
> | `400`     | `application/json` | `{"code":"400","Invalid JSON"` |

##### Example response

> ```json
> [
>     {
>         "id": "3lifg5lmgjbn9w5tfey2b",
>         "index": 1,
>         "props": {
>             "prop1": "prop1",
>         },
>         "styles": {
>             "style1": "style1",
>         },
>         "pageId": "gurrxthut2q4b1rp2aij7",
>         "parentId": null,
>         "createdAt": "2024-04-05T10:48:32.000Z",
>         "updatedAt": "2024-04-05T10:48:32.000Z",
>     },
> ];
> ```

</details>

<details>
 <summary><code>GET</code> <code><b>/page_id/[id]</b></code> <code>Get all the components of all the page you look up</code></summary>

##### Parameters

> | pageId  |
> | ------- |
> | varchar |

##### Responses

> | http code | content-type       | response                       |
> | --------- | ------------------ | ------------------------------ |
> | `200`     | `application/json` | `OK`                           |
> | `400`     | `application/json` | `{"code":"400","Invalid JSON"` |

##### Example response

> ```json
> [
>     {
>         "id": "3lifg5lmgjbn9w5tfey2b",
>         "index": 1,
>         "props": {
>             "prop1": "prop1",
>         },
>         "styles": {
>             "style1": "style1",
>         },
>         "pageId": "gurrxthut2q4b1rp2aij7",
>         "parentId": null,
>         "createdAt": "2024-04-05T10:48:32.000Z",
>         "updatedAt": "2024-04-05T10:48:32.000Z",
>     },
> ];
> ```

</details>

<details>
 <summary><code>POST</code> <code><b>/create</b></code> <code>Add a component to a page</code></summary>

##### Parameters

> | pageId  | component_id | parent_id | index | props | styles |
> | ------- | ------------ | --------- | ----- | ----- | ------ |
> | varchar | varchar      | varchar   | int   | JSON  | JSON   |

##### Responses

> | http code | content-type       | response                       |
> | --------- | ------------------ | ------------------------------ |
> | `200`     | `application/json` | `OK`                           |
> | `400`     | `application/json` | `{"code":"400","Invalid JSON"` |

##### Example response

> ```javascript
> {
>   "pageId": "gurrxthut2q4b1rp2aij7",
>   "component_id": "98xth82854bas82g3tekh",
>   "parent_id": "",
>   "index": 1,
>   "props": {"prop1": "prop1"},
>   "styles": {"style1": "style1"}
> }
> ```

</details>
