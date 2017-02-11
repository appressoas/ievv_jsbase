import AbstractWidget from "../AbstractWidget";
import HtmlParser from "../../dom/HtmlParser";


class MockWidget extends AbstractWidget {
    constructor(element) {
        super(element);
        this._onDestroy = jest.fn();
    }

    destroy() {
        this._onDestroy();
    }
}

class MockWidgetWithDefaultConfig extends MockWidget {
    getDefaultConfig() {
        return {
            "name": "Jack",
            "age": 29
        };
    }
}


describe('AbstractWidget', () => {
    it('AbstractWidget constructor', () => {
        const mockElement = jest.fn();
        const widget = new MockWidget(mockElement);
        expect(widget.element).toBe(mockElement);
    });

    it('AbstractWidget config invalid JSON', () => {
        const element = new HtmlParser(`
            <div data-ievv-jsbase-widget-config='{"a":}'></div>
        `).firstRootElement;
        const widget = new MockWidget(element);
        expect(() => widget.config).toThrowError(SyntaxError);
    });

    it('AbstractWidget config', () => {
        const element = new HtmlParser(`
            <div data-ievv-jsbase-widget-config='{"a": 10, "b": 20}'></div>
        `).firstRootElement;
        const widget = new MockWidget(element);
        expect(widget.config).toEqual({
            a: 10,
            b: 20
        });
    });

    it('AbstractWidget defaultConfig', () => {
        const element = new HtmlParser(`<div></div>`).firstRootElement;
        const widget = new MockWidgetWithDefaultConfig(element);
        expect(widget.config).toEqual({
            "name": "Jack",
            "age": 29
        });
    });

    it('AbstractWidget defaultConfig and input config', () => {
        const element = new HtmlParser(`
            <div data-ievv-jsbase-widget-config='{"name": "John"}'></div>
        `).firstRootElement;
        const widget = new MockWidgetWithDefaultConfig(element);
        expect(widget.config).toEqual({
            "name": "John",
            "age": 29
        });
    });

    it('AbstractWidget destroy()', () => {
        const element = jest.fn();
        const widget = new MockWidget(element);
        expect(widget._onDestroy).toHaveBeenCalledTimes(0);
        widget.destroy();
        expect(widget._onDestroy).toHaveBeenCalledTimes(1);
    });
});
