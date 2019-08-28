---
title: 'What is TypeScript's Exclude?'
path: '/posts/what-is-typescripts-exclude'
date: '2019-08-26T21:34:18Z'
tags:
  - typescript
  - tip
---

I'm going to be honest, here. I _love_ TypeScript, but some of the docs for their utility methods aren't that great. Thankfully, they have examples, but sometimes, even those aren't that helpful. `Exclude` is one of those utility methods that always had an air of ambiguity around it for me, but recently I did some research, and what I found makes writing some types so much cleaner.

So what does exclude do? Well, [here's what the docs say][0]:

> `Exclude<T, U>`: Constructs a type by excluding from T all properties that are assignable to U.'

Not terribly descriptive, but at least it points us in the right direction. In my opinion, the type definition of `Exclude` is much more helpful.

```ts
type Exclude<T, U> = T extends U ? never : T;
```

A simple way of putting it is that if `TypeA` is a subtype of `TypeB`, it gets removed. Here's an example:

```ts
interface Widget {
  doesStuff: boolean;
}

type Doodad = number | string | symbol | object | Widget;

type PropertyAccessor = Exclude<Doodad, object>; // string | number | symbol
type ExcludeWidget = Exclude<Doodad, Widget>; // string | number | symbol | object;

const string: PropertyAccessor = 'key';
const number: PropertyAccessor = 3;
const symbol: PropertyAccessor = Symbol();

const obj: PropertyAccessor = {}; // Type '{}' is not assignable to type 'symbol'
const widget: PropertyAccessor = {
  doesStuff: true,
}; // Type '{ doesStuff: boolean; }' is not assignable to type 'string | number | symbol'

const obj2: ExcludeWidget = {};
const widget2: PropertyAccessor = {
  doesStuff: true,
} as Widget;
```

As shown in the example, the `Exclude`, helper enables us to remove a type from a type union. Now, you may be surprised to see that the `Widget` interface is not included in the type `PropertyAccessor`. This is because an interface extends an object. The same would happen if the interface was declared as a type instead of an interface. On the flipside, however, if we were to exclude `Widget` from `Doodad` instead of `object`, both `obj2` and `widget2` would be perfectly valid. `obj2` being allowed makes sense, since it's type is in the union. `widget`, though?! We excluded that type explicitely!

When `Widget` is excluded, `object` is still a valid type for `ExcludeWidget`. `Widget`s are subtypes of `object` however, so since object is valid, so are `Widgets`;

After my research and tinkering, I discovered that the name `Exclude` is very applicable for what the utility does. Hopefully now you have a better understanding of the way that `Exclude` works, and you'll be able to utilize it to write cleaner, simpler types without getting frustrated when that type you excluded is still perfectly valid ;).

[0]: https://www.typescriptlang.org/docs/handbook/utility-types.html#excludetu
