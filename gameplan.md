##To Dos

- add conditionals for delete studio
- add film/reviews to get reviewer by id (consolut readme)
- add film list to get studio by id
- refactoring and using seeddata, data-helper, connect.js
-##### `GET /reviewer/:id`

```
{
    _id, name, company,
    reviews: [{
        _id, rating, review,
        film: { _id, title }
    }]
}
- add films to actor get by ID

## Process

-Films
make post, get, getByIOd, delete and NO patch.
