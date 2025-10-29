Request URL https://v2.api.noroff.dev/online-shop

Online Shop

These endpoints allow you to retrieve all products, or a single product by its id. The response will be an array of JSON objects if you request all products, or a single JSON object if you request a single product.

The Online Shop model

id - string
title - string
description - string
price - float
discountedPrice - float
image - object
rating - integer
tags - Array<string>
reviews - Array<review>
