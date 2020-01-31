# UXL Localization [![npm version](https://badge.fury.io/js/%40uxland%2Fuxl-localization.svg)](https://badge.fury.io/js/%40uxland%2Fuxl-localization)

| Build Status                                                                                                                | Statements                                    | Branches                                  | Functions                                   | Lines                               |
| --------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- | ----------------------------------------- | ------------------------------------------- | ----------------------------------- |
| [![Build Status](https://api.travis-ci.org/uxland/uxl-localization.svg)](https://api.travis-ci.org/uxland/uxl-localization) | ![Statements](https://img.shields.io/badge/Coverage-64.12%25-red.svg 'Make me better!') | ![Branches](https://img.shields.io/badge/Coverage-17.5%25-red.svg 'Make me better!') | ![Functions](https://img.shields.io/badge/Coverage-52%25-red.svg 'Make me better!') | ![Lines](https://img.shields.io/badge/Coverage-65.29%25-red.svg 'Make me better!') |

## Installation

`npm i @uxland/uxl-localization`

## usage
```typescript
const locales = ca: {
		[moduleName]: {}
	},
	en: {
		[moduleName]: {}
	},
	es: {
        [moduleName]: {
            key:  'Esto es la cadena'
        }
    }
props.localize(`${moduleName}.key`)
```

With arguments
```typescript
const locales = ca: {
		[moduleName]: {}
	},
	en: {
		[moduleName]: {}
	},
	es: {
        [moduleName]: {
            order:  'Pedido con id {id}'
        }
    }
props.localize(`${moduleName}.key`, 'id', '12345');
```