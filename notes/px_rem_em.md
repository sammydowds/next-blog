---
title: "Different Font Size Units"
description: "A brief overview of the font size units used on the web."
date: "12/27/2023"
labels: "personal"
---

# Font Size Units

```css
/* Which one to use??? */
.one {
  font-size: 1.3em;
}
.two {
  font-size: 1.3rem;
}
.three {
  font-size: 20px;
}

```

## Overview

| Unit | Description | Relative |
| ----------- | ----------- |----------- |
| px     | A pixel. 1px = 1/96th of 1in | No |
| em   | Font size of the parent, in the case of typographical properties like font-size, and font size of the element itself, in the case of other properties like width. | Yes |
| rem | Font size of the root element. | Yes |

## Clarifying "em"

The em unit means "my parent element's font-size". So, lets look at an example. 

```html
<ul class="ems">
  <li>One</li>
  <li>Two</li>
  <li>Three
    <ul>
      <li>Three A</li>
      <li>Three B
        <ul>
          <li>Three B 2</li>
        </ul>
      </li>
    </ul>
  </li>
</ul>
```

We will use this nested list as an example.

```css
html {
  font-size: 16px;
}

.ems li {
  font-size: 1.3em;
}
```

In the example above, we are styling the li elements to have a font-size of 1.3em. This means, "Three B" will have a font size 1.3x larger than "Three", and "Three B 2" will have a font size 1.3x larger than "Three B"

## Clarifying "rem"

The rem unit means "The root element's font-size" (root em). In the example below, would the list items get bigger with each level of nesting?

```html
<ul class="rems">
  <li>One</li>
  <li>Two</li>
  <li>Three
    <ul>
      <li>Three A</li>
      <li>Three B
        <ul>
          <li>Three B 2</li>
        </ul>
      </li>
    </ul>
  </li>
</ul>
```

And the styles being

```css
html {
  font-size: 16px;
}

.rems li {
  font-size: 1.3rem;
}
```

The answer is no! The nested list items' size would take their size from the root element (html).

## Conclusion

Hopefully this sheds some light on the difference between the three units. However, to say which one is "preferable" over another is debatable. A relative unit might help things scale nicer, although it is still quite popular to use "px". There might be a justifcation to use relative units for accessibility reasons. 
