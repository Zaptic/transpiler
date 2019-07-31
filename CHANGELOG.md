# Changelog

## [Unreleased]

### Changed

- Modules are now classes

### Fixed

- The joi module was returning `.only()` for typescript `never` schemas. It will now properly return `.forbidden()`.
- Optimized memory usage for recurring types
- The joi module regex were generated as strings instead of regex

### Added

- Support for empty objects `{}`. It used to result in a "Not supported" error
- Support for null and undefined types
- Support for returning type definitions along with the resolved type
- Added TSDocs to help with implementing a module

## [0.1.1] - 2019/02/24

### Added

- Initial version with support for joi and json schema validation
