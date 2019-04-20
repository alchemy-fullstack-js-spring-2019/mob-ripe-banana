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
<!-- - create reviews, establish relationship with reviewers -->
    <!-- *POST and GET, but not PUT and DELETE -->
        <!-- - Update old route tests with connect.js -->
    <!-- *Get - the most recent 100 (not by id) -->
<!-- -Actors -->
-Films

