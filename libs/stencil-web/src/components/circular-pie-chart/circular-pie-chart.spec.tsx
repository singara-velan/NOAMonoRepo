import { newSpecPage } from '@stencil/core/testing';
import { CircularPieChart } from './circular-pie-chart';

describe('circular-pie-chart', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [CircularPieChart],
      html: '<circular-pie-chart></circular-pie-chart>',
    });
    expect(root).toEqualHtml(`
      <circular-pie-chart>
        <mock:shadow-root>
          <div>
            Hello, World! I'm
          </div>
        </mock:shadow-root>
      </circular-pie-chart>
    `);
  });

  it('renders with values', async () => {
    const { root } = await newSpecPage({
      components: [CircularPieChart],
      html: `<circular-pie-chart first="Stencil" last="'Don't call me a framework' JS"></circular-pie-chart>`,
    });
    expect(root).toEqualHtml(`
      <circular-pie-chart first="Stencil" last="'Don't call me a framework' JS">
        <mock:shadow-root>
          <div>
            Hello, World! I'm Stencil 'Don't call me a framework' JS
          </div>
        </mock:shadow-root>
      </circular-pie-chart>
    `);
  });
});
