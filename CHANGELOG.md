# Changelog

## [Unreleased]

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
