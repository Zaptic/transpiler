# Changelog

## [Unreleased]

### Fixed

- The joi module was returning `.only()` for typescript `never` schemas. It will now properly return `.forbidden()`.

## [0.1.1] - 2019/02/24

### Added

- Initial version with support for joi and json schema validation
