const constantDate = '2017-10-09T20:08:32.110Z';

(Date as any) = class extends Date {
  constructor() {
    super(constantDate)
  }
}
