# \<uxl-localization\>

[![Build Status](https://travis-ci.org/uxland/uxl-localization.svg?branch=master)](https://travis-ci.org/uxland/uxl-localization)
[![npm version](https://badge.fury.io/js/%40uxland%2Fuxl-localization.svg)](https://badge.fury.io/js/%40uxland%2Fuxl-localization)

## Installation

`npm i @uxland/uxl-localization`

## Usage

```
import {localeMixin, localizationSelectors, localizerFactory} from '@uxland/uxl-localization'

export class MyComponent extends localeMixin(store, selectors, factory)(PolymerElement){
}
```
