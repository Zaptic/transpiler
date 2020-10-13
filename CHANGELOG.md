# Changelog

## [Unreleased]

### Fixed

- Issue where references were not using `Joi.lazy`

## [0.3.1] - 2020/06/08

## [0.3.0] - 2020/01/21

### Changed
- Now using TS 3.7.5

## [0.2.3] - 2019/10/24

### Fixed

- We were not handling hyphenated properties in objects in the joi module
- Enum validation was not working (it was using `only` instead of `alternatives`)

## [0.2.2] - 2019/08/12

### Fixed

- Handle literal `true` and `false`. They previously would resolve to undefined.

### Changed

- Modules won't get the undefined bits of types in unions anymore to improve performance.
  Both modules were filtering it out and it did not seem used
- true | false union types will be resolved to boolean

## [0.2.1] - 2019/08/12

### Fixed

- Don't return `Joi.allow(undefined)` when generating unions in the joi module

## [0.2.0] - 2019/07/31

### Changed

- Modules are now classes
- Using `Joi.concat()` instead of `Joi.keys()` for intersections

### Fixed

- The joi module was returning `.only()` for typescript `never` schemas. It will now properly return `.forbidden()`.
- Optimized memory usage for recurring types
- The joi module regex were generated as strings instead of regex

### Added

- Support for empty objects `{}`. It used to result in a "Not supported" error
- Support for null and undefined types
- Support for returning type definitions along with the resolved type
- Added TSDocs to help with implementing a module
- Support for recurring intersections

## [0.1.1] - 2019/02/24

### Added

- Initial version with support for joi and json schema validation
