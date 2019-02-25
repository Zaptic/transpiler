# Changelog

## [Unreleased]

### Fixed

- The joi module was returning `.only()` for typescript `never` schemas. It will now properly return `.forbidden()`.
- Optimized memory usage for recurring types

### Added

- Support for empty objects `{}`. It used to result in a "Not supported" error

## [0.1.1] - 2019/02/24

### Added

- Initial version with support for joi and json schema validation
