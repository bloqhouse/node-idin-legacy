// tslint:disable-next-line:no-reference
/// <reference path="../untyped.d.ts" />

import 'isomorphic-fetch'
import * as fetch from 'jest-fetch-mock'

const constantDate = '2017-10-09T20:08:32.110Z';

(Date as any) = class extends Date {
  constructor() {
    super(constantDate)
  }
};

(global as any).fetch = fetch
