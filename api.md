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

> ```javascript
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

> ```javascript
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

###
