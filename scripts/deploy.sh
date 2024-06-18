#!/bin/env bash
npm run build && scp -r dist/blog-ng root@138.68.79.111:/var/www/html/

