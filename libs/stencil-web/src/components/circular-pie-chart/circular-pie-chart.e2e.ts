import { newE2EPage } from '@stencil/core/testing';

describe('circular-pie-chart', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<circular-pie-chart></circular-pie-chart>');
    const element = await page.find('circular-pie-chart');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to the name data', async () => {
    const page = await newE2EPage();

    await page.setContent('<circular-pie-chart></circular-pie-chart>');
    const component = await page.find('circular-pie-chart');
    const element = await page.find('circular-pie-chart >>> div');
    expect(element.textContent).toEqual(`Hello, World! I'm `);

    component.setProperty('first', 'James');
    await page.waitForChanges();
    expect(element.textContent).toEqual(`Hello, World! I'm James`);

    component.setProperty('last', 'Quincy');
    await page.waitForChanges();
    expect(element.textContent).toEqual(`Hello, World! I'm James Quincy`);

    component.setProperty('middle', 'Earl');
    await page.waitForChanges();
    expect(element.textContent).toEqual(`Hello, World! I'm James Earl Quincy`);
  });
});
