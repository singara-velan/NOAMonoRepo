import { newSpecPage } from '@stencil/core/testing';
import { LineChart } from './line-chart';

describe('line-chart', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [LineChart],
      html: '<line-chart></line-chart>',
    });
    expect(root).toEqualHtml(`
      <line-chart>
        <mock:shadow-root>
          <div>
            Hello, World! I'm
          </div>
        </mock:shadow-root>
      </line-chart>
    `);
  });

  it('renders with values', async () => {
    const { root } = await newSpecPage({
      components: [LineChart],
      html: `<line-chart first="Stencil" last="'Don't call me a framework' JS"></line-chart>`,
    });
    expect(root).toEqualHtml(`
      <line-chart first="Stencil" last="'Don't call me a framework' JS">
        <mock:shadow-root>
          <div>
            Hello, World! I'm Stencil 'Don't call me a framework' JS
          </div>
        </mock:shadow-root>
      </line-chart>
    `);
  });
});
