# Jigsass Tools Maps Changelog

## v1.0.5
`jigsass-get`: Don't throw when map is an empty list

## v1.0.4
`jigsass-get`: For behavior that more closely resembles `map-get`, return 
`null` when a key in the keys chain, which isn't the last key, does not 
exist or isn't a map.

## v1.0.3
Update dependencies.

## v1.0.2
Fixes a bug where trying to deep-merge with or into an
empty list would throw an error because a list is not a map.

## v1.0.1
Fixes a bug where trying to set a key in an empty list would
throw an error because a list is not a map.
