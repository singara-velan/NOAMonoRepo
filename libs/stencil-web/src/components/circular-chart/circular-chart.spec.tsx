import { newSpecPage } from '@stencil/core/testing';
import { CircularChart } from './circular-chart';

describe('circular-chart', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [CircularChart],
      html: '<circular-chart></circular-chart>',
    });
    expect(root).toEqualHtml(`
      <circular-chart>
        <mock:shadow-root>
          <div>
            Hello, World! I'm
          </div>
        </mock:shadow-root>
      </circular-chart>
    `);
  });

  it('renders with values', async () => {
    const { root } = await newSpecPage({
      components: [CircularChart],
      html: `<circular-chart first="Stencil" last="'Don't call me a framework' JS"></circular-chart>`,
    });
    expect(root).toEqualHtml(`
      <circular-chart first="Stencil" last="'Don't call me a framework' JS">
        <mock:shadow-root>
          <div>
            Hello, World! I'm Stencil 'Don't call me a framework' JS
          </div>
        </mock:shadow-root>
      </circular-chart>
    `);
  });
});
