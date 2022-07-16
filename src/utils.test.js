import { readFileContent, readCommissionsArray, getDateDifferenceInDays } from './utils';

/* eslint-disable no-undef */

describe('Utils', () => {
  it('should read the file content', async () => {
    const fileContent = await readFileContent('input.json');

    expect(typeof fileContent).toBe('string');
  });

  it('should read and return the commissions array', async () => {
    const commissionsArray = await readCommissionsArray('input.json');

    expect(commissionsArray instanceof Array).toBe(true);
  });

  it('should subtract dates and return the difference in days', () => {
    const [date1, date2] = ['2022-06-20', '2022-06-15'];
    const dateDifference = getDateDifferenceInDays(date1, date2);

    expect(dateDifference).toBe(5);
  });
});
