---
title: "GraphQL: Why?"
path: '/posts/graphql-why'
date: "2018-03-26T12:23:14Z"
tags:
- graphql
- tutorial
---

GraphQL is one of those hot new technologies that is showing a lot of promise,
and is also being adopted in a bunch of industries. But what is GraphQL? Is it a
programming language? A Library? A Framework? In actuality, it's none of those
things. So what is GraphQL? GraphQL is a _query language._ "A what?!" you ask?
Basically, GraphQL is a new way of requesting and modifying information on a
server. It's kinda like a REST API mixed with SQL, but better. How is it better
you ask? Let's do a quick comparison...

| GraphQL                                        | REST                                     |
| ---------------------------------------------- | ---------------------------------------- |
| Single Endpoint                                | Multiple endpoints                       |
| Select what data you want from the server      | Get whatever the server sends you        |
| Real-time communication                        | Requires server polling for information  |
| GraphQL sits in between your client and server | REST is integrated into your application |

That's an impressive list of differences, right? Now, what does it mean in
everyday English?

With a REST API, there's different endpoints, or URLs, that you send requests to
to get information. Let's say for example, we have a retreat booking site. For
their website, we need to get information about their locations, so we could
request information from `www.someretreat.com/locations`, and that would return
us information about all their locations. What if we want information about one
of the locations? Then, we would need to request information from another
endpoint. Maybe `www.someretreat.com/locations/villa` would be where we send our
request to. Great, now we have information about the place! Let's book a room...
To get the available dates, we'd need to send our request to yet another
endpoint... Maybe something like `www.someretreat.com/locations/villa/dates`.
Wow... That's three requests, all for information about one room. Kinda
rediculous right? What would that look like with GraphQL? Well, we have a single
endpoint, so we will send all requests to that location, so maybe
`www.someretreat.com/api` or something similar. But how do we get the
information that we need? You know, all of their locations, basic information
about that location, and the available dates. With GraphQL, you send a _query_
to that endpoint, and that is going to determine what information you get back.
For example, to get the locations, you might send a request like

```graphql
query {
  locations
}
```

Woohoo! The server gave us the information about the locations! But... how is
this better than REST?

This is where GraphQL begins to make sense. Since GraphQL is a query language,
you can select what information you want from the server. So instead of sending
two additional different requests to the server for each location, we can get
all the data we need in one single query. Let's replicate the previous example,
but this time, let's get all the information we need with GraphQL.

```graphql
query {
  locations {
    name
    description
    dates
  }
}
```

We just got the name, description, and all the dates available for booking in
_one single query_. We didn't get any extra information that we didn't need,
which is called overfetching. Overfetching incurs additional data usage, so in a
world of mobile devices and limited data plans, GraphQL becomes really handy. On
the flipside, when using our REST API, we needed to make multiple requests to
get the information that we needed. This is called underfetching. When
underfetching, one request needs to finish so we can get information from it for
another request. This causes a large latency increase, and ultimately more time
until the relevent information is delivered to the end user.

GraphQL also allows one to manipulate data with queries. Instead of a query,
this kind of request is called a _mutation_. Mutations allow clients to push or
change data on the server. There's nothing terribly special about mutations, but
they also enable GraphQL subscriptions. Subscriptions enable the server to push
data to the client whenever data is modified or added. What if we needed to
build an application that updated the information displayed as it was updated on
the server? With a REST API, the application would need to continually check
with the server to see if there is new or updated information. As you can
imagine, polling the server uses large amounts of data. When using
subscriptions, however, no polling is necessary because the server can push data
to the client as it updates. The result is faster updates, and lower data usage.

One of the handiest parts of GraphQL is that you don't have to completely
rewrite your frontend and backend to start using it. The magic is in things
called _resolver functions_. A resolver is simply a function that connects the
query to your application or database. Put simply, resolvers get data from
somewhere and give it to the response. Resolver functions can load data from
databases, make web requests, or get data in any other way. In fact, you could
use multiple different sources to resolve a single query. Since resolvers
connect your data to the clients queries, one could migrate a REST API
progressively to GraphQL, all the while leaving the existing API in place to
support legacy applications.

Finally, because GraphQL is completely seperate from the front and backends,
teams can agree on a _schema_, then develop their parts of the application
seperately. A schema is basically what queries can be used, and what type of
data they return. Since the front end is completely seperate from the backend,
there is no specific language that needs to be used on either side, enabling
developers to work with whatever they are most comfortable with. Additionally,
GraphQL makes it much easier for teams to transition between versions of the
application because no change will break any functionality, as long as it still
follows the schema.

This was by no means a comprehensive guide to GraphQL, but it should help you
understand some of the core concepts. Additionally, you should also begin to
understand what sets it apart from a traditional REST API. For more information
about GraphQL, you can check out the [GraphQL website](http://graphql.org/), or
you can check out [How To GraphQL](www.howtographql.com), which is an open
source tutorial on GraphQL.
